# Design System — TalentHub

> Tokens definitivos consolidados a partir del output de Claude Design (ver `docs/design-audit.md`).
> En caso de conflicto con el brief original (§7 de CLAUDE.md), **gana el diseño**.
>
> Esta es la fuente de verdad para `src/app/globals.css` desde Fase 1.

---

## 1. Filosofía visual

Editorial, calmada, fotos como protagonistas. Referencias: Linear, Arc, Are.na, Cosmos.so, Airbnb.

**Reglas no-negociables:**
1. **Mucho espacio en blanco.** Padding generoso entre secciones (36–40px verticales).
2. **Bordes sutiles antes que sombras.** Cards con `border 1px solid var(--border)`; sombras solo en overlays (modal, sticky bar, popovers).
3. **Tipografía como jerarquía principal.** Tracking apretado (`-0.02 a -0.035em`) en titulares, `text-wrap: balance` en h1.
4. **Color con moderación.** Coral solo para acentos puntuales (CTA primario, dot de urgencia, hover de links importantes). Negro casi-negro y off-white cálido dominan la pantalla.
5. **Las fotos del talento mandan.** UI no las tapa: badges con `backdrop-filter: blur` translúcidos, no bloques opacos.
6. **Movimiento suave y casi imperceptible.** 120–240ms ease, transforms pequeños (`-1 a -2px`), nunca bouncy.

---

## 2. Color tokens

### 2.1 Tokens base (CSS custom properties)

A definir en `src/app/globals.css` dentro de `:root`:

```css
:root {
  /* Surfaces */
  --bg:          #FAFAF7;   /* off-white cálido — fondo global y cards */
  --beige-soft:  #F1EEE7;   /* hover, eyebrows panels, sidebars sutiles */
  --beige:       #E8E4DC;   /* secundario, disabled, fondos chip activos */
  --border:      #E5E5E0;   /* todos los bordes 1px */

  /* Ink */
  --ink:         #0A0A0A;   /* texto principal, fondos invertidos (CTA dark) */
  --ink-muted:   #6B6B66;   /* texto secundario, eyebrows, valores muted */

  /* Accent (coral) */
  --coral-soft:  #FCE7E4;   /* fondo de pills coral, AI badges */
  --coral:       #E85A4F;   /* acento primario, CTAs, dots de urgencia */
  --coral-deep:  #D14A40;   /* hover de coral, texto sobre coral-soft */

  /* Semantic — info / success / danger / neutral */
  --info-bg:        #E8EEFB;
  --info-border:    #D2DCF2;
  --info-text:      #1F4FA8;
  --info-dot:       #3B6FD3;

  --success-bg:     #E2F1E8;
  --success-border: #C8E5D2;
  --success-text:   #1F6B3A;
  --success-dot:    #2E8B4F;

  --danger-bg:      #F4E2E0;
  --danger-border:  #EAD0CC;
  --danger-text:    #8A3A3A;
  --danger-dot:     #B85651;

  --neutral-dot:    #9A9A92;
}
```

> **Coral period.** Reservado para remate de h1 importantes — un punto coral al final del titular ("Aplica en segundos<span style='color: var(--coral)'>.</span>"). No abusar.

### 2.2 Mapeo a Tailwind (en `globals.css`)

```ts
theme: {
  extend: {
    colors: {
      bg:           "var(--bg)",
      "beige-soft": "var(--beige-soft)",
      beige:        "var(--beige)",
      border:       "var(--border)",
      ink:          "var(--ink)",
      "ink-muted":  "var(--ink-muted)",
      "coral-soft": "var(--coral-soft)",
      coral:        "var(--coral)",
      "coral-deep": "var(--coral-deep)",
      info:    { DEFAULT: "var(--info-text)",    bg: "var(--info-bg)",    border: "var(--info-border)",    dot: "var(--info-dot)" },
      success: { DEFAULT: "var(--success-text)", bg: "var(--success-bg)", border: "var(--success-border)", dot: "var(--success-dot)" },
      danger:  { DEFAULT: "var(--danger-text)",  bg: "var(--danger-bg)",  border: "var(--danger-border)",  dot: "var(--danger-dot)" },
    },
  },
}
```

### 2.3 Tokens semánticos para shadcn (`components.json`)

shadcn espera nombres como `background`, `foreground`, `primary`, `muted`, `border`. Aliasear en `globals.css`:

```css
:root {
  --background: var(--bg);
  --foreground: var(--ink);
  --primary: var(--coral);
  --primary-foreground: #ffffff;
  --secondary: var(--beige);
  --secondary-foreground: var(--ink);
  --muted: var(--beige-soft);
  --muted-foreground: var(--ink-muted);
  --accent: var(--coral-soft);
  --accent-foreground: var(--coral-deep);
  --destructive: var(--danger-text);
  --destructive-foreground: #ffffff;
  --border: var(--border);
  --input: var(--border);
  --ring: var(--ink);
  --radius: 0.625rem; /* 10px — base radius para shadcn primitivos */
}
```

### 2.4 Selection

```css
::selection { background: var(--coral); color: #fff; }
```

---

## 3. Tipografía

### 3.1 Familias

| Rol | Fuente | Pesos | `next/font` |
|---|---|---|---|
| **Display** (h1, h2, h3, valores grandes) | Inter Tight | 400, 500, 600, 700 | `Inter_Tight` |
| **Body** (UI, copy, controles) | Inter | 400, 500, 600 | `Inter` |
| **Numerals tabulares** | Inter con `font-variant-numeric: tabular-nums` | (se usa el peso del contexto) | — |

> **Decisión de Fase 0 (2026-05-01):** **no incluir JetBrains Mono.** Apareció en una sola ocurrencia (`TalentHub Mis Castings.html:434`, badge de aplicantes en filas de tabla, contenido 100% numérico). Reemplazo en el componente `<CastingRow>`: Inter weight 600 + `font-variant-numeric: tabular-nums` (utility Tailwind `tabular-nums`) + `letter-spacing: -0.02em`. Misma sensación de "dato técnico" sin payload extra.

Configuración en `app/layout.tsx`:

```ts
import { Inter, Inter_Tight } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display" });
```

En `globals.css`:

```css
html, body {
  font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 3.2 Escala (display)

Usar `clamp()` para fluido responsive:

| Token | Valor | Uso |
|---|---|---|
| `text-display-xl` | `clamp(36px, 5.4vw, 64px)` / lh `1.02` / tracking `-0.035em` | Hero homepage |
| `text-display-lg` | `clamp(36px, 5vw, 56px)` / lh `1.02` / tracking `-0.035em` | Onboarding paso 1 |
| `text-display-md` | `clamp(32px, 4–4.4vw, 48px)` / lh `1.05` / tracking `-0.03em` | Detalle casting, completar perfil, perfil hero |
| `text-display-sm` | `clamp(32px, 4vw, 44px)` / lh `1.05` / tracking `-0.03em` | Mis aplicaciones |
| `text-display-xs` | `clamp(28–30px, 3.4–3.6vw, 38–40px)` / lh `1.1` / tracking `-0.03em` | Dashboard agencia, publicar casting, aplicantes |
| `text-h2` | `22–26px` / weight `500` / tracking `-0.02 a -0.025em` | Títulos de sección |
| `text-h3` | `17–18px` / weight `500` / tracking `-0.015 a -0.02em` | Títulos de card |

Todos en `Inter Tight`, `font-weight: 500` por defecto (no 600/700 — la pieza editorial está en weight 500 con tracking apretado, no en bold).

### 3.3 Escala (body)

| Tamaño | Uso |
|---|---|
| `15.5–16px` / lh `1.55–1.65` | Párrafos largos (descripciones, intros) |
| `14px` (base) | UI controls, body por defecto, inputs |
| `13–13.5px` | Body en cards, dropdowns, navegación secundaria |
| `12.5px` | Subtexto en cards, metadata |
| `12px` | Footer, microcopy, eyebrows |
| `11–11.5px` | Eyebrows ALL CAPS, status badges, kickers |

### 3.4 Eyebrows / kickers

Patrón omnipresente, antes de h2/h1:

```css
.eyebrow {
  font-size: 11–11.5px;
  text-transform: uppercase;
  letter-spacing: 0.06–0.08em;
  font-weight: 500;
  color: var(--ink-muted);
}
```

### 3.5 Numerales

- Por defecto: proporcionales (Inter normal).
- En contadores, badges, deltas, fechas, contadores de aplicantes: `font-variant-numeric: tabular-nums` (Tailwind: `tabular-nums`).

### 3.6 Text wrap

- `text-wrap: balance` en h1 importantes (Tailwind: `text-balance`).
- `text-wrap: pretty` en párrafos largos (Tailwind: `text-pretty`).

---

## 4. Spacing y layout

### 4.1 Containers

| Container | Max-width | Padding-x desktop / mobile |
|---|---|---|
| Default (feed, detalle, perfil, dashboard) | `1280px` | `32px / 20px` |
| Mis Aplicaciones (intencionalmente más estrecho — list view) | `1100px` | `32px / 20px` |
| Completar Perfil | `1120px` | `32px / 20px` |
| Sidebar agencia (fixed) | `240px` | — |
| Modal AuthModal | `420px` | `20px (de la página)` |
| Form publicar casting | `600px max` | — |
| Form completar perfil | `520px max` | — |
| Right-rail (Aplicantes summary) | `280px` | — |
| Right-rail (Completar Perfil extracted) | `380px` | — |

### 4.2 Spacing scale

Tailwind default basta. Lo más usado:
- Gap entre cards: `12px` (dashboard), `16px` (default), `20px` (grid hero)
- Padding card: `14px` (compactas), `16–20px` (default), `20–24px` (hero), `36px 32px` (modal AuthModal)
- Section padding vertical: `36–40px`
- Header/nav height: `64px`

### 4.3 Breakpoints

Custom screens en `globals.css` (alinearlos a los breakpoints del diseño, no a defaults Tailwind):

```ts
screens: {
  sm: "600px",   // grid 2→1, city selector mobile
  md: "700px",   // mis aplicaciones simplifica, agency stack
  lg: "900px",   // grid 3→2, sidebar oculto, profile-hero stack
  detail: "960px", // detail header 2→1
  xl: "1100px",  // dashboard 4-stats→2, tabla columnas
  "2xl": "1200px", // applicants summary collapse
}
```

> **Importante:** los nombres `lg`/`xl`/`2xl` están redefinidos respecto a Tailwind defaults — no usar componentes de terceros que asuman defaults sin testear.

---

## 5. Border radius

Escala oficial:

| Token (Tailwind) | px | Uso |
|---|---|---|
| `rounded-xs` | `4px` | Chips muy pequeños (badge "Verificada", source filename) |
| `rounded-sm` | `6–7px` | Botones de icono pequeños, avatar squares |
| `rounded` | `8px` | Botones default, dropdowns items |
| `rounded-md` | `10px` | Botones primarios, inputs, dropdowns |
| `rounded-lg` | `12px` | Cards default, info-grid cells, drop zones medianos |
| `rounded-xl` | `14–16px` | Cards hero, modal AuthModal, drop zone principal |
| `rounded-2xl` | `20px` | Drop zone onboarding (hero) |
| `rounded-full` | `9999px` | Status pills, filter pills, chips, sticky CTA bar |

`--radius` de shadcn lo fijamos en `0.625rem` (10px) — esto hace que `Button`/`Input` por defecto matcheen el diseño.

---

## 6. Shadows

```css
/* Dropdowns, popovers, menús */
--shadow-popover: 0 8px 24px rgba(10, 10, 10, 0.06);

/* Modal (AuthModal) */
--shadow-modal: 0 24px 60px rgba(10, 10, 10, 0.18);

/* Sticky CTA flotante (ApplyBar) */
--shadow-floating: 0 12px 40px rgba(10, 10, 10, 0.18);

/* CTA primario destacado (Publicar casting) */
--shadow-coral-glow: 0 4px 14px rgba(232, 90, 79, 0.25);
```

Cards: **sin sombra**. Hover: `transform: translateY(-1 a -2px)` + `border-color: var(--ink)` (sustituye a la sombra).

---

## 7. Animation tokens

### 7.1 Durations & easings

```css
--duration-quick: 120ms;     /* hovers, dropdowns */
--duration-default: 140–160ms; /* botones, transitions de color */
--duration-slow: 200–240ms;  /* modal entrada, step progress, focus rings */
--ease-default: ease;
--ease-pop: cubic-bezier(0.2, 0.8, 0.2, 1); /* AuthModal pop-in */
```

### 7.2 Keyframes (en `globals.css`)

Portar verbatim del diseño:

```css
@keyframes th-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes th-pop-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes th-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes th-pulse-soft {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.05); }
}
@keyframes th-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes th-orbit {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### 7.3 Cuándo usar qué

| Animación | Uso |
|---|---|
| `th-fade-in` | Backdrop del AuthModal |
| `th-pop-in` | Caja del AuthModal, dropdown CityDropdown |
| `th-fade-up` | FileCard post-upload, AltInput expandido |
| `th-pulse-soft` | Sparkle del hero "Recomendados", sparkle de "Extraído por IA", dots decorativos en DropZone |
| `th-shimmer` | Texto "Powered by AI · Lee tu portafolio en segundos" (background gradient cycling) |
| `th-orbit` | Sparkle orbitando alrededor del file mientras la IA analiza |

---

## 8. Iconografía

- **Set primario:** lucide-react para iconos genéricos (Pin, Calendar, Clock, Bookmark, Search, ArrowRight, X, ChevronDown).
- **Set custom:** viven en `src/components/icons/` con **API compatible con lucide-react** (acepta `size`, `strokeWidth`, `color`, `className`, `...rest` tipados como `LucideProps`). Cada icono en su propio archivo `kebab-case.tsx`, re-export consolidado en `src/components/icons/index.ts`. Esto permite usarlos como drop-in: `import { Sparkle } from "@/components/icons"` se siente igual que `import { Search } from "lucide-react"`.
- **Lista custom:** `Sparkle`, `AISparkle` (animada con `th-pulse-soft`), `PdfIcon`, `GoogleIcon` (4-color brand), `ReqAge`, `ReqGender`, `ReqHeight`, `ReqFeatures`, `ReqLanguage`, `ReqExp`.
- Tamaños canónicos: `12, 13, 14, 16, 20, 22, 26px` — siempre `flex-shrink: 0` cuando van junto a texto (Tailwind: `shrink-0`).
- Stroke width default: `1.4–1.5` para custom. lucide-react default (`2`) **se baja a `1.5`** para matchear el peso visual del set custom: `<Icon strokeWidth={1.5} />`.

---

## 9. Componentes — pautas visuales clave

> Detalle por componente vive en su archivo `.tsx`. Aquí solo lo que aplica transversalmente.

### Botones
- **Primary:** `bg-coral text-white border-coral hover:bg-coral-deep` — radius `10px`, padding `9-12px / 16-26px` según tamaño.
- **Dark / inverted:** `bg-ink text-bg hover:bg-[#222]` — usado para CTAs secundarios prominentes (Editar perfil, Aplicar a más, Compartir shortlist).
- **Outline:** `bg-transparent text-ink border-border hover:bg-beige`.
- **Ghost:** `bg-transparent text-ink hover:bg-beige-soft`.
- **Disabled:** `bg-beige text-ink-muted cursor-not-allowed`.
- **Iconográfico:** `30px` cuadrado, radius `7-8px`, hover background `beige-soft`.

### Inputs
- Radius `10–12px`, padding `11-16px / 14-18px`.
- Border `1px solid var(--border)` → `var(--ink)` en focus (no usar ring de shadcn por defecto, sustituir por border).
- Background siempre `var(--bg)`.
- Tipografía: 14px, `Inter Tight` weight 500 cuando es `big` (título de casting, etc.).

### Pills / chips
- Siempre `rounded-full`.
- Filter pills inactive: `bg-bg border-border text-ink`. Active: `bg-ink text-bg border-ink`.
- Chip multi-select: idem pero con check icon SVG inline cuando active.
- Status pills: usan paleta semántica (§5.2 del audit). Siempre con dot de 5px a la izquierda del label.

### Cards (CastingCard pattern)
- `border 1px solid var(--border)` + radius `12px`.
- Padding interno: foto en `padding 10px` con foto a `border-radius: 8px` interna; texto en `padding 8px 16px 16px`.
- Hover: `borderColor: var(--ink)` + `transform: translateY(-2px)`. **No sombra.**
- Photo aspect ratio: `4/5` para cards principales, `3/4` para perfil/galería.

### Modal (AuthModal pattern)
- Backdrop: `rgba(10, 10, 10, 0.45)` + `backdrop-filter: blur(8px)`.
- Caja: `max-width: 420px`, radius `16px`, border `1px`, shadow `--shadow-modal`, padding `36px 32px 28px`.
- Animación entrada: `th-fade-in` (220ms) en backdrop, `th-pop-in` (260ms `--ease-pop`) en caja.
- Body lock + ESC + click-outside.

### Sticky bars
- TopNav y FilterBar: `bg: rgba(250, 250, 247, 0.85–0.92)` + `backdrop-filter: saturate(180%) blur(10–12px)` + `border-bottom: 1px solid var(--border)`.
- ApplyBar (fixed bottom): `bg-ink text-bg`, radius `9999px`, shadow `--shadow-floating`. Aparece tras `scrollY > 320`.

### State patterns — empty / loading / error / success

Las 4 variantes derivan del mismo patrón visual del `EmptyState` que diseñó Claude Design para `Mis Aplicaciones`. Se consolidan como **un solo componente base** `<StateCard>` con prop `variant`, no 4 componentes distintos.

| Variante | Borde | Icon-chip | Icono típico | Animación |
|---|---|---|---|---|
| `empty` | `1px dashed var(--border)` | `bg-beige-soft text-coral` | contextual (ej. `Inbox`, `Search`, custom) | — |
| `error` | `1px solid var(--danger-border)` | `bg-danger-bg text-danger` | `AlertTriangle` | — |
| `loading` (skeleton) | `1px solid var(--border)` | `bg-beige-soft` (sin ícono) | placeholder bars | `th-shimmer` |
| `success` | `1px solid var(--success-border)` | `bg-success-bg text-success` | `CheckCircle` | `th-fade-up` (entrada) |

Estructura común:
```
┌─────────────────────────────────┐
│  [icon-chip 56×56 r-14]         │
│                                 │
│  H3 título (Inter Tight 22px)   │
│  Body (Inter 14.5px ink-muted)  │
│                                 │
│  [CTA primario coral]           │
└─────────────────────────────────┘
padding: 80px 32px, text-align: center
```

**Skeleton bars** (uso individual dentro de cards específicas como `<CastingCardSkeleton>`, `<ApplicationRowSkeleton>`, etc.):
```css
background: linear-gradient(90deg, var(--beige-soft) 0%, var(--bg) 50%, var(--beige-soft) 100%);
background-size: 200% 100%;
animation: th-shimmer 1.6s linear infinite;
border-radius: 4–6px (texto) | 8–12px (imágenes);
```

Sin labels "Loading…" ni textos placeholder — solo formas. Mantiene la estética calmada del sistema.

### Photo placeholder
Patrón omnipresente para previsualizar fotos (mientras no haya backend):
- Background: `linear-gradient(135deg, oklch(0.78 0.04 H), oklch(0.86 0.03 H+8))` — H deterministico por seed (warm/earth: 8, 12, 14, 18, 22, 24, 28, 30, 32, 38, 42).
- Overlay 1: `repeating-linear-gradient(45deg, transparent 0 12-14px, rgba(255,255,255,0.18) 14-15px)` con `mix-blend-mode: overlay`.
- Overlay 2: círculo soft `oklch(0.62 0.09 H)` opacidad 0.32 anclado en una esquina + cuadrado redondeado blanco translúcido en otra.
- Etiqueta opcional bottom-left, 9–11px, mono, fondo `rgba(255,255,255,0.55)` + `backdrop-filter: blur(4px)`.

> Esto reemplaza Lorem Picsum / Unsplash genéricos, mantiene la estética cálida del producto, y al cambiar a fotos reales no se siente roto.

---

## 10. Accesibilidad — checklist propio del sistema

Heredado del brief (WCAG AA) + lo observado:
- Contraste `--ink (#0A0A0A)` sobre `--bg (#FAFAF7)` = 19.0:1 ✅ AAA.
- Contraste `--ink-muted (#6B6B66)` sobre `--bg` = 4.7:1 ✅ AA (cuidar tamaños <14px).
- Contraste `--coral (#E85A4F)` sobre `--bg` ≈ 3.4:1 — **no** AA para texto. Usar coral solo para fondos (CTAs) o textos ≥18px / iconos. Para texto sobre `--bg`, usar `--coral-deep` (4.6:1 ✅).
- Focus visible obligatorio en todos los controles. shadcn lo trae; mantenemos `ring-color: var(--ink)` y no transparente.
- Modal: `role="dialog"` + `aria-modal="true"` + `aria-labelledby` (ya en el diseño).
- Iconos decorativos: `aria-hidden`. Iconos con función (bookmark toggle, close): `aria-label`.

---

## 11. Implementación esperada (Fase 1)

1. `globals.css`:
   - `:root` con todos los tokens de §2.1 + §2.3 (alias shadcn).
   - Selección coral.
   - Los 6 keyframes de §7.2.
2. `globals.css` (vía `@theme inline`):
   - `theme.extend.colors` mapeando vars (§2.2).
   - `theme.extend.screens` con breakpoints custom (§4.3).
   - `theme.extend.borderRadius` con escala (§5).
   - `theme.extend.fontFamily: { sans: "var(--font-sans)", display: "var(--font-display)" }`.
   - `theme.extend.boxShadow` con los 4 tokens de §6.
   - `theme.extend.animation` y `keyframes` con los 6 de §7.2.
3. `app/layout.tsx`: `next/font` Inter + Inter Tight, atributos `font-feature-settings`.
4. `components.json` (shadcn): `style: "new-york"`, `baseColor: "neutral"` (lo sobreescribimos), `cssVariables: true`, `iconLibrary: "lucide"`.
5. `/sandbox` — pantalla de QA visual (Fase 1 §8 paso 8) — mostrar muestra de cada token, escala tipográfica, todas las pills semánticas, photo placeholder con 5 seeds, los 4 estados de StatusBadge.

---

## 12. Versiones

- **2026-05-01** — v1.0 — Tokens iniciales consolidados desde Claude Design bundle.
- **2026-05-01** — v1.1 — Cierre de Fase 0 con David: descartada JetBrains Mono (§3.1), API lucide-compatible para icons custom en `src/components/icons/` (§8), state patterns derivados del EmptyState con 4 variantes en §9.
