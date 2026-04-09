import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useDragControls, type PanInfo } from 'framer-motion'
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
  const [visible, setVisible] = useState(false)
  const controls = useDragControls()

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const handleDrag = useCallback((_event: unknown, _info: PanInfo) => {
    // framer-motion handles position automatically via x/y animate
  }, [])

  return (
    <motion.div
      id={`window-${id}`}
      style={{
        position: 'absolute',
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
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.95,
        x: defaultPosition.x,
        y: defaultPosition.y,
      }}
      transition={{
        opacity: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        scale: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
        x: { duration: 0 },
        y: { duration: 0 },
      }}
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      onDrag={handleDrag}
    >
      {/* Title bar — draggable */}
      <div
        onPointerDown={(e) => controls.start(e)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid #222222',
          cursor: 'grab',
          flexShrink: 0,
          userSelect: 'none',
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
    </motion.div>
  )
}