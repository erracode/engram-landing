import { Window } from '../ui/Window'

const tools = [
  { name: 'mem_save', desc: 'Save observation' },
  { name: 'mem_update', desc: 'Update by ID' },
  { name: 'mem_delete', desc: 'Soft or hard delete' },
  { name: 'mem_suggest_topic_key', desc: 'Stable key for evolving topics' },
  { name: 'mem_search', desc: 'Full-text search' },
  { name: 'mem_session_summary', desc: 'End-of-session save' },
  { name: 'mem_context', desc: 'Recent session context' },
  { name: 'mem_timeline', desc: 'Chronological drill-in' },
  { name: 'mem_get_observation', desc: 'Full content by ID' },
  { name: 'mem_save_prompt', desc: 'Save user prompt' },
  { name: 'mem_stats', desc: 'Memory statistics' },
  { name: 'mem_session_start', desc: 'Register session start' },
  { name: 'mem_session_end', desc: 'Mark session complete' },
  { name: 'mem_capture_passive', desc: 'Extract learnings from output' },
  { name: 'mem_merge_projects', desc: 'Merge project name variants' },
]

export function ToolsWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window id="tools" title="MCP TOOLS" onClose={onClose} defaultPosition={{ x: 200, y: 70 }} width={520} maxHeight={560}>
      <div style={labelStyle}>15 MCP TOOLS</div>
      <p style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: '13px', color: '#999999', marginBottom: '16px' }}>
        Every tool is exposed via MCP stdio. Your agent discovers them automatically.
      </p>

      <div style={{ border: '1px solid #222222', borderRadius: '4px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Space Mono', monospace", fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333333' }}>
              <th style={thStyle}>TOOL</th>
              <th style={thStyle}>PURPOSE</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t, i) => (
              <tr key={t.name} style={{ borderBottom: i < tools.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                <td style={{ padding: '6px 10px', color: '#00f2ff', whiteSpace: 'nowrap' }}>{t.name}</td>
                <td style={{ padding: '6px 10px', color: '#999999' }}>{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
