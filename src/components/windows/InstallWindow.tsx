import { useState } from 'react'
import { Window } from '../ui/Window'

const agents = [
  { name: 'Claude Code', cmd: 'claude plugin marketplace add Gentleman-Programming/engram && claude plugin install engram' },
  { name: 'OpenCode', cmd: 'engram setup opencode' },
  { name: 'Gemini CLI', cmd: 'engram setup gemini-cli' },
  { name: 'Codex', cmd: 'engram setup codex' },
  { name: 'VS Code', cmd: "code --add-mcp '{\"name\":\"engram\",\"command\":\"engram\",\"args\":[\"mcp\"]}'" },
  { name: 'Cursor / Windsurf', cmd: 'See docs/AGENT-SETUP.md' },
]

export function InstallWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="install" title="INSTALL" onClose={onClose} defaultPosition={{ x: 160, y: 80 }} width={600} maxHeight={560}>
      {/* Install command */}
      <div style={{ marginBottom: '24px' }}>
        <div style={labelStyle}>HOMEBREW</div>
        <CodeBlock text="brew install gentleman-programming/tap/engram" />
        <p style={{ fontSize: '11px', color: '#666666', marginTop: '6px' }}>
          Windows, Linux, and other methods → docs/INSTALLATION.md
        </p>
      </div>

      {/* Agent setup table */}
      <div style={{ marginBottom: '24px' }}>
        <div style={labelStyle}>SETUP YOUR AGENT</div>
        <div style={{ border: '1px solid #222222', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Space Mono', monospace", fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222222' }}>
                <th style={thStyle}>AGENT</th>
                <th style={thStyle}>COMMAND</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr key={a.name} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ ...tdStyle, color: '#e8e8e8', whiteSpace: 'nowrap' }}>{a.name}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <code style={{ color: '#00f2ff', fontSize: '10px', wordBreak: 'break-all' }}>{a.cmd}</code>
                      {!a.cmd.startsWith('See') && <CopyBtn text={a.cmd} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Zero deps callout */}
      <div style={{
        padding: '12px',
        border: '1px solid #222222',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#999999',
        fontFamily: "'Space Mono', monospace",
      }}>
        That's it. <span style={{ color: '#00f2ff' }}>No Node.js</span>,{' '}
        <span style={{ color: '#00f2ff' }}>no Python</span>,{' '}
        <span style={{ color: '#00f2ff' }}>no Docker</span>.{' '}
        One binary, one SQLite file.
      </div>
    </Window>
  )
}

function CodeBlock({ text }: { text: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#0a0a0a',
      border: '1px solid #222222',
      borderRadius: '4px',
      padding: '10px 12px',
    }}>
      <code style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#e8e8e8' }}>
        <span style={{ color: '#666666' }}>$ </span>{text}
      </code>
      <CopyBtn text={text} />
    </div>
  )
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'Space Mono', monospace",
        fontSize: '10px',
        letterSpacing: '0.06em',
        color: copied ? '#4a9e5c' : '#666666',
        padding: '2px 6px',
        transition: 'color 150ms',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = '#e8e8e8' }}
      onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = '#666666' }}
    >
      {copied ? '[COPIED]' : '[COPY]'}
    </button>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#666666',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '8px',
  fontFamily: "'Space Mono', monospace",
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  color: '#666666',
  fontSize: '10px',
  letterSpacing: '0.1em',
  fontWeight: 700,
}

const tdStyle: React.CSSProperties = {
  padding: '8px 10px',
  color: '#999999',
}
