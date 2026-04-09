import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Edges, Html } from '@react-three/drei'

// Nothing Design tokens mapped to 3D materials
// "Monochrome is the canvas. Color is an event, not a default."
const BODY = '#050505'       // Near-OLED black body
const SURFACE = '#111111'    // --surface for elevated detail
const BORDER = '#222222'     // --border for subtle structure
const EDGE = '#2596be'       // Engram brand cyan (edges = "the interrupt")
const PURPLE = '#bc13fe'     // --purple-neon for memory/core/vault
const CYAN = '#00f2ff'       // --cyan-neon for search/FTS5/active

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export function ArchitectureSchematics() {
  return (
    <group>
      <CoreHub />
      <PersistenceVault />
      <SearchTower />
      <TuiTerminal />
      <McpAntenna />
      <CircuitTraces />
      <MicroVoxels />
    </group>
  )
}

// ─────────────────────────────────────────────
// LABEL — Doubled size, monospace, TUI panel
// "Labels: Space Mono, ALL CAPS, 0.06-0.1em spacing"
// ─────────────────────────────────────────────

function TerminalLabel({ text, secondary, yOffset = 1.2 }: { text: string; secondary?: string; yOffset?: number }) {
  return (
    <Html distanceFactor={12} position={[0, yOffset, 0]} center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {/* TUI recuadro — hud-panel style */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid #333333',
            borderRadius: '4px',
            padding: '4px 12px',
            fontFamily: "'JetBrains Mono', 'Courier New', 'Space Mono', monospace",
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#E8E8E8', // --text-primary
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            [ {text} ]
          </span>
          {secondary && (
            <div
              style={{
                fontSize: '10px',
                color: '#999999', // --text-secondary
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                textAlign: 'center',
                letterSpacing: '0.04em',
                marginTop: '2px',
              }}
            >
              {secondary}
            </div>
          )}
        </div>
        {/* Vertical stem */}
        <div
          style={{
            width: '1px',
            height: '16px',
            background: 'linear-gradient(to bottom, #333333, transparent)',
          }}
        />
      </div>
    </Html>
  )
}

// ─────────────────────────────────────────────
// CIRCUIT TRACES — PCB-style strict 90° paths
// Animated flow pulse from Core → endpoints every 3s
// ─────────────────────────────────────────────

function FlowTrace({ points, color }: { points: [number, number, number][]; color: string }) {
  const matRef = useRef<THREE.LineBasicMaterial>(null)

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const verts = new Float32Array(points.flat())
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    return g
  }, [points])

  // Animate opacity in a 3-second wave cycle
  useFrame(({ clock }) => {
    if (matRef.current) {
      const t = clock.elapsedTime % 3 // 3-second cycle
      const wave = Math.sin(t / 3 * Math.PI) // 0→1→0 over 3s
      matRef.current.opacity = 0.3 + wave * 0.7
    }
  })

  return (
    <line geometry={geometry}>
      <lineBasicMaterial ref={matRef} color={color} transparent opacity={0.85} />
    </line>
  )
}

function CircuitTraces() {
  const Y = 0.015

  // Core Hub center = [0, 0, 0]
  // Persistence Vault = [4, 0, -4]
  // Search Tower = [-4, 0, -4]
  // TUI Terminal = [-6, 0, 6]
  // MCP Antenna = [6, 0, 8]  ← moved lateral/frontal

  // Core → east → south to Vault
  const coreToVault: [number, number, number][] = [
    [2, Y, 0],
    [4, Y, 0],
    [4, Y, -3],
  ]

  // Core → west → south to Search
  const coreToSearch: [number, number, number][] = [
    [-2, Y, 0],
    [-4, Y, 0],
    [-4, Y, -3],
  ]

  // Core → east → south to MCP (new position [6, 0, 8])
  const coreToMcp: [number, number, number][] = [
    [2, Y, 0],
    [6, Y, 0],
    [6, Y, 8],
  ]

  // Core → west → south to TUI Terminal
  const coreToTui: [number, number, number][] = [
    [-2, Y, 0],
    [-6, Y, 0],
    [-6, Y, 6],
  ]

  // Cross-trace: Search ↔ Vault via back row (Z = −6)
  const crossBack: [number, number, number][] = [
    [-4, Y, -5],
    [-4, Y, -6],
    [4, Y, -6],
    [4, Y, -5],
  ]

  return (
    <group>
      <FlowTrace points={coreToVault} color={PURPLE} />
      <FlowTrace points={coreToSearch} color={CYAN} />
      <FlowTrace points={coreToMcp} color={CYAN} />
      <FlowTrace points={coreToTui} color={PURPLE} />
      <FlowTrace points={crossBack} color={EDGE} />
    </group>
  )
}

// ─────────────────────────────────────────────
// MICRO-VOXELS — 15 tiny scattered motherboard chips
// ─────────────────────────────────────────────

function MicroVoxels() {
  // Deterministic positions spread across the grid
  // Grid is 20×20 spanning -10 to +10 on X and Z
  const voxels = useMemo(() => [
    { pos: [-7, 0.15, 3],   edge: true },
    { pos: [5, 0.15, -2],   edge: false },
    { pos: [-3, 0.15, 7],   edge: true },
    { pos: [8, 0.15, 6],    edge: false },
    { pos: [-5, 0.15, -6],  edge: true },
    { pos: [2, 0.15, 8],    edge: false },
    { pos: [-8, 0.15, -3],  edge: true },
    { pos: [7, 0.15, -7],   edge: false },
    { pos: [3, 0.15, 5],    edge: true },
    { pos: [-6, 0.15, -1],  edge: false },
    { pos: [9, 0.15, 2],    edge: true },
    { pos: [-2, 0.15, -8],  edge: false },
    { pos: [6, 0.15, -5],   edge: true },
    { pos: [-9, 0.15, 5],   edge: false },
    { pos: [1, 0.15, -3],   edge: true },
  ], [])

  const geo = useMemo(() => new THREE.BoxGeometry(0.3, 0.3, 0.3), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.9, metalness: 0.1 }), [])

  return (
    <group>
      {voxels.map((v, i) => (
        <mesh key={i} position={v.pos as [number, number, number]} geometry={geo} material={mat}>
          {v.edge && <Edges scale={1.01} linewidth={1} color={EDGE} threshold={15} />}
        </mesh>
      ))}
    </group>
  )
}

// ─────────────────────────────────────────────
// CORE HUB — Central 3×3 command platform
// Increased emissive to bathe nearby cables in purple light
// ─────────────────────────────────────────────

function CoreHub() {
  const geometry = useMemo(() => new THREE.BoxGeometry(2.96, 0.5, 2.96), [])
  const materials = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.9, metalness: 0.1 })
    const top = new THREE.MeshStandardMaterial({
      color: PURPLE,
      emissive: PURPLE,
      emissiveIntensity: 0.8, // Cranked up to bathe cables
      roughness: 0.4,
      metalness: 0.3,
    })
    return [side, side, top, side, side, side]
  }, [])

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.25, 0]} geometry={geometry} material={materials} castShadow receiveShadow>
        <Edges scale={1.001} linewidth={2} color={EDGE} />
      </mesh>

      {/* CPU die accent: small raised block at center */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.6]} />
        <meshStandardMaterial color={BODY} roughness={0.8} metalness={0.2} />
        <Edges scale={1.002} linewidth={2} color={EDGE} />
      </mesh>

      {/* Label removed for better visibility of ElephantCore */}
      {/* <TerminalLabel text="CORE HUB" secondary="go binary · central" yOffset={1.8} /> */}
      <pointLight color={PURPLE} intensity={3} distance={7} position={[0, 1.2, 0]} />
    </group>
  )
}

// ─────────────────────────────────────────────
// PERSISTENCE VAULT — 2×2 búnker de datos
// ─────────────────────────────────────────────

function PersistenceVault() {
  const cubeGeo = useMemo(() => new THREE.BoxGeometry(0.96, 0.96, 0.96), [])

  const matsSolid = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.9, metalness: 0.1 })
    const top = new THREE.MeshStandardMaterial({
      color: PURPLE,
      emissive: PURPLE,
      emissiveIntensity: 0.6, // Increased
      roughness: 0.4,
    })
    return [side, side, top, side, side, side]
  }, [])

  const matsGlow = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.9, metalness: 0.1 })
    const top = new THREE.MeshStandardMaterial({
      color: PURPLE,
      emissive: PURPLE,
      emissiveIntensity: 0,
      roughness: 0.3,
    })
    return [side, side, top, side, side, side]
  }, [])

  const pulseRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const arr = pulseRef.current.material as THREE.Material[]
      const topMat = arr[2] as THREE.MeshStandardMaterial
      topMat.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 1.5) * 0.5
    }
  })

  const positions: [number, number, number][] = [
    [-0.5, 0.48, -0.5],
    [0.5, 0.48, -0.5],
    [-0.5, 0.48, 0.5],
    [0.5, 0.48, 0.5],
  ]

  return (
    <group position={[4, 0, -4]}>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={i === 1 ? pulseRef : undefined}
          position={pos}
          geometry={cubeGeo}
          material={i === 1 ? matsGlow : matsSolid}
          castShadow
          receiveShadow
        >
          <Edges scale={1.001} linewidth={2} color={EDGE} />
        </mesh>
      ))}

      <TerminalLabel text="PERSISTENCE" secondary="sqlite · wal mode" yOffset={1.6} />
      <pointLight color={PURPLE} intensity={2} distance={4} position={[0.5, 1.2, -0.5]} />
    </group>
  )
}

// ─────────────────────────────────────────────
// SEARCH TOWER — 3 stacked cubes with gaps
// ─────────────────────────────────────────────

function SearchTower() {
  const cubeGeo = useMemo(() => new THREE.BoxGeometry(0.96, 0.96, 0.96), [])

  const matsBase = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.9, metalness: 0.1 })
    const top = new THREE.MeshStandardMaterial({
      color: PURPLE,
      emissive: PURPLE,
      emissiveIntensity: 0.5, // Increased
      roughness: 0.5,
    })
    return [side, side, top, side, side, side]
  }, [])

  const matsTop = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.9, metalness: 0.1 })
    const top = new THREE.MeshStandardMaterial({
      color: CYAN,
      emissive: CYAN,
      emissiveIntensity: 3, // Cranked up
      roughness: 0.1,
    })
    return [side, side, top, side, side, side]
  }, [])

  const stackY = [0.48, 1.52, 2.56]

  return (
    <group position={[-4, 0, -4]}>
      {stackY.map((y, i) => (
        <mesh
          key={i}
          position={[0, y, 0]}
          geometry={cubeGeo}
          material={i === 2 ? matsTop : matsBase}
          castShadow
          receiveShadow
        >
          <Edges scale={1.001} linewidth={2} color={EDGE} />
        </mesh>
      ))}

      <pointLight color={CYAN} intensity={5} distance={6} position={[0, 3.5, 0]} />
      <TerminalLabel text="SEARCH" secondary="fts5 · full-text" yOffset={3.8} />
    </group>
  )
}

// ─────────────────────────────────────────────
// TUI TERMINAL — Horizontal 3×1 block
// Code-line texture on top face
// ─────────────────────────────────────────────

function createTuiTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, 512, 512)

    // Draw cyan "code lines" of varying widths
    ctx.strokeStyle = '#00f2ff'
    ctx.lineWidth = 2
    const lines = [
      { x: 30, w: 200 }, { x: 30, w: 120 }, { x: 50, w: 280 },
      { x: 30, w: 160 }, { x: 50, w: 100 }, { x: 30, w: 240 },
      { x: 50, w: 180 }, { x: 30, w: 90 },  { x: 30, w: 300 },
      { x: 50, w: 140 }, { x: 30, w: 220 }, { x: 30, w: 170 },
    ]
    lines.forEach((line, i) => {
      const y = 40 + i * 36
      ctx.beginPath()
      ctx.moveTo(line.x, y)
      ctx.lineTo(line.x + line.w, y)
      ctx.stroke()
    })

    // Blinking cursor
    ctx.fillStyle = '#00f2ff'
    ctx.fillRect(30, 40 + 12 * 36, 8, 16)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 16
  return texture
}

function TuiTerminal() {
  const tuiTexture = useMemo(() => createTuiTexture(), [])

  const geometry = useMemo(() => new THREE.BoxGeometry(2.96, 0.5, 0.96), [])
  const materials = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.9, metalness: 0.1 })
    const top = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      map: tuiTexture,
      emissive: CYAN,
      emissiveMap: tuiTexture,
      emissiveIntensity: 1.5,
      roughness: 0.3,
    })
    return [side, side, top, side, side, side]
  }, [tuiTexture])

  return (
    <group position={[-6, 0, 6]}>
      <mesh position={[0, 0.25, 0]} geometry={geometry} material={materials} castShadow receiveShadow>
        <Edges scale={1.001} linewidth={2} color={EDGE} />
      </mesh>
      <TerminalLabel text="TUI" secondary="interactive · cli" yOffset={1.2} />
      <pointLight color={CYAN} intensity={1} distance={3} position={[0, 0.8, 0]} />
    </group>
  )
}

// ─────────────────────────────────────────────
// MCP ANTENNA — Thin rod with pulsing orb on top
// ─────────────────────────────────────────────

function McpAntenna() {
  const orbRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (orbRef.current) {
      const mat = orbRef.current.material as THREE.MeshStandardMaterial
      // 1-second pulse cycle
      const pulse = Math.sin(clock.elapsedTime * Math.PI * 2) * 0.5 + 0.5
      mat.emissiveIntensity = 1 + pulse * 4
      orbRef.current.scale.setScalar(1 + pulse * 0.15)
    }
  })

  return (
    <group position={[6, 0, 8]}>
      {/* Thin antenna rod */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.12, 3, 0.12]} />
        <meshStandardMaterial color={BODY} roughness={0.8} metalness={0.2} />
        <Edges scale={1.01} linewidth={1} color={EDGE} />
      </mesh>

      {/* Base plate */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.6, 0.24, 0.6]} />
        <meshStandardMaterial color={BODY} roughness={0.9} metalness={0.1} />
        <Edges scale={1.002} linewidth={2} color={EDGE} />
      </mesh>

      {/* Pulsing orb */}
      <mesh ref={orbRef} position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={3}
          roughness={0.1}
        />
      </mesh>

      <pointLight color={CYAN} intensity={2} distance={5} position={[0, 3.5, 0]} />
      <TerminalLabel text="MCP" secondary="agent · protocol" yOffset={4.2} />
    </group>
  )
}
