import { Window } from '../ui/Window'

export function ArchitectureWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="architecture" title="ARCHITECTURE" onClose={onClose} defaultPosition={{ x: 140, y: 90 }} width={580} maxHeight={540}>
      <div style={labelStyle}>SYSTEM COMPONENTS</div>
      <p style={bodyStyle}>
        Each 3D element on this grid maps to a real component in the Engram architecture.
      </p>

      {/* Component map */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', marginBottom: '24px' }}>
        {[
          {
            name: 'CORE HUB (Elephant)',
            color: '#00f2ff',
            desc: 'The single Go binary. All MCP tools, HTTP API, CLI, and TUI run from this one executable. Zero external dependencies.',
          },
          {
            name: 'PERSISTENCE VAULT',
            color: '#00f2ff',
            desc: 'SQLite database (~/.engram/engram.db). WAL mode enabled for concurrent reads. Stores observations, sessions, prompts, and project metadata.',
          },
          {
            name: 'SEARCH TOWER',
            color: '#00f2ff',
            desc: 'FTS5 full-text search engine. Tokenizes all observation content for fast retrieval. Powers mem_search and mem_context.',
          },
          {
            name: 'TUI TERMINAL',
            color: '#00f2ff',
            desc: 'Interactive terminal UI (engram tui). Vim-style navigation with j/k, search with /, drill-in with Enter. Catppuccin Mocha theme.',
          },
          {
            name: 'MCP ANTENNA',
            color: '#00f2ff',
            desc: 'MCP server (stdio transport). The universal interface that lets any MCP-compatible agent connect. Exposes all 15 tools automatically.',
          },
        ].map((comp) => (
          <div key={comp.name} style={{ padding: '12px', border: '1px solid #222222', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: comp.color, letterSpacing: '0.06em', fontWeight: 700, marginBottom: '4px' }}>
              {comp.name}
            </div>
            <div style={{ fontSize: '12px', color: '#999999', fontFamily: "'Space Grotesk', system-ui", lineHeight: 1.5 }}>
              {comp.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Supported agents */}
      <div style={labelStyle}>SUPPORTED AGENTS</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
        {['Claude Code', 'OpenCode', 'Gemini CLI', 'Codex', 'VS Code (Copilot)', 'Antigravity', 'Cursor', 'Windsurf'].map((a) => (
          <span key={a} style={{
            padding: '3px 10px',
            border: '1px solid #333333',
            borderRadius: '999px',
            fontSize: '10px',
            color: '#999999',
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '0.04em',
          }}>
            {a}
          </span>
        ))}
      </div>
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
  fontSize: '13px', lineHeight: 1.6, color: '#999999',
}
