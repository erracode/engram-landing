import { Window } from '../ui/Window'

const docs = [
  { name: 'Installation', file: 'docs/INSTALLATION.md', desc: 'All install methods + platform support' },
  { name: 'Agent Setup', file: 'docs/AGENT-SETUP.md', desc: 'Per-agent configuration + Memory Protocol' },
  { name: 'Architecture', file: 'docs/ARCHITECTURE.md', desc: 'How it works + MCP tools + project structure' },
  { name: 'Plugins', file: 'docs/PLUGINS.md', desc: 'OpenCode & Claude Code plugin details' },
  { name: 'Comparison', file: 'docs/COMPARISON.md', desc: 'Why Engram vs claude-mem' },
  { name: 'Contributing', file: 'CONTRIBUTING.md', desc: 'Contribution workflow + standards' },
  { name: 'Full Docs', file: 'DOCS.md', desc: 'Complete technical reference' },
]

const cliCommands = [
  { cmd: 'engram setup [agent]', desc: 'Install agent integration' },
  { cmd: 'engram serve [port]', desc: 'Start HTTP API (default: 7437)' },
  { cmd: 'engram mcp', desc: 'Start MCP server (stdio)' },
  { cmd: 'engram tui', desc: 'Launch terminal UI' },
  { cmd: 'engram search <query>', desc: 'Search memories' },
  { cmd: 'engram save <title> <msg>', desc: 'Save a memory' },
  { cmd: 'engram sync', desc: 'Git sync export' },
  { cmd: 'engram stats', desc: 'Memory statistics' },
  { cmd: 'engram export [file]', desc: 'Export to JSON' },
  { cmd: 'engram import <file>', desc: 'Import from JSON' },
  { cmd: 'engram version', desc: 'Show version' },
]

export function DocsWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="docs" title="DOCUMENTATION" onClose={onClose} defaultPosition={{ x: 180, y: 65 }} width={560} maxHeight={580}>
      {/* Doc links */}
      <div style={{ marginBottom: '24px' }}>
        <div style={labelStyle}>DOCUMENTATION INDEX</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {docs.map((d) => (
            <a
              key={d.name}
              href={`https://github.com/Gentleman-Programming/engram/blob/main/${d.file}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                border: '1px solid #1a1a1a',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'border-color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333333' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
            >
              <span style={{ fontSize: '12px', color: '#00f2ff' }}>{d.name}</span>
              <span style={{ fontSize: '10px', color: '#666666' }}>{d.desc}</span>
            </a>
          ))}
        </div>
      </div>

      {/* CLI reference */}
      <div>
        <div style={labelStyle}>CLI QUICK REFERENCE</div>
        <div style={{ border: '1px solid #222222', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Space Mono', monospace", fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333333' }}>
                <th style={thStyle}>COMMAND</th>
                <th style={thStyle}>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {cliCommands.map((c, i) => (
                <tr key={c.cmd} style={{ borderBottom: i < cliCommands.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                  <td style={{ padding: '5px 10px', color: '#00f2ff', whiteSpace: 'nowrap', fontSize: '10px' }}>{c.cmd}</td>
                  <td style={{ padding: '5px 10px', color: '#999999', fontSize: '10px' }}>{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Window>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px', fontWeight: 700, color: '#666666',
  letterSpacing: '0.1em', textTransform: 'uppercase',
  marginBottom: '8px', fontFamily: "'Space Mono', monospace",
}

const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '8px 10px', color: '#666666',
  fontSize: '10px', letterSpacing: '0.1em', fontWeight: 700,
}
