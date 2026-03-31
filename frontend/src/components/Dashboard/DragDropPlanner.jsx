import React from 'react'
import { Reorder, motion } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'
import { CheckCircle, PlayCircle, GripVertical } from 'lucide-react'

export default function DragDropPlanner() {
  const { tasks, reorderTasks } = useAgentStore()

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-sm tracking-widest font-bold uppercase text-gray-400 mb-2">Workflow Execution</h3>
        <div className="text-gray-600 text-sm italic">No active workflows to plan. Give me a command...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 mt-6 w-full relative">
      <div className="flex justify-between items-center mb-2">
         <h3 className="text-sm tracking-widest font-bold uppercase text-gray-400">Collaborative Planning</h3>
         <span className="text-xs text-[var(--color-neuro-accent)] animate-pulse bg-blue-500/10 px-2 py-1 rounded">Draggable Timeline</span>
      </div>

      <Reorder.Group axis="y" values={tasks} onReorder={reorderTasks} className="space-y-4">
        {tasks.map((task, index) => {
          const isComplete = task.status === 'completed'
          const inProgress = task.status === 'in_progress'
          
          return (
            <Reorder.Item
              key={task.id}
              value={task}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              whileDrag={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
              className="flex items-center gap-4 relative bg-[var(--color-neuro-bg)] cursor-grab active:cursor-grabbing hover:bg-white/5 p-2 rounded-xl border border-transparent transition-colors"
            >
              <div className="text-gray-500">
                <GripVertical className="w-5 h-5" />
              </div>

              <div className="relative z-10 flex-none bg-[var(--color-neuro-bg)] rounded-full">
                {isComplete ? (
                  <CheckCircle className="text-green-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                ) : inProgress ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                    <PlayCircle className="text-[var(--color-neuro-accent)] w-6 h-6" />
                  </motion.div>
                ) : (
                   <div className="w-6 h-6 rounded-full border-[3px] border-gray-600 shadow-inner" />
                )}
              </div>
              
              <div className={`text-sm py-3 px-5 rounded-xl flex-1 border transition-all duration-500 relative overflow-hidden ${isComplete ? 'bg-green-500/10 border-green-500/40 text-gray-200 shadow-[0_0_20px_rgba(74,222,128,0.1)]' : inProgress ? 'bg-blue-500/10 border-[var(--color-neuro-accent)] text-blue-50 shadow-[0_0_25px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                {/* Status Indicator text requested by prompt */}
                <div className="absolute top-0 right-0 px-2 py-0.5 text-[9px] uppercase font-bold rounded-bl-lg bg-black/40">
                   {isComplete ? <span className="text-green-400">Completed</span> : inProgress ? <span className="text-blue-400 animate-pulse">In Progress</span> : <span className="text-gray-500">Planned</span>}
                </div>
                
                {/* Dynamic Progress Bar Glow */}
                {inProgress && (
                  <motion.div 
                    initial={{ width: "0%" }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-neuro-accent)] to-transparent" 
                  />
                )}
                
                {task.action}
              </div>

            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </div>
  )
}
