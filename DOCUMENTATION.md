# 📚 Cómo ver la documentación Starlight

La documentación de Engram está ahora en una carpeta separada (`docs-src/`) para no interferir con la landing page principal.

## Opción 1: Documentación Starlight (Recomendada)

Para ver la documentación con Starlight:

```bash
# Ir al directorio de docs
cd docs-src

# Instalar dependencias
npm install

# Iniciar servidor
npm run dev
```

La documentación estará disponible en: **http://localhost:4323/**

## Opción 2: Landing Page Principal

Para ver la landing page con el simulador 3D:

```bash
# En el directorio principal (engram-landing)
npm install
npm run dev
```

La landing page estará disponible en: **http://localhost:4321/**

## Separación de Proyectos

- **`engram-landing/`** → Landing page con 3D diorama, ventanas, TopBar
- **`docs-src/`** → Documentación completa con Starlight, navegación, sidebar

Puedes ejecutarlos en terminals separadas simultáneamente.

## Estructura de Documentación

```
docs-src/
├── src/content/docs/        # Archivos MDX/Markdown
│   ├── index.md             # Home
│   ├── installation.md      # Installation
│   ├── agent-setup.md       # Agent configuration
│   ├── plugins.md           # Plugins docs
│   ├── architecture.md      # System architecture
│   ├── mcp-tools.md         # MCP tools reference
│   ├── tui.md               # Terminal UI
│   ├── cli-reference.md     # CLI commands
│   ├── git-sync.md          # Git synchronization
│   ├── comparison.md        # vs claude-mem
│   ├── contributing.md      # How to contribute
│   ├── releases.md          # CHANGELOG
│   ├── intended-usage.md    # Usage guide
│   ├── skills/
│   │   └── index.md         # Agent Skills Index
│   └── beta/
│       └── obsidian-brain.md # Beta feature
├── src/styles/
│   └── starlight-custom.css # Nothing Design styles
└── astro.config.mjs         # Starlight configuration
```

## Contenido Incluido

✅ 15 páginas de documentación
✅ 20 Agent Skills documentadas
✅ 463 líneas de docs para Obsidian Brain (Beta)
✅ Todo el contenido del repositorio Engram
✅ Estilos Nothing Design aplicados
✅ Sidebar organizado en secciones
✅ Badges para features Beta

## Migración Completada

- ✅ Configuración Starlight v0.33+
- ✅ Everything from Engram repo
- ✅ Nothing Design styling
- ✅ Separate from landing page
- ✅ Ready for production

## Notas Técnicas

- **Astro v6** con contenido collections
- **Starlight v0.33** con sidebar personalizado
- **Nothing Design** - colores, tipografía, reglas de diseño
- **Space Grotesk** (body) + **Space Mono** (code)
EOF
cat /C/Users/Jesus/Documents/work/personal/engram-landing/DOCUMENTATION.md
