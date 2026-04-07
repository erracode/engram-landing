import { Suspense } from 'react'
import { MemorySimulator } from '../simulator/MemorySimulator'
import { MemoryLog } from '../hud/MemoryLog'
import { CognitiveModules } from '../hud/CognitiveModules'
import { ConnectedAgents } from '../hud/ConnectedAgents'
import { TUIVisor } from '../hud/TUIVisor'
import { QuickStart } from './QuickStart'
import { HowItWorks } from './HowItWorks'
import { MCPTools } from './MCPTools'
import { GitSync } from './GitSync'
import { DocsLinks } from './DocsLinks'
import { useMemoryStore } from '../../stores/memoryStore'
import { X } from 'lucide-react'

export function Hero() {
  const activeWindow = useMemoryStore((state) => state.activeWindow)
  const setActiveWindow = useMemoryStore((state) => state.setActiveWindow)

  const renderActiveWindow = () => {
    switch (activeWindow) {
      case 'quickstart': return <QuickStart />
      case 'how-it-works': return <HowItWorks />
      case 'tools': return <MCPTools />
      case 'sync': return <GitSync />
      case 'docs': return <DocsLinks />
      default: return null
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="text-cyan-neon font-mono text-sm animate-pulse">[LOADING SIMULATOR...]</div>
          </div>
        }>
          <MemorySimulator />
        </Suspense>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end items-center px-4 pb-20">
        <div className="text-center max-w-3xl mx-auto mb-8 pointer-events-none">
          <h1 className="text-display-lg text-text-display mb-2 drop-shadow-md pb-2 uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-neon via-white to-cyan-neon">
            ENGRAM.
          </h1>
          <div className="font-body text-[1.5rem] md:text-[2rem] font-bold text-text-display leading-tight tracking-tight mb-2 uppercase">
            THE PERSISTENT MEMORY<br/>LAYER FOR AGENTIC INTELLIGENCE.
          </div>
          <p className="text-body text-text-secondary max-w-xl mx-auto mt-2">
            Agent-agnostic. Single binary. Zero dependencies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pointer-events-auto">
          <a href="#install" className="btn-primary" style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)' }}>
            INSTALL NOW (one-liner)
          </a>
        </div>
      </div>

        {activeWindow && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pt-20 pointer-events-auto bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-surface-raised/90 border-2 border-cyan-neon shadow-[0_0_15px_rgba(0,242,255,0.3)] rounded-lg">
              <button 
                onClick={() => setActiveWindow(null)}
                className="sticky top-4 right-4 float-right z-10 p-2 bg-black border border-border rounded text-text-secondary hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6">
                {renderActiveWindow()}
              </div>
            </div>
          </div>
        )}

      <div className="relative z-10 hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-3">
        <CognitiveModules />
        <ConnectedAgents />
      </div>

      <div className="relative z-10 hidden lg:flex fixed right-4 bottom-4">
        <MemoryLog />
      </div>

      <div className="relative z-10 hidden lg:flex fixed left-4 bottom-4">
        <TUIVisor />
      </div>

    </section>
  )
}
