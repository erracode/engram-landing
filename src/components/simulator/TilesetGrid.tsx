import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

const GRID_SIZE = 20
const GRID_DEPTH = 12
const TILE_SIZE = 1

export function TilesetGrid() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  
  const count = GRID_SIZE * GRID_SIZE * GRID_DEPTH
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const { geometry, materials, edgeGrid } = useMemo(() => {
    const boxGeo = new THREE.BoxGeometry(TILE_SIZE, TILE_SIZE, TILE_SIZE)
    
    // Exact colors ensuring OLED aesthetics
    const sideParams = { color: '#050505', roughness: 0.9, metalness: 0.1 }
    const topParams = { color: '#0a0a0a', roughness: 0.9, metalness: 0.1 }
    const bottomParams = { color: '#000000', roughness: 0.9, metalness: 0.1 }
    
    const mats = [
      new THREE.MeshStandardMaterial(sideParams),
      new THREE.MeshStandardMaterial(sideParams),
      new THREE.MeshStandardMaterial(topParams),
      new THREE.MeshStandardMaterial(bottomParams),
      new THREE.MeshStandardMaterial(sideParams),
      new THREE.MeshStandardMaterial(sideParams),
    ]

    // Create the technical bounded border requested: rgba(255,255,255,0.05)
    // Size = 20 (Grid size * Tile Size), divisions = 20
    const gridHelper = new THREE.GridHelper(GRID_SIZE * TILE_SIZE, GRID_SIZE, 0xffffff, 0xffffff)
    const lineMat = gridHelper.material as THREE.LineBasicMaterial
    lineMat.transparent = true
    lineMat.opacity = 0.05
    lineMat.depthWrite = false
    
    return { geometry: boxGeo, materials: mats, edgeGrid: gridHelper }
  }, [])


  useEffect(() => {
    if (!meshRef.current) return

    let i = 0
    const offset = (GRID_SIZE * TILE_SIZE) / 2 - TILE_SIZE / 2

    // 3D Voxel Grid Loop
    for (let y = 0; y < GRID_DEPTH; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let z = 0; z < GRID_SIZE; z++) {
          
          // Position places the very TOP layer's top face exactly at Y = 0
          dummy.position.set(
            x * TILE_SIZE - offset,
            -y * TILE_SIZE - (TILE_SIZE / 2), 
            z * TILE_SIZE - offset
          )
          
          // Scale 0.98 on all axes leaves a 2% gap in between every single cube
          // This creates the iconic 3D segmented tileset look downwards as well
          dummy.scale.set(0.98, 0.98, 0.98)
          dummy.updateMatrix()
          
          meshRef.current.setMatrixAt(i, dummy.matrix)
          i++
        }
      }
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [dummy])

  return (
    <group>
      {/* The Volumetric 3D grid of memory blocks */}
      <instancedMesh
        ref={meshRef}
        args={[geometry, materials as any, count]}
        receiveShadow
        castShadow
      />
      {/* 
        This sits flush at Y=0.001 to trace the pixel-perfect invisible technique gaps 
        overlaying the bounds of the 20x20 platform 
      */}
      <primitive object={edgeGrid} position={[0, 0.001, 0]} />
    </group>
  )
}


