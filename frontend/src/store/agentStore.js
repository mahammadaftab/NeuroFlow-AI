import { create } from 'zustand'

export const useAgentStore = create((set) => ({
  // Data models
  messages: [
    { id: 1, role: 'ai', content: 'NeuroFlow online. How can I optimize your workflow today?' }
  ],
  tasks: [],
  isThinking: false,
  
  // Active Agent state (orchestrator, planner, executor, memory)
  activeAgent: null,
  agentLogs: [
    { source: "system", timestamp: Date.now(), log: "NeuroFlow core initialized." }
  ],
  isDebating: false,
  showLogs: false,
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setThinking: (status) => set({ isThinking: status }),
  setActiveAgent: (agentKey) => set({ activeAgent: agentKey }),
  addTasks: (newTasks) => set((state) => ({ tasks: [...state.tasks, ...newTasks] })),
  reorderTasks: (newOrder) => set({ tasks: newOrder }),
  updateTaskStatus: (taskId, newStatus) => set((state) => ({
    tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
  })),
  logAction: (log) => set((state) => ({ agentLogs: [...state.agentLogs, log] })),
  setDebating: (status) => set({ isDebating: status }),
  toggleLogs: () => set((state) => ({ showLogs: !state.showLogs }))
}))
