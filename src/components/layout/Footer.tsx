import { Heart } from 'lucide-react'

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-cyan-neon font-mono text-lg font-bold">engram</span>
            </div>
            <p className="text-text-secondary text-sm">
              Persistent memory for AI coding agents. Agent-agnostic. Single binary. Zero dependencies.
            </p>
          </div>

          <div>
            <h4 className="text-label text-text-secondary mb-3">RESOURCES</h4>
            <div className="space-y-2 text-sm">
              <a href="#docs" className="block text-text-secondary hover:text-cyan-neon transition-colors">Documentation</a>
              <a href="#tools" className="block text-text-secondary hover:text-cyan-neon transition-colors">MCP Tools</a>
              <a href="#install" className="block text-text-secondary hover:text-cyan-neon transition-colors">Installation</a>
            </div>
          </div>

          <div>
            <h4 className="text-label text-text-secondary mb-3">COMMUNITY</h4>
            <div className="space-y-2 text-sm">
              <a href="https://github.com/Gentleman-Programming/engram" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-cyan-neon transition-colors">
                <GithubIcon /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-disabled text-xs font-mono">
            <span>MIT License</span>
            <span>·</span>
            <span>Inspired by claude-mem</span>
          </div>
          <div className="flex items-center gap-2 text-text-disabled text-xs font-mono">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-purple-neon" />
            <span>by Gentleman Programming</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
