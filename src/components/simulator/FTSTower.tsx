import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface FTSTowerProps {
  position: [number, number, number]
  label?: string
}

export function FTSTower({ position, label = 'FTS5' }: FTSTowerProps) {
  const groupRef = useRef<THREE.Group>(null)
  const beamRef = useRef<THREE.Mesh>(null)
  const topGlowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (beamRef.current) {
      beamRef.current.material.opacity = 0.15 + Math.sin(t * 3 + position[0]) * 0.1
      beamRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.3
    }

    if (topGlowRef.current) {
      topGlowRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.15)
      topGlowRef.current.material.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.2
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.3 + position[0]) * 0.05
    }
  })

  const beamMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f2ff',
        emissive: '#00f2ff',
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.2,
      }),
    [],
  )

  const topGlowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f2ff',
        emissive: '#00f2ff',
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.6,
      }),
    [],
  )

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111111',
        emissive: '#00f2ff',
        emissiveIntensity: 0.08,
        roughness: 0.5,
        metalness: 0.7,
      }),
    [],
  )

  return (
    <group ref={groupRef} position={position}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} material={bodyMaterial}>
        <boxGeometry args={[1.6, 1, 1.6]} />
      </mesh>

      {/* Tower body */}
      <mesh position={[0, 2.5, 0]} material={bodyMaterial}>
        <boxGeometry args={[1.2, 3, 1.2]} />
      </mesh>

      {/* Top section */}
      <mesh position={[0, 4.3, 0]} material={bodyMaterial}>
        <boxGeometry args={[1.4, 0.6, 1.4]} />
      </mesh>

      {/* Top glow */}
      <mesh ref={topGlowRef} position={[0, 4.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <primitive object={topGlowMaterial} attach="material" />
      </mesh>

      {/* Data beam going up */}
      <mesh ref={beamRef} position={[0, 6, 0]}>
        <cylinderGeometry args={[0.05, 0.15, 3, 8]} />
        <primitive object={beamMaterial} attach="material" />
      </mesh>

      {/* Edge highlights */}
      <mesh position={[-0.61, 2.5, 0]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.61, 2.5, 0]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 2.5, -0.61]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 2.5, 0.61]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
      </mesh>

      <pointLight color="#00f2ff" intensity={0.8} distance={5} position={[0, 4.5, 0]} />

      <Html position={[0, -0.5, 2]} center>
        <div className="font-mono text-center pointer-events-none select-none whitespace-nowrap">
          <div className="text-text-primary text-[10px] tracking-widest uppercase">FTS5 INDEX TOWER</div>
          <div className="text-text-secondary text-[8px]">(Pulsing Cyan Búsqueda)</div>
        </div>
      </Html>
    </group>
  )
}
