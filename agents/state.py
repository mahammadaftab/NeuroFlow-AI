from typing import TypedDict, Annotated, List, Any, Optional
import operator
from pydantic import BaseModel

class PlanStep(BaseModel):
    id: int
    action: str
    tool_name: Optional[str] = None
    tool_input: Optional[dict] = None
    completed: bool = False
    result: Optional[str] = None

class AgentState(TypedDict):
    """
    The state structure passed across the LangGraph nodes.
    """
    user_input: str
    session_id: Optional[str]
    plan: Optional[List[PlanStep]]  # Current working plan
    current_step_id: Optional[int]  # Which step is being executed
    final_response: Optional[str]   # The synthesized response to return
    actions_taken: Annotated[List[dict], operator.add]  # Append-only log of actions
    error: Optional[str]
