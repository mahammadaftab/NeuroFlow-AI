import React from 'react'
import GlassPanel from '../common/GlassPanel'
import { MessageSquareText, Search } from 'lucide-react'

export default function ExplainMyDay() {
  return (
    <GlassPanel className="p-4 bg-gradient-to-br from-blue-900/10 to-transparent">
      <div className="flex items-center gap-3 mb-2">
         <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
           <Search className="w-5 h-5" />
         </div>
         <h3 className="text-sm font-bold text-gray-200 tracking-wider">Explain My Day</h3>
      </div>
      
      <div className="pl-12 relative">
         <div className="absolute left-[20px] top-0 bottom-4 w-px bg-blue-500/20" />
         <div className="relative z-10 p-3 bg-black/40 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-2 mb-1 text-[10px] uppercase font-bold text-blue-400">
               <MessageSquareText className="w-3 h-3" /> System Synthesis
            </div>
            <p className="text-sm text-gray-300">
              "You have 3 high-priority tasks and 2 meetings. I optimized your schedule."
            </p>
         </div>
      </div>
    </GlassPanel>
  )
}
