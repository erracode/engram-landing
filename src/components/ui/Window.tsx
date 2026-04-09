import { useRef, useCallback, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface WindowProps {
  id: string
  title: string
  children: ReactNode
  onClose: () => void
  defaultPosition?: { x: number; y: number }
  width?: number
  maxHeight?: number
}

export function Window({
  id,
  title,
  children,
  onClose,
  defaultPosition = { x: 120, y: 60 },
  width = 560,
  maxHeight = 520,
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [visible, setVisible] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null)

  // Fade in on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      }

      const onMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return
        setPosition({
          x: dragRef.current.startPosX + (ev.clientX - dragRef.current.startX),
          y: dragRef.current.startPosY + (ev.clientY - dragRef.current.startY),
        })
      }

      const onMouseUp = () => {
        dragRef.current = null
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [position]
  )

  return (
    <div
      id={`window-${id}`}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width,
        maxHeight,
        zIndex: 80,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(0, 0, 0, 0.94)',
        border: '1px solid #333333',
        borderRadius: '8px',
        fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      {/* Title bar — draggable */}
      <div
        onMouseDown={onMouseDown}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #222222',
          cursor: 'grab',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#999999',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          [ {title} ]
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#666666',
            cursor: 'pointer',
            fontFamily: "'Space Mono', monospace",
            fontSize: '14px',
            padding: '0 4px',
            lineHeight: 1,
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#666666' }}
        >
          ×
        </button>
      </div>

      {/* Content area — scrollable */}
      <div
        style={{
          padding: '16px',
          overflowY: 'auto',
          flex: 1,
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#e8e8e8',
        }}
      >
        {children}
      </div>
    </div>
  )
}
