import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'

// Engram material tokens — Black Marble + Cyan only
const BODY = '#050505'
const EDGE = '#2596be'
const CYAN = '#00f2ff'

export function ElephantCore() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = 1.8 + Math.sin(clock.elapsedTime * 0.6) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[0, 1.8, 0]}>

      {/* ═══════════════════════════════════════════
          TORSO — Single unified solid block
         ═══════════════════════════════════════════ */}
      <VoxelBlock pos={[0, 0, 0]} size={[2.3, 1.8, 1.6]} />

      {/* Side circuit panel accents — cyan only */}
      <VoxelBlock pos={[-1.2, 0.2, 0.2]} size={[0.06, 0.8, 0.6]} glow />

      {/* ═══════════════════════════════════════════
          HEAD — 1.4×1.6×1.4
         ═══════════════════════════════════════════ */}
      <group position={[0, 0.4, 1.5]}>
        {/* Main cranium */}
        <VoxelBlock pos={[0, 0, 0]} size={[1.4, 1.6, 1.4]} />

        {/* Heavy brow / forehead overhang */}
        <VoxelBlock pos={[0, 0.55, 0.45]} size={[1.3, 0.6, 0.4]} />

        {/* Lower jaw */}
        <VoxelBlock pos={[0, -0.55, 0.25]} size={[1.1, 0.4, 0.9]} />

        {/* Cheek armor plates */}
        <VoxelBlock pos={[-0.75, -0.1, 0.1]} size={[0.12, 0.8, 0.8]} />
        <VoxelBlock pos={[0.75, -0.1, 0.1]} size={[0.12, 0.8, 0.8]} />

        {/* Eyes — cyan emissive slots */}
        <mesh position={[-0.35, 0.3, 0.72]}>
          <boxGeometry args={[0.28, 0.12, 0.06]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={6} />
        </mesh>
        <mesh position={[0.35, 0.3, 0.72]}>
          <boxGeometry args={[0.28, 0.12, 0.06]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={6} />
        </mesh>
        <pointLight color={CYAN} intensity={1.5} distance={2.5} position={[0, 0.3, 0.9]} />

        {/* ─── EARS ─── Open outward/forward with Y rotation */}
        {/* Left ear */}
        <group position={[-0.7, 0, 0]} rotation={[0, -1.5, 0]}>
          <VoxelBlock pos={[-0.075, 0, 0.4]} size={[0.15, 1.8, 1.0]} />
        </group>

        {/* Right ear */}
        <group position={[0.7, 0, 0]} rotation={[0, 1.5, 0]}>
          <VoxelBlock pos={[0.075, 0, 0.4]} size={[0.15, 1.8, 1.0]} />
        </group>

        {/* ─── TRUNK ─── 5 segments decreasing 0.4 → 0.2 */}
        <VoxelBlock pos={[0, -0.5, 1.0]} size={[0.4, 0.4, 0.35]} />
        <VoxelBlock pos={[0, -0.85, 1.1]} size={[0.35, 0.35, 0.3]} />
        <VoxelBlock pos={[0, -1.15, 1.15]} size={[0.3, 0.3, 0.25]} />
        <VoxelBlock pos={[0, -1.4, 1.1]} size={[0.25, 0.25, 0.22]} />
        <VoxelBlock pos={[0, -1.6, 1.0]} size={[0.2, 0.2, 0.2]} glow />

        {/* ─── TUSKS ─── Structural beams from face sides */}
        <group position={[-0.55, 0.0, 0.5]} rotation={[-0.6, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 1.4, 0.12]} />
            <meshStandardMaterial
              color="#d4d4d4"
              emissive={CYAN}
              emissiveIntensity={0.3}
              roughness={0.15}
              metalness={0.9}
            />
            <Edges scale={1.01} linewidth={1} color={EDGE} />
          </mesh>
        </group>
        <group position={[0.55, 0.0, 0.5]} rotation={[-0.6, 0.2, 0]}>
          <mesh>
            <boxGeometry args={[0.12, 1.4, 0.12]} />
            <meshStandardMaterial
              color="#d4d4d4"
              emissive={CYAN}
              emissiveIntensity={0.3}
              roughness={0.15}
              metalness={0.9}
            />
            <Edges scale={1.01} linewidth={1} color={EDGE} />
          </mesh>
        </group>
      </group>

      {/* ═══════════════════════════════════════════
          LEGS — 0.5×1.6×0.5 columns
         ═══════════════════════════════════════════ */}

      {/* Shoulder joints */}
      <VoxelBlock pos={[-0.85, -0.6, 0.5]} size={[0.65, 0.65, 0.65]} />
      <VoxelBlock pos={[0.85, -0.6, 0.5]} size={[0.65, 0.65, 0.65]} />
      <VoxelBlock pos={[-0.85, -0.6, -0.5]} size={[0.65, 0.65, 0.65]} />
      <VoxelBlock pos={[0.85, -0.6, -0.5]} size={[0.65, 0.65, 0.65]} />

      {/* Leg columns */}
      <VoxelBlock pos={[-0.85, -1.75, 0.5]} size={[0.5, 1.6, 0.5]} />
      <VoxelBlock pos={[0.85, -1.75, 0.5]} size={[0.5, 1.6, 0.5]} />
      <VoxelBlock pos={[-0.85, -1.75, -0.5]} size={[0.5, 1.6, 0.5]} />
      <VoxelBlock pos={[0.85, -1.75, -0.5]} size={[0.5, 1.6, 0.5]} />

      {/* Knee accents — cyan glow rings */}
      <VoxelBlock pos={[-0.85, -1.3, 0.5]} size={[0.55, 0.12, 0.55]} glow />
      <VoxelBlock pos={[0.85, -1.3, 0.5]} size={[0.55, 0.12, 0.55]} glow />
      <VoxelBlock pos={[-0.85, -1.3, -0.5]} size={[0.55, 0.12, 0.55]} glow />
      <VoxelBlock pos={[0.85, -1.3, -0.5]} size={[0.55, 0.12, 0.55]} glow />

      {/* Feet */}
      <VoxelBlock pos={[-0.85, -2.6, 0.5]} size={[0.65, 0.12, 0.65]} />
      <VoxelBlock pos={[0.85, -2.6, 0.5]} size={[0.65, 0.12, 0.65]} />
      <VoxelBlock pos={[-0.85, -2.6, -0.5]} size={[0.65, 0.12, 0.65]} />
      <VoxelBlock pos={[0.85, -2.6, -0.5]} size={[0.65, 0.12, 0.65]} />

      {/* ═══════════════════════════════════════════
          TAIL — 3 segments
         ═══════════════════════════════════════════ */}
      <VoxelBlock pos={[0, 0.4, -1.0]} size={[0.14, 0.14, 0.5]} />
      <VoxelBlock pos={[0, 0.15, -1.3]} size={[0.1, 0.1, 0.35]} />
      <VoxelBlock pos={[0, -0.05, -1.5]} size={[0.16, 0.16, 0.16]} glow />

      {/* ═══════════════════════════════════════════
          POWER CORE — Reactor between legs
         ═══════════════════════════════════════════ */}
      <PowerCore />

      {/* Ambient top light — cyan only */}
      <pointLight color={CYAN} intensity={2} distance={6} position={[0, 2, 0]} />
    </group>
  )
}

// ─────────────────────────────────────────────
// VoxelBlock — Black Marble material, cyan edges
// No purple. Ever.
// ─────────────────────────────────────────────

function VoxelBlock({
  pos, size, glow = false
}: {
  pos: [number, number, number]
  size: [number, number, number]
  glow?: boolean
}) {
  const material = useMemo(() => {
    if (glow) {
      return new THREE.MeshStandardMaterial({
        color: CYAN, emissive: CYAN, emissiveIntensity: 1.5, roughness: 0.2,
      })
    }
    return new THREE.MeshStandardMaterial({
      color: BODY, roughness: 0.85, metalness: 0.15,
    })
  }, [glow])

  return (
    <mesh position={pos} material={material} castShadow receiveShadow>
      <boxGeometry args={size} />
      <Edges scale={1.001} linewidth={1.5} color={EDGE} />
    </mesh>
  )
}

// ─────────────────────────────────────────────
// POWER CORE — Pulsing cyan reactor
// ─────────────────────────────────────────────

function PowerCore() {
  const orbRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (orbRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 2.5) * 0.5 + 0.5
      const mat = orbRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.5 + pulse * 0.5
      orbRef.current.scale.setScalar(1 + pulse * 0.1)
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += 0.02
    }
  })

  return (
    <group position={[0, -1.8, 0]}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.7} />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight color={CYAN} intensity={8} distance={5} />
    </group>
  )
}
