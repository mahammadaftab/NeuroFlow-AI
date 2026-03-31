import React from 'react'
import { motion } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'
import { Brain, Calendar, Database, Activity } from 'lucide-react'

const nodes = [
  { id: 'orchestrator', title: 'Orchestrator', icon: Brain, x: '50%', y: '10%' },
  { id: 'planner', title: 'Planner', icon: Activity, x: '25%', y: '40%' },
  { id: 'memory', title: 'Memory (RAG)', icon: Database, x: '75%', y: '40%' },
  { id: 'executor', title: 'Executor', icon: Calendar, x: '50%', y: '80%' },
]

export default function AgentGraph() {
  const activeAgent = useAgentStore(state => state.activeAgent)

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center bg-black/20 rounded-xl overflow-hidden border border-white/5">
      {/* Edges (SVG Lines) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-neuro-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-neuro-glow)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Simplified connecting lines */}
        <motion.line x1="50%" y1="10%" x2="25%" y2="40%" stroke="url(#glow)" strokeWidth="2" strokeDasharray="5"
          animate={{ strokeDashoffset: activeAgent === 'planner' ? [0, -20] : 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.line x1="50%" y1="10%" x2="75%" y2="40%" stroke="url(#glow)" strokeWidth="2" strokeDasharray="5"
          animate={{ strokeDashoffset: activeAgent === 'memory' ? [0, -20] : 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.line x1="25%" y1="40%" x2="50%" y2="80%" stroke="url(#glow)" strokeWidth="2" strokeDasharray="5"
          animate={{ strokeDashoffset: activeAgent === 'executor' ? [0, -20] : 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = activeAgent === node.id
        return (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center justify-center shadow-lg"
            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
            animate={isActive ? { scale: 1.1, textShadow: "0 0 8px rgba(139, 92, 246, 0.8)" } : { scale: 1 }}
          >
            <div className={`p-4 rounded-full bg-gray-900 border ${isActive ? 'border-[var(--color-neuro-glow)] shadow-[0_0_15px_var(--color-neuro-glow)]' : 'border-gray-700'}`}>
               <node.icon className={`w-6 h-6 ${isActive ? 'text-[var(--color-neuro-glow)]' : 'text-gray-400'}`} />
            </div>
            <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-300">{node.title}</span>
          </motion.div>
        )
      })}
    </div>
  )
}
