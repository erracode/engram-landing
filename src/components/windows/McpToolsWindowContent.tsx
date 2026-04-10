import { TerminalSquare } from 'lucide-react'

export function McpToolsWindowContent() {
  const tools = [
    'mem_save', 'mem_search', 'mem_context', 'mem_session_summary', 'mem_timeline'
  ]

  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6">
        <h2 className="text-xl font-mono text-[#ffffff] mb-2 tracking-tight">15 MCP Tools</h2>
        <p className="text-[#999999] mb-4 text-sm leading-relaxed">
          Standard MCP protocol — plug in and go. Three simple MCP tools give your agent everything it needs: save memories, search them, and explore timeline context.
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tools.map(tool => (
            <span key={tool} className="px-2 py-1 bg-[#000000] border border-[#333333] text-[#00f2ff] font-mono text-xs rounded">
              {tool}
            </span>
          ))}
          <span className="px-2 py-1 bg-[#111] border border-[#222] text-[#666] font-mono text-xs rounded">
            + 10 more
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="border border-[#222222] p-4 bg-[#111111]">
          <h3 className="font-mono text-sm text-[#bc13fe] mb-2">[01] Save memories</h3>
          <p className="text-xs text-[#999999] mb-3">Agent saves a decision after implementing auth.</p>
          <div className="bg-[#000000] p-3 border border-[#333333] font-mono text-xs text-[#888] overflow-x-auto">
            <span className="text-[#e8e8e8]">await</span> <span className="text-[#2596be]">mem_save</span>({'{'}<br/>
            &nbsp;&nbsp;title: <span className="text-[#4a9e5c]">"Switched from sessions to JWT"</span>,<br/>
            &nbsp;&nbsp;type: <span className="text-[#4a9e5c]">"decision"</span>,<br/>
            &nbsp;&nbsp;project: <span className="text-[#4a9e5c]">"my-project"</span><br/>
            {'}'});
          </div>
        </div>

        <div className="border border-[#222222] p-4 bg-[#111111]">
          <h3 className="font-mono text-sm text-[#bc13fe] mb-2">[02] Search across all memories</h3>
          <p className="text-xs text-[#999999] mb-3">Agent searches for previous auth decisions.</p>
          <div className="bg-[#000000] p-3 border border-[#333333] font-mono text-xs text-[#888] overflow-x-auto">
            <span className="text-[#e8e8e8]">await</span> <span className="text-[#2596be]">mem_search</span>({'{'}<br/>
            &nbsp;&nbsp;query: <span className="text-[#4a9e5c]">"JWT auth middleware"</span>,<br/>
            &nbsp;&nbsp;type: <span className="text-[#4a9e5c]">"decision"</span><br/>
            {'}'});
          </div>
        </div>

        <div className="border border-[#222222] p-4 bg-[#111111]">
          <h3 className="font-mono text-sm text-[#bc13fe] mb-2">[03] Explore timeline context</h3>
          <p className="text-xs text-[#999999] mb-3">Agent drills into chronological context.</p>
          <div className="bg-[#000000] p-3 border border-[#333333] font-mono text-xs text-[#888] overflow-x-auto">
            <span className="text-[#e8e8e8]">await</span> <span className="text-[#2596be]">mem_timeline</span>({'{'}<br/>
            &nbsp;&nbsp;observation_id: <span className="text-[#bc13fe]">42</span>,<br/>
            &nbsp;&nbsp;before: <span className="text-[#bc13fe]">5</span>,<br/>
            &nbsp;&nbsp;after: <span className="text-[#bc13fe]">5</span><br/>
            {'}'});
          </div>
        </div>
      </div>
    </div>
  )
}
