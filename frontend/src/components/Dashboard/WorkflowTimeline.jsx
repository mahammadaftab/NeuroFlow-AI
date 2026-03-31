import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'
import { CheckCircle, Circle, PlayCircle } from 'lucide-react'

export default function WorkflowTimeline() {
  const tasks = useAgentStore(state => state.tasks)

  return (
    <div className="flex flex-col gap-4 mt-6">
      <h3 className="text-sm tracking-widest font-bold uppercase text-gray-400 mb-2">Workflow Execution</h3>
      
      {tasks.length === 0 && (
        <div className="text-gray-600 text-sm italic">No active workflows. Give me a command...</div>
      )}

      <AnimatePresence>
        {tasks.map((task, index) => {
          const isComplete = task.status === 'completed'
          const inProgress = task.status === 'in_progress'
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 relative"
            >
              <div className="relative z-10 bg-[var(--color-neuro-bg)]">
                {isComplete ? (
                  <CheckCircle className="text-green-400 w-5 h-5 shadow-[0_0_10px_rgba(74,222,128,0.5)] rounded-full" />
                ) : inProgress ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                    <PlayCircle className="text-[var(--color-neuro-accent)] w-5 h-5" />
                  </motion.div>
                ) : (
                   <Circle className="text-gray-600 w-5 h-5" />
                )}
              </div>
              
              <div className={`text-sm py-2 px-4 rounded-lg flex-1 border ${isComplete ? 'bg-green-500/10 border-green-500/20 text-gray-300' : inProgress ? 'bg-blue-500/10 border-blue-500/40 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                {task.action}
              </div>

              {/* Connecting Line */}
              {index < tasks.length - 1 && (
                <div className="absolute left-[9px] top-6 w-[2px] h-full bg-gray-800 -z-0" />
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
