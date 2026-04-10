import { useMemo } from 'react'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'
import { useMemoryStore } from '../../stores/memoryStore'

function createGradientTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, 512)
    // Darker, deeper purple tones
    grad.addColorStop(0, '#5e0a82') // Deep purple top
    grad.addColorStop(0.5, '#3c0056') // Darker mid tone
    grad.addColorStop(1, '#1a0025') // Very dark bottom

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 16
  return texture
}

function createTextTextures(text: string) {
  const canvasMap = document.createElement('canvas')
  canvasMap.width = 512
  canvasMap.height = 512
  const ctxMap = canvasMap.getContext('2d')

  const canvasEmissive = document.createElement('canvas')
  canvasEmissive.width = 512
  canvasEmissive.height = 512
  const ctxEmissive = canvasEmissive.getContext('2d')

  if (ctxMap && ctxEmissive) {
    // --- Diffuse Map ---
    const grad = ctxMap.createLinearGradient(0, 0, 0, 512)
    grad.addColorStop(0, '#5e0a82') 
    grad.addColorStop(0.5, '#3c0056') 
    grad.addColorStop(1, '#1a0025') 

    ctxMap.fillStyle = grad
    ctxMap.fillRect(0, 0, 512, 512)

    // Border using specifically the #2596be cyan/blue from the logo
    ctxMap.strokeStyle = '#2596be' 
    ctxMap.lineWidth = 26
    ctxMap.font = '900 320px "Arial Black", Impact, sans-serif'
    ctxMap.textAlign = 'center'
    ctxMap.textBaseline = 'middle'
    ctxMap.translate(256, 256)
    ctxMap.strokeText(text, 0, 20)

    // --- Emissive Map ---
    ctxEmissive.fillStyle = '#000000' 
    ctxEmissive.fillRect(0, 0, 512, 512)

    ctxEmissive.shadowColor = '#2596be'
    ctxEmissive.shadowBlur = 15
    ctxEmissive.strokeStyle = '#2596be'
    ctxEmissive.lineWidth = 26
    ctxEmissive.font = '900 320px "Arial Black", Impact, sans-serif'
    ctxEmissive.textAlign = 'center'
    ctxEmissive.textBaseline = 'middle'
    ctxEmissive.translate(256, 256)
    ctxEmissive.strokeText(text, 0, 20)
  }

  const textureMap = new THREE.CanvasTexture(canvasMap)
  textureMap.anisotropy = 16

  const textureEmissive = new THREE.CanvasTexture(canvasEmissive)
  textureEmissive.anisotropy = 16

  return { map: textureMap, emissiveMap: textureEmissive }
}

export function EngramBranding() {
  const letters = ['E', 'N', 'G', 'R', 'A', 'M']

  const baseGradientMap = useMemo(() => createGradientTexture(), [])

  // Create letter textures once
  const letterTextures = useMemo(() => {
    return letters.map((l) => createTextTextures(l))
  }, [])

  const handleTileClick = () => {
    // Open KERNEL window when any branding tile is clicked
    // This will be handled by the parent component
  }

  return (
    <group onClick={handleTileClick}>
      {letters.map((letter, idx) => {
        // Center position X: 
        // E: -2.5, N: -1.5, G: -0.5, R: 0.5, A: 1.5, M: 2.5
        const xPos = -2.5 + idx * 1.0

        return (
          <EngramTile
            key={letter}
            text={letter}
            textures={letterTextures[idx]}
            baseGradientMap={baseGradientMap}
            // Position at Y=0.49, moved closer to visible area
            position={[xPos, 0.49, -7]}
            onInteract={() => {
              const openWindow = useMemoryStore.getState().openWindow
              openWindow('KERNEL', 'Kernel Interface', '## Kernel Interface\n\nThe Engram kernel provides persistent memory for AI agents, enabling context retention across sessions.')
            }}
          />
        )
      })}
    </group>
  )
}

function EngramTile({ position, textures, baseGradientMap, text, onInteract }: any) {
  // Use 0.98 dimensions to leave a 2% gap between adjacent blocks, exactly like TilesetGrid
  // This prevents edges from clipping/overlapping between blocks
  const geometry = useMemo(() => new THREE.BoxGeometry(0.98, 0.98, 0.98), [])

  const materials = useMemo(() => {
    // All blocks strictly solid opaque
    const sideMat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      map: baseGradientMap,
      roughness: 0.4,
      metalness: 0.6,
      transparent: false,
    })

    // Top face: Purple Gradient background with #2596be outlined text.
    const topMat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      map: textures.map,
      emissive: '#2596be',
      emissiveMap: textures.emissiveMap,
      emissiveIntensity: 2.3,
      roughness: 0.1,
      metalness: 0.5,
      transparent: false,
    })

    // Front face (index 4 in BoxGeometry materials array)
    const frontMat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      map: textures.map,
      emissive: '#2596be',
      emissiveMap: textures.emissiveMap,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.5,
      transparent: false,
    })

    // ThreeJS box material order: 0:right, 1:left, 2:top, 3:bottom, 4:front, 5:back
    return [sideMat, sideMat, topMat, sideMat, frontMat, sideMat]
  }, [textures, baseGradientMap])

  // Adjust screws position slightly for the 0.98 cube
  const screwGeo = useMemo(() => new THREE.CylinderGeometry(0.03, 0.03, 0.04, 8), [])
  const screwMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#000000', metalness: 1, roughness: 0.1 }), [])

  return (
    <group position={position}>
      {/* Interactive overlay for click detection */}
      <mesh
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation()
          if (onInteract) onInteract()
        }}
      >
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* Opaque hardware block */}
      <mesh geometry={geometry} material={materials} castShadow receiveShadow>
        {/* Drei Edges allow true line thickness in WebGL */}
        <Edges scale={1.001} linewidth={3} color="#2596be" />
      </mesh>

      {/* Screws at corners - using slightly contracted coordinates for 0.98 box */}
      {/* Top Corners */}
      <mesh position={[-0.41, 0.49, -0.41]} geometry={screwGeo} material={screwMat} />
      <mesh position={[0.41, 0.49, -0.41]} geometry={screwGeo} material={screwMat} />
      <mesh position={[-0.41, 0.49, 0.41]} geometry={screwGeo} material={screwMat} />
      <mesh position={[0.41, 0.49, 0.41]} geometry={screwGeo} material={screwMat} />
      
      {/* Front Face Corners */}
      <mesh position={[-0.43, 0.4, 0.5]} geometry={screwGeo} rotation={[Math.PI/2, 0, 0]} material={screwMat} />
      <mesh position={[0.43, 0.4, 0.5]} geometry={screwGeo} rotation={[Math.PI/2, 0, 0]} material={screwMat} />
      <mesh position={[-0.43, -0.4, 0.5]} geometry={screwGeo} rotation={[Math.PI/2, 0, 0]} material={screwMat} />
      <mesh position={[0.43, -0.4, 0.5]} geometry={screwGeo} rotation={[Math.PI/2, 0, 0]} material={screwMat} />
    </group>
  )
}
