# Engram Landing - Instrucciones para Ver los Cambios

## 🚀 Cómo Ver los Cambios en el Navegador

### Paso 1: Reiniciar el servidor de desarrollo

```bash
# Detén el servidor actual (Ctrl+C)
# Luego reinicia:
npm run dev
```

### Paso 2: Abre el navegador

```
http://localhost:4321
```

### Paso 3: Verifica que funciona

**Lo que deberías ver:**

1. **TopBar actualizado** (48px de altura):
   - Logo ENGRAM grande en la izquierda
   - 8 botones en el centro: KERNEL, INSTALL, AGENTS, ARCH, TOOLS, TUI, SYNC, DOCS
   - Icono de GitHub en la derecha

2. **Al hacer click en un botón** (ej: KERNEL):
   - Se abre una ventana con contenido MDX
   - La ventana tiene:
     - Título en la barra superior (KERNEL)
     - Contenido HTML con los docs de Engram
     - Botones de minimizar, maximizar, cerrar (X)
     - Puedes arrastrar con la barra de título

3. **Múltiples ventanas**:
   - Puedes abrir KERNEL, luego INSTALL, etc.
   - Todas las ventanas están visibles simultáneamente
   - Puedes minimizarlas (dash -)
   - Puedes maximizarlas (cuadrado □)
   - Puedes cerrarlas (X rojo)

## 📋 Qué Están Hacién los Componentes

### TopBar.tsx
- 8 botones de navegación
- Click abre ventana MDX con `openWindow(id, title, content)`
- Muestra estado de ventanas abiertas (borde inferior azul)

### WindowManager.tsx
- Llama a `<MultipleWindowManager />`
- Renderiza todas las ventanas abiertas

### MultipleWindowManager.tsx
- Itera sobre `activeWindows` del store
- Renderiza cada ventana como componente MDXWindow
- Soporta drag, minimize, maximize, close

### memoryStore.ts
- Mantiene estado de múltiples ventanas
- Acciones: `openWindow`, `closeWindow`, etc.
- Configura posición/size por defecto para cada ventana

### mdxContentMap.js
- Contiene HTML renderizado para las 8 ventanas
- Basado en docs reales del repo de Engram

## 🎨 Diseño Visual

- **TopBar**: 48px altura, #0a0a0a background, borde inferior #333333
- **Ventanas**: Borde cian #2596be, background #0a0a0a
- **Títulos**: Fuente Space Mono, color #2596be
- **Botones**: Sin relleno, texto #999999, hover #e8e8e8
- **Active**: Texto #ffffff, borde inferior 2px #00f2ff

## 🔧 Troubleshooting

### Si no ves los cambios:

1. **Hard refresh** el navegador:
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R

2. **Clear cache**:
   - Abre DevTools (F12)
   - Click derecho en botón refresh
   - Elige "Empty Cache and Hard Reload"

3. **Reinicia el servidor**:
   ```bash
   # Detén con Ctrl+C
   npm run dev
   ```

4. **Verifica que no haya errores**:
   - Abre DevTools Console (F12)
   - Busca errores en rojo
   - Si hay errores de import, verifica que los archivos existen

### Si hay errores en la consola:

Los errores comunes son:
- `Module not found: mdxContentMap` → El archivo existe en `src/utils/mdxContentMap.js`
- `MDX_CONTENT_MAP is not defined` → Revisa que la exportación en mdxContentMap.js tenga `export const MDX_CONTENT_MAP`

### Archivos Verificados:
✅ `src/utils/mdxContentMap.js` - EXISTS
✅ `src/components/layout/TopBar.tsx` - UPDATED
✅ `src/components/layout/WindowManager.tsx` - UPDATED
✅ `src/stores/memoryStore.ts` - UPDATED
✅ `src/components/layout/MultipleWindowManager.tsx` - EXISTS

## 📂 Estructura Final

```
src/
├── components/layout/
│   ├── EngramOS.tsx          ← Usa WindowManager + TopBar
│   ├── TopBar.tsx            ← 8 botones, abre ventanas MDX
│   ├── WindowManager.tsx     ← Renderiza MultipleWindowManager
│   └── MultipleWindowManager.tsx  ← Renderiza ventanas
├── stores/
│   └── memoryStore.ts        ← Estado de ventanas
└── utils/
    └── mdxContentMap.js      ← 8 ventanas con HTML
```

## ✅ Checklist de Verificación

- [ ] Servidor de dev corriendo (`npm run dev`)
- [ ] Navegador abierto en http://localhost:4321
- [ ] TopBar visible con 8 botones
- [ ] Click en KERNEL → Abre ventana
- [ ] Ventana tiene botón X (cerrar)
- [ ] Ventana tiene botón - (minimizar)
- [ ] Ventana tiene botón □ (maximizar)
- [ ] Puedes arrastrar la ventana
- [ ] Puedes abrir múltiples ventanas
- [ ] Contenido MDX es legible

Si todo está marcado, ¡el sistema funciona correctamente! 🎉
