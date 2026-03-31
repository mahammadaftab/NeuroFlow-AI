import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const GlassPanel = React.forwardRef(({ className, children, animate = false, ...props }, ref) => {
  const Comp = animate ? motion.div : 'div'
  
  return (
    <Comp
      ref={ref}
      className={cn(
        "glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
GlassPanel.displayName = 'GlassPanel'

export default GlassPanel
