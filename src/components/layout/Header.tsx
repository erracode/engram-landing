import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useMemoryStore } from '../../stores/memoryStore'

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const setActiveWindow = useMemoryStore((state) => state.setActiveWindow)
  const activeWindow = useMemoryStore((state) => state.activeWindow)

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string | null) => {
    e.preventDefault()
    setActiveWindow(activeWindow === id ? null : id)
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-neon to-purple-500 font-display text-2xl font-black tracking-tight drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]">ENGRAM</span>
          <span className="text-text-disabled text-xs font-mono hidden sm:inline ml-2">/ˈen.ɡræm/</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          <a href="#" onClick={(e) => handleNav(e, 'quickstart')} className={`transition-colors ${activeWindow === 'quickstart' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`}>INSTALL</a>
          <a href="#" onClick={(e) => handleNav(e, 'how-it-works')} className={`transition-colors ${activeWindow === 'how-it-works' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`}>HOW IT WORKS</a>
          <a href="#" onClick={(e) => handleNav(e, 'tools')} className={`transition-colors ${activeWindow === 'tools' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`}>TOOLS</a>
          <a href="#" onClick={(e) => handleNav(e, 'docs')} className={`transition-colors ${activeWindow === 'docs' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`}>DOCS</a>
          <a href="https://github.com/Gentleman-Programming/engram" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-display transition-colors">
            <GithubIcon />
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => handleNav(e, 'quickstart')}
            className="btn-primary text-xs !py-2 !px-4"
          >
            INSTALL
          </a>
          <button
            className="md:hidden text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-black/95 backdrop-blur-sm">
          <nav className="flex flex-col p-4 gap-3 font-mono text-xs">
            <a href="#" className={`py-2 ${activeWindow === 'quickstart' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`} onClick={(e) => handleNav(e, 'quickstart')}>INSTALL</a>
            <a href="#" className={`py-2 ${activeWindow === 'how-it-works' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`} onClick={(e) => handleNav(e, 'how-it-works')}>HOW IT WORKS</a>
            <a href="#" className={`py-2 ${activeWindow === 'tools' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`} onClick={(e) => handleNav(e, 'tools')}>TOOLS</a>
            <a href="#" className={`py-2 ${activeWindow === 'docs' ? 'text-text-display' : 'text-text-secondary hover:text-text-display'}`} onClick={(e) => handleNav(e, 'docs')}>DOCS</a>
          </nav>
        </div>
      )}
    </header>
  )
}
