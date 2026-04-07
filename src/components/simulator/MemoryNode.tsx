import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MemoryNodeProps {
  position: [number, number, number]
  color?: string
}

export function MemoryNode({ position, color = '#bc13fe' }: MemoryNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.3
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(t * 2) * 0.3)
      glowRef.current.material.opacity = 0.15 + Math.sin(t * 2) * 0.1
    }
  })

  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.85,
        roughness: 0.2,
        metalness: 0.5,
      }),
    [color],
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.2,
      }),
    [color],
  )

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.35, 0]} />
        <primitive object={crystalMaterial} attach="material" />
      </mesh>
    </group>
  )
}
