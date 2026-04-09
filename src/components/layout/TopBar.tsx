import { useMemoryStore } from '../../stores/memoryStore'
import { MDX_CONTENT_MAP } from '../../utils/mdxContentMap'

const NAV_ITEMS = [
  { id: 'kernel', label: 'KERNEL', title: 'KERNEL', content: MDX_CONTENT_MAP.kernel },
  { id: 'installation', label: 'INSTALL', title: 'INSTALLATION', content: MDX_CONTENT_MAP.installation },
  { id: 'agentSetup', label: 'AGENTS', title: 'AGENT SETUP', content: MDX_CONTENT_MAP.agentSetup },
  { id: 'architecture', label: 'ARCH', title: 'ARCHITECTURE', content: MDX_CONTENT_MAP.architecture },
  { id: 'mcpTools', label: 'TOOLS', title: 'MCP TOOLS', content: MDX_CONTENT_MAP.mcpTools },
  { id: 'tui', label: 'TUI', title: 'TERMINAL UI', content: MDX_CONTENT_MAP.tui },
  { id: 'gitSync', label: 'SYNC', title: 'GIT SYNC', content: MDX_CONTENT_MAP.gitSync },
  { id: 'docs', label: 'DOCS', title: 'DOCUMENTATION', content: MDX_CONTENT_MAP.docs },
]

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function TopBar() {
  const openWindow = useMemoryStore((s) => s.openWindow)
  const closeWindow = useMemoryStore((s) => s.closeWindow)
  const activeWindows = useMemoryStore((s) => s.activeWindows)

  const toggle = (item: typeof NAV_ITEMS[0]) => {
    const isOpen = activeWindows[item.id] && activeWindows[item.id].isOpen
    if (isOpen) {
      closeWindow(item.id)
    } else {
      openWindow(item.id, item.title, item.content)
    }
  }

  return (
    <header
      style={{
        width: '100%',
        height: '48px',
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.95)',
        borderBottom: '1px solid #333333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
        fontSize: '12px',
        letterSpacing: '0.06em',
        userSelect: 'none',
      }}
    >
      {/* Left: Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span
          style={{
            fontFamily: "'Doto', 'Space Mono', monospace",
            fontSize: '18px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
          }}
        >
          ENGRAM
        </span>
      </div>

      {/* Center: Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {NAV_ITEMS.map((item) => {
          const isOpen = activeWindows[item.id] && activeWindows[item.id].isOpen
          return (
            <button
              key={item.id}
              onClick={() => toggle(item)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 14px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isOpen ? '#ffffff' : '#999999',
                borderBottom: isOpen ? '2px solid #00f2ff' : '2px solid transparent',
                transition: 'color 150ms, border-color 150ms',
              }}
              onMouseEnter={(e) => {
                if (!isOpen) e.currentTarget.style.color = '#e8e8e8'
              }}
              onMouseLeave={(e) => {
                if (!isOpen) e.currentTarget.style.color = '#999999'
              }}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Right: GitHub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
