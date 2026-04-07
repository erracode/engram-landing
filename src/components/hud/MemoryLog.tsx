import { useEffect } from 'react'
import { useMemoryStore, type MemoryLog, startSimulation } from '../../stores/memoryStore'
import { AnimatePresence, motion } from 'framer-motion'

export function MemoryLog() {
  const logs = useMemoryStore((state) => state.logs)

  useEffect(() => {
    startSimulation()
  }, [])

  return (
    <div className="w-64 bg-black/80 backdrop-blur-sm border border-border rounded-lg p-3 font-mono text-xs">
      <div className="text-text-secondary uppercase tracking-wider text-label mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
        Memory Logs
      </div>
      <div className="space-y-1.5 max-h-64 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {logs.slice(0, 6).map((log) => (
            <LogEntry key={log.id} log={log} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function LogEntry({ log }: { log: MemoryLog }) {
  const statusColor =
    log.status === 'success' ? 'text-success' : log.status === 'error' ? 'text-error' : 'text-warning'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, height: 0 }}
      animate={{ opacity: 1, x: 0, height: 'auto' }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-l-2 border-cyan-neon/30 pl-2"
    >
      <div className="flex items-baseline gap-1">
        <span className="text-cyan-neon text-[10px]">{log.type}</span>
        <span className="text-text-primary truncate text-[11px]">{log.message}</span>
      </div>
      <div className={`text-[10px] ${statusColor} mt-0.5`}>
        [{log.status.toUpperCase()}]
      </div>
    </motion.div>
  )
}
