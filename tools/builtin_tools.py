from typing import Any, Dict
from langchain_core.tools import tool

@tool
def calendar_add(title: str, time: str) -> str:
    """Invoked when the user asks to schedule something. 
    Args:
        title (str): The name of the event
        time (str): The time or date of the event
    """
    return f"Successfully scheduled '{title}' at {time} in Calendar Integration."

@tool
def email_send(to_email: str, subject: str, body: str) -> str:
    """Invoked when the user wants to send an email.
    Args:
        to_email (str): The recipient email address
        subject (str): The subject of the email
        body (str): The body content of the email
    """
    return f"Successfully sent email to {to_email} with subject '{subject}'."

@tool
def note_taker(content: str) -> str:
    """Invoked to take down important notes or memoizations for the user.
    Args:
        content (str): The structured content of the note
    """
    return f"Note saved: {content[:30]}..."

# Registry of tools that the Executor Agent can run
TOOLS_LIST = [calendar_add, email_send, note_taker]
TOOLS_REGISTRY = {tool.name: tool for tool in TOOLS_LIST}
