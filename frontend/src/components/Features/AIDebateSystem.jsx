import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'
import { SplitSquareHorizontal, CheckCircle2, XCircle } from 'lucide-react'

export default function AIDebateSystem() {
  const { isDebating, setDebating } = useAgentStore()

  return (
    <AnimatePresence>
      {isDebating && (
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
               <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <SplitSquareHorizontal className="w-5 h-5 text-fuchsia-400" />
                 AI Strategy Debate Engine
               </h2>
               <button onClick={() => setDebating(false)} className="text-gray-400 hover:text-white transition-colors">
                 <XCircle className="w-6 h-6" />
               </button>
            </div>

            <div className="grid grid-cols-2 p-6 gap-6 h-[400px]">
              {/* Plan A Node */}
              <div className="flex flex-col gap-4 p-6 bg-blue-900/10 border border-blue-500/30 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 rounded-bl-lg">Alpha Agent</div>
                <h3 className="font-bold text-blue-300">Strategy A: Immediate Execution</h3>
                <ul className="text-sm text-gray-300 space-y-2 list-disc pl-4 flex-1">
                   <li>Push meetings to 10 AM.</li>
                   <li>Maximizes contiguous focus blocks.</li>
                   <li>Risk: Delays client response.</li>
                </ul>
                <div className="mt-auto pt-4 border-t border-blue-500/20">
                   <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Evaluating probability... 78%
                   </span>
                </div>
              </div>

              {/* Plan B Node */}
              <div className="flex flex-col gap-4 p-6 bg-fuchsia-900/10 border border-fuchsia-500/30 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] uppercase font-bold text-fuchsia-400 bg-fuchsia-500/10 rounded-bl-lg">Beta Agent</div>
                <h3 className="font-bold text-fuchsia-300">Strategy B: Phased Approach</h3>
                <ul className="text-sm text-gray-300 space-y-2 list-disc pl-4 flex-1">
                   <li>Immediate client response.</li>
                   <li>Break focus blocks into 45m chunks.</li>
                   <li>Optimizes for external stakeholder satisfaction.</li>
                </ul>
                <div className="mt-auto pt-4 border-t border-fuchsia-500/20 flex justify-between items-center">
                   <span className="text-xs font-mono text-gray-400 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-fuchsia-500 max-w-min shadow-[0_0_10px_var(--color-neuro-glow)]" /> Selected Path
                   </span>
                   <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-black/40 text-center text-sm text-gray-400 border-t border-white/5">
              Consensus reached in 1.2s. Executing Strategy B based on historical user satisfaction rates.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
