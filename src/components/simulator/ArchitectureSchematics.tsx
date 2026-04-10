import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Edges, Html } from '@react-three/drei'
import { useMemoryStore } from '../../stores/memoryStore'
import { getBlackMarbleTextures } from './MaterialUtils'

// Nothing Design tokens mapped to 3D materials
const BODY = '#050505'
const EDGE = '#2596be'
const PURPLE = '#bc13fe'
const CYAN = '#00f2ff'

export function ArchitectureSchematics() {
  return (
    <group>
      <CorePlatform />
      <PersistenceVault />
      <SearchTower />
      <TuiTerminal />
      <McpAntenna />
      <CircuitTraces />
      <MicroVoxels />
    </group>
  )
}

/**
 * Crisp HTML label with CSS isometric transform applied.
 * Uses <Html> from drei for sharp text rendering,
 * but applies a consistent CSS rotation to match the isometric RTS aesthetic.
 */
function StationLabel({ text, secondary, yOffset = 1.2 }: { text: string; secondary?: string; yOffset?: number }) {
  return (
    <Html distanceFactor={10} position={[0, yOffset, 0]} center transform
      style={{ pointerEvents: 'none' }}
      // Apply CSS isometric tilt so all labels share the same perspective
      rotation={[-Math.PI / 3, 0, Math.PI / 4]}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        pointerEvents: 'none', userSelect: 'none',
        transform: 'scale(1)',
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.92)',
          border: '1px solid #333333',
          padding: '5px 14px',
          fontFamily: "'JetBrains Mono', 'Space Mono', monospace",
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            fontSize: '13px', fontWeight: 700, color: '#E8E8E8',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            [ {text} ]
          </span>
          {secondary && (
            <div style={{
              fontSize: '9px', color: '#666666', textAlign: 'center',
              letterSpacing: '0.04em', marginTop: '2px',
            }}>
              {secondary}
            </div>
          )}
        </div>
        <div style={{ width: '1px', height: '12px', background: 'linear-gradient(to bottom, #333333, transparent)' }} />
      </div>
    </Html>
  )
}

/**
 * Flow particle that follows ALL waypoints along a cable path,
 * not just first→last.
 */
function FlowTrace({ points, color, speed = 0.4 }: { points: [number, number, number][]; color: string; speed?: number }) {
  const matRef = useRef<THREE.LineBasicMaterial>(null)
  const particleRef = useRef<THREE.Mesh>(null)
  
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const verts = new Float32Array(points.flat())
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    return g
  }, [points])

  // Pre-compute segment lengths for proper path interpolation
  const { totalLength, segments } = useMemo(() => {
    const segs: { start: THREE.Vector3; end: THREE.Vector3; length: number }[] = []
    let total = 0
    for (let i = 0; i < points.length - 1; i++) {
      const s = new THREE.Vector3(...points[i])
      const e = new THREE.Vector3(...points[i + 1])
      const len = s.distanceTo(e)
      segs.push({ start: s, end: e, length: len })
      total += len
    }
    return { totalLength: total, segments: segs }
  }, [points])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (matRef.current) {
      const wave = Math.sin(t * 2) * 0.5 + 0.5
      matRef.current.opacity = 0.3 + wave * 0.7
    }
    if (particleRef.current && segments.length > 0) {
      // Walk along the full path, following all waypoints
      const cycle = (t * speed) % 1.0
      let targetDist = cycle * totalLength
      let found = false
      
      for (const seg of segments) {
        if (targetDist <= seg.length) {
          const frac = targetDist / seg.length
          particleRef.current.position.lerpVectors(seg.start, seg.end, frac)
          found = true
          break
        }
        targetDist -= seg.length
      }
      
      if (!found) {
        // Fallback to last point
        const last = points[points.length - 1]
        particleRef.current.position.set(...last)
      }
      
      const particleMat = particleRef.current.material as THREE.MeshBasicMaterial
      particleMat.opacity = Math.sin(cycle * Math.PI) * 0.8 + 0.2
    }
  })

  return (
    <group>
      <line geometry={geometry}>
        <lineBasicMaterial ref={matRef} color={color} transparent opacity={0.85} />
      </line>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
        <pointLight color={color} intensity={0.8} distance={1.5} />
      </mesh>
    </group>
  )
}

function CircuitTraces() {
  const Y = 0.015

  // Core (0,0,2) → PersistenceVault (5, -4)
  const coreToVault: [number, number, number][] = [[1.5, Y, 2], [5, Y, 2], [5, Y, -2]]
  // Core (0,0,2) → SearchTower (-5, -5)
  const coreToSearch: [number, number, number][] = [[-1.5, Y, 2], [-5, Y, 2], [-5, Y, -3]]
  // Core (0,0,2) → MCP (5, 6)
  const coreToMcp: [number, number, number][] = [[1.5, Y, 2], [5, Y, 2], [5, Y, 6]]
  // Core (0,0,2) → TUI (-5, 6)
  const coreToTui: [number, number, number][] = [[-1.5, Y, 2], [-5, Y, 2], [-5, Y, 6]]
  // SearchTower (-5, -5) → PersistenceVault (5, -4) (back connector)
  const crossBack: [number, number, number][] = [[-5, Y, -5], [-5, Y, -7], [5, Y, -7], [5, Y, -4]]
  // TUI (-5, 6) → MCP (5, 6) (front connector)
  const crossFront: [number, number, number][] = [[-5, Y, 6], [-5, Y, 8], [5, Y, 8], [5, Y, 6]]
  // SearchTower (-5, -5) → TUI (-5, 6) (left side)
  const leftSide: [number, number, number][] = [[-5, Y, -5], [-7, Y, -5], [-7, Y, 6], [-5, Y, 6]]
  // PersistenceVault (5, -4) → MCP (5, 6) (right side)
  const rightSide: [number, number, number][] = [[5, Y, -4], [7, Y, -4], [7, Y, 6], [5, Y, 6]]

  return (
    <group>
      <FlowTrace points={coreToVault} color={PURPLE} speed={0.35} />
      <FlowTrace points={coreToSearch} color={CYAN} speed={0.4} />
      <FlowTrace points={coreToMcp} color={CYAN} speed={0.3} />
      <FlowTrace points={coreToTui} color={PURPLE} speed={0.45} />
      <FlowTrace points={crossBack} color={EDGE} speed={0.25} />
      <FlowTrace points={crossFront} color={PURPLE} speed={0.3} />
      <FlowTrace points={leftSide} color={CYAN} speed={0.35} />
      <FlowTrace points={rightSide} color={EDGE} speed={0.4} />
    </group>
  )
}

function MicroVoxels() {
  const voxels = useMemo(() => [
    { pos: [-6, 0.15, 3], edge: true }, { pos: [6, 0.15, -2], edge: false },
    { pos: [-3, 0.15, 7], edge: true }, { pos: [7, 0.15, 5], edge: false },
    { pos: [-5, 0.15, -6], edge: true }, { pos: [2, 0.15, 8], edge: false },
    { pos: [-7, 0.15, -3], edge: true }, { pos: [6, 0.15, -6], edge: false },
    { pos: [3, 0.15, 5], edge: true }, { pos: [-6, 0.15, -1], edge: false },
    { pos: [8, 0.15, 2], edge: true }, { pos: [-2, 0.15, -7], edge: false },
  ].map(v => ({ ...v, rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number] })), [])

  const textures = useMemo(() => getBlackMarbleTextures('voxel'), [])
  const geo = useMemo(() => new THREE.BoxGeometry(0.15, 0.15, 0.15), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#080808', roughness: 0.9, metalness: 0.1,
    map: textures.mapTex, bumpMap: textures.bumpTex, bumpScale: 0.05
  }), [textures])

  return (
    <group>
      {voxels.map((v, i) => (
        <mesh key={i} position={v.pos as [number, number, number]} rotation={v.rot} geometry={geo} material={mat}>
          {v.edge && <Edges scale={1.01} linewidth={1} color={Math.random() > 0.5 ? CYAN : EDGE} threshold={15} />}
        </mesh>
      ))}
    </group>
  )
}

function CorePlatform() {
  const setActiveWindow = useMemoryStore(s => s.setActiveWindow)
  const [hovered, setHovered] = useState(false)
  const textures = useMemo(() => getBlackMarbleTextures('core'), [])

  return (
    <group 
      position={[0, 0, 2]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { e.stopPropagation(); setActiveWindow('kernel') }}
    >
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.96, 0.5, 2.96]} />
        <meshStandardMaterial 
          color={BODY} 
          roughness={0.9} 
          metalness={0.1} 
          emissive={PURPLE} 
          emissiveIntensity={hovered ? 0.3 : 0.05}
          map={textures.mapTex}
          bumpMap={textures.bumpTex}
          bumpScale={0.05}
          emissiveMap={textures.emiTex}
        />
        <Edges scale={1.001} linewidth={2} color={hovered ? CYAN : EDGE} />
      </mesh>
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.6]} />
        <meshStandardMaterial 
          color={BODY} roughness={0.8} metalness={0.2} 
          map={textures.mapTex} bumpMap={textures.bumpTex} bumpScale={0.05}
        />
        <Edges scale={1.002} linewidth={2} color={EDGE} />
      </mesh>
      <pointLight color={PURPLE} intensity={hovered ? 6 : 3} distance={7} position={[0, 1.2, 0]} />
    </group>
  )
}

function PersistenceVault() {
  const cubeGeo = useMemo(() => new THREE.BoxGeometry(0.96, 0.96, 0.96), [])
  const [hovered, setHovered] = useState(false)
  const textures = useMemo(() => getBlackMarbleTextures('persistence'), [])

  const content = `## Installation\n\n**Single Binary, Zero Dependencies**\n\nDownload and run Engram in seconds. Works on macOS, Linux, and Windows.\n\n### Quick Start\n\n\`\`\`bash\n# macOS\nbrew install engram\n\n# Linux\ncurl -sSL https://engram.dev/install.sh | bash\n\n# Windows\nwinget install engram\`\`\``

  const matsSolid = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.9, metalness: 0.1,
      map: textures.mapTex, bumpMap: textures.bumpTex, bumpScale: 0.05,
      emissive: PURPLE, emissiveMap: textures.emiTex, emissiveIntensity: hovered ? 0.3 : 0.05
    })
    const top = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.9, metalness: 0.1,
      map: textures.mapTex, bumpMap: textures.bumpTex, bumpScale: 0.05,
      emissive: PURPLE, emissiveMap: textures.emiTex, emissiveIntensity: hovered ? 0.5 : 0.2
    })
    return [side, side, top, side, side, side]
  }, [textures, hovered])

  return (
    <group 
      position={[5, 0, -4]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { 
        e.stopPropagation()
        const openWindow = useMemoryStore.getState().openWindow
        openWindow('INSTALL', 'Installation', content)
      }}
    >
      {[[-0.5, 0.48, -0.5], [0.5, 0.48, -0.5], [-0.5, 0.48, 0.5], [0.5, 0.48, 0.5]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} geometry={cubeGeo} material={matsSolid} castShadow receiveShadow>
          <Edges scale={1.001} linewidth={2} color={hovered ? CYAN : EDGE} />
        </mesh>
      ))}
      <StationLabel text="PERSISTENCE" secondary="sqlite · vault" yOffset={1.6} />
      <pointLight color={PURPLE} intensity={hovered ? 4 : 2} distance={4} position={[0.5, 1.2, -0.5]} />
    </group>
  )
}

function SearchTower() {
  const cubeGeo = useMemo(() => new THREE.BoxGeometry(0.96, 0.96, 0.96), [])
  const [hovered, setHovered] = useState(false)
  const textures = useMemo(() => getBlackMarbleTextures('search'), [])

  const content = `## Git Synchronization\n\n**Version-Controlled Memory Backups**\n\nAutomatically sync your memory vault to a Git repository for backup and audit trail.\n\n### Features\n\n- Automatic commits on save\n- Branch support for experiments\n- Push/pull to remote repos\n- Encrypted storage`

  const matsBase = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.9, metalness: 0.1,
      map: textures.mapTex, bumpMap: textures.bumpTex, bumpScale: 0.05,
      emissive: CYAN, emissiveMap: textures.emiTex, emissiveIntensity: hovered ? 0.3 : 0.05
    })
    const top = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.9, metalness: 0.1,
      map: textures.mapTex, bumpMap: textures.bumpTex, bumpScale: 0.05,
      emissive: CYAN, emissiveMap: textures.emiTex, emissiveIntensity: hovered ? 0.4 : 0.1
    })
    return [side, side, top, side, side, side]
  }, [textures, hovered])

  const matsTop = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.9, metalness: 0.1,
      map: textures.mapTex, bumpMap: textures.bumpTex, bumpScale: 0.05,
      emissive: CYAN, emissiveMap: textures.emiTex, emissiveIntensity: hovered ? 0.3 : 0.05
    })
    const top = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.1, metalness: 0.1,
      emissive: CYAN, emissiveIntensity: hovered ? 5.0 : 3.0
    })
    return [side, side, top, side, side, side]
  }, [textures, hovered])

  return (
    <group 
      position={[-5, 0, -5]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { 
        e.stopPropagation()
        const openWindow = useMemoryStore.getState().openWindow
        openWindow('SYNC', 'Git Synchronization', content)
      }}
    >
      {[0.48, 1.52, 2.56].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} geometry={cubeGeo} material={i === 2 ? matsTop : matsBase} castShadow receiveShadow>
          <Edges scale={1.001} linewidth={2} color={hovered ? CYAN : EDGE} />
        </mesh>
      ))}
      <pointLight color={CYAN} intensity={hovered ? 8 : 5} distance={6} position={[0, 3.5, 0]} />
      <StationLabel text="SEARCH" secondary="fts5 · indexing" yOffset={3.8} />
    </group>
  )
}

function TuiTerminal() {
  const tuiTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512; canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, 512, 512)
      ctx.strokeStyle = '#00f2ff'; ctx.lineWidth = 2
      const lines = [{x:30,w:200},{x:30,w:120},{x:50,w:280},{x:30,w:160},{x:50,w:100},{x:30,w:240},{x:50,w:180},{x:30,w:90},{x:30,w:300},{x:50,w:140},{x:30,w:220}]
      lines.forEach((line, i) => { const y = 40 + i * 36; ctx.beginPath(); ctx.moveTo(line.x, y); ctx.lineTo(line.x + line.w, y); ctx.stroke() })
      
      ctx.fillStyle = '#00f2ff'; ctx.fillRect(30, 40 + 12 * 36, 16, 24)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.anisotropy = 4
    return tex
  }, [])

  const textures = useMemo(() => getBlackMarbleTextures('tui'), [])
  const content = `## Text User Interface\n\n**Direct Terminal Control**\n\nAccess Engram through a powerful terminal interface for advanced memory operations.\n\n### Commands\n\n- \`list\` - Show all memories\n- \`search <query>\` - Full-text search\n- \`load <id>\` - Load specific memory\n- \`save\` - Manual save\n- \`sync\` - Git synchronization`

  const [hovered, setHovered] = useState(false)

  const mats = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.9, metalness: 0.1,
      map: textures.mapTex, bumpMap: textures.bumpTex, bumpScale: 0.05,
      emissive: CYAN, emissiveMap: textures.emiTex, emissiveIntensity: hovered ? 0.3 : 0.05
    })
    const front = new THREE.MeshStandardMaterial({ 
      color: BODY, roughness: 0.9, metalness: 0.1,
      map: tuiTexture,
      emissive: CYAN, emissiveMap: tuiTexture, emissiveIntensity: hovered ? 1.0 : 0.3
    })
    return [side, side, side, side, front, side]
  }, [textures, tuiTexture, hovered])

  return (
    <group 
      position={[-5, 0, 6]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { 
        e.stopPropagation()
        const openWindow = useMemoryStore.getState().openWindow
        openWindow('TUI', 'Text User Interface', content)
      }}
    >
      <mesh position={[0, 0.25, 0]} material={mats} castShadow receiveShadow>
        <boxGeometry args={[2.96, 0.5, 0.96]} />
        <Edges scale={1.001} linewidth={2} color={hovered ? CYAN : EDGE} />
      </mesh>
      <StationLabel text="TUI" secondary="interactive · terminal" yOffset={1.2} />
      <pointLight color={CYAN} intensity={hovered ? 3 : 1} distance={3} position={[0, 0.8, 1]} />
    </group>
  )
}

function McpAntenna() {
  const orbRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const textures = useMemo(() => getBlackMarbleTextures('mcp'), [])

  const content = `## MCP Tools\n\n**Model Context Protocol Integration**\n\nSeamlessly connect Engram with any MCP-compatible tool or agent.\n\n### Supported Tools\n\n- File system operations\n- Code repository access\n- Database queries\n- API integrations\n- Custom tool handlers`

  useFrame(({ clock }) => {
    if (orbRef.current) {
      const mat = orbRef.current.material as THREE.MeshStandardMaterial
      const pulse = Math.sin(clock.elapsedTime * Math.PI * 2) * 0.5 + 0.5
      mat.emissiveIntensity = (hovered ? 7 : 3) + pulse * 2
      orbRef.current.scale.setScalar((hovered ? 1.2 : 1) + pulse * 0.15)
      orbRef.current.rotation.y = clock.elapsedTime * 1.5
      orbRef.current.position.x = Math.sin(clock.elapsedTime * 1.5) * 0.25
      orbRef.current.position.z = Math.cos(clock.elapsedTime * 1.5) * 0.25
    }
  })

  return (
    <group 
      position={[5, 0, 6]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { 
        e.stopPropagation()
        const openWindow = useMemoryStore.getState().openWindow
        openWindow('TOOLS', 'MCP Tools', content)
      }}
    >
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.12, 3, 0.12]} />
        <meshStandardMaterial 
          color={BODY} roughness={0.8} metalness={0.2}
          map={textures.mapTex} bumpMap={textures.bumpTex} bumpScale={0.05}
          emissive={CYAN} emissiveMap={textures.emiTex} emissiveIntensity={hovered ? 0.3 : 0.05}
        />
        <Edges scale={1.01} color={hovered ? CYAN : EDGE} />
      </mesh>
      <group position={[0, 3.2, 0]}>
        <mesh ref={orbRef}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={3} roughness={0.1} />
        </mesh>
        <pointLight color={CYAN} intensity={hovered ? 6 : 3} distance={5} />
      </group>
      <StationLabel text="MCP" secondary="agent · stream" yOffset={4.2} />
    </group>
  )
}
