import { useRef, useState, useEffect } from 'react'
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
    <div className="fixed inset-0 pointer-events-none">
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
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  
  // Track window position
  const { updateWindowPosition } = useMemoryStore()
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    e.preventDefault()
    setIsDragging(true)
    const rect = windowRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
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
        y: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bg-[#111111] border border-[#222222] rounded-md overflow-hidden pointer-events-auto z-50"
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
      }}
    >
      {/* Title bar */}
      <div
        className={`h-10 bg-[#111111] border-b border-[#222222] flex items-center justify-between px-4 select-none ${
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
      <div className="h-[calc(100%-40px)] overflow-auto p-6 custom-scrollbar mdx-content">
        <div
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.div>
  )
}
