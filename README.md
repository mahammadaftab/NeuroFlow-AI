# NeuroFlow AI – Autonomous Multi-Agent System 🚀

In today’s fast-paced digital environment, individuals and teams rely on multiple disconnected tools—such as calendars, task managers, emails, and notes—to manage their daily workflows. However, these systems lack intelligence, coordination, and autonomy, forcing users to manually plan, prioritize, and execute tasks.

**NeuroFlow AI** is an advanced multi-agent AI system that acts as an intelligent assistant capable of understanding user intent, planning complex workflows, coordinating multiple tools, and autonomously executing tasks.

## 🎯 Objective
An API-driven multi-agent AI platform built to:
- **Interpret** natural language inputs.
- **Decompose** complex goals into structured workflows.
- **Coordinate** multiple specialized AI agents and tools.
- **Execute** multi-step tasks autonomously.
- **Learn** from user behavior and improve over time.

---

## 🏗️ System Architecture

Our solution breaks away from isolated, reactive tools by implementing a *Think → Plan → Decide → Act → Learn* pipeline via specialized sub-agents orchestrated by **LangGraph**.

### The Agent Swarm
1. **🧠 Orchestrator Agent**: The central routing brain.
2. **📋 Planner Agent**: Breaks down user goals into actionable DAG nodes.
3. **⚙️ Execution Agent**: Executes tasks using external tools (via mocked MCP integrations).
4. **💾 Memory Agent**: Stores and retrieves contextual historical data (RAG-based Digital Twin).

### The UI/UX Dashboard (The Winning Layer)
Built with **Vite, React, Tailwind CSS V4, and Framer Motion**, the frontend acts as the AI Command Center, featuring:
- **Live Agent Thinking Visualization**: Real-time terminal logs mapping Agent logic.
- **Interactive Drag & Drop Planner**: Human + AI collaborative timeline curation.
- **AI Debate System**: Split-screen adversarial reasoning visualization.
- **Predictive Intelligence Widgets**: Deep UI integration of Digital Twin emotion modeling.

---

## 💻 Tech Stack
- **Backend**: Python 3.11+, FastAPI, LangGraph, LangChain, SQLAlchemy, ChromaDB (Optional Vector Store)
- **Frontend**: React 18 (Vite), Tailwind CSS (Dark Mode/Glassmorphism theme), Zustand (State), Framer Motion (Animations), Lucide React (Icons).

---

## 🚀 Getting Started Locally

To run the full stack architecture locally for development or demo purposes, follow these steps:

### 1. Start the API Backend
```bash
# Create and activate a virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1   # (Windows)
source venv/bin/activate      # (Mac/Linux)

# Install dependencies
pip install fastapi uvicorn pydantic pydantic-settings python-dotenv langchain-core langgraph langchain-openai sqlalchemy

# Run the backend server
python -m uvicorn api.main:app --reload --port 8000
```
*The API will be available at `http://localhost:8000/api/v1/workflows/execute`*

### 2. Start the Advanced Dashboard Frontend
```bash
# Open a new terminal instance
cd frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```
*The Dashboard will be live at `http://localhost:5173`*

---

> **Hackathon Impact Statement:** Delivering a highly innovative, production-grade solution featuring AI-driven orchestration, autonomous workflow execution, and proactive assistance that goes far beyond conventional task management systems.
