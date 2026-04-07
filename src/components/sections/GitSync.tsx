import { GitBranch, CheckCircle } from 'lucide-react'

const commands = [
  { cmd: 'engram sync', desc: 'Export new memories as compressed chunk' },
  { cmd: 'git add .engram/ && git commit', desc: 'Commit the sync chunk' },
  { cmd: 'engram sync --import', desc: 'On another machine: import new chunks' },
  { cmd: 'engram sync --status', desc: 'Check sync status' },
]

export function GitSync() {
  return (
    <div id="sync" className="pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-label text-purple-neon mb-2">GIT SYNC</div>
        <h2 className="text-display-md text-text-display mb-4">
          Share memories across machines
        </h2>
        <p className="text-text-secondary mb-12 max-w-lg">
          Uses compressed chunks — no merge conflicts, no huge files. Just git push and pull.
        </p>

        <div className="space-y-4">
          {commands.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center">
                {i < commands.length - 1 ? (
                  <span className="text-text-secondary font-mono text-xs">{i + 1}</span>
                ) : (
                  <CheckCircle className="w-4 h-4 text-success" />
                )}
              </div>
              <div className="flex-1">
                <code className="font-mono text-sm text-cyan-neon block mb-1">{item.cmd}</code>
                <span className="text-text-secondary text-xs">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
