import { useMemoryStore } from '../../stores/memoryStore'
import { KernelWindow } from '../windows/KernelWindow'
import { InstallWindow } from '../windows/InstallWindow'
import { ToolsWindow } from '../windows/ToolsWindow'
import { ArchitectureWindow } from '../windows/ArchitectureWindow'
import { DocsWindow } from '../windows/DocsWindow'
import { TuiWindow } from '../windows/TuiWindow'

export function WindowManager() {
  const activeWindow = useMemoryStore((s) => s.activeWindow)
  const setActiveWindow = useMemoryStore((s) => s.setActiveWindow)

  const close = () => setActiveWindow(null)

  return (
    <>
      {activeWindow === 'kernel' && <KernelWindow onClose={close} />}
      {activeWindow === 'install' && <InstallWindow onClose={close} />}
      {activeWindow === 'tools' && <ToolsWindow onClose={close} />}
      {activeWindow === 'architecture' && <ArchitectureWindow onClose={close} />}
      {activeWindow === 'docs' && <DocsWindow onClose={close} />}
      {activeWindow === 'tui' && <TuiWindow onClose={close} />}
    </>
  )
}
