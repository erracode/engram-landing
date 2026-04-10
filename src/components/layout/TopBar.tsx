import { useMemoryStore } from '../../stores/memoryStore'
import { MDX_CONTENT_MAP } from '../../utils/mdxContentMap'

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 18.72a9.094 9.094 0 0 0 3.741-3.32c.11-.2.23-.42.35-.65.01-.02.01-.03.02-.05.17-.39.33-.82.47-1.27.01-.03.01-.06.02-.09.07-.24.14-.49.2-.74.01-.05.01-.09.02-.14.05-.23.1-.48.14-.74.01-.03.01-.06.01-.09.04-.24.07-.48.1-.71.01-.06.01-.11.02-.17.02-.21.04-.42.06-.63l.02-.12c.02-.19.03-.39.04-.58v-.08c.01-.15.01-.3.01-.45v-.43l-.01-.35v-.26l-.01-.48-.02-.45c-.01-.22-.03-.43-.05-.65V4.26c-.03-.25-.06-.5-.1-.75l-.01-.06a10.383 10.383 0 0 0-1.1-3.45c-.32-.61-.71-1.16-1.17-1.65-.11-.11-.22-.22-.33-.33a10.456 10.456 0 0 0-3.34-2.1c-.26-.1-.52-.19-.79-.27L15.42-4.5a10.293 10.293 0 0 0-2.42-.45 10.04 10.04 0 0 0-1 .05 10.254 10.254 0 0 0-2 .4c-.33-.04-.66-.08-.99-.1-1.28-.1-2.58.05-3.83.45A10.15 10.15 0 0 0 1.25-2.07c-.46.49-.85 1.04-1.17 1.65A10.383 10.383 0 0 0-.02 3.03l-.01.06c-.04.25-.07.5-.1.75l-.01.17c-.02.22-.04.43-.05.65l-.02.45-.01.48v.26l-.01.35v.43c0 .15.01.3.01.45v.08c.01.19.02.39.04.58l.02.12c.02.21.04.42.06.63.01.06.01.11.02.17.03.23.06.47.1.71.01.03.01.06.01.09.04.26.09.51.14.74.01.05.01.09.02.14.06.25.13.5.2.74.01.03.01.06.02.09.14.45.3.88.47 1.27.01.02.01.03.02.05.12.23.23.45.35.65.99 1.68 2.29 2.89 3.74 3.32.23.07.45.1.66.1a1.234 1.234 0 0 0 .5-.1c.36-.14.65-.4.82-.74a1.71 1.71 0 0 0-.01-.79c-.06-.32-.24-.62-.51-.83-.15-.12-.34-.18-.54-.18-.08 0-.15.01-.22.02a.853.853 0 0 1-.58-.1c-.13-.08-.22-.21-.26-.35-.04-.14-.02-.3.05-.43.08-.13.2-.22.35-.26.1-.04.2-.04.3 0 .28.1.59.1.87 0 .28-.1.52-.3.65-.56.13-.26.15-.55.05-.82a1.042 1.042 0 0 0-.54-.6 1.135 1.135 0 0 1-.58-.6c-.1-.23-.07-.49.07-.69.14-.2.37-.31.62-.29.25.02.47.16.59.38.3.56.77.99 1.34 1.22.57.23 1.2.22 1.76-.02.56-.24.99-.71 1.22-1.28a2.536 2.536 0 0 0 .1-2c-.14-.56-.46-1.07-.91-1.44a2.768 2.768 0 0 0-1.85-.6c-.66.04-1.28.29-1.76.71a2.825 2.825 0 0 0-.85 1.5c-.07.33-.07.67 0 1a2.73 2.73 0 0 0 .6 1.4c.15.19.16.45.03.65-.13.2-.36.3-.6.28-.24-.02-.45-.16-.56-.37a3.837 3.837 0 0 1-.6-1.55c-.17-.79-.11-1.61.16-2.37a3.91 3.91 0 0 1 1.5-2 3.978 3.978 0 0 1 2.37-.8c1-.04 1.99.21 2.82.74a4.053 4.053 0 0 1 1.63 2.1c.21.6.28 1.24.2 1.88a4.136 4.136 0 0 1-1.04 2.27c-.52.55-1.19.95-1.92 1.14a4.343 4.343 0 0 1-2.92-.1c-.73-.25-1.39-.71-1.88-1.3-.18-.21-.45-.29-.71-.2a.75.75 0 0 0-.5.64s-.04.3-.04.45c0 .15.01.3.04.45s.07.3.1.45c.01.03.01.06.01.09.04.26.09.51.14.74l.02.14c.06.25.13.5.2.74l.02.09c.17.45.33.88.47 1.27l.02.05c.12.23.23.45.35.65.99 1.68 2.29 2.89 3.74 3.32a.754.754 0 0 0 .66.1 1.234 1.234 0 0 0 .5-.1c.36-.14.65-.4.82-.74a1.71 1.71 0 0 0-.01-.79c-.06-.32-.24-.62-.51-.83-.15-.12-.34-.18-.54-.18-.08 0-.15.01-.22.02a.853.853 0 0 1-.58-.1c-.13-.08-.22-.21-.26-.35a.86.86 0 0 1 .05-.43.83.83 0 0 1 .35-.26.85.85 0 0 1 .3 0c.28.1.59.1.87 0 .28-.1.52-.3.65-.56.13-.26.15-.55.05-.82a1.042 1.042 0 0 0-.54-.6 1.135 1.135 0 0 1-.58-.6c-.1-.23-.07-.49.07-.69.14-.2.37-.31.62-.29.25.02.47.16.59.38.3.56.77.99 1.34 1.22.57.23 1.2.22 1.76-.02.56-.24.99-.71 1.22-1.28.23-.57.3-1.19.2-1.8a4.136 4.136 0 0 0-.74-1.92 4.254 4.254 0 0 0-2-1.5 4.343 4.343 0 0 0-2.82-.1c-.73.19-1.4.59-1.92 1.14l-1.04 2.27c-.08.64-.01 1.28.2 1.88a4.053 4.053 0 0 0 1.63 2.1c.83.53 1.82.78 2.82.74zM9 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

const NAV_ITEMS = [
  { id: 'docs-ext', label: 'Docs', title: 'DOCS', href: 'https://engram-page.vercel.app/getting-started/', external: true },
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

      {/* Center: Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
        {NAV_ITEMS.map((item) => {
          // Handle external links differently
          if (item.external && item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#999999',
                  borderBottom: '2px solid transparent',
                  transition: 'color 150ms, border-color 150ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
              >
                {item.label}
              </a>
            )
          }
          
          // Regular window toggle
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

      {/* Right: GitHub & Get Started */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '12px', borderRight: '1px solid #222' }}>
          <a
            href="https://github.com/Gentleman-Programming/engram"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#999999', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
            title="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://discord.com/invite/3QVhF5vRsR"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#999999', display: 'flex', alignItems: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
            title="Discord"
          >
            <DiscordIcon />
          </a>
          <a
            href="https://www.youtube.com/@GentlemanProgramming"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#999999', display: 'flex', alignItems: 'center' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8e8' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#999999' }}
            title="YouTube"
          >
            <YoutubeIcon />
          </a>
        </div>
        
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
