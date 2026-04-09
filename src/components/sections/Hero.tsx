import { Suspense } from 'react'
import { MemorySimulator } from '../simulator/MemorySimulator'

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pointer-events-none bg-[#000000]">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-[#000000] flex items-center justify-center">
            <div className="font-mono text-[11px] text-[#999999] uppercase tracking-[0.08em]">[LOADING...]</div>
          </div>
        }>
          <MemorySimulator />
        </Suspense>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center pointer-events-auto">
        <p className="font-mono text-[11px] text-[#999999] uppercase tracking-[0.08em] mb-[16px]">
          PERSISTENT MEMORY FOR AI CODING AGENTS
        </p>
        <h1 className="font-['Doto'] text-[48px] leading-[1.05] text-[#ffffff] tracking-tight mb-[16px]">
          engram
        </h1>
        <p className="font-['Space_Grotesk'] text-[16px] leading-[1.5] text-[#999999] mb-[32px]">
          Agent-agnostic. Single binary. Zero dependencies.
        </p>

        <div className="flex flex-row gap-[16px]">
          <button className="font-mono text-[13px] uppercase tracking-[0.06em] bg-[#ffffff] text-[#000000] rounded-[999px] px-[24px] py-[12px] min-h-[44px]">
            GET STARTED
          </button>
          
          <button className="font-mono text-[13px] uppercase tracking-[0.06em] bg-transparent text-[#e8e8e8] border border-[#333333] rounded-[999px] px-[24px] py-[12px] min-h-[44px]">
            VIEW DOCS
          </button>
        </div>
      </div>
    </section>
  )
}

