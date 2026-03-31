import React from 'react'
import GlassPanel from './components/common/GlassPanel'
import AgentGraph from './components/Dashboard/AgentGraph'
import WorkflowTimeline from './components/Dashboard/WorkflowTimeline'
import ChatInterface from './components/Chat/ChatInterface'
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
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
        
        {/* Left Column: Command & Orchestration */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <GlassPanel className="flex-none p-6">
             <h2 className="text-lg font-semibold mb-4 text-gray-200">System Architecture Hook</h2>
             <AgentGraph />
          </GlassPanel>
          
          <GlassPanel className="flex-1 overflow-y-auto">
             <WorkflowTimeline />
          </GlassPanel>
        </div>

        {/* Right Column: Interaction */}
        <div className="lg:col-span-4 h-full">
           <ChatInterface />
        </div>

      </main>

    </div>
  )
}

export default App
