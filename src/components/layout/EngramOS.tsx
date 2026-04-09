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
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <TopBar />
        <WindowManager />
      </div>
    </div>
  )
}
