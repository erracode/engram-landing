import { Suspense, useState, useEffect } from 'react'
import { MemorySimulator } from '../simulator/MemorySimulator'
import { TopBar } from '../layout/TopBar'
import { WindowManager } from './WindowManager'
import { useMemoryStore, startSimulation } from '../../stores/memoryStore'

function DesktopShortcuts() {
  const openWindow = useMemoryStore((s) => s.openWindow)

  const shortcuts = [
    {
      label: 'AGENTS',
      onClick: () => openWindow('agentsCompatibility', 'AGENTS COMPATIBILITY', ''),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" shapeRendering="crispEdges">
          <rect x="4" y="2" width="16" height="2" />
          <rect x="2" y="4" width="2" height="8" />
          <rect x="20" y="4" width="2" height="8" />
          <rect x="4" y="12" width="16" height="2" />
          <rect x="6" y="5" width="4" height="3" fill="#00f2ff" />
          <rect x="14" y="5" width="4" height="3" fill="#00f2ff" />
          <rect x="8" y="9" width="8" height="2" fill="#bc13fe" />
          <rect x="6" y="16" width="2" height="6" />
          <rect x="16" y="16" width="2" height="6" />
          <rect x="8" y="14" width="8" height="2" />
        </svg>
      ),
    },
    {
      label: 'STATS',
      onClick: () => openWindow('socialProof', 'COMMUNITY & STATS', ''),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" shapeRendering="crispEdges">
          <rect x="2" y="16" width="4" height="6" />
          <rect x="8" y="10" width="4" height="12" />
          <rect x="14" y="4" width="4" height="18" />
          <rect x="20" y="8" width="4" height="14" />
          <rect x="10" y="2" width="8" height="2" fill="#00f2ff" />
        </svg>
      ),
    },
  ]

  return (
    <div
      style={{
        position: 'absolute',
        top: '72px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'auto',
      }}
    >
      {shortcuts.map((s) => (
        <button
          key={s.label}
          onClick={s.onClick}
          className="group flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110 border-none bg-transparent"
        >
          <div className="w-10 h-10 bg-[#0a0a0a] border border-[#333333] flex items-center justify-center text-[#999999] group-hover:bg-[#bc13fe] group-hover:text-white group-hover:border-[#bc13fe] transition-colors">
            {s.icon}
          </div>
          <span className="text-[#999999] group-hover:text-[#e8e8e8] font-mono text-[9px] transition-colors">
            {s.label}
          </span>
        </button>
      ))}
    </div>
  )
}

function BootScreen() {
  const [lines, setLines] = useState<string[]>([])
  const bootLines = [
    '> ENGRAM v2.4.0',
    '> Initializing memory vault...',
    '> Loading SQLite + FTS5 engine...',
    '> Connecting MCP protocol...',
    '> Scanning agent interfaces...',
    '> Rendering scene ████████░░ 80%',
    '> Boot complete.',
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 180)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
        fontSize: '11px',
        color: '#2596be',
        letterSpacing: '0.06em',
        background: '#000000',
      }}
    >
      <div style={{ maxWidth: '360px', width: '100%' }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              opacity: 0,
              animation: 'fadeIn 0.3s forwards',
              animationDelay: `${i * 0.1}s`,
              marginBottom: '4px',
              color: i === lines.length - 1 ? '#00f2ff' : '#666666',
            }}
          >
            {line}
          </div>
        ))}
        <div
          style={{
            width: '8px',
            height: '14px',
            background: '#00f2ff',
            marginTop: '8px',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  )
}

export function EngramOS() {
  useEffect(() => {
    startSimulation()
  }, [])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000000',
        position: 'relative',
      }}
    >
      {/* 3D Diorama — persistent background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Suspense fallback={<BootScreen />}>
          <MemorySimulator />
        </Suspense>
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <TopBar />
        </div>

        {/* Desktop Shortcuts HUD */}
        <DesktopShortcuts />

        <WindowManager />
        
        {/* Credits HUD */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '16px', 
            right: '24px', 
            fontFamily: "'Space Mono', monospace", 
            fontSize: '10px', 
            color: '#999999',
            textAlign: 'right',
            pointerEvents: 'auto',
            background: 'rgba(0,0,0,0.5)',
            padding: '8px',
            borderRadius: '4px',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div>MIT License — © 2026 Gentleman Programming</div>
          <div style={{ marginTop: '4px' }}>
            Made with <span style={{ color: '#bc13fe' }}>🤍</span> by{' '}
            <a 
              href="https://erracode.pages.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#2596be', textDecoration: 'none', transition: 'color 150ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00f2ff' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#2596be' }}
            >
              Jesus Diaz (erracode)
            </a>
            , for the entire Gentleman Programming community.
          </div>
        </div>
      </div>
    </div>
  )
}
