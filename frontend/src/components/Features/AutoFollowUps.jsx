import React from 'react'
import GlassPanel from '../common/GlassPanel'
import { Send, Clock } from 'lucide-react'

export default function AutoFollowUps() {
  return (
    <GlassPanel className="p-4 border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
      <h3 className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-3 flex items-center gap-2">
         <Send className="w-4 h-4" /> Smart Auto-Follow-ups
      </h3>
      
      <div className="flex flex-col gap-2">
         <div className="p-2 border border-white/5 rounded-lg bg-emerald-500/5 flex justify-between items-center group">
            <span className="text-xs text-gray-300">Meeting done &rarr; <span className="text-emerald-300 font-semibold group-hover:text-emerald-200">AI sends summary</span></span>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
         </div>
         <div className="p-2 border border-white/5 rounded-lg bg-orange-500/5 flex justify-between items-center group">
            <span className="text-xs text-gray-300">Task pending &rarr; <span className="text-orange-300 font-semibold group-hover:text-orange-200">AI reminds</span></span>
            <Clock className="w-3 h-3 text-orange-500 animate-pulse" />
         </div>
      </div>
    </GlassPanel>
  )
}
