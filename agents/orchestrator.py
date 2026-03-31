from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, List, Any, Optional
import operator

# State definition
class AgentState(TypedDict):
    user_input: str
    session_id: Optional[str]
    plan: Optional[List[dict]]
    final_response: Optional[str]
    actions_taken: Annotated[List[dict], operator.add]
    error: Optional[str]

from agents.planner import plan_node, should_execute_next
from agents.executor import executor_node

def synthesize_node(state: AgentState):
    """
    Final node that summarizes the work done by the agents and 
    generates the human readable response.
    """
    print("--> Synthesize Node assembling response")
    plan = state.get("plan", [])
    
    # Placeholder LLM call to synthesize
    return {
        "final_response": f"Successfully planned and executed your request: {state['user_input']}",
        "actions_taken": [{"agent": "synthesizer", "action": "generated_response"}]
    }

def decide_next(state: AgentState):
    """Router logic"""
    plan = state.get("plan", [])
    if not plan:
        return "synthesize"
    
    for step in plan:
        if not step.get("completed"):
            return "executor"
            
    return "synthesize"

# Define the Graph
workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("planner", plan_node)
workflow.add_node("executor", executor_node)
workflow.add_node("synthesize", synthesize_node)

# Add Edges
workflow.set_entry_point("planner")
workflow.add_conditional_edges(
    "planner",
    decide_next,
    {
        "executor": "executor",
        "synthesize": "synthesize"
    }
)
workflow.add_conditional_edges(
    "executor",
    decide_next,
    {
        "executor": "executor",
        "synthesize": "synthesize"
    }
)
workflow.add_edge("synthesize", END)

# Compile
app = workflow.compile()
