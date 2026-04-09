import * as THREE from 'three'

export function getBlackMarbleTextures(type: 'persistence' | 'search' | 'core' | 'tui' | 'mcp' | 'floor' | 'voxel') {
  // We generate a Bump map, a Map, and an Emissive map
  const size = 512
  const mapCanvas = document.createElement('canvas')
  mapCanvas.width = size
  mapCanvas.height = size
  const ctxMap = mapCanvas.getContext('2d')!

  const bumpCanvas = document.createElement('canvas')
  bumpCanvas.width = size
  bumpCanvas.height = size
  const ctxBump = bumpCanvas.getContext('2d')!
  
  const emissiveCanvas = document.createElement('canvas')
  emissiveCanvas.width = size
  emissiveCanvas.height = size
  const ctxEmi = emissiveCanvas.getContext('2d')!

  // Base map color
  ctxMap.fillStyle = '#050505'
  ctxMap.fillRect(0, 0, size, size)

  // Base bump (flat)
  ctxBump.fillStyle = '#808080' // mid gray
  ctxBump.fillRect(0, 0, size, size)
  
  // Base emissive (black)
  ctxEmi.fillStyle = '#000000'
  ctxEmi.fillRect(0, 0, size, size)

  // Screws logic
  const drawScrews = () => {
    const r = size * 0.03
    const padding = size * 0.1
    const positions = [
      [padding, padding],
      [size - padding, padding],
      [padding, size - padding],
      [size - padding, size - padding]
    ]
    
    positions.forEach(([x, y]) => {
      // Hexagon screw head
      ctxMap.fillStyle = '#000000'
      ctxMap.beginPath()
      for(let i=0; i<6; i++) {
        const ax = x + r * Math.cos(i * Math.PI / 3)
        const ay = y + r * Math.sin(i * Math.PI / 3)
        if(i===0) ctxMap.moveTo(ax, ay)
        else ctxMap.lineTo(ax, ay)
      }
      ctxMap.closePath()
      ctxMap.fill()

      // Bump indentation
      ctxBump.fillStyle = '#000000' // deep pit around screw
      ctxBump.beginPath()
      ctxBump.arc(x, y, r * 1.5, 0, Math.PI * 2)
      ctxBump.fill()
      
      // Bump screw head
      ctxBump.fillStyle = '#a0a0a0' // sticking out a bit
      ctxBump.beginPath()
      for(let i=0; i<6; i++) {
        const ax = x + r * Math.cos(i * Math.PI / 3)
        const ay = y + r * Math.sin(i * Math.PI / 3)
        if(i===0) ctxBump.moveTo(ax, ay)
        else ctxBump.lineTo(ax, ay)
      }
      ctxBump.closePath()
      ctxBump.fill()
    })
  }

  // Armor indentations
  const drawArmor = () => {
    const len = size * 0.15
    const thick = size * 0.02
    const positions = [
      {x: 0, y: 0, a: 1}, {x: size, y: 0, a: -1},
      {x: 0, y: size, a: -1}, {x: size, y: size, a: 1}
    ]
    ctxBump.fillStyle = '#404040' // indented
    ctxMap.fillStyle = '#040404'
    
    ctxBump.save()
    ctxMap.save()
    
    // Simplistic cross cuts at corners
    positions.forEach(({x, y}) => {
       ctxMap.translate(x, y)
       ctxMap.rotate(Math.PI/4)
       ctxMap.fillRect(-len/2, -thick/2, len, thick)
       ctxMap.resetTransform()
       
       ctxBump.translate(x, y)
       ctxBump.rotate(Math.PI/4)
       ctxBump.fillRect(-len/2, -thick/2, len, thick)
       ctxBump.resetTransform()
    })
    
    ctxBump.restore()
    ctxMap.restore()
  }

  // Circuits
  const drawCircuits = () => {
    ctxMap.strokeStyle = '#0a0a0a'
    ctxBump.strokeStyle = '#606060' // indent
    ctxMap.lineWidth = size * 0.01
    ctxBump.lineWidth = size * 0.01

    if (type === 'floor') {
       ctxMap.strokeStyle = '#0a0a0a'
       ctxMap.lineWidth = size * 0.005
       // Draw an irregular 8x8 grid
       for(let i=1; i<8; i++) {
         if (Math.random() > 0.3) {
           let pos = i * (size/8)
           ctxMap.beginPath(); ctxMap.moveTo(pos, 0); ctxMap.lineTo(pos, size); ctxMap.stroke()
         }
         if (Math.random() > 0.3) {
           let pos = i * (size/8)
           ctxMap.beginPath(); ctxMap.moveTo(0, pos); ctxMap.lineTo(size, pos); ctxMap.stroke()
         }
       }
       return
    }

    if (type === 'search') {
      // X pattern
      ctxMap.beginPath(); ctxMap.moveTo(size*0.2, size*0.2); ctxMap.lineTo(size*0.8, size*0.8); ctxMap.stroke()
      ctxMap.beginPath(); ctxMap.moveTo(size*0.8, size*0.2); ctxMap.lineTo(size*0.2, size*0.8); ctxMap.stroke()
      ctxBump.beginPath(); ctxBump.moveTo(size*0.2, size*0.2); ctxBump.lineTo(size*0.8, size*0.8); ctxBump.stroke()
      ctxBump.beginPath(); ctxBump.moveTo(size*0.8, size*0.2); ctxBump.lineTo(size*0.2, size*0.8); ctxBump.stroke()
      
      // Emissive circuit glow
      ctxEmi.strokeStyle = '#ffffff'
      ctxEmi.lineWidth = size * 0.005
      ctxEmi.beginPath(); ctxEmi.moveTo(size*0.2, size*0.2); ctxEmi.lineTo(size*0.8, size*0.8); ctxEmi.stroke()
      ctxEmi.beginPath(); ctxEmi.moveTo(size*0.8, size*0.2); ctxEmi.lineTo(size*0.2, size*0.8); ctxEmi.stroke()
    } else {
      // 2 vertical + 3 horizontal
      let v1 = size*0.3, v2 = size*0.7
      let h1 = size*0.25, h2 = size*0.5, h3 = size*0.75
      
      ctxMap.beginPath(); ctxMap.moveTo(v1, 0); ctxMap.lineTo(v1, size); ctxMap.stroke()
      ctxMap.beginPath(); ctxMap.moveTo(v2, 0); ctxMap.lineTo(v2, size); ctxMap.stroke()
      ctxMap.beginPath(); ctxMap.moveTo(0, h1); ctxMap.lineTo(size, h1); ctxMap.stroke()
      ctxMap.beginPath(); ctxMap.moveTo(0, h2); ctxMap.lineTo(size, h2); ctxMap.stroke()
      ctxMap.beginPath(); ctxMap.moveTo(0, h3); ctxMap.lineTo(size, h3); ctxMap.stroke()
      
      ctxBump.beginPath(); ctxBump.moveTo(v1, 0); ctxBump.lineTo(v1, size); ctxBump.stroke()
      ctxBump.beginPath(); ctxBump.moveTo(v2, 0); ctxBump.lineTo(v2, size); ctxBump.stroke()
      ctxBump.beginPath(); ctxBump.moveTo(0, h1); ctxBump.lineTo(size, h1); ctxBump.stroke()
      ctxBump.beginPath(); ctxBump.moveTo(0, h2); ctxBump.lineTo(size, h2); ctxBump.stroke()
      ctxBump.beginPath(); ctxBump.moveTo(0, h3); ctxBump.lineTo(size, h3); ctxBump.stroke()

      // Emissive
      ctxEmi.strokeStyle = '#ffffff'
      ctxEmi.lineWidth = size * 0.005
      ctxEmi.beginPath(); ctxEmi.moveTo(v1, 0); ctxEmi.lineTo(v1, size); ctxEmi.stroke()
      ctxEmi.beginPath(); ctxEmi.moveTo(v2, 0); ctxEmi.lineTo(v2, size); ctxEmi.stroke()
      ctxEmi.beginPath(); ctxEmi.moveTo(0, h1); ctxEmi.lineTo(size, h1); ctxEmi.stroke()
      ctxEmi.beginPath(); ctxEmi.moveTo(0, h2); ctxEmi.lineTo(size, h2); ctxEmi.stroke()
      ctxEmi.beginPath(); ctxEmi.moveTo(0, h3); ctxEmi.lineTo(size, h3); ctxEmi.stroke()
    }
  }

  if (type !== 'floor' && type !== 'voxel') {
    drawScrews()
    drawArmor()
  }
  drawCircuits()

  const mapTex = new THREE.CanvasTexture(mapCanvas)
  const bumpTex = new THREE.CanvasTexture(bumpCanvas)
  const emiTex = new THREE.CanvasTexture(emissiveCanvas)
  
  mapTex.anisotropy = 4
  bumpTex.anisotropy = 4
  emiTex.anisotropy = 4

  return { mapTex, bumpTex, emiTex }
}
