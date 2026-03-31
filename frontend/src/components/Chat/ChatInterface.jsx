import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'
import { Send, Mic, TerminalSquare, Zap, Cpu } from 'lucide-react'
import GlassPanel from '../common/GlassPanel'

export default function ChatInterface() {
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  
  const { 
    messages, addMessage, isThinking, setThinking, activeAgent, setActiveAgent, 
    addTasks, updateTaskStatus, showLogs, toggleLogs, agentLogs, logAction,
    isAutonomous, toggleAutonomous
  } = useAgentStore()
  const scrollRef = useRef(null)
  const logsRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight
  }, [messages, isThinking, agentLogs, showLogs])

  // Mock submission hook simulating the API integration for UI dev
  const handleSend = async (e) => {
    e.preventDefault()
    if(!input.trim()) return
    const userMsg = input
    setInput('')
    
    addMessage({ id: Date.now(), role: 'user', content: userMsg })
    setThinking(true)
    setActiveAgent('orchestrator')
    logAction({ source: "orchestrator", timestamp: Date.now(), log: `Received intent: "${userMsg}"` })
    
    // Simulate API delay passing through agents
    setTimeout(() => {
      setActiveAgent('planner')
      logAction({ source: "planner", timestamp: Date.now(), log: `Decomposing DAG nodes.` })
    }, 1000)
    
    setTimeout(() => {
      // Mock generated plan
      addTasks([
        { id: 101, action: "Decompose user intent", status: 'completed' },
        { id: 102, action: "Search calendar for availability", status: 'in_progress' }
      ])
      setActiveAgent('executor')
    }, 2500)

    setTimeout(() => {
      updateTaskStatus(102, 'completed')
      addTasks([{ id: 103, action: "Draft confirmation email", status: 'in_progress' }])
    }, 4500)

    setTimeout(() => {
      updateTaskStatus(103, 'completed')
      setActiveAgent('memory')
    }, 6000)

    setTimeout(() => {
      setThinking(false)
      setActiveAgent(null)
      addMessage({ id: Date.now(), role: 'ai', content: `I have optimized your required action for: "${userMsg}". Check the timeline.` })
      
      // Voice feedback simulation
      if ('speechSynthesis' in window) {
         const utterance = new SpeechSynthesisUtterance("Action completed successfully.")
         window.speechSynthesis.speak(utterance)
      }
    }, 7500)
  }

  const toggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Your browser does not support the Web Speech API.")
      return
    }

    if (isListening) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }
    
    recognition.onerror = (e) => {
      console.error("Voice recognition error", e)
      setIsListening(false)
    }
    
    recognition.onend = () => setIsListening(false)

    recognition.start()
  }

  return (
    <GlassPanel className="flex flex-col h-full !p-0 relative overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center z-10 relative">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          AI Control Link
        </h2>
        <button onClick={toggleLogs} className={`p-2 rounded-lg transition-colors ${showLogs ? 'bg-[var(--color-neuro-accent)] text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
           <TerminalSquare className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {showLogs && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '40%' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[64px] left-0 right-0 bg-black/90 border-b border-[var(--color-neuro-accent)] z-20 font-mono text-[10px] text-green-400 p-2 overflow-y-auto"
            ref={logsRef}
          >
             {agentLogs.map((log, i) => (
                <div key={i} className="mb-1 opacity-80">
                   <span className="text-gray-500">[{new Date(log.timestamp).toISOString().split('T')[1].slice(0,-1)}]</span> 
                   <span className="text-fuchsia-400 mx-2 uppercase">[{log.source}]</span> 
                   {log.log}
                </div>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10" ref={scrollRef}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-[var(--color-neuro-accent)] text-white rounded-br-none' 
                : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isThinking && activeAgent && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-2 p-4 bg-[var(--color-neuro-panel)] border border-[var(--color-neuro-accent)]/30 rounded-2xl rounded-bl-none shadow-[0_0_20px_rgba(59,130,246,0.2)] ml-4 max-w-[85%]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-neuro-accent)]">Live AI Thinking...</span>
            </div>
            
            <div className="flex flex-col gap-1 mt-2 text-sm text-gray-300 font-mono">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: activeAgent === 'orchestrator' ? 1 : 0.5, x: 0 }} className={activeAgent === 'orchestrator' ? 'text-white font-bold' : ''}>
                 &gt; [Orchestrator] AI analyzing your request...
              </motion.div>
              {['planner', 'executor', 'memory'].includes(activeAgent) && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: activeAgent === 'planner' ? 1 : 0.5, x: 0 }} className={activeAgent === 'planner' ? 'text-[var(--color-neuro-glow)] font-bold' : ''}>
                  &gt; [Planner] Generating optimal plan...
                </motion.div>
              )}
              {['executor', 'memory'].includes(activeAgent) && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: activeAgent === 'executor' ? 1 : 0.5, x: 0 }} className={activeAgent === 'executor' ? 'text-green-400 font-bold' : ''}>
                  &gt; [Executor] Performing actions via MCP APIs...
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-3 border-t border-white/10 bg-black/40 flex justify-between items-center text-xs text-gray-400">
         <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span className="uppercase font-bold tracking-widest text-[10px] text-gray-500">Autonomous Mode</span>
            <button 
              onClick={toggleAutonomous}
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${isAutonomous ? 'bg-orange-500' : 'bg-gray-700'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isAutonomous ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
         </div>
         {isAutonomous && <span className="text-[9px] uppercase font-bold text-orange-500 animate-pulse flex items-center gap-1"><Zap className="w-3 h-3"/> No Manual Steps</span>}
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <form onSubmit={handleSend} className="relative flex items-center group">
          <button type="button" onClick={toggleVoice} disabled={isListening} className={`absolute left-3 transition-all hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.4)] rounded-full p-1 ${isListening ? 'text-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'text-gray-400 hover:text-white'}`}>
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isThinking}
            placeholder={isListening ? "Listening... Speak now" : isThinking ? "Executing workflow..." : "Try: 'Handle my day'..."}
            className={`w-full bg-white/5 border rounded-full py-3 pl-12 pr-12 focus:outline-none transition-all text-sm ${isAutonomous ? 'border-orange-500/30 focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'border-white/10 focus:border-[var(--color-neuro-accent)] focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}
          />
          <button type="submit" disabled={isThinking || !input.trim()} className={`absolute right-2 p-2 rounded-full transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none ${isAutonomous ? 'text-orange-400 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] disabled:hover:text-orange-400' : 'text-[var(--color-neuro-accent)] hover:bg-[var(--color-neuro-accent)] hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] disabled:hover:text-[var(--color-neuro-accent)]'}`}>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </GlassPanel>
  )
}
