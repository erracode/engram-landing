import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface MemoryLog {
  id: string
  type: string
  message: string
  status: 'success' | 'pending' | 'error'
  timestamp: number
}

export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface MDXWindow {
  id: string
  title: string
  content: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: WindowPosition
  size: WindowSize
  zIndex: number
}

interface MemoryStore {
  // Logs and stats
  logs: MemoryLog[]
  totalMemories: number
  activeAgents: string[]
  
  // Multiple windows
  activeWindows: Record<string, MDXWindow>
  focusedWindowId: string | null
  nextZIndex: number
  
  // Actions for logs
  addLog: (log: Omit<MemoryLog, 'id' | 'timestamp'>) => void
  incrementMemories: () => void
  setAgents: (agents: string[]) => void
  
  // Actions for windows
  openWindow: (id: string, title: string, content: string, position?: WindowPosition) => void
  closeWindow: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string) => void
  updateWindowPosition: (id: string, position: WindowPosition) => void
  focusWindow: (id: string) => void
  closeAllWindows: () => void
  restoreMinimizedWindow: (id: string) => void
  bringToFront: (id: string) => void
  
  // Legacy single window (for backward compatibility)
  activeWindow: string | null
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

// Default window configurations
const DEFAULT_WINDOW_CONFIG: Record<string, { title: string; position: WindowPosition; size: WindowSize }> = {
  kernel: {
    title: 'KERNEL',
    position: { x: 100, y: 80 },
    size: { width: 800, height: 600 }
  },
  installation: {
    title: 'INSTALLATION',
    position: { x: 120, y: 100 },
    size: { width: 750, height: 550 }
  },
  agentSetup: {
    title: 'AGENT SETUP',
    position: { x: 140, y: 120 },
    size: { width: 780, height: 580 }
  },
  architecture: {
    title: 'ARCHITECTURE',
    position: { x: 160, y: 140 },
    size: { width: 820, height: 620 }
  },
  mcpTools: {
    title: 'MCP TOOLS',
    position: { x: 180, y: 160 },
    size: { width: 800, height: 600 }
  },
  tui: {
    title: 'TERMINAL UI',
    position: { x: 200, y: 180 },
    size: { width: 850, height: 650 }
  },
  gitSync: {
    title: 'GIT SYNC',
    position: { x: 220, y: 200 },
    size: { width: 780, height: 580 }
  },
  docs: {
    title: 'DOCUMENTATION',
    position: { x: 240, y: 220 },
    size: { width: 880, height: 680 }
  },
  welcome: {
    title: 'THE BRAIN',
    position: { x: Math.max(20, window.innerWidth / 2 - 400), y: 100 },
    size: { width: 700, height: 420 },
  },
  agentsCompatibility: {
    title: 'AGENTS COMPATIBILITY',
    position: { x: Math.max(20, window.innerWidth / 2 + 100), y: 300 },
    size: { width: 600, height: 480 },
  },
  socialProof: {
    title: 'COMMUNITY & STATS',
    position: { x: 40, y: window.innerHeight - 300 },
    size: { width: 400, height: 260 },
  }
}

export const useMemoryStore = create<MemoryStore>()((set, get) => ({
  // Logs and stats
  logs: [],
  totalMemories: 0,
  activeAgents: ['Claude Code', 'OpenCode'],
  
  // Multiple windows
  activeWindows: {},
  focusedWindowId: null,
  nextZIndex: 100,
  
  // Legacy single window
  activeWindow: null,
  
  // Actions for logs
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
  
  // Legacy single window action
  setActiveWindow: (window) => {
    set({ activeWindow: window })
    
    if (window === null) {
      // Close all windows if legacy action clears
      set({ activeWindows: {} })
    }
  },
  
  // Actions for windows
  openWindow: (id, title, content, position) =>
    set((state) => {
      const config = DEFAULT_WINDOW_CONFIG[id]
      if (!config) return {}
      
      const existingWindow = state.activeWindows[id]
      
      return {
        activeWindows: {
          ...state.activeWindows,
          [id]: {
            id,
            title: config.title,
            content,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            position: position || config.position,
            size: config.size,
            zIndex: state.nextZIndex,
          },
        },
        focusedWindowId: id,
        nextZIndex: state.nextZIndex + 1,
        activeWindow: id, // Also set legacy for backward compatibility
      }
    }),

  closeWindow: (id) =>
    set((state) => {
      const { [id]: _, ...remainingWindows } = state.activeWindows
      
      const closedIds = Object.keys(state.activeWindows)
      const remainingIds = Object.keys(remainingWindows)
      
      return {
        activeWindows: remainingWindows,
        focusedWindowId: remainingIds.length > 0 ? remainingIds[0] : null,
        activeWindow: remainingIds.length > 0 ? remainingIds[0] : null,
      }
    }),

  toggleMinimize: (id) =>
    set((state) => ({
      activeWindows: {
        ...state.activeWindows,
        [id]: {
          ...state.activeWindows[id],
          isMinimized: !state.activeWindows[id].isMinimized,
        },
      },
    })),

  toggleMaximize: (id) =>
    set((state) => ({
      activeWindows: {
        ...state.activeWindows,
        [id]: {
          ...state.activeWindows[id],
          isMaximized: !state.activeWindows[id].isMaximized,
        },
      },
    })),

  updateWindowPosition: (id, position) =>
    set((state) => ({
      activeWindows: {
        ...state.activeWindows,
        [id]: {
          ...state.activeWindows[id],
          position,
        },
      },
    })),

  focusWindow: (id) =>
    set((state) => ({
      focusedWindowId: id,
      activeWindows: {
        ...state.activeWindows,
        [id]: {
          ...state.activeWindows[id],
          isMinimized: false,
          zIndex: state.nextZIndex,
        },
      },
      nextZIndex: state.nextZIndex + 1,
    })),

  closeAllWindows: () =>
    set({
      activeWindows: {},
      focusedWindowId: null,
      activeWindow: null,
    }),

  restoreMinimizedWindow: (id) =>
    set((state) => ({
      activeWindows: {
        ...state.activeWindows,
        [id]: {
          ...state.activeWindows[id],
          isMinimized: false,
          zIndex: state.nextZIndex,
        },
      },
      focusedWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    })),

  bringToFront: (id) =>
    set((state) => ({
      activeWindows: {
        ...state.activeWindows,
        [id]: {
          ...state.activeWindows[id],
          zIndex: state.nextZIndex,
        },
      },
      focusedWindowId: id,
      nextZIndex: state.nextZIndex + 1,
    })),
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

  // Open default windows
  store.openWindow('welcome', DEFAULT_WINDOW_CONFIG.welcome.title, '')
  store.openWindow('agentsCompatibility', DEFAULT_WINDOW_CONFIG.agentsCompatibility.title, '')
  store.openWindow('socialProof', DEFAULT_WINDOW_CONFIG.socialProof.title, '')
}
