import React from 'react'
import { useAgentStore } from '../../store/agentStore'
import GlassPanel from '../common/GlassPanel'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function PredictiveInsights() {
  const { setDebating } = useAgentStore()

  return (
    <GlassPanel className="p-4 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/5 hover:from-indigo-500/20 transition-all cursor-pointer group" onClick={() => setDebating(true)}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 group-hover:animate-bounce">
           <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
           <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-1">Proactive Intelligence</h3>
           <p className="text-sm text-gray-300 leading-relaxed">
             You typically schedule a gym session at 7 PM on Tuesdays. I've noted an open block and prepared a draft schedule.
           </p>
           <button className="mt-3 text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1 hover:text-indigo-300">
             View Debate Reasoning <ArrowRight className="w-3 h-3" />
           </button>
        </div>
      </div>
    </GlassPanel>
  )
}
