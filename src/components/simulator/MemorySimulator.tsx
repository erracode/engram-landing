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
      shadows={{ type: THREE.PCFSoftShadowMap }}
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


      <TilesetGrid />
      <EngramBranding />
      <ArchitectureSchematics />
      <ElephantCore />
    </Canvas>
  )
}

