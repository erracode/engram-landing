import { Window } from '../ui/Window'

export function KernelWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="kernel" title="KERNEL" onClose={onClose} defaultPosition={{ x: 100, y: 60 }} width={620}>
      {/* Definition */}
      <div style={{ marginBottom: '24px' }}>
        <div style={labelStyle}>DEFINITION</div>
        <p style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: '15px', color: '#e8e8e8', marginBottom: '8px' }}>
          <strong style={{ color: '#ffffff' }}>engram</strong>{' '}
          <span style={{ color: '#666666' }}>/ˈen.ɡræm/</span>{' '}
          — <em style={{ color: '#999999' }}>neuroscience</em>: the physical trace of a memory in the brain.
        </p>
        <p style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: '14px', color: '#999999' }}>
          Your AI coding agent forgets everything when the session ends. Engram gives it a brain.
        </p>
      </div>

      {/* What it is */}
      <div style={{ marginBottom: '24px' }}>
        <div style={labelStyle}>WHAT IS ENGRAM</div>
        <p style={bodyStyle}>
          A <span style={cyanStyle}>Go binary</span> with SQLite + FTS5 full-text search, exposed via CLI, HTTP API,
          MCP server, and an interactive TUI. Works with <span style={cyanStyle}>any agent</span> that supports MCP.
        </p>
      </div>

      {/* Architecture flow */}
      <div style={{ marginBottom: '24px' }}>
        <div style={labelStyle}>DATA FLOW</div>
        <div style={codeBlockStyle}>
          {`Agent (Claude Code / OpenCode / Gemini CLI / Codex / VS Code / ...)
    ↓ MCP stdio
Engram (single Go binary)
    ↓
SQLite + FTS5 (~/.engram/engram.db)`}
        </div>
      </div>

      {/* Memory lifecycle */}
      <div style={{ marginBottom: '24px' }}>
        <div style={labelStyle}>MEMORY LIFECYCLE</div>
        <div style={codeBlockStyle}>
          {`1. Agent completes significant work (bugfix, architecture decision, etc.)
2. Agent calls mem_save → title, type, What/Why/Where/Learned
3. Engram persists to SQLite with FTS5 indexing
4. Next session: agent searches memory, gets relevant context`}
        </div>
      </div>

      {/* Key properties */}
      <div>
        <div style={labelStyle}>PROPERTIES</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            ['Agent-agnostic', 'Works with any MCP client'],
            ['Single binary', 'No Node.js, no Python, no Docker'],
            ['Zero dependencies', 'One SQLite file'],
            ['Git Sync', 'Share memories across machines'],
          ].map(([title, desc]) => (
            <div key={title} style={{ padding: '8px', border: '1px solid #222222', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#00f2ff', letterSpacing: '0.06em', marginBottom: '2px' }}>{title}</div>
              <div style={{ fontSize: '11px', color: '#999999' }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

// Shared styles
const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#666666',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '8px',
  fontFamily: "'Space Mono', monospace",
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui",
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#e8e8e8',
}

const cyanStyle: React.CSSProperties = {
  color: '#00f2ff',
}

const codeBlockStyle: React.CSSProperties = {
  background: '#0a0a0a',
  border: '1px solid #222222',
  borderRadius: '4px',
  padding: '12px',
  fontFamily: "'Space Mono', monospace",
  fontSize: '11px',
  lineHeight: 1.7,
  color: '#999999',
  whiteSpace: 'pre',
  overflowX: 'auto',
}
