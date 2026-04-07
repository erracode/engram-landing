import { Terminal, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const agents = [
  { name: 'Claude Code', command: 'claude plugin marketplace add Gentleman-Programming/engram && claude plugin install engram' },
  { name: 'OpenCode', command: 'engram setup opencode' },
  { name: 'Gemini CLI', command: 'engram setup gemini-cli' },
  { name: 'Codex', command: 'engram setup codex' },
  { name: 'VS Code', command: 'code --add-mcp \'{"name":"engram","command":"engram","args":["mcp"]}\'\'' },
  { name: 'Cursor / Windsurf', command: 'See docs/AGENT-SETUP.md' },
]

export function QuickStart() {
  return (
    <div id="install" className="pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-label text-cyan-neon mb-2">QUICK START</div>
        <h2 className="text-display-md text-text-display mb-8">Installation</h2>

        <div className="bg-surface border border-border rounded-lg p-4 mb-12">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-neon" />
              <span className="font-mono text-xs text-text-secondary">Terminal</span>
            </div>
            <CopyButton text="brew install gentleman-programming/tap/engram" />
          </div>
          <code className="font-mono text-sm text-text-primary">
            $ brew install gentleman-programming/tap/engram
          </code>
        </div>

        <h3 className="text-heading text-text-display mb-6">Setup Your Agent</h3>

        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-text-secondary text-label">Agent</th>
                <th className="text-left py-3 px-4 text-text-secondary text-label">One-liner</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.name} className="border-b border-border hover:bg-surface-raised/50 transition-colors">
                  <td className="py-3 px-4 text-text-primary">{agent.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <code className="text-cyan-neon text-[11px]">{agent.command}</code>
                      {agent.command !== 'See docs/AGENT-SETUP.md' && (
                        <CopyButton text={agent.command} small />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-4 bg-surface border border-border rounded-lg">
          <p className="text-text-secondary text-sm font-mono">
            That's it. <span className="text-cyan-neon">No Node.js</span>, <span className="text-cyan-neon">no Python</span>, <span className="text-cyan-neon">no Docker</span>. One binary, one SQLite file.
          </p>
        </div>
      </div>
    </div>
  )
}

function CopyButton({ text, small }: { text: string; small?: boolean }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className={`text-text-disabled hover:text-text-primary transition-colors ${small ? 'p-1' : 'p-2'}`}
    >
      {copied ? <Check className={`${small ? 'w-3 h-3' : 'w-4 h-4'} text-success`} /> : <Copy className={`${small ? 'w-3 h-3' : 'w-4 h-4'}`} />}
    </button>
  )
}
