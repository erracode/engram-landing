import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
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
    camera.zoom = 60
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera])
  
  return null
}

export function MemorySimulator() {
  return (
    <Canvas
      orthographic
      camera={{
        position: [40, 35, 40],
        zoom: 60,
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
      <directionalLight position={[20, 30, 10]} intensity={2.5} castShadow />
      
      {/* Increased ambient light to 1.0 to ensure #050505 dark gray doesn't get clamped to pure zero by the monitor */}
      <ambientLight intensity={1.5} />


      <TilesetGrid />
      <EngramBranding />
      <ArchitectureSchematics />
      <ElephantCore />
    </Canvas>
  )
}

