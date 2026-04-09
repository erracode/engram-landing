# CODEBASE MAP — Engram Landing

> **Project:** Engram Landing Page  
> **Tech Stack:** Astro + React + Three.js (R3F) + Zustand  
> **Build System:** Astro 6.1.4 with Vite integration  
> **Latest Changes:** ElephantCore (v0.8.2), ArchitectureSchematics, MemorySimulator 3D diorama

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Build Configuration](#build-configuration)
4. [Entry Points](#entry-points)
5. [State Management](#state-management)
6. [Component Architecture](#component-architecture)
7. [3D Simulator Architecture](#3d-simulator-architecture)
8. [Window System](#window-system)
9. [Design System](#design-system)
10. [Data Flows](#data-flows)
11. [Dependencies](#dependencies)
12. [Phase Roadmap](#phase-roadmap)
13. [Appendix A: Key File Mappings](#appendix-a-key-file-mappings)
14. [Appendix B: Design Token References](#appendix-b-design-token-references)
15. [Appendix C: Architecture Decisions](#appendix-c-architecture-decisions)

---

## 1. PROJECT OVERVIEW

### Purpose
Landing page for **Engram** - "Persistent memory for AI coding agents." A Go-based binary with SQLite + FTS5 full-text search, exposed via MCP server, CLI, HTTP API, and TUI.

### Key Features
- **Interactive 3D diorama** showing Engram's architecture (Elephant core, SQLite vault, FTS5 tower)
- **Window management system** for documentation, installation, and architecture views
- **HUD overlays** with memory logs, cognitive modules, and agent status
- **Nothing Design** aesthetic: OLED black backgrounds, cyan/purple accents, monospace typography

### Design Philosophy
Based on [Nothing Design](https://github.com/dominikmartn/nothing-design-skill):
- Structure is ornament
- Monochrome is the canvas
- Type does the heavy lifting
- Subtract, don't add

---

## 2. DIRECTORY STRUCTURE

```
engram-landing/
├── .astro/                           # Astro build artifacts and types
│   ├── collections/                  # Content collection cache
│   ├── types.d.ts                    # Generated TypeScript types
│   └── settings.json                 # Astro settings
├── .skills/                          # Design system reference
│   └── nothing-design/
│       └── SKILL.md                  # Complete design system documentation
├── .vscode/                          # VS Code configuration
│   ├── extensions.json               # Recommended extensions
│   └── launch.json                   # Debug configuration
├── dist/                             # Production build output (gitignored)
├── node_modules/                     # Dependencies (gitignored)
├── public/                           # Static assets
│   ├── favicon.ico
│   └── favicon.svg
├── src/                              # Source code
│   ├── components/
│   │   ├── hud/                      # Heads-up display widgets
│   │   │   ├── MemoryLog.tsx         # Real-time memory operation logs
│   │   │   ├── ConnectedAgents.tsx   # Connected MCP agents display
│   │   │   ├── CognitiveModules.tsx  # Tool usage statistics
│   │   │   └── TUIVisor.tsx          # Terminal UI keyboard shortcuts
│   │   ├── layout/                   # Page-level layout components
│   │   │   ├── EngramOS.tsx          # Main OS shell (3D + UI layer)
│   │   │   ├── WindowManager.tsx     # Window manager controller
│   │   │   ├── TopBar.tsx            # Top navigation bar
│   │   │   ├── Header.tsx            # Landing page header (unused)
│   │   │   └── Footer.tsx            # Landing page footer (unused)
│   │   ├── sections/                 # Landing page sections (unused)
│   │   │   ├── Hero.tsx              # Hero section with 3D (unused)
│   │   │   ├── QuickStart.tsx        # Installation guide
│   │   │   ├── HowItWorks.tsx        # Memory lifecycle explanation
│   │   │   ├── MCPTools.tsx          # 15 MCP tools overview
│   │   │   ├── GitSync.tsx           # Git sync feature
│   │   │   └── DocsLinks.tsx         # Documentation links
│   │   ├── simulator/                # 3D React Three Fiber components
│   │   │   ├── MemorySimulator.tsx   # Main 3D canvas and camera
│   │   │   ├── TilesetGrid.tsx       # 20x20x12 volumetric grid
│   │   │   ├── ElephantCore.tsx      # Central elephant robot mascot
│   │   │   ├── ArchitectureSchematics.tsx # Interactive 3D architecture map
│   │   │   ├── TheCore.tsx           # Legacy core visualization (unused)
│   │   │   ├── SQLiteVault.tsx       # SQLite persistence vault
│   │   │   ├── FTSTower.tsx          # FTS5 search tower
│   │   │   ├── EngramBranding.tsx    # "ENGRAM" letter tiles
│   │   │   ├── GridFloor.tsx         # Animated floor tiles (unused)
│   │   │   ├── Agent.tsx             # Moving agent path visualization
│   │   │   ├── MemoryNode.tsx        # Floating memory crystal nodes
│   │   │   └── NeonCables.tsx        # Data flow connections
│   │   ├── ui/                       # Reusable UI components
│   │   │   └── Window.tsx            # Draggable window shell
│   │   └── windows/                  # Content windows
│   │       ├── KernelWindow.tsx      # Kernel definition and data flow
│   │       ├── ArchitectureWindow.tsx # System components overview
│   │       ├── ToolsWindow.tsx       # 15 MCP tools list
│   │       ├── DocsWindow.tsx        # Documentation index + CLI ref
│   │       ├── InstallWindow.tsx     # Installation commands
│   │       └── TuiWindow.tsx         # Terminal UI preview
│   ├── layouts/                      # Astro layout templates
│   │   └── BaseLayout.astro          # Root HTML template + fonts
│   ├── pages/                        # Route definitions
│   │   └── index.astro               # Main landing page
│   ├── stores/                       # Zustand state stores
│   │   └── memoryStore.ts            # Global memory state + simulation
│   └── styles/                       # Global styles
│       └── global.css                # Tailwind + custom tokens
├── tests/                            # Test files
│   └── grid-coverage.spec.ts         # Playwright grid visibility test
├── test-results/                     # Playwright test results
├── antigravity-grid-fix.txt          # Development notes (Phase 1)
├── PHASE1_COMPLETED.md               # Phase 1 completion report
├── PHASE2_PLAN.md                    # Phase 2 implementation plan
├── package.json                      # Dependencies + scripts
├── package-lock.json                 # Locked dependency versions
├── tsconfig.json                     # TypeScript configuration
├── astro.config.mjs                  # Astro configuration
└── README.md                         # Basic project README
```

---

## 3. BUILD CONFIGURATION

### astro.config.mjs
```javascript
// Core config: Astro + React integration + Tailwind CSS
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
})
```

**Key Points:**
- Uses Astro's native React integration for component hydration
- Tailwind v4 via Vite plugin (not standalone PostCSS)
- No SSR - client-side interactive content via client:only directives

### tsconfig.json
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

**Key Points:**
- Strict TypeScript mode
- React JSX transform enabled
- Includes Astro-generated types

### package.json Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| dev | astro dev | Development server (localhost:4321) |
| build | astro build | Production build to dist/ |
| preview | astro preview | Preview production build locally |
| astro | astro | Astro CLI commands |

---

## 4. ENTRY POINTS

### Primary Entry: src/pages/index.astro
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import { EngramOS } from '../components/layout/EngramOS'
---

<BaseLayout title="Engram - Persistent Memory for AI Agents">
  <EngramOS client:only="react" />
</BaseLayout>
```

**Key Points:**
- Single-page application (SPA) - only route is /
- Uses client:only="react" to hydrate EngramOS after initial HTML render
- BaseLayout provides HTML shell, meta tags, and font imports

### BaseLayout (src/layouts/BaseLayout.astro)
- HTML5 document structure
- Imports global.css for Tailwind + custom tokens
- Loads Google Fonts: Doto (display), Space Grotesk (body), Space Mono (data)
- Sets meta tags: description, theme-color (#000000), Open Graph
- Applies dot-grid background class

---

## 5. STATE MANAGEMENT

### Store: src/stores/memoryStore.ts

**Type:** Zustand (v5.0.12)

**State Shape:**
```typescript
interface MemoryStore {
  logs: MemoryLog[]          // Real-time memory operation logs (max 50)
  totalMemories: number      // Cumulative memory count
  activeAgents: string[]     // Connected MCP agents
  activeWindow: string | null // Currently open window ID
  
  // Actions
  addLog: (log) => void
  incrementMemories: () => void
  setAgents: (agents) => void
  setActiveWindow: (window) => void
}
```

**Simulation:**
- startSimulation() function auto-starts on mount
- Adds sample logs every 3 seconds
- Increments totalMemories on mem_save events

**Key Design:**
- Global state accessible via useMemoryStore() hook
- Sample data for demonstration purposes
- Simulation interval tracks active only once per mount

---

## 6. COMPONENT ARCHITECTURE

### Top-Level Shell
```
index.astro (entry)
  └── BaseLayout.astro (HTML shell)
      └── EngramOS.tsx (React component, client-only)
          ├── MemorySimulator (3D diorama background)
          ├── TopBar.tsx (navigation + status)
          └── WindowManager (content display)
```

### Component Categories

#### Layout Components
| Component | Purpose | Props |
|-----------|---------|-------|
| EngramOS | OS shell combining 3D + UI layers | None |
| WindowManager | Conditional rendering of open windows | None |
| TopBar | Navigation bar with clock + status | None |
| Header (unused) | Landing page header with mobile nav | None |
| Footer (unused) | Landing page footer with links | None |

#### Window Components
| Component | Purpose | Trigger |
|-----------|---------|---------|
| KernelWindow | Kernel definition, data flow diagram | activeWindow === 'kernel' |
| ArchitectureWindow | System components, supported agents | activeWindow === 'architecture' |
| ToolsWindow | 15 MCP tools reference table | activeWindow === 'tools' |
| DocsWindow | Documentation index + CLI commands | activeWindow === 'docs' |
| InstallWindow | Installation commands per agent | activeWindow === 'install' |
| TuiWindow | Terminal UI preview + controls | activeWindow === 'tui' |

#### UI Components
| Component | Purpose | Props |
|-----------|---------|-------|
| Window | Draggable window shell | id, title, children, onClose |

#### HUD Components
| Component | Purpose | State Source |
|-----------|---------|--------------|
| MemoryLog | Real-time operation logs | memoryStore.logs |
| ConnectedAgents | Agent status indicators | memoryStore.activeAgents |
| CognitiveModules | Tool usage stats (mock) | memoryStore.totalMemories |
| TUIVisor | Keyboard shortcuts reference | None |

---

## 7. 3D SIMULATOR ARCHITECTURE

### Main Canvas: MemorySimulator.tsx

**Camera:**
- Type: Orthographic (isometric view)
- Position: [40, 35, 40]
- Zoom: 60
- LookAt: [0, 0, 0]

**Lighting:**
- DirectionalLight: [20, 30, 10], intensity 2.5, casts shadows
- AmbientLight: intensity 1.5 (prevents pure black OLED look)

**Sub-Components:**
```
MemorySimulator
├── TilesetGrid           # 20x20x12 volumetric voxel grid
├── EngramBranding        # "ENGRAM" letter tiles with gradients
├── ArchitectureSchematics # Interactive 3D architecture map
└── ElephantCore          # Central mascot robot
```

### TilesetGrid (Phase 1)
- **Dimensions:** 20x20 surface, 12 units deep
- **Total voxels:** 4,800 (20x20x12)
- **Optimization:** Uses InstancedMesh for performance
- **Materials:**
  - Top face: #0a0a0a (dark gray)
  - Side faces: #050505 (near-black)
  - Bottom: #000000 (OLED black)
  - Roughness: 0.9, Metalness: 0.1
- **Gap:** scale: 0.98 creates 2% gap between voxels
- **Border:** GridHelper at Y=0.001 with opacity: 0.05

### ElephantCore (Phase 2)
**Central mascot representing Engram core:**

**Parts:**
- Torso: 2.3x1.8x1.6 voxel block
- Head: 1.4x1.6x1.4 with detailed geometry
- Ears: Side-mounted flared voxels
- Trunk: Tapered chain of voxels with glowing tip
- Tusks: Silver cylinders with cyan emission
- Legs: 4x column structures with joint segments
- Tail: Tapered voxel chain with glowing end
- PowerCore: Pulsing cyan plasma orb at base

**Colors:**
- Body: #050505 (black marble)
- Edges: #2596be (cyan-blue)
- Emission: #00f2ff (cyan-neon)

**Interaction:** Click opens KernelWindow

### ArchitectureSchematics (Phase 2)
**Interactive 3D map of Engram architecture:**

**Components:**
| Component | Position | Represents | Opens |
|-----------|----------|------------|-------|
| CorePlatform | [0, 0, 0] | Central hub | KernelWindow |
| PersistenceVault | [4, 0, -4] | SQLite database | ArchitectureWindow |
| SearchTower | [-4, 0, -4] | FTS5 search engine | ToolsWindow |
| TuiTerminal | [-6, 0, 6] | Terminal UI | TuiWindow |
| McpAntenna | [6, 0, 8] | MCP server | ArchitectureWindow |

**Flow Traces:** Animated lines connecting components
- Purple: Persistence -> Core
- Cyan: Search -> Core, MCP -> Core
- Edge: Cross-connections

### Supporting Components
| Component | Purpose | Notes |
|-----------|---------|-------|
| TheCore | Legacy visualization | Unused (replaced by ElephantCore) |
| EngramBranding | Letter tiles "ENGRAM" | Gradient textures, physical screws |
| SQLiteVault | Standalone vault model | Used in schematic |
| FTSTower | Standalone tower model | Used in schematic |
| Agent | Moving agent path | Unused path visualization |
| MemoryNode | Floating crystals | Unused secondary nodes |
| NeonCable | Connection lines | Unused cable rendering |

---

## 8. WINDOW SYSTEM

### Architecture
```
WindowManager (controller)
└── Conditional rendering based on activeWindow
    ├── KernelWindow
    ├── ArchitectureWindow
    ├── ToolsWindow
    ├── DocsWindow
    ├── InstallWindow
    └── TuiWindow
```

### Window Shell: Window.tsx

**Features:**
- Draggable via title bar
- Fade-in animation on mount
- Close button (x)
- Fixed position with z-index 80
- Scrollable content area
- Customizable width/maxHeight

**Props:**
```typescript
interface WindowProps {
  id: string
  title: string
  children: ReactNode
  onClose: () => void
  defaultPosition?: { x: number; y: number }
  width?: number
  maxHeight?: number
}
```

**Interaction Model:**
- Clicking window title bar enables drag
- Dragging updates position state in real-time
- Close button calls onClose callback (clears activeWindow)

---

## 9. DESIGN SYSTEM

### Color Tokens (from global.css)
```css
--color-black: #000000
--color-surface: #111111
--color-surface-raised: #1a1a1a
--color-border: #222222
--color-border-visible: #333333
--color-text-disabled: #666666
--color-text-secondary: #999999
--color-text-primary: #e8e8e8
--color-text-display: #ffffff
--color-cyan-neon: #00f2ff
--color-purple-neon: #bc13fe
--color-success: #4a9e5c
--color-warning: #d4a843
--color-error: #d71921
```

### Font Stack
| Role | Font | Fallback | Weights |
|------|------|----------|---------|
| Display | Doto | Space Mono, monospace | 400-700 |
| Body | Space Grotesk | DM Sans, system-ui | 300, 400, 500, 700 |
| Data/Mono | Space Mono | JetBrains Mono, SF Mono | 400, 700 |

### Dot Grid Background
```css
.dot-grid: radial-gradient(1px circles, #333 1px, transparent 1px), 16px gap
.dot-grid-subtle: radial-gradient(0.5px circles, rgba(51,51,51,0.3), transparent), 12px gap
```

### HUD Panel Styling
```css
.hud-panel {
  background: rgba(0, 0, 0, 0.8)
  backdrop-filter: blur(8px)
  border: 1px solid #222222
  border-radius: 8px
  padding: 12px
  font-family: 'Space Mono', monospace
  font-size: 12px
}
```

### Motion Design
- Duration: 150-250ms micro, 300-400ms transitions
- Easing: cubic-bezier(0.25, 0.1, 0.25, 1)
- Preference: Opacity over position

---

## 10. DATA FLOWS

### User Interaction Flow
```
User clicks TopBar navigation item
  -> TopBar calls setActiveWindow('kernel')
  -> memoryStore updates activeWindow
  -> WindowManager re-renders KernelWindow
  -> User clicks x button
  -> onClose() called (clears activeWindow)
  -> WindowManager unmounts window
```

### 3D Interaction Flow
```
User clicks ElephantCore in 3D scene
  -> ElephantCore onClick handler fires
  -> setActiveWindow('kernel')
  -> Same flow as navigation above
```

### Simulation Data Flow
```
EngramOS mounts
  -> useEffect calls startSimulation()
  -> Interval starts (every 3s)
  -> SAMPLE_LOGS cycle through addLog()
  -> logs array updates -> MemoryLog component re-renders
  -> On mem_save: totalMemories increments
```

### Window State Flow
```
State: { logs: [], totalMemories: 0, activeWindow: null }
  -> User clicks "KERNEL"
  -> Store: { activeWindow: 'kernel' }
  -> WindowManager renders: <KernelWindow />
  -> User clicks x
  -> Store: { activeWindow: null }
  -> WindowManager unmounts window
```

---

## 11. DEPENDENCIES

### Core Frameworks
| Package | Version | Purpose |
|---------|---------|---------|
| astro | 6.1.4 | Static site generator |
| @astrojs/react | 5.0.3 | React integration |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | React renderer |

### 3D Rendering
| Package | Version | Purpose |
|---------|---------|---------|
| three | 0.183.2 | 3D engine |
| @react-three/fiber | 9.5.0 | React Three Fiber renderer |
| @react-three/drei | 10.7.7 | Helper components (Edges, Html, etc.) |
| @types/three | 0.183.1 | TypeScript definitions |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | 4.2.2 | Utility-first CSS |
| @tailwindcss/vite | 4.2.2 | Vite plugin for Tailwind v4 |

### Animations and Icons
| Package | Version | Purpose |
|---------|---------|---------|
| framer-motion | 12.38.0 | Declarative animations |
| lucide-react | 1.7.0 | Icon library |

### State Management
| Package | Version | Purpose |
|---------|---------|---------|
| zustand | 5.0.12 | Store management |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| @playwright/test | (test) | E2E testing |
| @types/react | 19.2.14 | React TypeScript |
| @types/react-dom | 19.2.3 | React DOM TypeScript |

---

## 12. PHASE ROADMAP

### Phase 1: Plataforma Isometrica Volumetrica COMPLETED
**Goal:** Create base 3D grid
**Implemented:**
- 20x20x12 volumetric voxel grid with InstancedMesh
- OLED black materials (#000000, #050505, #0a0a0a)
- Isometric orthographic camera
- Technical border at Y=0.001
- Directional + ambient lighting
- Shadow casting/receiving

**Files:**
- src/components/simulator/TilesetGrid.tsx
- src/components/simulator/MemorySimulator.tsx
- src/styles/global.css

---

### Phase 2: Nodos de Memoria y Elefante Central COMPLETED
**Goal:** Add architectural visualization
**Implemented:**
- ElephantCore: Central mascot with torso, head, ears, trunk, tusks, legs, tail, power core
- ArchitectureSchematics: Interactive 3D map with CorePlatform, PersistenceVault, SearchTower, TuiTerminal, McpAntenna
- Flow Traces: Animated connection lines between components
- Supporting models: SQLiteVault, FTSTower standalone
- Branding: ENGRAM letter tiles with gradient textures
- Window System: 6 content windows (Kernel, Architecture, Tools, Docs, Install, TUI)
- HUD Components: MemoryLog, ConnectedAgents, CognitiveModules, TUIVisor
- State Management: Zustand store with simulation
- TopBar: Navigation with clock and status

**Files:**
- src/components/simulator/ElephantCore.tsx
- src/components/simulator/ArchitectureSchematics.tsx
- src/components/simulator/TheCore.tsx (legacy, unused)
- src/components/simulator/SQLiteVault.tsx
- src/components/simulator/FTSTower.tsx
- src/components/simulator/EngramBranding.tsx
- src/components/simulator/NeonCables.tsx
- src/components/simulator/MemoryNode.tsx
- src/components/simulator/Agent.tsx
- src/components/layout/EngramOS.tsx
- src/components/layout/TopBar.tsx
- src/components/layout/WindowManager.tsx
- src/components/ui/Window.tsx
- src/components/windows/*.tsx (6 files)
- src/components/hud/*.tsx (4 files)
- src/stores/memoryStore.ts
- src/pages/index.astro

---

### Phase 3: HUD Overlay (Next)
**Goal:** Add landing page sections with HUD elements
**Planned:**
- Integrate landing page sections (Hero, QuickStart, HowItWorks, MCPTools, GitSync, DocsLinks)
- Add HUD overlays to landing page view (currently only in EngramOS shell)
- Responsive layout for mobile/tablet
- Enhanced animations for section transitions

**Files to Modify:**
- src/components/sections/Hero.tsx (currently duplicates MemorySimulator)
- src/layouts/BaseLayout.astro (add landing page content)
- src/components/layout/Header.tsx (activate unused header)
- src/components/layout/Footer.tsx (activate unused footer)

---

## APPENDIX A: KEY FILE MAPPINGS

| File | Role | Dependencies |
|------|------|--------------|
| src/pages/index.astro | Entry point | BaseLayout, EngramOS |
| src/layouts/BaseLayout.astro | HTML shell | global.css |
| src/styles/global.css | Design tokens | Tailwind |
| src/stores/memoryStore.ts | State + simulation | Zustand |
| src/components/layout/EngramOS.tsx | OS shell | MemorySimulator, TopBar, WindowManager |
| src/components/simulator/MemorySimulator.tsx | 3D canvas | TilesetGrid, ElephantCore, ArchitectureSchematics |
| src/components/simulator/TilesetGrid.tsx | Base grid | Three.js InstancedMesh |
| src/components/simulator/ElephantCore.tsx | Central mascot | Voxel blocks, PowerCore |
| src/components/simulator/ArchitectureSchematics.tsx | Architecture map | CorePlatform, PersistenceVault, SearchTower, TuiTerminal, McpAntenna, FlowTrace |
| src/components/layout/TopBar.tsx | Navigation | memoryStore, GithubIcon |
| src/components/layout/WindowManager.tsx | Window router | All Window components |
| src/components/ui/Window.tsx | Window shell | Draggable logic |
| src/components/windows/KernelWindow.tsx | Kernel info | Window |
| src/components/windows/ArchitectureWindow.tsx | Architecture info | Window |
| src/components/windows/ToolsWindow.tsx | MCP tools list | Window |
| src/components/windows/DocsWindow.tsx | Documentation | Window |
| src/components/windows/InstallWindow.tsx | Installation | Window, CopyBtn |
| src/components/windows/TuiWindow.tsx | TUI preview | Window |
| src/components/hud/MemoryLog.tsx | Operation logs | memoryStore, framer-motion |
| src/components/hud/ConnectedAgents.tsx | Agent status | memoryStore |
| src/components/hud/CognitiveModules.tsx | Tool stats | memoryStore |
| src/components/hud/TUIVisor.tsx | Keyboard shortcuts | None |

---

## APPENDIX B: DESIGN TOKEN REFERENCES

### Color Usage Guide

**Cyan (#00f2ff):**
- MCP connections
- FTS5 towers
- Active states
- Agent eyes
- Plasma emission

**Purple (#bc13fe):**
- Memory persistence
- Core elements
- SQLite vault windows
- Data flow traces

**Gray Scale:**
- #000000: OLED black (backgrounds, bottom faces)
- #050505: Black marble (side faces, body)
- #0a0a0a: Dark gray (top faces, surfaces)
- #111111: Surface (elevated cards)
- #1a1a1a: Surface raised (secondary elevation)
- #222222: Border (subtle dividers)
- #333333: Border visible (intentional borders)
- #666666: Text disabled (metadata, hints)
- #999999: Text secondary (labels, captions)
- #e8e8e8: Text primary (body text)
- #ffffff: Text display (headlines, hero numbers)

### Typography Scale

- **Display XL:** 72px, Doto, -0.03em spacing
- **Display LG:** 48px, Doto, -0.02em spacing
- **Display MD:** 36px, Space Grotesk, -0.02em spacing
- **Heading:** 24px, Space Grotesk, -0.01em spacing
- **Subheading:** 18px, Space Grotesk, 0 spacing
- **Body:** 16px, Space Grotesk, 0 spacing
- **Body SM:** 14px, Space Grotesk, 0.01em spacing
- **Caption:** 12px, Space Mono, 0.04em spacing
- **Label:** 11px, Space Mono, 0.06-0.1em spacing

---

## APPENDIX C: ARCHITECTURE DECISIONS

### 1. Why Astro + React?
- Astro provides static site generation with minimal JS
- React components handle interactive elements (3D, windows, state)
- client:only directive ensures React only loads for interactive components

### 2. Why Zustand for State?
- Minimal API surface
- Works well with React hooks
- Store can be accessed from anywhere in component tree
- Simulation logic (setInterval) stored outside React components

### 3. Why React Three Fiber?
- Declarative 3D scene management
- React component composition for 3D objects
- Automatic re-renders on state changes
- Integration with Zustand for interactive elements

### 4. Why Nothing Design?
- Aligns with Engram's minimal, single-binary philosophy
- Structure is ornament - grid and data visualization are decorative
- Monochrome with cyan/purple accents reinforces "persistence" theme

### 5. Why Isometric View?
- RTS-style visualization of architectural relationships
- Better visibility of depth (12 units) than perspective
- Technical aesthetic matches tool nature

---

*Last Updated: April 9, 2026*  
*Project Status: Phase 2 Complete - Core visualization and window system functional*
