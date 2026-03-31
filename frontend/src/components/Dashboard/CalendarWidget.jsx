import React from 'react'
import GlassPanel from '../common/GlassPanel'
import { CalendarIcon, Clock } from 'lucide-react'

// Dummy current week structure
const hours = ["9 AM", "11 AM", "2 PM", "4 PM"]
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

export default function CalendarWidget() {
  return (
    <GlassPanel className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-300 flex items-center gap-2">
           <CalendarIcon className="w-4 h-4 text-violet-400" /> Schedule Grid
        </h3>
        <span className="text-xs text-gray-500">Auto-Synced</span>
      </div>
      
      <div className="grid grid-cols-6 gap-2 text-xs">
         <div className="col-span-1"></div>
         {days.map(d => <div key={d} className="text-center font-semibold text-gray-500">{d}</div>)}
         
         {hours.map((h, i) => (
            <React.Fragment key={h}>
               <div className="text-right pr-2 text-gray-600 flex items-center justify-end"><Clock className="w-3 h-3 mr-1"/>{h}</div>
               {days.map((d, j) => {
                  const hasEvent = (i === 1 && j === 2) || (i === 3 && j === 0)
                  return (
                      <div key={d+h} className={`h-8 rounded md:h-10 border border-white/5 ${hasEvent ? 'bg-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]' : 'bg-black/20 hover:bg-white/5 transition-colors cursor-pointer'}`}>
                         {hasEvent && <div className="w-full h-full flex items-center justify-center text-[10px] text-violet-200">Synced</div>}
                      </div>
                  )
               })}
            </React.Fragment>
         ))}
      </div>
    </GlassPanel>
  )
}
