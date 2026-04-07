import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface SQLiteVaultProps {
  position: [number, number, number]
}

export function SQLiteVault({ position }: SQLiteVaultProps) {
  const groupRef = useRef<THREE.Group>(null)
  const dbGlowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (dbGlowRef.current) {
      ;(dbGlowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.43
      dbGlowRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.05)
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4 + 2) * 0.05
    }
  })

  const dbGlowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#bc13fe',
        emissive: '#bc13fe',
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.6,
      }),
    [],
  )

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111111',
        emissive: '#bc13fe',
        emissiveIntensity: 0.06,
        roughness: 0.4,
        metalness: 0.8,
      }),
    [],
  )

  return (
    <group ref={groupRef} position={position}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} material={bodyMaterial}>
        <boxGeometry args={[2, 1, 2]} />
      </mesh>

      {/* Vault body - wider, shorter than tower */}
      <mesh position={[0, 1.8, 0]} material={bodyMaterial}>
        <boxGeometry args={[2.4, 1.6, 2.4]} />
      </mesh>

      {/* Top */}
      <mesh position={[0, 2.8, 0]} material={bodyMaterial}>
        <boxGeometry args={[2, 0.4, 2]} />
      </mesh>

      {/* DB symbol - glowing cylinder inside */}
      <mesh ref={dbGlowRef} position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
        <primitive object={dbGlowMaterial} attach="material" />
      </mesh>

      {/* Edge highlights */}
      <mesh position={[-1.21, 1.8, 0]}>
        <boxGeometry args={[0.02, 1.6, 0.02]} />
        <meshStandardMaterial color="#bc13fe" emissive="#bc13fe" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.21, 1.8, 0]}>
        <boxGeometry args={[0.02, 1.6, 0.02]} />
        <meshStandardMaterial color="#bc13fe" emissive="#bc13fe" emissiveIntensity={0.5} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 1.2, 1.21]}>
        <boxGeometry args={[0.8, 1.2, 0.02]} />
        <meshStandardMaterial color="#222222" emissive="#bc13fe" emissiveIntensity={0.1} />
      </mesh>

      {/* Light coming from database */}
      <pointLight color="#bc13fe" intensity={1.5} distance={5} position={[0, 1.8, 0]} />

      <Html position={[0, -0.5, 2.5]} center>
        <div className="font-mono text-center pointer-events-none select-none min-w-[300px] whitespace-nowrap">
          <div className="text-text-primary text-[10px] tracking-widest uppercase">SQLite PERSISTENCE</div>
          <div className="text-text-secondary text-[8px]">(AoE Schematic Buildings, detailed stone/tech)</div>
        </div>
      </Html>
    </group>
  )
}
