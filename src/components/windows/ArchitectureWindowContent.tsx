import { Database, Search, FolderSync, TerminalSquare, ToyBrick, History } from 'lucide-react'

export function ArchitectureWindowContent() {
  const features = [
    { icon: <TerminalSquare size={20} className="text-[#00f2ff]" />, title: 'CLI & TUI', desc: 'Interactive terminal UI with Bubbletea for browsing memories, plus full CLI for scripting and automation.' },
    { icon: <ToyBrick size={20} className="text-[#bc13fe]" />, title: 'HTTP API & MCP Server', desc: 'REST API on port 7437 plus MCP stdio transport. Works with Claude Code, Cursor, OpenCode, and any MCP-compatible agent.' },
    { icon: <Search size={20} className="text-[#00f2ff]" />, title: 'Full-Text Search (FTS5)', desc: 'Search across all memories with type, project, and scope filters. Find decisions, bugfixes, and patterns instantly.' },
    { icon: <History size={20} className="text-[#bc13fe]" />, title: 'Timeline & Context', desc: 'Progressive disclosure pattern. Start with search, drill into timeline, then get full observation details.' },
    { icon: <FolderSync size={20} className="text-[#00f2ff]" />, title: 'Git Sync', desc: 'Share memories through git with chunked sync. Team members clone the repo and get shared context automatically.' },
    { icon: <Database size={20} className="text-[#bc13fe]" />, title: 'Privacy Tags', desc: 'Strip sensitive data with <private> tags. Redacted at two layers: plugin and store. Defense in depth.' }
  ]

  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6 text-left">
        <h2 className="text-2xl font-mono text-[#ffffff] mb-2 tracking-tight">Everything you need, nothing you don't.</h2>
        <p className="text-[#999999] mb-4 text-sm leading-relaxed">
          Six powerful features designed for AI coding agents. Multiple interfaces, powerful search, and team collaboration.
          Designed for developers who value their time and tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {features.map((f, i) => (
          <div key={i} className="border border-[#222222] p-4 bg-[#111111] flex gap-4">
            <div className="shrink-0 mt-1 p-2 bg-[#000000] border border-[#333333] rounded">
              {f.icon}
            </div>
            <div>
              <h3 className="font-mono text-sm text-[#ffffff] mb-1">{f.title}</h3>
              <p className="text-xs text-[#999999] leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
