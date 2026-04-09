# Engram Landing Page - Plan Actualizado

## Estado Actual

### ✅ Completado (Fases 1 & 2)
1. **Grid Volumétrico** - 20×20×12 voxels, nada design
2. **Branding Blocks** - 6 tiles con letras E-N-G-R-A-M
3. **Elephant Core** - Elefante robótico voxel estilo industrial
4. **Architecture Schematics** - Core Hub, SQLite Vault, FTS5 Tower, TUI Terminal, MCP Antenna
5. **Flow Traces** - Líneas de circuito animadas conectando módulos

### ✅ Completado (MDX & Windows System)
6. **MDX Content System** - 7 archivos de documentación completa
   - `home.mdx` - Vista general y quick start
   - `installation.mdx` - Instalación en todos los plataformas
   - `agent-setup.mdx` - Configuración por agente
   - `architecture.mdx` - Cómo funciona y MCP tools
   - `mcp-tools.mdx` - Referencia completa de 15 tools
   - `tui.mdx` - Terminal UI con capturas recreadas
   - `git-sync.mdx` - Sincronización con Git
   - `docs.mdx` - Índice completo de documentación

7. **Multiple Window System** - Estilo PostHog
   - Ventanas múltiples simultáneas
   - Drag & drop funcional
   - Minimizar/Maximizar
   - Fade in/out animations
   - Z-index management
   - Custom scrollbars

## Pendiente (Fase 3: Integración)

### 🔲 Integrar MDX en Landing Page
1. **Actualizar MemoryStore** - Soportar múltiples ventanas
   ```typescript
   activeWindows: {
     [key: string]: {
       isOpen: boolean
       isMinimized: boolean
       isMaximized: boolean
       position: { x: number; y: number }
       size: { width: number; height: number }
     }
   }
   ```

2. **Actualizar MemorySimulator** - Click en componentes abre ventanas MDX
   ```tsx
   <ArchitectureSchematics onClick={openMDXWindow}>
   ```

3. **Actualizar EngramOS** - Renderizar MultipleWindowManager
   ```tsx
   <MultipleWindowManager />
   ```

4. **Actualizar TopBar** - Navegación a ventanas MDX
   ```tsx
   <TopBar>
     <button onClick={() => openWindow('home')}>Home</button>
     <button onClick={() => openWindow('installation')}>Installation</button>
     ...
   </TopBar>
   ```

### 🔲 Optimizar y Refinar
1. **Performance** - Lazy loading de componentes MDX
2. **Accessibility** - Keyboard navigation, screen reader support
3. **Responsive** - Mobile/tablet adaptation
4. **SEO** - Meta tags, Open Graph, structured data

### 🔲 Content Enhancement
1. **TUI Screenshots** - Usar imágenes reales del repo (ya están en el MDX)
2. **Comparison Table** - Engram vs claude-mem (desde COMPARISON.md)
3. **Plugins Section** - OpenCode & Claude Code plugin details
4. **Contributing** - Workflow and standards

## Arquitectura del Sistema

```
index.astro (entry)
  └── BaseLayout.astro
      └── EngramOS.tsx (client-only)
          ├── MemorySimulator (3D diorama)
          │   ├── TilesetGrid
          │   ├── ElephantCore
          │   ├── ArchitectureSchematics
          │   └── EngramBranding
          ├── TopBar
          └── MultipleWindowManager
              └── MDXWindows (concurrent rendering)
                  ├── home.mdx
                  ├── installation.mdx
                  ├── agent-setup.mdx
                  ├── architecture.mdx
                  ├── mcp-tools.mdx
                  ├── tui.mdx
                  ├── git-sync.mdx
                  └── docs.mdx
```

## Estado del Zustand Store

### Current State
```typescript
interface MemoryStore {
  logs: MemoryLog[]
  totalMemories: number
  activeAgents: string[]
  activeWindow: string | null  // Single window (OLD)
  
  // NEW: Multiple windows
  activeWindows: {
    [key: string]: {
      isOpen: boolean
      isMinimized: boolean
      isMaximized: boolean
      position: { x: number; y: number }
      size: { width: number; height: number }
      zIndex: number
    }
  }
}
```

### New Actions Needed
```typescript
openWindow: (id, title, content, position?) => void
closeWindow: (id) => void
toggleMinimize: (id) => void
toggleMaximize: (id) => void
updateWindowPosition: (id, position) => void
focusWindow: (id) => void
closeAllWindows: () => void
```

## Próximos Pasos

### Paso 1: Actualizar Store (30 min)
1. Crear nuevo store con múltiples ventanas
2. Migrar datos existentes
3. Implementar todas las acciones

### Paso 2: Integrar MDX (1-2 horas)
1. Crear loader para MDX files
2. Implementar click handlers en componentes 3D
3. Integrar MultipleWindowManager en EngramOS
4. Update TopBar para abrir ventanas MDX

### Paso 3: Testing (30 min)
1. Testear click en componentes 3D → abre ventana
2. Testear drag & drop
3. Testear minimize/maximize
4. Testear multiple ventanas concurrentes

### Paso 4: Commit + Push (5 min)
- Commit con mensaje descriptivo
- Push a remote
- Testear en producción

## Recursos Usados

### Docs de Engram
- [AGENT-SETUP.md](https://github.com/Gentleman-Programming/engram/blob/main/docs/AGENT-SETUP.md)
- [ARCHITECTURE.md](https://github.com/Gentleman-Programming/engram/blob/main/docs/ARCHITECTURE.md)
- [INSTALLATION.md](https://github.com/Gentleman-Programming/engram/blob/main/docs/INSTALLATION.md)
- [COMPARISON.md](https://github.com/Gentleman-Programming/engram/blob/main/docs/COMPARISON.md)
- [PLUGINS.md](https://github.com/Gentleman-Programming/engram/blob/main/docs/PLUGINS.md)
- [DOCS.md](https://github.com/Gentleman-Programming/engram/blob/main/DOCS.md)

### Referencia Visual
- [PostHog MDX Pattern](https://github.com/PostHog/posthog.com/blob/master/contents/home.mdx)
- [Engram Screenshots](https://github.com/Gentleman-Programming/engram/tree/main/assets)

## Notas Técnicas

### Ventanas Múltiples vs Single Window
**Single Window (actual):**
```typescript
activeWindow: string | null
```
Solo una ventana puede estar abierta a la vez.

**Multiple Windows (PostHog style):**
```typescript
activeWindows: {
  'home': { isOpen: true, isMinimized: false, ... }
  'installation': { isOpen: true, isMinimized: true, ... }
}
```
Múltiples ventanas pueden estar abiertas, minimizadas o maximizadas simultáneamente.

### MDX Rendering
- Usar `dangerouslySetInnerHTML` para contenido MDX renderizado a HTML
- Estilizar con Tailwind + custom scrollbar
- Prose para typography (prose-invert para dark mode)

### Performance Considerations
- Lazy load MDX files (solo cuando se abren)
- Cache MDX content en Zustand
- Debounce drag operations
- Optimize re-renders con React.memo

## Checklist Final

- [ ] Actualizar Zustand store para múltiples ventanas
- [ ] Crear MDX loader/import system
- [ ] Integrar MultipleWindowManager en EngramOS
- [ ] Add click handlers a componentes 3D
- [ ] Update TopBar navigation
- [ ] Testear drag & drop
- [ ] Testear minimize/maximize
- [ ] Testear múltiple ventanas concurrentes
- [ ] Add SEO meta tags
- [ ] Add responsive breakpoints
- [ ] Commit + Push

## Timeline Estimado

- **Paso 1 (Store):** 30 min
- **Paso 2 (Integration):** 1.5-2 horas
- **Paso 3 (Testing):** 30 min
- **Paso 4 (Deploy):** 5 min

**Total:** ~3 horas

---

*Plan actualizado: April 9, 2026*
*Estado: 70% completed (MDX content & windows system done, integration pending)*
