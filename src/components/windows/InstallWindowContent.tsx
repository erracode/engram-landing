import { Terminal } from 'lucide-react'

export function InstallWindowContent() {
  const agents = [
    { name: 'Claude Code', cmd: 'claude plugin marketplace add Gentleman-Programming/engram && claude plugin install engram' },
    { name: 'OpenCode', cmd: 'engram setup opencode' },
    { name: 'Gemini CLI', cmd: 'engram setup gemini-cli' },
    { name: 'Codex', cmd: 'engram setup codex' },
    { name: 'VS Code', cmd: "code --add-mcp '{\"name\":\"engram\",\"command\":\"engram\",\"args\":[\"mcp\"]}'" },
    { name: 'Cursor / Windsurf', cmd: 'See docs/AGENT-SETUP.md' },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6 text-center">
        <h2 className="text-2xl font-mono text-[#ffffff] mb-2 tracking-tight">Installation</h2>
        <p className="text-[#999999] mb-4">Single binary — Zero dependencies</p>
        <p className="text-[#999999] mb-4 text-sm">
          Persistent memory for AI coding agents. Agent-agnostic, SQLite + FTS5, a single Go binary.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <div className="bg-[#000000] border border-[#333333] p-4 font-mono text-[#2596be] flex items-center justify-between gap-3 group relative cursor-pointer" onClick={() => copyToClipboard('brew install gentleman-programming/tap/engram')}>
            <div className="flex items-center gap-3">
              <Terminal size={18} className="text-[#999999]" />
              <span>$ brew install gentleman-programming/tap/engram</span>
            </div>
            <button className="text-xs text-[#666666] group-hover:text-[#ffffff] transition-colors">[COPY]</button>
          </div>
          <span className="text-xs text-[#666] block mt-1">Also available for Windows & Mac/Linux</span>
        </div>
      </div>
      
      <div className="border border-[#222222] p-4 bg-[#111111] overflow-hidden">
        <h3 className="font-mono text-sm text-[#2596be] mb-4 uppercase tracking-widest">Connect Your Agent</h3>
        
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-[#222222] text-[#666666]">
              <th className="pb-2 font-normal">AGENT</th>
              <th className="pb-2 font-normal">COMMAND</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(a => (
              <tr key={a.name} className="border-b border-[#1a1a1a]">
                <td className="py-3 text-[#e8e8e8] whitespace-nowrap pr-4">{a.name}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(a.cmd)}>
                    <code className="text-[#00f2ff] text-[10px] break-all">{a.cmd}</code>
                    {!a.cmd.startsWith('See') && <span className="text-[10px] text-[#666] group-hover:text-[#fff]">[COPY]</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-[#222222] p-4 bg-[#111111] flex items-center justify-center">
         <span className="font-mono text-xs text-[#999999]">
           That's it. <span className="text-[#00f2ff]">No Node.js</span>, <span className="text-[#00f2ff]">no Python</span>, <span className="text-[#00f2ff]">no Docker</span>. One binary, one SQLite file.
         </span>
      </div>
    </div>
  )
}
