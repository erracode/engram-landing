import { Suspense } from 'react'
import { MemorySimulator } from '../simulator/MemorySimulator'
import { TopBar } from '../layout/TopBar'
import { WindowManager } from './WindowManager'
import { useMemoryStore, startSimulation } from '../../stores/memoryStore'
import { useEffect } from 'react'

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
        <Suspense
          fallback={
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: '#999999',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              [LOADING SIMULATOR...]
            </div>
          }
        >
          <MemorySimulator />
        </Suspense>
      </div>

      {/* OS Shell — TopBar + Windows */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <TopBar />
        </div>
        <WindowManager />
        
        {/* Credits HUD */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '16px', 
            right: '24px', 
            fontFamily: "'Space Mono', monospace", 
            fontSize: '10px', 
            color: '#666666',
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
