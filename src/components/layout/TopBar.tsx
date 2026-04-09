import { useState, useEffect } from 'react'
import { useMemoryStore } from '../../stores/memoryStore'

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const NAV_ITEMS = [
  { id: 'kernel', label: 'KERNEL' },
  { id: 'install', label: 'INSTALL' },
  { id: 'tools', label: 'TOOLS' },
  { id: 'architecture', label: 'ARCH' },
  { id: 'docs', label: 'DOCS' },
]

export function TopBar() {
  const [time, setTime] = useState('')
  const setActiveWindow = useMemoryStore((s) => s.setActiveWindow)
  const activeWindow = useMemoryStore((s) => s.activeWindow)
  const totalMemories = useMemoryStore((s) => s.totalMemories)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const toggle = (id: string) => {
    setActiveWindow(activeWindow === id ? null : id)
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '36px',
        background: 'rgba(0, 0, 0, 0.92)',
        borderBottom: '1px solid #222222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.06em',
        userSelect: 'none',
      }}
    >
      {/* Left: Brand + Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            fontFamily: "'Doto', 'Space Mono', monospace",
            fontSize: '14px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          ENGRAM
        </span>
        <span style={{ color: '#666666', fontSize: '10px' }}>
          AGENT_STATUS: <span style={{ color: '#4a9e5c' }}>IDLE</span>
        </span>
        <span style={{ color: '#666666', fontSize: '10px' }}>
          MEM: <span style={{ color: '#00f2ff' }}>{totalMemories}</span>
        </span>
      </div>

      {/* Center: Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 10px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: activeWindow === item.id ? '#ffffff' : '#999999',
              borderBottom: activeWindow === item.id ? '1px solid #00f2ff' : '1px solid transparent',
              transition: 'color 200ms, border-color 200ms',
            }}
            onMouseEnter={(e) => {
              if (activeWindow !== item.id) e.currentTarget.style.color = '#e8e8e8'
            }}
            onMouseLeave={(e) => {
              if (activeWindow !== item.id) e.currentTarget.style.color = '#999999'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right: Clock + GitHub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: '#666666', fontSize: '10px', fontVariantNumeric: 'tabular-nums' }}>
          {time}
        </span>
        <a
          href="https://github.com/Gentleman-Programming/engram"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#999999', display: 'flex', alignItems: 'center' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
        >
          <GithubIcon />
        </a>
      </div>
    </header>
  )
}
