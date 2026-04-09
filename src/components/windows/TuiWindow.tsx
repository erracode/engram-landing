import { Window } from '../ui/Window'

export function TuiWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="tui" title="TERMINAL UI" onClose={onClose} defaultPosition={{ x: 220, y: 100 }} width={640} maxHeight={580}>
      <div style={labelStyle}>engram tui</div>
      <p style={bodyStyle}>
        Engram includes a full-featured terminal dashboard for managing memories without leaving your shell.
      </p>

      {/* TUI Preview - Simulated */}
      <div style={{
        background: '#050505',
        border: '1px solid #333333',
        borderRadius: '4px',
        marginTop: '16px',
        marginBottom: '24px',
        fontFamily: "'Space Mono', monospace",
        overflow: 'hidden',
      }}>
        {/* TUI Header */}
        <div style={{ background: '#111111', padding: '4px 12px', fontSize: '10px', color: '#666666', borderBottom: '1px solid #222222', display: 'flex', justifyContent: 'space-between' }}>
          <span>ENGRAM TUI v0.8.2</span>
          <span>MEMORIES: 142</span>
        </div>
        {/* TUI Body */}
        <div style={{ padding: '12px', fontSize: '11px', lineHeight: 1.4 }}>
          <div style={{ color: '#00f2ff', marginBottom: '8px' }}>[ DASHBOARD ]  SEARCH  STATS  SYNC</div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px' }}>
            <div style={{ color: '#666666' }}>ID</div><div style={{ color: '#666666' }}>TITLE</div>
            <div style={{ color: '#bc13fe' }}>#472a</div><div style={{ color: '#e8e8e8' }}>setup: mcp server for claude-code</div>
            <div style={{ color: '#bc13fe' }}>#4729</div><div style={{ color: '#e8e8e8' }}>bugfix: fts5 tokenizer issues</div>
            <div style={{ color: '#bc13fe' }}>#4728</div><div style={{ color: '#e8e8e8' }}>pattern: repository pattern in golang</div>
            <div style={{ color: '#333333' }}>...</div><div style={{ color: '#333333' }}>...</div>
          </div>
          <div style={{ marginTop: '16px', color: '#999999' }}>
            <span style={{ color: '#4a9e5c' }}>●</span> Connected to ~/.engram/engram.db
          </div>
        </div>
        {/* TUI Footer */}
        <div style={{ background: '#0a0a0a', padding: '4px 12px', fontSize: '10px', color: '#444444', borderTop: '1px solid #222222' }}>
          j/k: navigate · /: search · enter: view · esc: back
        </div>
      </div>

      <div style={labelStyle}>CONTROLS</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          ['j / k', 'Navigate list'],
          ['/', 'Open search'],
          ['Enter', 'View detail'],
          ['Esc', 'Back to list'],
          ['s', 'Sync memories'],
          ['q', 'Quit TUI'],
        ].map(([key, desc]) => (
          <li key={key} style={{ fontSize: '12px', color: '#999999', fontFamily: "'Space Mono', monospace" }}>
            <span style={{ color: '#00f2ff' }}>{key}</span>: {desc}
          </li>
        ))}
      </ul>
    </Window>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px', fontWeight: 700, color: '#666666',
  letterSpacing: '0.1em', textTransform: 'uppercase',
  marginBottom: '8px', fontFamily: "'Space Mono', monospace",
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui",
  fontSize: '14px', lineHeight: 1.6, color: '#e8e8e8',
}
