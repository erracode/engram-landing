import { useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TilesetGrid } from './TilesetGrid'
import { EngramBranding } from './EngramBranding'
import { ArchitectureSchematics } from './ArchitectureSchematics'
import { ElephantCore } from './ElephantCore'

function IsometricCamera() {
  const { camera } = useThree()
  
  useEffect(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) return
    
    camera.position.set(40, 35, 40)
    camera.zoom = 36
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])
  
  return null
}

/**
 * Wraps the entire scene in a group that rises from below
 * with a smooth eased animation on mount.
 */
function SceneEntrance({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (progressRef.current >= 1) return

    // Smooth ease-out cubic: accelerate then decelerate
    progressRef.current = Math.min(1, progressRef.current + delta * 0.6)
    const t = progressRef.current
    const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic

    // Rise from y = -10 to y = 0
    groupRef.current.position.y = -10 * (1 - eased)
    
    // Slight scale-up for dramatic effect
    const scale = 0.85 + 0.15 * eased
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} position={[0, -10, 0]} scale={0.85}>
      {children}
    </group>
  )
}

export function MemorySimulator() {
  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      orthographic
      camera={{
        position: [40, 35, 40],
        zoom: 36,
        near: 0.1,
        far: 800,
      }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      style={{ background: 'transparent' }}
    >
      <IsometricCamera />
      
      {/* DirectionalLight provides crisp hard shadows over the extruded tiles */}
      <directionalLight 
        position={[-10, 15, -10]} 
        intensity={0.3} 
        color="#e8e8e8"
        castShadow 
        shadow-bias={-0.001}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Ambient shadow/mood */}
      <ambientLight color="#020202" intensity={0.05} />

      <SceneEntrance>
        <TilesetGrid />
        <EngramBranding />
        <ArchitectureSchematics />
        <ElephantCore />
      </SceneEntrance>
    </Canvas>
  )
}
