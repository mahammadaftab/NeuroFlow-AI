from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

router = APIRouter(prefix="/workflows", tags=["workflows"])

class WorkflowRequest(BaseModel):
    user_input: str
    session_id: Optional[str] = None

class WorkflowResponse(BaseModel):
    status: str
    result: str
    actions_taken: List[Dict[str, Any]] = []

from agents.orchestrator import app as agent_orchestrator

@router.post("/execute", response_model=WorkflowResponse)
async def execute_workflow(request: WorkflowRequest):
    """
    Accepts natural language user input and triggers the orchestrator agent 
    to interpret the intent, decompose it, and execute it via sub-agents.
    """
    try:
        # Initialize the state for the LangGraph
        initial_state = {
            "user_input": request.user_input,
            "session_id": request.session_id,
            "plan": [],
            "actions_taken": [{"agent": "system", "action": "initialized"}]
        }
        
        # Invoke the multi-agent graph
        final_state = agent_orchestrator.invoke(initial_state)
        
        return WorkflowResponse(
            status="success",
            result=final_state.get("final_response", "No response generated."),
            actions_taken=final_state.get("actions_taken", [])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
