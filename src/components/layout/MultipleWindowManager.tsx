import { useRef, useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Square, ExternalLink } from 'lucide-react'
import { useMemoryStore } from '../../stores/memoryStore'

interface MultipleWindow {
  id: string
  title: string
  content: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export function MultipleWindowManager() {
  const { activeWindows, setActiveWindow, closeWindow, toggleMinimize, toggleMaximize } = useMemoryStore()
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {Object.entries(activeWindows).map(([id, window]) => {
          if (window.isMinimized) return null
          
          return (
            <MDXWindow
              key={id}
              id={id}
              title={window.title}
              content={window.content}
              position={window.position}
              size={window.size}
              isMaximized={window.isMaximized}
              onClose={() => closeWindow(id)}
              onMinimize={() => toggleMinimize(id)}
              onMaximize={() => toggleMaximize(id)}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

interface MDXWindowProps {
  id: string
  title: string
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMaximized: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

import { WelcomeWindowContent } from '../windows/WelcomeWindowContent'
import { AgentsWindowContent } from '../windows/AgentsWindowContent'
import { SocialProofContent } from '../windows/SocialProofContent'

function MDXWindow({
  id,
  title,
  content,
  position,
  size,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize
}: MDXWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const resizeStartRef = useRef({ x: 0, width: 0 })
  const rafRef = useRef<number | null>(null)
  
  // Track window position
  const { updateWindowPosition } = useMemoryStore()
  
  // Drag functionality (from title bar)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    e.preventDefault()
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }
  
  // Resize functionality (from resize handle) - PostHog pattern
  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    resizeStartRef.current = {
      x: e.clientX,
      width: size.width
    }
    document.body.classList.add('is-resizing')
  }
  
  const handleResizeMove = useCallback((clientX: number) => {
    if (!isResizing || !windowRef.current) return
    
    // Cancel any ongoing animation frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
    }
    
    // Schedule new frame for smooth animation
    rafRef.current = requestAnimationFrame(() => {
      const deltaX = clientX - resizeStartRef.current.x
      const newWidth = Math.min(Math.max(resizeStartRef.current.width + deltaX, 320), window.innerWidth - position.x)
      
      // Apply directly to DOM for smoother animation
      if (windowRef.current) {
        windowRef.current.style.width = `${newWidth}px`
        windowRef.current.style.height = 'auto'
      }
      
      rafRef.current = null
    })
  }, [isResizing, position.x])
  
  const handleResizeEnd = useCallback(() => {
    if (isResizing && windowRef.current) {
      const newWidth = parseInt(windowRef.current.style.width) || size.width
      useMemoryStore.getState().updateWindowSize(id, { width: newWidth, height: size.height })
      
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
    setIsResizing(false)
    document.body.classList.remove('is-resizing')
  }, [isResizing, id, size])
  
  // Apply resize handlers via useEffect
  useEffect(() => {
    if (!isResizing) return
    
    const handleMouseMove = (e: MouseEvent) => handleResizeMove(e.clientX)
    const handleMouseUp = () => handleResizeEnd()
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, handleResizeMove, handleResizeEnd])
  
  // Drag handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      // Calculate new position relative to where drag started
      let newX = e.clientX - dragOffset.x
      let newY = e.clientY - dragOffset.y
      
      // Keep within viewport
      newX = Math.max(0, Math.min(newX, window.innerWidth - size.width))
      newY = Math.max(0, Math.min(newY, window.innerHeight - size.height))
      
      updateWindowPosition(id, { x: newX, y: newY })
    }
    
    const handleMouseUp = () => {
      setIsDragging(false)
    }
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, id, size.width, size.height, updateWindowPosition])
  
  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 48 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 48px)' : size.height,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute bg-[#111111] border border-[#222222] rounded-md overflow-hidden pointer-events-auto z-50 flex flex-col shadow-2xl"
    >
      {/* Title bar */}
      <div
        className={`h-10 bg-[#111111] border-b border-[#222222] flex items-center justify-between px-4 select-none shrink-0 ${
          isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-[#e8e8e8] font-mono text-sm font-bold">{title}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#222222] text-[#999999] hover:text-[#e8e8e8] transition-colors"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#222222] text-[#999999] hover:text-[#e8e8e8] transition-colors"
          >
            <Square size={14} />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#d71921] text-[#999999] hover:text-[#ffffff] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-auto p-6 custom-scrollbar mdx-content bg-[#000000]">
        {id === 'welcome' ? (
          <WelcomeWindowContent />
        ) : id === 'agentsCompatibility' ? (
          <AgentsWindowContent />
        ) : id === 'socialProof' ? (
          <SocialProofContent />
        ) : (
          <div
            className="max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        
        {/* Resize handle - PostHog style */}
        {!isMaximized && (
          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-[#00f2ff] transition-colors"
            style={{
              background: 'rgba(51,51,51,0.5)',
            }}
          />
        )}
      </div>
    </motion.div>
  )
}
