import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AgentProps {
  path: [number, number, number][]
  color?: string
  speed?: number
  label?: string
}

function cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const mt = 1 - t
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3
}

function getPointOnPath(
  points: [number, number, number][],
  t: number,
): [number, number, number] {
  const n = points.length - 1
  const segment = Math.min(Math.floor(t * n), n - 1)
  const localT = t * n - segment

  const p0 = points[Math.max(0, segment - 1)]
  const p1 = points[segment]
  const p2 = points[Math.min(segment + 1, n)]
  const p3 = points[Math.min(segment + 2, n)]

  return [
    cubicBezier(p0[0], p1[0], p2[0], p3[0], localT),
    cubicBezier(p0[1], p1[1], p2[1], p3[1], localT),
    cubicBezier(p0[2], p1[2], p2[2], p3[2], localT),
  ]
}

export function Agent({ path, color = '#00f2ff', speed = 0.08, label }: AgentProps) {
  const groupRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Points>(null)
  const timeRef = useRef(Math.random())

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        emissive: color,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.8,
      }),
    [color],
  )

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 2,
      }),
    [color],
  )

  const trailMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color,
        size: 0.08,
        transparent: true,
        opacity: 0.4,
      }),
    [color],
  )

  const trailPositions = useMemo(() => {
    const positions = new Float32Array(30 * 3)
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    timeRef.current += clock.getDelta() * speed
    const t = timeRef.current % 1

    const pos = getPointOnPath(path, t)
    const nextPos = getPointOnPath(path, (t + 0.01) % 1)

    groupRef.current.position.lerp(new THREE.Vector3(...pos), 0.15)

    const angle = Math.atan2(nextPos[0] - pos[0], nextPos[2] - pos[2])
    let diff = angle - groupRef.current.rotation.y
    while (diff > Math.PI) diff -= Math.PI * 2
    while (diff < -Math.PI) diff += Math.PI * 2
    groupRef.current.rotation.y += diff * 0.1

    // Bob up and down
    groupRef.current.position.y = pos[1] + Math.sin(clock.elapsedTime * 5) * 0.1

    // Update trail
    if (trailRef.current) {
      const positions = trailRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 29; i > 0; i--) {
        positions[i * 3] = positions[(i - 1) * 3]
        positions[i * 3 + 1] = positions[(i - 1) * 3 + 1]
        positions[i * 3 + 2] = positions[(i - 1) * 3 + 2]
      }
      positions[0] = pos[0]
      positions[1] = pos[1] + 0.5
      positions[2] = pos[2]
      trailRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Trail particles */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={30}
            array={trailPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={trailMaterial} attach="material" />
      </points>

      {/* Body */}
      <mesh material={bodyMaterial}>
        <boxGeometry args={[0.5, 0.7, 0.5]} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.55, 0]} material={bodyMaterial}>
        <boxGeometry args={[0.4, 0.35, 0.4]} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 0.6, 0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <primitive object={eyeMaterial} attach="material" />
      </mesh>
      <mesh position={[0.1, 0.6, 0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <primitive object={eyeMaterial} attach="material" />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>

      {/* Small point light */}
      <pointLight color={color} intensity={0.3} distance={2} position={[0, 0.5, 0]} />
    </group>
  )
}
