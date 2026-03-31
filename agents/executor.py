from tools.builtin_tools import TOOLS_REGISTRY

def executor_node(state: dict):
    """
    The Executor Agent:
    Finds the first uncompleted step in the plan and executes it using tools based on the LLM's payload choice.
    """
    plan = state.get("plan", [])
    current_step = None
    
    # Find next uncompleted step
    for step in plan:
        if not step.get("completed"):
            current_step = step
            break
            
    if not current_step:
        return {"error": "No uncompleted steps found. Final synthesizer check failed."}
        
    action_name = current_step.get("action", "Unknown action")
    tool_name = current_step.get("tool_name", "none")
    tool_input = current_step.get("tool_input", {})
    
    print(f"--> Executor Node analyzing step {current_step['id']}: [{action_name}] -> Triggering Tool: [{tool_name}]")
    
    # LIVE EXECUTION LOGIC
    result = "Standard cognitive step processed."
    
    if tool_name in TOOLS_REGISTRY:
        try:
            # We fetch the official @tool object and invoke it
            live_tool = TOOLS_REGISTRY[tool_name]
            result = live_tool.invoke(tool_input)
            print(f"   => Live Tool Output: {result}")
        except Exception as e:
            result = f"Tool Execution Failed: {str(e)}"
            print(f"   => Live Tool Error: {result}")
    elif tool_name != "none":
         result = f"Tool '{tool_name}' not found in registry."
        
    # Mark step as completed in a new plan object for LangGraph
    new_plan = []
    for step in plan:
        if step["id"] == current_step["id"]:
            updated_step = dict(step)
            updated_step["completed"] = True
            updated_step["result"] = result
            new_plan.append(updated_step)
        else:
            new_plan.append(step)
            
    return {
        "plan": new_plan,
        "actions_taken": [{
            "agent": "executor", 
            "action": f"executed_step_{current_step['id']}_{tool_name}", 
            "result": result
        }]
    }
