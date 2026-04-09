// Type definitions for multiple windows system
export interface MDXWindow {
  id: string
  title: string
  content: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  zIndex: number
}

export interface WindowsState {
  [key: string]: MDXWindow
}

export interface WindowManagerState {
  activeWindows: WindowsState
  focusedWindowId: string | null
  nextZIndex: number
}

// Window actions for Zustand store
export interface WindowActions {
  openWindow: (id: string, title: string, content: string, position?: { x: number; y: number }) => void
  closeWindow: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  setWindowSize: (id: string, size: { width: number; height: number }) => void
  focusWindow: (id: string) => void
  closeAllWindows: () => void
  restoreMinimizedWindow: (id: string) => void
  bringToFront: (id: string) => void
}

export interface WindowPosition extends WindowActions {
  openWindow: (id: string, title: string, content: string, position?: { x: number; y: number }) => void
  closeWindow: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  focusWindow: (id: string) => void
}
