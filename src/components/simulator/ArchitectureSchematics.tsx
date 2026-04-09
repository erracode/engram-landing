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

function TerminalLabel({ text, secondary, yOffset = 1.2 }: { text: string; secondary?: string; yOffset?: number }) {
  return (
    <Html distanceFactor={12} position={[0, yOffset, 0]} center>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.9)', border: '1px solid #333333', borderRadius: '4px', padding: '4px 12px', fontFamily: "'JetBrains Mono', monospace" }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#E8E8E8', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            [ {text} ]
          </span>
          {secondary && (
            <div style={{ fontSize: '10px', color: '#999999', textAlign: 'center', letterSpacing: '0.04em', marginTop: '2px' }}>
              {secondary}
            </div>
          )}
        </div>
        <div style={{ width: '1px', height: '16px', background: 'linear-gradient(to bottom, #333333, transparent)' }} />
      </div>
    </Html>
  )
}

function FlowTrace({ points, color }: { points: [number, number, number][]; color: string }) {
  const matRef = useRef<THREE.LineBasicMaterial>(null)
  const particleRef = useRef<THREE.Mesh>(null)
  
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const verts = new Float32Array(points.flat())
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    return g
  }, [points])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (matRef.current) {
      const wave = Math.sin(t * 2) * 0.5 + 0.5
      matRef.current.opacity = 0.3 + wave * 0.7
    }
    if (particleRef.current && points.length >= 2) {
      // Very simple linear interpolation between the first two points
      const p1 = new THREE.Vector3(...points[0])
      const p2 = new THREE.Vector3(...points[points.length - 1])
      // Walk particle along the line
      const cycle = (t * 0.5) % 1.0
      particleRef.current.position.lerpVectors(p1, p2, cycle)
      const particleMat = particleRef.current.material as THREE.MeshBasicMaterial
      particleMat.opacity = Math.sin(cycle * Math.PI) // fade in and out
    }
  })

  return (
    <group>
      <line geometry={geometry}>
        <lineBasicMaterial ref={matRef} color={color} transparent opacity={0.85} />
      </line>
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
        <pointLight color={color} intensity={0.5} distance={1} />
      </mesh>
    </group>
  )
}

function CircuitTraces() {
  const Y = 0.015
  const coreToVault: [number, number, number][] = [[2, Y, 0], [4, Y, 0], [4, Y, -3]]
  const coreToSearch: [number, number, number][] = [[-2, Y, 0], [-4, Y, 0], [-4, Y, -3]]
  const coreToMcp: [number, number, number][] = [[2, Y, 0], [6, Y, 0], [6, Y, 8]]
  const coreToTui: [number, number, number][] = [[-2, Y, 0], [-6, Y, 0], [-6, Y, 6]]
  const crossBack: [number, number, number][] = [[-4, Y, -5], [-4, Y, -6], [4, Y, -6], [4, Y, -5]]

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

function MicroVoxels() {
  const voxels = useMemo(() => [
    { pos: [-7, 0.15, 3], edge: true }, { pos: [5, 0.15, -2], edge: false },
    { pos: [-3, 0.15, 7], edge: true }, { pos: [8, 0.15, 6], edge: false },
    { pos: [-5, 0.15, -6], edge: true }, { pos: [2, 0.15, 8], edge: false },
    { pos: [-8, 0.15, -3], edge: true }, { pos: [7, 0.15, -7], edge: false },
    { pos: [3, 0.15, 5], edge: true }, { pos: [-6, 0.15, -1], edge: false },
    { pos: [9, 0.15, 2], edge: true }, { pos: [-2, 0.15, -8], edge: false },
    { pos: [6, 0.15, -5], edge: true }, { pos: [-9, 0.15, 5], edge: false },
    { pos: [1, 0.15, -3], edge: true },
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
      position={[0, 0, 0]}
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
      position={[4, 0, -4]}
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
      <TerminalLabel text="PERSISTENCE" secondary="sqlite · vault" yOffset={1.6} />
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
      position={[-4, 0, -4]}
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
      <TerminalLabel text="SEARCH" secondary="fts5 · indexing" yOffset={3.8} />
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
      
      // Cursor parpadeante (parpadeo no es trivial aquí porque se renderiza una vez, pero lo dibujamos)
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
    // Indices: right (0), left (1), top (2), bottom (3), front (+Z, 4), back (-Z, 5)
    return [side, side, side, side, front, side]
  }, [textures, tuiTexture, hovered])

  return (
    <group 
      position={[-6, 0, 6]}
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
      <TerminalLabel text="TUI" secondary="interactive · terminal" yOffset={1.2} />
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
      orbRef.current.rotation.y = clock.elapsedTime * 1.5 // 1.5 rad/s
      orbRef.current.position.x = Math.sin(clock.elapsedTime * 1.5) * 0.25
      orbRef.current.position.z = Math.cos(clock.elapsedTime * 1.5) * 0.25
    }
  })

  return (
    <group 
      position={[6, 0, 8]}
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
      <TerminalLabel text="MCP" secondary="agent · stream" yOffset={4.2} />
    </group>
  )
}
