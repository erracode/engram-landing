const tools = [
  { name: 'mem_save', desc: 'Save observation' },
  { name: 'mem_update', desc: 'Update by ID' },
  { name: 'mem_delete', desc: 'Soft or hard delete' },
  { name: 'mem_search', desc: 'Full-text search' },
  { name: 'mem_context', desc: 'Recent session context' },
  { name: 'mem_timeline', desc: 'Chronological drill-in' },
  { name: 'mem_suggest_topic_key', desc: 'Stable key for evolving topics' },
  { name: 'mem_session_summary', desc: 'End-of-session save' },
  { name: 'mem_session_start', desc: 'Register session start' },
  { name: 'mem_session_end', desc: 'Mark session complete' },
  { name: 'mem_get_observation', desc: 'Full content by ID' },
  { name: 'mem_save_prompt', desc: 'Save user prompt' },
  { name: 'mem_stats', desc: 'Memory statistics' },
  { name: 'mem_capture_passive', desc: 'Extract learnings from text' },
  { name: 'mem_merge_projects', desc: 'Merge project name variants' },
]

export function MCPTools() {
  return (
    <div id="tools" className="pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-label text-cyan-neon mb-2">MCP TOOLS</div>
        <h2 className="text-display-md text-text-display mb-12">15 tools. Zero config.</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-surface border border-border rounded-lg p-4 hover:border-cyan-neon/30 transition-colors group"
            >
              <div className="font-mono text-sm text-cyan-neon mb-1 group-hover:glow-cyan">
                {tool.name}
              </div>
              <div className="text-text-secondary text-xs">{tool.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
