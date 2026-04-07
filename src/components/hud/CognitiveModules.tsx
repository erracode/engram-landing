import { useMemoryStore } from '../../stores/memoryStore'

const modules = [
  { name: 'mem_save', usage: 84 },
  { name: 'mem_search', usage: 62 },
  { name: 'mem_context', usage: 100 },
  { name: 'mem_timeline', usage: 51 },
]

export function CognitiveModules() {
  const totalMemories = useMemoryStore((state) => state.totalMemories)

  return (
    <div className="w-64 bg-black/80 backdrop-blur-sm border border-border rounded-lg p-3 font-mono text-xs">
      <div className="text-text-secondary uppercase tracking-wider text-label mb-3">
        Cognitive Modules
      </div>

      <div className="mb-3 pb-2 border-b border-border">
        <div className="text-text-secondary text-[10px]">Total Memories</div>
        <div className="text-cyan-neon text-lg font-bold">{totalMemories}</div>
      </div>

      <div className="space-y-2.5">
        {modules.map((mod) => (
          <div key={mod.name}>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-text-primary">{mod.name}</span>
              <span className="text-text-secondary">{mod.usage}%</span>
            </div>
            <div className="flex gap-0.5 h-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 ${
                    i < mod.usage / 10 ? 'bg-cyan-neon' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
