import { Terminal } from 'lucide-react'

export function TuiWindowContent() {
  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6 text-center">
        <Terminal size={32} className="text-[#bc13fe] mx-auto mb-4" />
        <h2 className="text-2xl font-mono text-[#ffffff] mb-2 tracking-tight">Terminal UI</h2>
        <p className="text-[#999999] mb-4 text-sm leading-relaxed">
          <code className="bg-[#000] text-[#00f2ff] px-1 rounded">engram tui</code> launches a beautiful terminal UI. Navigate, search, and explore memories with vim keys.
        </p>
      </div>

      <div className="border border-[#222222] p-4 bg-[#111111]">
        <h3 className="font-mono text-sm text-[#2596be] mb-3">Interactive Workspace</h3>
        <div className="bg-[#000000] p-4 border border-[#333333] font-mono text-xs text-[#888] flex flex-col gap-2">
          <div className="flex justify-between text-[#00f2ff] border-b border-[#333] pb-2 mb-2">
            <span>ENGRAM THE BRAIN</span>
            <span>v1.11.0</span>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/3 border-r border-[#333] pr-4 space-y-1">
              <div className="text-[#e8e8e8] bg-[#222] px-1">▸ #118 [architecture]</div>
              <div className="px-1 text-[#666]">  #117 [bugfix]</div>
              <div className="px-1 text-[#666]">  #116 [decision]</div>
            </div>
            <div className="w-2/3 pl-2 space-y-2">
              <div className="text-[#ffffff]">Refined sync boundary for memory export</div>
              <div className="text-[#999999]">
                What: consolidated chunk writes and reduced duplicate export passes...
              </div>
            </div>
          </div>
          
          <div className="text-[#4a9e5c] border-t border-[#333] pt-2 mt-2">
            j/k navigate • enter select • / search • q quit
          </div>
        </div>
      </div>
    </div>
  )
}
