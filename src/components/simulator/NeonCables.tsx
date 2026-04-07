import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NeonCableProps {
  from: [number, number, number]
  to: [number, number, number]
  color?: string
}

export function NeonCable({ from, to, color = '#00f2ff' }: NeonCableProps) {
  const lineRef = useRef<THREE.Line>(null)
  const glowLineRef = useRef<THREE.Line>(null)

  const midY = Math.max(from[1], to[1]) + 1.5

  const points = useMemo(() => {
    const segments = 20
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = from[0] + (to[0] - from[0]) * t
      const z = from[2] + (to[2] - from[2]) * t
      const y = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI) * (midY - Math.max(from[1], to[1]))
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [from, to, midY])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points)
    return g
  }, [points])

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
      }),
    [color],
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
        linewidth: 2,
      }),
    [color],
  )

  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.2 + Math.sin(clock.elapsedTime * 2) * 0.15
    }
    if (glowLineRef.current) {
      glowLineRef.current.material.opacity = 0.1 + Math.sin(clock.elapsedTime * 2 + 1) * 0.08
    }
  })

  return (
    <>
      <line ref={glowLineRef} geometry={geometry}>
        <primitive object={glowMaterial} attach="material" />
      </line>
      <line ref={lineRef} geometry={geometry}>
        <primitive object={material} attach="material" />
      </line>
    </>
  )
}
