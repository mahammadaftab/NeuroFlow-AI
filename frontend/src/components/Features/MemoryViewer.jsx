import React from 'react'
import GlassPanel from '../common/GlassPanel'
import { BrainCircuit, Fingerprint, Activity } from 'lucide-react'

export default function MemoryViewer() {
  return (
    <GlassPanel className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
         <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-emerald-400" /> Digital Twin <span className="text-[10px] text-gray-500">(NEXT LEVEL)</span>
         </h3>
         <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] uppercase font-bold tracking-widest animate-pulse">Syncing & Simulating</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex flex-col gap-1 hover:border-emerald-500/30 transition-all">
           <span className="text-[10px] uppercase text-emerald-400 font-bold flex items-center gap-1"><BrainCircuit className="w-3 h-3"/> AI Prediction Engine</span>
           <span className="text-xs text-gray-200">Behavior modeled. Simulating decisions for optimal workflow outcomes.</span>
        </div>
        <div className="p-3 bg-black/40 rounded-xl border border-red-500/20 flex flex-col gap-1 hover:border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all relative overflow-hidden">
           <div className="absolute top-0 right-0 px-2 py-1 text-[8px] bg-red-500/20 text-red-300 font-bold uppercase rounded-bl-lg">Emotion-Aware</div>
           <span className="text-[10px] uppercase text-red-400 font-bold flex items-center gap-1 mt-2"><Activity className="w-3 h-3 animate-pulse"/> Tonal Analysis</span>
           <span className="text-xs text-gray-200 border-l-2 border-red-500/50 pl-2">Stress detected. Suggesting breaks and optimizing schedule.</span>
        </div>
      </div>
    </GlassPanel>
  )
}
