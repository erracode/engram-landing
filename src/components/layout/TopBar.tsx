import { useMemoryStore } from '../../stores/memoryStore'
import { MDX_CONTENT_MAP } from '../../utils/mdxContentMap'


const NAV_ITEMS = [
  { id: 'docs', label: 'Docs', href: '/docs', isRoute: true },
  { id: 'github-ext', label: 'GitHub', href: 'https://github.com/Gentleman-Programming/engram', external: true },
  { id: 'discord-ext', label: 'Discord', href: 'https://discord.com/invite/3QVhF5vRsR', external: true },
  { id: 'youtube-ext', label: 'YouTube', href: 'https://www.youtube.com/@GentlemanProgramming', external: true },
]

function ElephantIcon() {
  // Pixel-art elephant face (front view) on 16x16 grid
  // Features: rounded head, big ears on sides, two eyes, trunk hanging down, small tusks
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges">
      {/* Left ear */}
      <rect x="0" y="3" width="2" height="4" />
      <rect x="1" y="2" width="1" height="1" />
      <rect x="1" y="7" width="1" height="1" />
      {/* Right ear */}
      <rect x="14" y="3" width="2" height="4" />
      <rect x="14" y="2" width="1" height="1" />
      <rect x="14" y="7" width="1" height="1" />
      {/* Head top */}
      <rect x="4" y="1" width="8" height="1" />
      <rect x="3" y="2" width="10" height="1" />
      {/* Head sides + fill */}
      <rect x="2" y="3" width="12" height="6" />
      {/* Eyes (cut out via darker color) */}
      <rect x="4" y="4" width="2" height="2" fill="#00f2ff" />
      <rect x="10" y="4" width="2" height="2" fill="#00f2ff" />
      {/* Forehead detail */}
      <rect x="7" y="3" width="2" height="1" fill="#bc13fe" />
      {/* Trunk */}
      <rect x="6" y="9" width="4" height="1" />
      <rect x="7" y="10" width="2" height="1" />
      <rect x="7" y="11" width="2" height="1" />
      <rect x="7" y="12" width="2" height="1" />
      <rect x="6" y="13" width="2" height="1" />
      {/* Tusks */}
      <rect x="5" y="8" width="1" height="3" fill="#e8e8e8" />
      <rect x="10" y="8" width="1" height="3" fill="#e8e8e8" />
    </svg>
  )
}

export function TopBar() {
  const openWindow = useMemoryStore((s) => s.openWindow)
  const closeWindow = useMemoryStore((s) => s.closeWindow)
  const activeWindows = useMemoryStore((s) => s.activeWindows)

  const toggle = (item: typeof NAV_ITEMS[0]) => {
    // Handle route links (like /docs)
    if (item.id === 'docs') {
      window.location.href = item.href
      return
    }
    // Handle external links
    if (item.external) {
      window.open(item.href, '_blank')
      return
    }
    // Handle window toggle (items with title and content)
    const isOpen = activeWindows[item.id] && activeWindows[item.id].isOpen
    if (isOpen) {
      closeWindow(item.id)
    } else {
      openWindow(item.id, (item as any).title, (item as any).content)
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="group">
        <div style={{ color: '#bc13fe' }}>
          <ElephantIcon />
        </div>
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
        <span
          style={{
            fontSize: '10px',
            color: '#666666',
            marginLeft: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
          className="hidden sm:inline-block"
        >
          An elephant never forgets. █
        </span>
      </div>

      {/* Center: Empty for asymmetry or branding space */}
      <div className="flex-1" />

      {/* Right: Links & Get Started */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '16px' }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#999999',
                transition: 'color 150ms',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
            >
              {item.label}
            </a>
          ))}
        </nav>


        <a
          href="https://github.com/Gentleman-Programming/engram"
          target="_blank"
          style={{
            backgroundColor: '#bc13fe',
            color: '#fff',
            textDecoration: 'none',
            padding: '6px 14px',
            borderRadius: '4px',
            fontWeight: 700,
            transition: 'all 200ms',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 10px rgba(188, 19, 254, 0.2)'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.backgroundColor = '#9a0ecf'
            e.currentTarget.style.boxShadow = '0 0 15px rgba(188, 19, 254, 0.4)'
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.backgroundColor = '#bc13fe'
            e.currentTarget.style.boxShadow = '0 0 10px rgba(188, 19, 254, 0.2)'
          }}
        >
          Install <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </a>
      </div>
    </header>
  )
}
