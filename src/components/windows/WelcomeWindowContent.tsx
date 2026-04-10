import { Download, Terminal } from 'lucide-react'

export function WelcomeWindowContent() {
  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #bc13fe 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        <h2 className="text-2xl font-mono text-[#ffffff] mb-1 tracking-tight" style={{ fontFamily: "'Doto', monospace" }}>ENGRAM</h2>
        <p className="text-[#666] text-[10px] uppercase tracking-[0.2em] mb-4">An elephant never forgets.</p>
        
        <div className="mb-6 max-w-lg mx-auto">
          <p className="text-xs italic text-[#999] mb-2">
            <strong>engram</strong> <span className="text-[#666]">/ˈen.ɡræm/</span> — <span className="text-[#00f2ff]">neuroscience</span>: the physical trace of a memory in the brain.
          </p>
          <p className="text-sm text-[#e8e8e8] leading-relaxed">
            Your AI coding agent forgets everything when the session ends.<br/>
            <strong>Engram gives it a brain.</strong>
          </p>
        </div>

        <div 
          className="bg-[#000000] border border-[#333333] p-4 font-mono text-[#2596be] flex items-center justify-between gap-3 group cursor-pointer relative z-10"
          onClick={() => {
            navigator.clipboard.writeText('brew install gentleman-programming/tap/engram');
          }}
        >
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-[#999999]" />
            <span className="text-sm">$ brew install gentleman-programming/tap/engram</span>
          </div>
          <button className="text-[10px] text-[#666] group-hover:text-white transition-colors">[COPY]</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-[#222222] p-4 bg-[#111111]">
          <h3 className="font-mono text-sm text-[#2596be] mb-2">[01] The Problem</h3>
          <p className="text-sm text-[#999999]">Every time you start a new session, your AI has zero context. The bugs you fixed yesterday, the architecture you settled on... gone. You repeat yourself endlessly.</p>
        </div>
        <div className="border border-[#222222] p-4 bg-[#111111]">
          <h3 className="font-mono text-sm text-[#2596be] mb-2">[02] The Solution</h3>
          <p className="text-sm text-[#999999]">Engram gives your agent a persistent SQLite + FTS5 memory vault. It searches past memories before making changes so you never start from zero again.</p>
        </div>
      </div>

      <div className="border border-[#222222] p-4 bg-[#111111] flex items-center justify-between">
        <span className="font-mono text-xs text-[#999999]">Agent-agnostic. Single binary. Zero dependencies.</span>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] text-[#000000] rounded-full font-mono text-xs font-bold transition-all hover:bg-[#e8e8e8]">
          <Download size={14} /> INSTALL NOW
        </button>
      </div>
    </div>
  )
}
