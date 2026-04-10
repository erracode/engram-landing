import { Star, GitPullRequest } from 'lucide-react'
import { Users, Heart } from 'pixelarticons/react'

export function SocialProofContent() {
  return (
    <div className="space-y-4 text-[#e8e8e8]">
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[#222222] p-4 bg-[#111111] flex flex-col items-center justify-center text-center">
          <Star width={24} height={24} className="text-[#d4a843] mb-2" />
          <span className="font-mono text-xl font-bold">2.4k</span>
          <span className="font-mono text-xs text-[#999999]">STARS</span>
        </div>
        <div className="border border-[#222222] p-4 bg-[#111111] flex flex-col items-center justify-center text-center">
          <GitPullRequest width={24} height={24} className="text-[#2596be] mb-2" />
          <span className="font-mono text-xl font-bold">254</span>
          <span className="font-mono text-xs text-[#999999]">FORKS</span>
        </div>
        <div className="border border-[#222222] p-4 bg-[#111111] flex flex-col items-center justify-center text-center">
          <Users width={24} height={24} className="text-[#bc13fe] mb-2" />
          <span className="font-mono text-xl font-bold">12</span>
          <span className="font-mono text-xs text-[#999999]">CONTRIBUTORS</span>
        </div>
        <div className="border border-[#222222] p-4 bg-[#111111] flex flex-col items-center justify-center text-center">
          <Heart width={24} height={24} className="text-[#d71921] mb-2" />
          <span className="font-mono text-xl font-bold">MIT</span>
          <span className="font-mono text-xs text-[#999999]">LICENSE</span>
        </div>
      </div>
      
      <div className="border border-[#222222] p-3 bg-[#111111] text-center">
        <p className="font-mono text-xs text-[#999999]">
          Built in public. Actively maintained.<br />
          Open for everyone.
        </p>
      </div>

      <div className="pt-2">
        <a 
          href="https://github.com/Gentleman-Programming/engram" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#ffffff] text-[#000000] font-mono text-xs font-bold transition-all hover:bg-[#e8e8e8]"
        >
          STAR ON GITHUB
        </a>
      </div>
    </div>
  )
}
