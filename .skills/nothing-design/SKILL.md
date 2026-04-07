# Nothing Design — Engram Project

The complete design system for the Engram landing page. Based on [dominikmartn/nothing-design-skill](https://github.com/dominikmartn/nothing-design-skill).

---

## Design Philosophy

Six core principles govern every decision:

| Principle | Meaning |
|---|---|
| **Subtract, don't add** | Every element must earn its pixel. Default to removal. |
| **Structure is ornament** | Expose the grid, the data, the hierarchy itself. The structure IS the decoration. |
| **Monochrome is the canvas** | Color is an event, not a default. |
| **Type does the heavy lifting** | Scale, weight, and spacing create hierarchy — not color, not icons, not borders. |
| **Both modes are first-class** | Dark mode: OLED black. Light mode: warm off-white. Neither is derived from the other. |
| **Industrial warmth** | Technical and precise, but never cold. A human hand should be felt. |

**Compositional Balance:** Asymmetry is preferred. Three patterns:
- **Large left, small right:** Hero metric + metadata stack
- **Top-heavy:** Big headline near top, sparse content below
- **Edge-anchored:** Important elements pinned to screen edges, negative space in center

**The "One Break" Rule:** Be consistent everywhere, then break the pattern in exactly ONE place per screen — an oversized number, a circular widget among rectangles, a red dot, a vast gap.

---

## Color Palette

### Dark Mode (OLED Black) — Primary for Engram

| Token | Hex | Role |
|---|---|---|
| `--black` | `#000000` | Primary background (true OLED black) |
| `--surface` | `#111111` | Elevated surfaces, cards |
| `--surface-raised` | `#1A1A1A` | Secondary elevation |
| `--border` | `#222222` | Subtle dividers (decorative only) |
| `--border-visible` | `#333333` | Intentional borders, wireframe lines |
| `--text-disabled` | `#666666` | Disabled text, decorative elements |
| `--text-secondary` | `#999999` | Labels, captions, metadata |
| `--text-primary` | `#E8E8E8` | Body text |
| `--text-display` | `#FFFFFF` | Headlines, hero numbers |

### Engram Brand Accents

| Token | Hex | Usage |
|---|---|---|
| `--cyan-neon` | `#00f2ff` | MCP connections, FTS5 towers, active states |
| `--purple-neon` | `#bc13fe` | Memory, core, SQLite vault, plasma |

### Status Colors

| Token | Hex | Usage |
|---|---|---|
| `--success` | `#4A9E5C` | Confirmed, completed, connected |
| `--warning` | `#D4A843` | Caution, pending, degraded |
| `--error` | `#D71921` | Errors, destructive |

### The 4-Level Gray Hierarchy

```
--text-display (100%)  → Hero numbers. ONE per screen.
--text-primary (90%)   → Body text, primary content.
--text-secondary (60%) → Labels, captions, metadata.
--text-disabled (40%)  → Disabled, timestamps, hints.
```

**Key rule:** Brand colors (cyan/purple) are NOT part of the hierarchy. They are "interrupts" — "look HERE, NOW." If nothing is urgent, no accent color on the screen.

---

## Typography

### Font Stack

| Role | Font | Fallback | Weights |
|---|---|---|---|
| **Display** | **Doto** (variable dot-matrix) | Space Mono, monospace | 400-700 |
| **Body / UI** | **Space Grotesk** | DM Sans, system-ui | 300, 400, 500, 700 |
| **Data / Labels** | **Space Mono** | JetBrains Mono, SF Mono | 400, 700 |

### Type Scale

| Token | Size | Line Height | Letter Spacing | Use |
|---|---|---|---|---|
| `display-xl` | 72px | 1.0 | -0.03em | Hero numbers |
| `display-lg` | 48px | 1.05 | -0.02em | Section heroes |
| `display-md` | 36px | 1.1 | -0.02em | Page titles |
| `heading` | 24px | 1.2 | -0.01em | Section headings |
| `subheading` | 18px | 1.3 | 0 | Subsections |
| `body` | 16px | 1.5 | 0 | Body text |
| `body-sm` | 14px | 1.5 | 0.01em | Secondary body |
| `caption` | 12px | 1.4 | 0.04em | Timestamps, footnotes |
| `label` | 11px | 1.2 | 0.08em | ALL CAPS monospace labels |

### Font Discipline Rules

- **Maximum 2 font families per screen** (Space Grotesk + Space Mono; Doto only for hero moments)
- **Maximum 3 font sizes per screen** (one large, one medium, one small)
- **Maximum 2 font weights per screen** (Regular + one other)
- **Doto:** 36px+ only, tight tracking, never for body text
- **Labels:** Always Space Mono, ALL CAPS, 0.06-0.1em spacing, 11-12px
- **Data/Numbers:** Always Space Mono. Units as label size, slightly raised, adjacent

---

## Dot-Matrix Patterns

### CSS Dot Grid

```css
/* Standard dot grid - for backgrounds */
.dot-grid {
  background-image: radial-gradient(circle, #333333 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Subtle dot grid - for softer backgrounds */
.dot-grid-subtle {
  background-image: radial-gradient(circle, rgba(51, 51, 51, 0.3) 0.5px, transparent 0.5px);
  background-size: 12px 12px;
}
```

### Dot-Matrix Usage Rules

- **Dots:** 1-2px diameter, uniform 12-16px grid spacing
- **Opacity:** 0.1-0.2 for backgrounds, full opacity for data visualization
- **When to use:** Hero typography (via Doto font), decorative grid backgrounds, data visualization
- **Never use as:** Container borders or button styles

---

## Three-Layer Visual Hierarchy

Every screen has exactly **three layers**:

| Layer | What | How |
|---|---|---|
| **Primary** | The ONE thing the user sees first | Doto or Space Grotesk at display size. 48-96px breathing room. |
| **Secondary** | Supporting context | Space Grotesk at body/subheading. Grouped tight (8-16px) to the primary. |
| **Tertiary** | Metadata, navigation, system info | Space Mono at caption/label. ALL CAPS. Pushed to edges or bottom. |

**The squint test:** Can you still tell what's most important? If two things compete, one needs to shrink, fade, or move.

---

## Spacing as Meaning

```
Tight (4-8px)   = "These belong together"
Medium (16px)   = "Same group, different items"
Wide (32-48px)  = "New group starts here"
Vast (64-96px)  = "This is a new context"
```

**Key rule:** "If a divider line is needed, the spacing is probably wrong." Dividers are a symptom of insufficient spacing contrast.

### Container Strategy (Lightest to Heaviest)

1. Spacing alone (proximity groups items)
2. A single divider line
3. A subtle border outline
4. A surface card with background change

**Never box the most important element** — let it float on the background.

---

## Anti-Patterns (What to NEVER Do)

- No gradients in UI chrome
- **No shadows. No blur.** Flat surfaces, border separation only.
- No skeleton loading screens. Use `[LOADING...]` text or segmented spinner.
- No toast popups. Use inline status text: `[SAVED]`, `[ERROR: ...]`
- No sad-face illustrations, cute mascots, or multi-paragraph empty states
- No zebra striping in tables
- No filled icons, multi-color icons, or emoji as UI
- No parallax, scroll-jacking, or gratuitous animation
- No spring/bounce easing. Use subtle ease-out only.
- No border-radius > 16px on cards. Buttons are pill (999px) or technical (4-8px).
- Data viz: differentiate with **opacity** (100%/60%/30%) or **pattern** (solid/striped/dotted) before color.

---

## Motion Design

- **Duration:** 150-250ms micro-interactions, 300-400ms transitions
- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` — subtle ease-out
- Prefer opacity over position. Elements fade, don't slide.
- Hover: border/text brightens. No scale, no shadows.
- **"Percussive, not fluid."** Imagine UI sounds: click not swoosh, tick not chime.

---

## Component Patterns

### Buttons

| Variant | Background | Border | Text | Radius |
|---|---|---|---|---|
| Primary | `#FFFFFF` | none | `#000000` | 999px (pill) |
| Secondary | transparent | `1px solid #333333` | `--text-primary` | 999px |
| Ghost | transparent | none | `--text-secondary` | 0 |
| Destructive | transparent | `1px solid #D71921` | `#D71921` | 999px |

All buttons: Space Mono, 13px, ALL CAPS, letter-spacing 0.06em, padding 12px 24px, min-height 44px.

### Segmented Progress Bars

Discrete rectangular blocks with 2px gaps — mechanical, instrument-like.
- **Anatomy:** Label + value above, full-width bar of discrete segments below
- **Segments:** Square-ended blocks, no border-radius. Filled = status color. Empty = `--border`
- Always paired with numeric readout

### Tags / Chips

- Border: `1px solid --border-visible`, no fill
- Space Mono, caption size, ALL CAPS
- Radius: 999px (pill) or 4px (technical)

### Cards / Surfaces

- Background: `--surface` or `--surface-raised`
- Border: `1px solid --border`, or none
- Radius: 12-16px cards, 8px compact, 4px technical
- Padding: 16-24px. **No shadows.**

### Navigation

- Labels: Space Mono, ALL CAPS
- Active: `--text-display` + dot/underline. Inactive: `--text-disabled`
- Style: Bracket `[ HOME ]  GALLERY  INFO` or pipe `HOME | GALLERY | INFO`

### Overlays (No Shadows)

- **Modals:** Backdrop `rgba(0,0,0,0.8)`, dialog `--surface` + `1px solid --border-visible` + 16px radius
- **Bottom sheets:** `--surface`, 2px handle bar, 16px top radius
- **Dropdowns:** `--surface-raised`, `1px solid --border-visible`, 8px radius
- **Toasts:** None. Inline status text: `[SAVED]`, `[ERROR: ...]`

### Data Visualization

| Form | Best for | Visual Weight |
|---|---|---|
| Hero number (large Doto/Space Mono) | Single key metric | Heavy — use once |
| Segmented progress bar | Progress toward goal | Medium |
| Inline compact bar | Secondary metrics in rows | Light |
| Number-only with status color | Values without proportion | Lightest |

---

## CSS Custom Properties (for Tailwind v4)

```css
@theme {
  --color-black: #000000;
  --color-surface: #111111;
  --color-surface-raised: #1a1a1a;
  --color-border: #222222;
  --color-border-visible: #333333;
  --color-text-disabled: #666666;
  --color-text-secondary: #999999;
  --color-text-primary: #e8e8e8;
  --color-text-display: #ffffff;
  --color-cyan-neon: #00f2ff;
  --color-purple-neon: #bc13fe;
  --color-success: #4a9e5c;
  --color-warning: #d4a843;
  --color-error: #d71921;
  --font-display: 'Doto', 'Space Mono', monospace;
  --font-body: 'Space Grotesk', 'DM Sans', system-ui, sans-serif;
  --font-mono: 'Space Mono', 'JetBrains Mono', 'SF Mono', monospace;
}
```

---

## Panel Styling (HUD Elements)

```css
/* Glass-morphism panel for HUD overlays */
.hud-panel {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid #222222;
  border-radius: 8px;
  padding: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
}
```

---

## Loading States

```
/* NEVER use skeleton screens */
[LOADING SIMULATOR...]
[LOADING LOGS...]

/* Use segmented progress bars for loading */
<div class="segmented-bar">
  <div class="segment filled"></div>
  <div class="segment filled"></div>
  <div class="segment"></div>
  <div class="segment"></div>
  ...
</div>
```

---

## Status Text

```
/* Inline status, NOT toasts */
[SAVED]
[ERROR: connection timeout]
[SYNCING 2 memories...]
[INDEXED via FTS5]
```
