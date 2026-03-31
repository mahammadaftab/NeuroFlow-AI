import React from 'react'
import GlassPanel from './components/common/GlassPanel'
import AgentGraph from './components/Dashboard/AgentGraph'
import DragDropPlanner from './components/Dashboard/DragDropPlanner'
import CalendarWidget from './components/Dashboard/CalendarWidget'
import ChatInterface from './components/Chat/ChatInterface'
import MemoryViewer from './components/Features/MemoryViewer'
import PredictiveInsights from './components/Features/PredictiveInsights'
import AIDebateSystem from './components/Features/AIDebateSystem'
import ExplainMyDay from './components/Features/ExplainMyDay'
import AutoFollowUps from './components/Features/AutoFollowUps'
import { Hexagon } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen text-white p-4 md:p-8 flex flex-col max-w-[1600px] mx-auto gap-6">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/50">
            <Hexagon className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider uppercase font-mono bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
            NeuroFlow <span className="text-white text-sm">Dashboard</span>
          </h1>
        </div>
        
        {/* Mock Autonomous Mode Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-semibold uppercase tracking-widest">Autonomous Mode</span>
          <div className="w-12 h-6 bg-green-500/20 rounded-full border border-green-500/50 p-1 flex items-center justify-end shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer">
            <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg" />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-140px)] relative pb-10">
        <AIDebateSystem />
        
        {/* Left Column: Command & Intelligence Data */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-none">
             <div className="flex flex-col gap-6">
                 <AgentGraph />
                 <MemoryViewer />
             </div>
             <div className="flex flex-col gap-4">
               <PredictiveInsights />
               <ExplainMyDay />
               <AutoFollowUps />
             </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
             <GlassPanel className="p-4 flex-1">
                <DragDropPlanner />
             </GlassPanel>
             <div className="flex-1">
                <CalendarWidget />
             </div>
          </div>
        </div>

        {/* Right Column: Interaction */}
        <div className="lg:col-span-4 h-[calc(100vh-140px)] sticky top-6">
           <ChatInterface />
        </div>

      </main>

    </div>
  )
}

export default App
