import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'
import { useMemoryStore } from '../../stores/memoryStore'

// Engram material tokens — Black Marble + Cyan only
const BODY = '#050505'
const EDGE = '#2596be'
const CYAN = '#00f2ff'

export function ElephantCore() {
  const groupRef = useRef<THREE.Group>(null)
  const setActiveWindow = useMemoryStore(s => s.setActiveWindow)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = 1.8 + Math.sin(clock.elapsedTime * 0.6) * 0.08
    }
  })

  const content = `## Architecture\n\n**Persistent Memory for AI Coding Agents**\n\nEngram provides persistent memory that bridges agent sessions, maintaining context, decisions, and learned patterns over time.\n\n### Core Features\n\n- **Persistent Storage**: SQLite-based memory vault\n- **Fast Search**: FTS5 full-text search indexing\n- **Agent-Agnostic**: Works with any AI agent\n- **MCP Integration**: Seamless tool compatibility\n- **Git Sync**: Version-controlled memory backups\n\n### How It Works\n\n1. Agent operates as usual\n2. Memory captured to Engram vault\n3. FTS5 indexes content for search\n4. Memory persists across sessions\n5. Next agent load retains context`

  return (
    <group 
      ref={groupRef} 
      position={[0, 1.8, 0]}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { 
        e.stopPropagation()
        const openWindow = useMemoryStore.getState().openWindow
        openWindow('ARCH', 'Architecture', content)
      }}
    >

      {/* ─── TORSO ─── */}
      <VoxelBlock pos={[0, 0, 0]} size={[2.3, 1.8, 1.6]} hovered={hovered} />

      {/* Side panel */}
      <VoxelBlock pos={[-1.2, 0.2, 0.2]} size={[0.06, 0.8, 0.6]} glow />

      {/* ─── HEAD ─── */}
      <group position={[0, 0.4, 1.5]}>
        <VoxelBlock pos={[0, 0, 0]} size={[1.4, 1.6, 1.4]} hovered={hovered} />
        <VoxelBlock pos={[0, 0.55, 0.45]} size={[1.3, 0.6, 0.4]} hovered={hovered} />
        <VoxelBlock pos={[0, -0.55, 0.25]} size={[1.1, 0.4, 0.9]} hovered={hovered} />
        <VoxelBlock pos={[-0.75, -0.1, 0.1]} size={[0.12, 0.8, 0.8]} hovered={hovered} />
        <VoxelBlock pos={[0.75, -0.1, 0.1]} size={[0.12, 0.8, 0.8]} hovered={hovered} />

        {/* Eyes */}
        <mesh position={[-0.35, 0.3, 0.72]}>
          <boxGeometry args={[0.28, 0.12, 0.06]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={hovered ? 12 : 6} />
        </mesh>
        <mesh position={[0.35, 0.3, 0.72]}>
          <boxGeometry args={[0.28, 0.12, 0.06]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={hovered ? 12 : 6} />
        </mesh>
        <pointLight color={CYAN} intensity={hovered ? 3 : 1.5} distance={2.5} position={[0, 0.3, 0.9]} />

        {/* EARS */}
        <group position={[-0.7, 0, 0]} rotation={[0, -1.5, 0]}>
          <VoxelBlock pos={[-0.075, 0, 0.4]} size={[0.15, 1.8, 1.0]} hovered={hovered} />
        </group>
        <group position={[0.7, 0, 0]} rotation={[0, 1.5, 0]}>
          <VoxelBlock pos={[0.075, 0, 0.4]} size={[0.15, 1.8, 1.0]} hovered={hovered} />
        </group>

        {/* TRUNK */}
        <VoxelBlock pos={[0, -0.5, 1.0]} size={[0.4, 0.4, 0.35]} hovered={hovered} />
        <VoxelBlock pos={[0, -0.85, 1.1]} size={[0.35, 0.35, 0.3]} hovered={hovered} />
        <VoxelBlock pos={[0, -1.15, 1.15]} size={[0.3, 0.3, 0.25]} hovered={hovered} />
        <VoxelBlock pos={[0, -1.4, 1.1]} size={[0.25, 0.25, 0.22]} hovered={hovered} />
        <VoxelBlock pos={[0, -1.6, 1.0]} size={[0.2, 0.2, 0.2]} glow />

        {/* TUSKS */}
        <group position={[-0.55, 0.0, 0.5]} rotation={[-0.6, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 1.4, 0.12]} />
            <meshStandardMaterial color="#d4d4d4" emissive={CYAN} emissiveIntensity={hovered ? 1 : 0.3} metalness={0.9} />
            <Edges scale={1.01} linewidth={1} color={hovered ? CYAN : EDGE} />
          </mesh>
        </group>
        <group position={[0.55, 0.0, 0.5]} rotation={[-0.6, 0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 1.4, 0.12]} />
            <meshStandardMaterial color="#d4d4d4" emissive={CYAN} emissiveIntensity={hovered ? 1 : 0.3} metalness={0.9} />
            <Edges scale={1.01} linewidth={1} color={hovered ? CYAN : EDGE} />
          </mesh>
        </group>
      </group>

      {/* LEGS */}
      <VoxelBlock pos={[-0.85, -0.6, 0.5]} size={[0.65, 0.65, 0.65]} hovered={hovered} />
      <VoxelBlock pos={[0.85, -0.6, 0.5]} size={[0.65, 0.65, 0.65]} hovered={hovered} />
      <VoxelBlock pos={[-0.85, -0.6, -0.5]} size={[0.65, 0.65, 0.65]} hovered={hovered} />
      <VoxelBlock pos={[0.85, -0.6, -0.5]} size={[0.65, 0.65, 0.65]} hovered={hovered} />

      <VoxelBlock pos={[-0.85, -1.75, 0.5]} size={[0.5, 1.6, 0.5]} hovered={hovered} />
      <VoxelBlock pos={[0.85, -1.75, 0.5]} size={[0.5, 1.6, 0.5]} hovered={hovered} />
      <VoxelBlock pos={[-0.85, -1.75, -0.5]} size={[0.5, 1.6, 0.5]} hovered={hovered} />
      <VoxelBlock pos={[0.85, -1.75, -0.5]} size={[0.5, 1.6, 0.5]} hovered={hovered} />

      <VoxelBlock pos={[-0.85, -1.3, 0.5]} size={[0.55, 0.12, 0.55]} glow />
      <VoxelBlock pos={[0.85, -1.3, 0.5]} size={[0.55, 0.12, 0.55]} glow />
      <VoxelBlock pos={[-0.85, -1.3, -0.5]} size={[0.55, 0.12, 0.55]} glow />
      <VoxelBlock pos={[0.85, -1.3, -0.5]} size={[0.55, 0.12, 0.55]} glow />

      <VoxelBlock pos={[-0.85, -2.6, 0.5]} size={[0.65, 0.12, 0.65]} hovered={hovered} />
      <VoxelBlock pos={[0.85, -2.6, 0.5]} size={[0.65, 0.12, 0.65]} hovered={hovered} />
      <VoxelBlock pos={[-0.85, -2.6, -0.5]} size={[0.65, 0.12, 0.65]} hovered={hovered} />
      <VoxelBlock pos={[0.85, -2.6, -0.5]} size={[0.65, 0.12, 0.65]} hovered={hovered} />

      {/* TAIL */}
      <VoxelBlock pos={[0, 0.4, -1.0]} size={[0.14, 0.14, 0.5]} hovered={hovered} />
      <VoxelBlock pos={[0, 0.15, -1.3]} size={[0.1, 0.1, 0.35]} hovered={hovered} />
      <VoxelBlock pos={[0, -0.05, -1.5]} size={[0.16, 0.16, 0.16]} glow hovered={hovered} />

      <PowerCore hovered={hovered} />
    </group>
  )
}

function VoxelBlock({ pos, size, glow = false, hovered = false }: { pos: [number, number, number]; size: [number, number, number]; glow?: boolean; hovered?: boolean }) {
  const material = useMemo(() => {
    if (glow) return new THREE.MeshStandardMaterial({ color: CYAN, emissive: CYAN, emissiveIntensity: 1.5 })
    return new THREE.MeshStandardMaterial({ color: BODY, roughness: 0.85, metalness: 0.15 })
  }, [glow])

  return (
    <mesh position={pos} material={material} castShadow receiveShadow>
      <boxGeometry args={size} />
      <Edges scale={1.001} linewidth={1.5} color={hovered ? CYAN : EDGE} />
    </mesh>
  )
}

function PowerCore({ hovered }: { hovered?: boolean }) {
  const orbRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (orbRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 2.5) * 0.5 + 0.5
      const mat = orbRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = (hovered ? 0.8 : 0.5) + pulse * 0.2
      orbRef.current.scale.setScalar((hovered ? 1.2 : 1) + pulse * 0.1)
    }
  })

  return (
    <group position={[0, -1.8, 0]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.7} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight color={CYAN} intensity={hovered ? 12 : 8} distance={5} />
    </group>
  )
}
