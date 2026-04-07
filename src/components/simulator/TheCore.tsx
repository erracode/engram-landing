import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export function TheCore() {
  const groupRef = useRef<THREE.Group>(null)
  const orbRef = useRef<THREE.Mesh>(null)
  const orbRef2 = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (orbRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.08
      orbRef.current.scale.setScalar(s)
      ;(orbRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.3
    }

    if (orbRef2.current) {
      const s = 1 + Math.sin(t * 2.5 + 1) * 0.12
      orbRef2.current.scale.setScalar(s)
      ;(orbRef2.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8 + Math.sin(t * 4) * 0.2
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.3
      ringRef.current.rotation.z = Math.cos(t * 0.4) * 0.2
      ;(ringRef.current.material as THREE.MeshStandardMaterial).opacity = 0.15 + Math.sin(t * 1.5) * 0.1
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1
    }
  })

  const orbMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#bc13fe',
        emissive: '#bc13fe',
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.7,
      }),
    [],
  )

  const orbMaterial2 = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f2ff',
        emissive: '#00f2ff',
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.5,
      }),
    [],
  )

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f2ff',
        emissive: '#00f2ff',
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      }),
    [],
  )

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        emissive: '#bc13fe',
        emissiveIntensity: 0.15,
        roughness: 0.3,
        metalness: 0.8,
      }),
    [],
  )

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base platform */}
      <mesh position={[0, 0.3, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[2.5, 3, 0.6, 8]} />
      </mesh>

      {/* Elephant body - stylized */}
      <mesh position={[0, 1.8, 0]} material={bodyMaterial}>
        <boxGeometry args={[2.2, 2, 2.8]} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.5, 1.6]} material={bodyMaterial}>
        <boxGeometry args={[1.8, 1.6, 1.4]} />
      </mesh>

      {/* Trunk */}
      <mesh position={[0, 1.8, 2.4]} material={bodyMaterial}>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
      </mesh>

      {/* Ears */}
      <mesh position={[-1.3, 2.5, 1.2]} material={bodyMaterial}>
        <boxGeometry args={[0.3, 1.2, 1]} />
      </mesh>
      <mesh position={[1.3, 2.5, 1.2]} material={bodyMaterial}>
        <boxGeometry args={[0.3, 1.2, 1]} />
      </mesh>

      {/* Eyes - glowing */}
      <mesh position={[-0.5, 2.8, 2.3]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.5, 2.8, 2.3]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
      </mesh>

      {/* Plasma orb inside */}
      <mesh ref={orbRef} position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <primitive object={orbMaterial} attach="material" />
      </mesh>

      {/* Inner bright core */}
      <mesh ref={orbRef2} position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <primitive object={orbMaterial2} attach="material" />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef} position={[0, 1.8, 0]}>
        <torusGeometry args={[1.5, 0.03, 8, 64]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>

      {/* Point light */}
      <pointLight color="#bc13fe" intensity={2} distance={8} position={[0, 2, 0]} />
      <pointLight color="#00f2ff" intensity={1} distance={5} position={[0, 3, 2]} />

      <Html position={[2.5, -0.5, 2.5]} center>
        <div className="font-mono text-center pointer-events-none select-none min-w-[200px] whitespace-nowrap">
          <div className="text-text-primary text-[10px] tracking-widest uppercase">AGENT COGNITIVE STATE</div>
          <div className="text-text-secondary text-[8px]">(Central Core Processing)</div>
        </div>
      </Html>
    </group>
  )
}
