// Type definitions for multiple windows system
export interface MDXWindow {
  id: string
  title: string
  content: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface WindowActions {
  openWindow: (id: string, title: string, content: string, position?: WindowPosition) => void
  closeWindow: (id: string) => void
  toggleMinimize: (id: string) => void
  toggleMaximize: (id: string) => void
  updateWindowPosition: (id: string, position: WindowPosition) => void
  focusWindow: (id: string) => void
  closeAllWindows: () => void
}

export interface ContentMap {
  [key: string]: string
}
