import { useMemoryStore } from '../../stores/memoryStore'

const agents = [
  { name: 'Claude Code', icon: '🤖' },
  { name: 'OpenCode', icon: '🤖' },
  { name: 'Gemini CLI', icon: '🤖' },
  { name: 'Codex', icon: '🤖' },
]

export function ConnectedAgents() {
  const activeAgents = useMemoryStore((state) => state.activeAgents)

  return (
    <div className="w-64 bg-black/80 backdrop-blur-sm border border-border rounded-lg p-3 font-mono text-xs">
      <div className="text-text-secondary uppercase tracking-wider text-label mb-3">
        Connected Agents
      </div>
      <div className="space-y-2">
        {agents.map((agent) => {
          const isActive = activeAgents.includes(agent.name)
          return (
            <div key={agent.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px]">{agent.icon}</span>
                <span className="text-text-primary text-[11px]">{agent.name}</span>
              </div>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isActive
                    ? 'bg-success/20 text-success'
                    : 'bg-text-disabled/20 text-text-disabled'
                }`}
              >
                {isActive ? 'active' : 'idle'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
