const steps = [
  {
    num: '01',
    title: 'Agent completes work',
    desc: 'Your AI agent finishes a significant task — bugfix, architecture decision, new feature.',
    color: 'cyan-neon',
  },
  {
    num: '02',
    title: 'Agent calls mem_save',
    desc: 'The agent calls the MCP tool with title, type, and structured What/Why/Where/Learned context.',
    color: 'cyan-neon',
  },
  {
    num: '03',
    title: 'Engram persists to SQLite',
    desc: 'Data is saved to ~/.engram/engram.db with FTS5 full-text search indexing for instant retrieval.',
    color: 'purple-neon',
  },
  {
    num: '04',
    title: 'Next session: memory restored',
    desc: 'The agent searches memory, gets relevant context, and continues exactly where it left off.',
    color: 'purple-neon',
  },
]

export function HowItWorks() {
  return (
    <div id="how-it-works" className="pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-label text-cyan-neon mb-2">HOW IT WORKS</div>
        <h2 className="text-display-md text-text-display mb-16">
          Your agent forgets.<br />Engram gives it a brain.
        </h2>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-6 group">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-lg border border-border flex items-center justify-center font-mono text-sm ${
                  step.color === 'cyan-neon' ? 'text-cyan-neon' : 'text-purple-neon'
                }`}>
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-12 bg-border mx-auto mt-2" />
                )}
              </div>
              <div className="pt-1">
                <h3 className="text-heading text-text-display mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm max-w-md">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
