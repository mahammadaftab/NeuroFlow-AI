import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAgentStore } from '../../store/agentStore'
import { Send, Mic } from 'lucide-react'
import GlassPanel from '../common/GlassPanel'

export default function ChatInterface() {
  const [input, setInput] = useState('')
  const { messages, addMessage, isThinking, setThinking, setActiveAgent, addTasks, updateTaskStatus } = useAgentStore()
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isThinking])

  // Mock submission hook simulating the API integration for UI dev
  const handleSend = async (e) => {
    e.preventDefault()
    if(!input.trim()) return
    const userMsg = input
    setInput('')
    
    addMessage({ id: Date.now(), role: 'user', content: userMsg })
    setThinking(true)
    setActiveAgent('orchestrator')
    
    // Simulate API delay passing through agents
    setTimeout(() => setActiveAgent('planner'), 1000)
    
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
    // Mock web speech recognition trigger
    alert("Voice recognition activated. (Mocked for Demo)")
  }

  return (
    <GlassPanel className="flex flex-col h-full !p-0">
      <div className="p-4 border-b border-white/10 bg-black/40">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          AI Control Link
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
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

        {isThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 items-center p-3 text-gray-500 text-sm">
             <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
             <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
             <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             <span className="ml-2 font-mono text-xs text-[var(--color-neuro-glow)]">Synthesizing...</span>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <form onSubmit={handleSend} className="relative flex items-center">
          <button type="button" onClick={toggleVoice} className="absolute left-3 text-gray-400 hover:text-white transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isThinking}
            placeholder={isThinking ? "Executing workflow..." : "Command NeuroFlow..."}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-12 focus:outline-none focus:border-[var(--color-neuro-accent)] transition-colors text-sm"
          />
          <button type="submit" disabled={isThinking || !input.trim()} className="absolute right-3 text-[var(--color-neuro-accent)] hover:text-blue-400 disabled:opacity-50">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </GlassPanel>
  )
}
