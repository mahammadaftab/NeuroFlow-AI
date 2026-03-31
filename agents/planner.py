from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from typing import List, Optional
from core.config import get_settings
from agents.memory import get_memory_context

settings = get_settings()

class PlanStepOut(BaseModel):
    id: int = Field(description="Sequential step ID starting at 1")
    action: str = Field(description="A clear description of the action to take")
    tool_name: str = Field(description="Name of the tool to use, or 'none' if cognitive step. Options: calendar_add, email_send, note_taker")
    tool_input: dict = Field(description="A dictionary of arguments specifically required by the chosen tool", default_factory=dict)
    completed: bool = Field(default=False)

class PlanOutput(BaseModel):
    steps: List[PlanStepOut] = Field(description="A sequential list of steps to accomplish the goal.")

def plan_node(state: dict):
    """
    The Planner Agent:
    Takes the user goal and breaks it down into actionable tool-calling steps.
    """
    user_input = state['user_input']
    session_id = state.get('session_id', 'demo-session')
    print(f"--> Planner Node processing input: {user_input}")
    
    # Contextual memory RAG string injected 
    context = get_memory_context(session_id, user_input)
    
    # Check if we have an API key. If not, use deterministic fallback
    if not settings.OPENAI_API_KEY or settings.OPENAI_API_KEY.startswith("your_"):
        print("--> Planner fallback: No OpenAI Key found. Generating static DAG.")
        return generate_mock_plan(user_input, context)
        
    try:
        # Initialize real LLM with Structured Output forcing
        llm = ChatOpenAI(model="gpt-4o", temperature=0.1, openai_api_key=settings.OPENAI_API_KEY)
        structured_llm = llm.with_structured_output(PlanOutput)
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are the Planner Agent of NeuroFlow AI. Your job is to break down user requests into a strict array of DAG tool-steps.\nMemory Context:\n{context}"),
            ("user", "{input}")
        ])
        
        chain = prompt | structured_llm
        result = chain.invoke({"input": user_input, "context": context})
        
        # Convert pydantic models back to standard dicts for our State schema
        real_plan = [step.dict() for step in result.steps]
        
        return {
            "plan": real_plan,
            "actions_taken": [{"agent": "planner", "action": "generated_live_plan"}]
        }
        
    except Exception as e:
        print(f"--> LLM Execution failed: {e}. Falling back to default plan.")
        return generate_mock_plan(user_input, context)


def generate_mock_plan(user_input, context):
    mock_plan = [
        {
            "id": 1,
            "action": f"Process context: {context[:30]}",
            "tool_name": "none",
            "tool_input": {},
            "completed": False
        },
        {
            "id": 2,
            "action": "Execute calendar lookup",
            "tool_name": "calendar_add",
            "tool_input": {"title": "Team Sync", "time": "Tomorrow 10am"},
            "completed": False
        }
    ]
    return {
        "plan": mock_plan,
        "actions_taken": [{"agent": "planner", "action": "created_fallback_plan"}]
    }

def should_execute_next(state: dict) -> str:
    """Routing logic: determine if there's a step to run, or if we are done."""
    plan = state.get("plan", [])
    if not plan:
        return "synthesize"
        
    for step in plan:
        if not step.get("completed"):
            return "executor"
            
    return "synthesize"
