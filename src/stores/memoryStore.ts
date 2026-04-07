import { create } from 'zustand'

export interface MemoryLog {
  id: string
  type: string
  message: string
  status: 'success' | 'pending' | 'error'
  timestamp: number
}

interface MemoryStore {
  logs: MemoryLog[]
  totalMemories: number
  activeAgents: string[]
  activeWindow: string | null
  addLog: (log: Omit<MemoryLog, 'id' | 'timestamp'>) => void
  incrementMemories: () => void
  setAgents: (agents: string[]) => void
  setActiveWindow: (window: string | null) => void
}

const SAMPLE_LOGS = [
  { type: 'mem_save', message: 'architecture-decision: zustand state', status: 'success' as const },
  { type: 'mem_search', message: 'query: "MCP server setup"', status: 'success' as const },
  { type: 'mem_save', message: 'bugfix: auth middleware token validation', status: 'success' as const },
  { type: 'mem_context', message: 'restoring session: engram-landing', status: 'success' as const },
  { type: 'mem_session_summary', message: '12 observations saved', status: 'success' as const },
  { type: 'sync', message: 'export 2 memories → .engram/sync/', status: 'success' as const },
  { type: 'mem_save', message: 'pattern: FTS5 query sanitization', status: 'success' as const },
  { type: 'mem_search', message: 'query: "project consolidation"', status: 'success' as const },
  { type: 'mem_save', message: 'config: tailwind v4 setup expo', status: 'success' as const },
  { type: 'mem_timeline', message: 'drilling into obs #4721', status: 'success' as const },
]

export const useMemoryStore = create<MemoryStore>((set) => ({
  logs: [],
  totalMemories: 0,
  activeAgents: ['Claude Code', 'OpenCode'],
  activeWindow: null,

  addLog: (log) =>
    set((state) => ({
      logs: [
        { ...log, id: crypto.randomUUID(), timestamp: Date.now() },
        ...state.logs,
      ].slice(0, 50),
    })),

  incrementMemories: () =>
    set((state) => ({ totalMemories: state.totalMemories + 1 })),

  setAgents: (agents) => set({ activeAgents: agents }),

  setActiveWindow: (window) => set({ activeWindow: window }),
}))

let logIndex = 0
let simulationInterval: number | null = null

export function startSimulation() {
  if (simulationInterval !== null) return
  const store = useMemoryStore.getState()

  simulationInterval = window.setInterval(() => {
    const sample = SAMPLE_LOGS[logIndex % SAMPLE_LOGS.length]
    store.addLog(sample)
    if (sample.type === 'mem_save') {
      store.incrementMemories()
    }
    logIndex++
  }, 3000)

  store.addLog(SAMPLE_LOGS[0])
  store.incrementMemories()
}
