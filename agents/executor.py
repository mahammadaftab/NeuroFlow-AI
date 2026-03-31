def executor_node(state: dict):
    """
    The Executor Agent:
    Finds the first uncompleted step in the plan and executes it using tools.
    """
    plan = state.get("plan", [])
    current_step = None
    
    # Find next uncompleted step
    for step in plan:
        if not step.get("completed"):
            current_step = step
            break
            
    if not current_step:
        return {"error": "No uncompleted steps found."}
        
    print(f"--> Executor Node executing step {current_step['id']}: {current_step['action']}")
    
    # MOCK EXECUTION logic
    if current_step.get("tool_name") == "mock_tool":
        result = f"Mock tool execution successful for input: {current_step.get('tool_input')}"
    else:
        result = "No tool needed, purely cognitive step."
        
    # Mark step as completed in a new plan object
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
            "action": f"executed_step_{current_step['id']}", 
            "result": result
        }]
    }
