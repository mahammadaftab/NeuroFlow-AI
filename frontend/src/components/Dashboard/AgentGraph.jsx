import React from 'react'
import { motion } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'
import { Brain, Calendar, Database, Activity, Wrench, RadioReceiver } from 'lucide-react'

const nodes = [
  { id: 'orchestrator', title: 'Orchestrator', icon: Brain, x: '50%', y: '15%' },
  { id: 'planner', title: 'Planner', icon: Activity, x: '25%', y: '45%' },
  { id: 'memory', title: 'Memory (RAG)', icon: Database, x: '75%', y: '45%' },
  { id: 'executor', title: 'Executor', icon: Calendar, x: '25%', y: '85%' },
  { id: 'tools', title: 'Tools (MCP)', icon: Wrench, x: '75%', y: '85%' },
]

export default function AgentGraph() {
  const activeAgent = useAgentStore(state => state.activeAgent)
  const isThinking = useAgentStore(state => state.isThinking)

  return (
    <div className="relative w-full h-[500px] lg:h-[550px] mt-2 bg-black/20 rounded-xl overflow-hidden border border-white/5 p-4 py-8">
      {/* HUD overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] text-gray-500 font-mono tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full border border-white/10 z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
         <RadioReceiver className="w-3 h-3 text-blue-400" />
         System Architecture Hook: <span className="text-green-400 animate-pulse ml-1">Live</span>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0">
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-neuro-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-neuro-glow)" stopOpacity="0.8" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
        </defs>
        
        {/* Animated Cyber Background Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Sequential Path Drawings (One-to-One Start to End) */}
        {/* Draw Line 1: Orchestrator -> Planner */}
        <motion.line x1="50%" y1="15%" x2="25%" y2="45%" stroke="url(#glow)" strokeWidth="3" 
           strokeDasharray={isThinking ? "10 10" : "none"}
           animate={isThinking ? { pathLength: 1, strokeDashoffset: [0, -50], opacity: 1 } : { pathLength: 0, opacity: 0 }} 
           transition={{ duration: isThinking ? 1 : 0.2, ease: "linear", repeat: isThinking ? Infinity : 0 }} 
        />
        {/* Draw Line 2: Planner -> Memory (Context Lookup) */}
        <motion.line x1="25%" y1="45%" x2="75%" y2="45%" stroke="url(#glow)" strokeWidth="3" 
           strokeDasharray={isThinking ? "10 10" : "none"}
           animate={isThinking ? { pathLength: 1, strokeDashoffset: [0, -50], opacity: 1 } : { pathLength: 0, opacity: 0 }} 
           transition={{ duration: isThinking ? 1 : 0.2, ease: "linear", delay: isThinking ? 0.3 : 0, repeat: isThinking ? Infinity : 0 }} 
        />
        {/* Draw Line 3: Planner -> Executor (Handoff) */}
        <motion.line x1="25%" y1="45%" x2="25%" y2="85%" stroke="url(#glow)" strokeWidth="3" 
           strokeDasharray={isThinking ? "10 10" : "none"}
           animate={isThinking ? { pathLength: 1, strokeDashoffset: [0, -50], opacity: 1 } : { pathLength: 0, opacity: 0 }} 
           transition={{ duration: isThinking ? 1 : 0.2, ease: "linear", delay: isThinking ? 0.6 : 0, repeat: isThinking ? Infinity : 0 }} 
        />
        {/* Draw Line 4: Executor -> Tools (Execution) */}
        <motion.line x1="25%" y1="85%" x2="75%" y2="85%" stroke="url(#glow)" strokeWidth="3" 
           strokeDasharray={isThinking ? "10 10" : "none"}
           animate={isThinking ? { pathLength: 1, strokeDashoffset: [0, -50], opacity: 1 } : { pathLength: 0, opacity: 0 }} 
           transition={{ duration: isThinking ? 1 : 0.2, ease: "linear", delay: isThinking ? 0.9 : 0, repeat: isThinking ? Infinity : 0 }} 
        />

        {/* Faint static background web for visual depth when idle */}
        <motion.line x1="50%" y1="15%" x2="25%" y2="85%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <motion.line x1="75%" y1="45%" x2="50%" y2="15%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </svg>

      {/* Nodes */}
      <div className="relative w-full h-full z-10">
        {nodes.map(node => {
          const isActive = activeAgent === node.id || (node.id === 'tools' && activeAgent === 'executor')
          
          return (
          <motion.div
            key={node.id}
            className={`absolute flex flex-col items-center justify-center shadow-lg transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'} z-10`}
            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
            animate={isActive ? { scale: 1.25, y: [0, -5, 0] } : { scale: 1, y: [0, 5, -5, 0] }}
            transition={isActive ? { duration: 1.5, repeat: Infinity } : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          >
            <div className={`p-4 rounded-full bg-black/80 backdrop-blur border transition-all duration-300 ${isActive ? 'border-[var(--color-neuro-glow)] shadow-[0_0_35px_var(--color-neuro-glow)] bg-violet-900/30' : 'border-gray-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-white/20'}`}>
               <node.icon className={`w-8 h-8 transition-colors duration-300 ${isActive ? 'text-[var(--color-neuro-glow)] drop-shadow-[0_0_10px_var(--color-neuro-glow)]' : 'text-gray-400'}`} />
            </div>
            <span className={`mt-3 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isActive ? 'bg-[var(--color-neuro-glow)]/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-black/40 text-gray-400 border border-white/5'}`}>{node.title}</span>
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}
