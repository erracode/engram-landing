import { Check, Zap, Bot, Code2, MousePointer2, Wind, Terminal } from 'lucide-react'

export function AgentsWindowContent() {
  const agents = [
    { name: 'Claude Code', method: 'Plugin marketplace: claude plugin install engram', icon: '🤖' },
    { name: 'OpenCode', method: 'Built-in setup: engram setup opencode', icon: '⚡' },
    { name: 'Gemini CLI', method: 'Built-in setup: engram setup gemini-cli', icon: '✨' },
    { name: 'Codex', method: 'Built-in setup: engram setup codex', icon: '🧠' },
    { name: 'VS Code', method: "MCP config: code --add-mcp '...'", icon: '💻' },
    { name: 'Cursor', method: 'MCP compatible: See agent docs', icon: '🖱️' },
    { name: 'Windsurf', method: 'MCP compatible: See agent docs', icon: '🏄' },
  ]

  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6 flex items-start gap-4">
        <div className="p-3 bg-[#000000] border border-[#333333] hidden sm:block">
          <Zap width={32} height={32} className="text-[#bc13fe]" />
        </div>
        <div>
          <h2 className="text-xl font-mono text-[#ffffff] mb-2">Works with every agent you already use.</h2>
          <p className="text-[#999999] text-sm">Standard MCP protocol. If it speaks MCP, it works with Engram.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent, i) => (
          <div key={i} className="border border-[#222222] p-4 bg-[#111111] hover:border-[#333333] transition-colors cursor-default">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{agent.icon}</span>
                <span className="font-mono text-sm font-bold">{agent.name}</span>
              </div>
              <Check size={16} className="text-[#4A9E5C]" />
            </div>
            <p className="font-mono text-xs text-[#999999] opacity-80">{agent.method}</p>
          </div>
        ))}
        
        <div className="border border-[#222222] p-4 bg-[#111111] flex flex-col justify-center items-center text-center">
          <Terminal width={24} height={24} className="text-[#2596be] mb-2" />
          <span className="font-mono text-sm font-bold">Any MCP Agent</span>
          <p className="font-mono text-xs text-[#999999] opacity-80">Standard protocol: engram mcp</p>
        </div>
      </div>
    </div>
  )
}
