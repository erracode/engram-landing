# Phase 2 Plan: Nodos de Memoria y Elefante Central

## Objetivo
Poblar la superficie del grid volumétrico (20×20) con los nodos de memoria temáticos:
- **The Core** (Elefante Robótico) - Centro exacto
- **SQLite Vault** - Fortaleza de almacenamiento
- **FTS5 Tower** - Torre de búsqueda
- **Memory Nodes** - Nodos secundarios distribuidos

## Estructuras a Implementar

### 1. The Core - Elefante Robótico
**Posición:** Centro del grid [0, 0, 0]  
**Escala:** 3×3 tiles (~3 unidades de ancho/alto)  
**Materiales:**
- Cuerpo principal: Cobre industrial (#b87333)
- Armadura: Acero cepillado (#c0c0c0)
- Placa frontal: "Agent Cognitive State" - neón cian
- Ojos: Luz cian pulsante

**Geometría:**
- Base: Plataforma circular/rectangular de cobre
- Cuerpo: Forma abstracta de elefante (geométrica/low-poly)
- Trompa: Curva simple usando torus o curve
- Colmillos: Conos blancos/cobre
- Orejas: Planos triangulares de cobre
- Patas: 4 cilindros rectangulares

**Altura:** ~2-3 unidades sobre la superficie

### 2. SQLite Vault
**Posición:** Lado derecho del grid (~[8, 0, -8])  
**Escala:** 2×2 tiles (~2 unidades base)  
**Materiales:**
- Paredes: Piedra digital (#2d2d2d)
- Techo: Arco de piedra
- Ventanas: Paneles de neón morado (#8b5cf6)
- Base: Plataforma de metal oxidado

**Geometría:**
- Estructura: Caja con techo abovedado (estilo Age of Empires)
- Puerta: Arco frontal con neón morado
- Ventanas: Rectángulos verticales con luz interior
- Detalles: Bordes de piedra con textura

**Altura:** ~2 unidades sobre superficie

### 3. FTS5 Tower
**Posición:** Lado izquierdo del grid (~[-8, 0, -8])  
**Escala:** 1×1 tile base (~1 unidad base)  
**Materiales:**
- Estructura: Cristal translúcido (MeshPhysicalMaterial)
- Luz interior: Cian brillante (#06b6d4)
- Base: Metal negro (#0a0a0a)
- Tope: Cristal cian brillante

**Geometría:**
- Forma: Prisma rectangular o cilíndrico
- Altura: ~4-5 unidades (más alta que SQLite)
- Ventanas: Paneles de cristal con luz interior
- Base: Plataforma metálica

**Altura:** ~5 unidades sobre superficie

### 4. Memory Nodes (Nodos Secundarios)
**Cantidad:** 8-12 nodos distribuidos  
**Posición:** Grid regular alrededor del centro (no sobre el Core)  
**Escala:** 0.5×0.5 tiles (~0.5 unidades base)  
**Materiales:**
- Cuerpo: Metal gris oscuro (#333333)
- Luz superior: LED azul/cian/púrpura (aleatorio)

**Geometría:**
- Forma: Cubo bajo con luz superior
- Altura: ~0.3 unidades
- Luz: PointLight interior pulsante

## Lineamientos Técnicos

### Integración en MemorySimulator
```tsx
<TilesetGrid />
<THECore />
<SQLiteVault />
<FTSTower />
<MemoryNodes />
<NeonCables />
```

### Sistema de Coordenadas
- Grid 20×20 desde -10 a +10 en X y Z
- Centro [0, 0, 0] para The Core
- Superficie superior en Y=0
- Todas las estructuras se posicionan en Y=0 (base sobre grid)

### Colores - Nothing Palette + Acentos
```javascript
const COLORS = {
  // Nothing Base
  black: '#000000',
  dark: '#0a0a0a',
  darkgray: '#050505',
  
  // Industrial
  copper: '#b87333',
  steel: '#c0c0c0',
  
  // Neón (accentos)
  cyan: '#06b6d4',
  purple: '#8b5cf6',
  blue: '#3b82f6',
  
  // Tech
  glass: '#1a1a2e',
  metal: '#333333',
};
```

### Animaciones Phase 2
1. **Elefante:** Ojos cian pulsante (300ms loop)
2. **FTS5 Tower:** Luz interior cian constante
3. **SQLite Vault:** Ventanas morado pulsante
4. **Memory Nodes:** LEDs azules aleatorios
5. **Neon Cables:** "Cometas" de luz fluyendo (1-2s loop)

## Lista de Archivos a Crear/Modificar

### Componentes Nuevos
1. `src/components/simulator/TheCore.tsx` - Elefante robótico
2. `src/components/simulator/MemoryNodes.tsx` - Nodos secundarios
3. `src/components/simulator/NeonCables.tsx` - Líneas de conexión

### Componentes Existentes (Revisar/Actualizar)
- `src/components/simulator/SQLiteVault.tsx` ✅ Existe
- `src/components/simulator/FTSTower.tsx` ✅ Existe

### Modificaciones
- `src/components/simulator/MemorySimulator.tsx` - Importar nuevos componentes
- `src/components/sections/Hero.tsx` - Agregar HUD overlay (Phase 3)

## Checklist de Implementación

- [ ] 1. TheCore.tsx - Elefante robótico (cobre, armadura, ojos cian)
- [ ] 2. MemoryNodes.tsx - 8-12 nodos secundarios distribuidos
- [ ] 3. NeonCables.tsx - Conexiones entre nodos con cometas
- [ ] 4. MemorySimulator.tsx - Integrar todas las estructuras
- [ ] 5. Verificar que todas las estructuras estén sobre superficie Y=0
- [ ] 6. Testear rendimiento (InstancedMesh para MemoryNodes)
- [ ] 7. Animaciones pulsantes (eyes, windows, LEDs)
- [ ] 8. Commit + Push

## Notas de Implementación

### Rendimiento
- MemoryNodes debe usar InstancedMesh para 8-12 nodos
- TheCore puede ser un modelo compuesto de primitivas
- SQLiteVault y FTS5Tower pueden ser primitivas optimizadas

### Iluminación
- PointLight para cada MemoryNode (luz interior)
- PointLight para ojos del elefante
- PointLight interior para FTS5 Tower y SQLite Vault
- Evitar demasiadas luces en escena

### Shadow Casting
- Todas las estructuras: castShadow = true
- Grid: receiveShadow = true
- Adjust shadow map size para evitar aliasing

## Timeline Estimado

- **Phase 2A (Core + Nodos):** 1-2 horas
- **Phase 2B (Cables + Animaciones):** 1 hora
- **Phase 2C (Testing + Refinamiento):** 30 min

**Total Phase 2:** ~3 horas
