import { FolderSync } from 'lucide-react'

export function SyncWindowContent() {
  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="border border-[#222222] bg-[#111111] p-6 text-center">
        <FolderSync size={32} className="text-[#2596be] mx-auto mb-4" />
        <h2 className="text-2xl font-mono text-[#ffffff] mb-2 tracking-tight">Git Sync</h2>
        <p className="text-[#999999] mb-4 text-sm leading-relaxed">
          Share memories across machines with <code className="bg-[#000] text-[#00f2ff] px-1 rounded">engram sync</code>. Uses compressed chunks — no merge conflicts, no huge files.
        </p>
      </div>

      <div className="border border-[#222222] p-4 bg-[#111111]">
        <h3 className="font-mono text-sm text-[#bc13fe] mb-3">Export Memories</h3>
        <div className="bg-[#000000] p-3 border border-[#333333] font-mono text-xs text-[#888]">
          <span className="text-[#666]">$</span> <span className="text-[#e8e8e8]">engram sync</span><br/>
          <span className="text-[#2596be]"># exported 3 new memories →</span><br/><br/>
          <span className="text-[#666]">$</span> <span className="text-[#e8e8e8]">git commit -m "sync engram"</span>
        </div>
      </div>

      <div className="border border-[#222222] p-4 bg-[#111111]">
        <h3 className="font-mono text-sm text-[#bc13fe] mb-3">Import Memories</h3>
        <div className="bg-[#000000] p-3 border border-[#333333] font-mono text-xs text-[#888]">
          <span className="text-[#666]">$</span> <span className="text-[#e8e8e8]">engram sync --import</span><br/>
          <span className="text-[#4a9e5c]"># ✓ imported 3 memories</span><br/>
        </div>
      </div>
    </div>
  )
}
