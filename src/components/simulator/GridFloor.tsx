import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GRID_SIZE = 20
const TILE_SIZE = 2

export function GridFloor() {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const count = GRID_SIZE * GRID_SIZE

  useMemo(() => {
    if (!meshRef.current) return

    let i = 0
    const offset = (GRID_SIZE * TILE_SIZE) / 2 - TILE_SIZE / 2

    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        dummy.position.set(
          x * TILE_SIZE - offset,
          -0.05,
          z * TILE_SIZE - offset,
        )
        dummy.scale.set(0.95, 0.1, 0.95)
        dummy.updateMatrix()
        meshRef.current!.setMatrixAt(i++, dummy.matrix)
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  const tileMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111111',
        emissive: '#00f2ff',
        emissiveIntensity: 0.02,
        roughness: 0.9,
        metalness: 0.1,
      }),
    [],
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    const offset = (GRID_SIZE * TILE_SIZE) / 2 - TILE_SIZE / 2

    let i = 0
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const dist = Math.sqrt(
          Math.pow(x * TILE_SIZE - offset, 2) +
          Math.pow(z * TILE_SIZE - offset, 2),
        )
        const pulse = Math.sin(t * 0.5 + dist * 0.1) * 0.5 + 0.5
        const intensity = 0.01 + pulse * 0.03

        dummy.position.set(
          x * TILE_SIZE - offset,
          -0.05,
          z * TILE_SIZE - offset,
        )
        dummy.scale.set(0.95, 0.1, 0.95)
        dummy.updateMatrix()
        meshRef.current!.setMatrixAt(i++, dummy.matrix)
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    tileMaterial.emissiveIntensity = 0.02 + Math.sin(t * 0.5) * 0.01
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, tileMaterial, count]}
     
    >
      <boxGeometry args={[TILE_SIZE, 0.1, TILE_SIZE]} />
    </instancedMesh>
  )
}
