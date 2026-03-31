from typing import Any, Dict

def mock_calendar_tool(tool_input: Dict[str, Any]) -> str:
    """Invoked when the user asks to schedule something."""
    title = tool_input.get("title", "New Event")
    time = tool_input.get("time", "TBD")
    return f"Successfully scheduled '{title}' at {time} in Mock Calendar."

def mock_email_tool(tool_input: Dict[str, Any]) -> str:
    """Invoked when the user wants to send an email."""
    to = tool_input.get("to", "unknown@example.com")
    return f"Successfully sent email to {to}."

# Registry of tools that Planner Agent can select, and Executor Agent can run
TOOLS_REGISTRY = {
    "calendar_add": mock_calendar_tool,
    "email_send": mock_email_tool
}
