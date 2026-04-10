import { BrainCircuit } from 'lucide-react'

export function KernelWindowContent() {
  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6 text-center">
        <BrainCircuit size={48} className="text-[#bc13fe] mx-auto mb-4" />
        <h2 className="text-3xl font-mono text-[#ffffff] mb-2 tracking-tight">ENGRAM</h2>
        <p className="text-[#00f2ff] mb-4 text-sm font-mono tracking-widest uppercase">
          /ˈen.ɡræm/ — the physical trace of memory
        </p>
        <p className="text-[#999999] text-sm leading-relaxed max-w-md mx-auto">
          Your AI forgets everything. We give it a brain. One binary. One SQLite file. Zero dependencies.
        </p>
      </div>

      <div className="border border-[#222222] p-6 bg-[#111111] grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-mono text-sm text-[#d71921] mb-3 uppercase tracking-widest border-b border-[#333] pb-2">Without Engram</h3>
          <ul className="space-y-3 text-sm text-[#999]">
            <li className="flex flex-col gap-1">
              <strong className="text-[#e8e8e8]">Lost Context</strong>
              <span>Your AI starts every session blank. No memory of previous decisions, patterns, or discussions.</span>
            </li>
            <li className="flex flex-col gap-1">
              <strong className="text-[#e8e8e8]">Repeated Work</strong>
              <span>The same bugs get fixed multiple times. Solutions are rediscovered instead of reused.</span>
            </li>
            <li className="flex flex-col gap-1">
              <strong className="text-[#e8e8e8]">No Continuity</strong>
              <span>Context from Monday's work is gone by Tuesday. Every conversation starts from zero.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-sm text-[#4a9e5c] mb-3 uppercase tracking-widest border-b border-[#333] pb-2">With Engram</h3>
          <ul className="space-y-3 text-sm text-[#999]">
            <li className="flex flex-col gap-1">
              <strong className="text-[#e8e8e8]">Engram connects your memories</strong>
              <span>Engram gives your AI agents persistent memory across sessions. Built as a single Go binary with SQLite + FTS5.</span>
            </li>
            <li className="text-[#00f2ff] font-mono mt-2 bg-[#000] p-2 border border-[#333] inline-block">
              {'>'} Loading 24 memories... <br/>{'>'} Session context restored.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
