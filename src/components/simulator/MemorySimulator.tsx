import { useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GridFloor } from './GridFloor'
import { TheCore } from './TheCore'
import { FTSTower } from './FTSTower'
import { SQLiteVault } from './SQLiteVault'
import { MemoryNode } from './MemoryNode'
import { Agent } from './Agent'
import { NeonCable } from './NeonCables'

function IsometricCamera() {
  const { camera } = useThree()
  useEffect(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) return
    const distance = 40
    const height = 35
    const angle = Math.PI / 4
    const x = Math.cos(angle) * distance
    const z = Math.sin(angle) * distance
    camera.position.set(x, height, z)
    camera.lookAt(0, -5, 0)
    camera.updateProjectionMatrix()
  }, [camera])
  useFrame(() => {
    // Subtle auto-rotation or slow zoom pulse for life
    // camera.position.set(x, height + Math.sin(state.clock.elapsedTime) * 1, z)
  })
  return null
}

const agentPath1: [number, number, number][] = [
  [-8, 0.5, -6],
  [-4, 0.5, -3],
  [0, 0.5, 0],
  [4, 0.5, -3],
  [8, 0.5, -6],
  [4, 0.5, 3],
  [0, 0.5, 0],
  [-4, 0.5, 3],
  [-8, 0.5, -6],
]

const agentPath2: [number, number, number][] = [
  [8, 0.5, 6],
  [4, 0.5, 3],
  [0, 0.5, 0],
  [-4, 0.5, -3],
  [-8, 0.5, 6],
  [-4, 0.5, 3],
  [0, 0.5, 0],
  [4, 0.5, -3],
  [8, 0.5, 6],
]

const agentPath3: [number, number, number][] = [
  [0, 0.5, 8],
  [3, 0.5, 4],
  [0, 0.5, 0],
  [-3, 0.5, -4],
  [0, 0.5, -8],
  [-3, 0.5, 4],
  [0, 0.5, 0],
  [3, 0.5, -4],
  [0, 0.5, 8],
]

const memoryNodePositions: [number, number, number][] = [
  [-6, 1, -4],
  [6, 1, -4],
  [-6, 1, 4],
  [6, 1, 4],
  [0, 1, -6],
  [0, 1, 6],
  [-4, 1, 0],
  [4, 1, 0],
]

export function MemorySimulator() {
  return (
    <Canvas
      orthographic
      camera={{
        position: [40, 35, 40],
        zoom: 40,
        near: 0.1,
        far: 200,
      }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      style={{ background: 'transparent' }}
    >
      <IsometricCamera />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={1} />

      <GridFloor />

      <TheCore />

      <FTSTower position={[-10, 0, -8]} />
      <FTSTower position={[10, 0, -8]} />

      <SQLiteVault position={[0, 0, -10]} />

      {memoryNodePositions.map((pos, i) => (
        <MemoryNode
          key={i}
          position={pos}
          color={i % 2 === 0 ? '#bc13fe' : '#00f2ff'}
        />
      ))}

      <Agent path={agentPath1} color="#00f2ff" speed={0.06} />
      <Agent path={agentPath2} color="#bc13fe" speed={0.05} />
      <Agent path={agentPath3} color="#00f2ff" speed={0.07} />

      <NeonCable from={[-10, 4, -8]} to={[0, 2, 0]} color="#00f2ff" />
      <NeonCable from={[10, 4, -8]} to={[0, 2, 0]} color="#00f2ff" />
      <NeonCable from={[0, 3, -10]} to={[0, 2, 0]} color="#bc13fe" />

    </Canvas>
  )
}
