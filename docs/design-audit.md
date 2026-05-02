# Design Audit — TalentHub (Fase 0)

> Audit del bundle de Claude Design recibido el 2026-05-01 vía `https://api.anthropic.com/v1/design/h/1_M4nrTu8tuntuonhZMIYw` (gzip de 17 archivos). Bundle extraído en `design-source/`. Este documento se lee junto con `docs/design-system.md`.

**Estado:** borrador para revisión de David.
**Fase:** 0 — diagnóstico, sin código aún.

---

## 1. Resumen ejecutivo

- **Cobertura:** 10/10 pantallas de Fase 2 están diseñadas. Hay 1 pantalla extra (paso 2 de onboarding) y el "Login/Registro" está implementado como **un solo modal compartido**, no como rutas separadas.
- **Stack del prototipo:** React 18.3.1 (UMD) + Babel-standalone para JSX in-browser + CSS plano con variables CSS + inline styles. **No usa Tailwind, no usa shadcn/ui, no usa lucide-react ni librerías de animación.**
- **Tokens:** los 5 colores del brief (§7 de CLAUDE.md) están presentes y se confirman, pero el diseño introduce **4 tokens nuevos** (`--ink-muted`, `--coral-deep`, `--coral-soft`, `--beige-soft`) que se vuelven canónicos. Además hay una paleta semántica de estados (azul / verde / rojo apagado) hardcodeada que conviene tokenizar.
- **Aproximación de migración:** **adaptar, no portar verbatim**. El visual es la fuente de verdad, pero el JSX del prototipo está duplicado entre HTMLs y depende de globals (`window.CASTINGS`, `window.ReqIcon`). Reescribimos sobre Next + Tailwind + shadcn manteniendo fidelidad pixel-perfect en estilos, pero usando los componentes accesibles de shadcn donde apliquen (Dialog, Select, ToggleGroup, Form).
- **Bloqueadores:** ninguno. Las 5 decisiones de producto que estaban abiertas se cerraron con David el 2026-05-01 (ver §9).

---

## 2. Estructura del bundle

```
design-source/
├── README.md                              # Hand-off de Claude Design
├── chats/
│   └── chat1.md                           # Transcripción completa de las 9 iteraciones
└── project/
    ├── TalentHub.html                     # Pantalla 1 — feed público
    ├── TalentHub Detail.html              # Pantalla 2 — detalle casting
    ├── TalentHub Registro.html            # Modal Auth sobre detail dimmed
    ├── TalentHub Onboarding.html          # Pantalla 5 paso 1 — drop PDF
    ├── TalentHub Completar Perfil.html    # Pantalla 5 paso 2 — completar
    ├── TalentHub Mi Perfil.html           # Pantalla 6 — perfil talento
    ├── TalentHub Mis Aplicaciones.html    # Pantalla 7 — aplicaciones talento
    ├── TalentHub Publicar Casting.html    # Pantalla 9 — agencia crear
    ├── TalentHub Mis Castings.html        # Pantalla 8 — agencia dashboard
    ├── TalentHub Aplicantes.html          # Pantalla 10 — agencia aplicantes
    ├── components.jsx                     # Shared: Nav, Hero, Filters, Cards, Footer
    ├── detail-components.jsx              # Detail-page parts + ReqIcon
    ├── auth-modal.jsx                     # AuthModal compartido
    ├── data.jsx                           # Fixtures CASTINGS (9 items)
    └── tweaks-panel.jsx                   # Helper de design-time (DESCARTAR)
```

> **Nota de origen:** según `README.md` del bundle, los HTML son **prototipos visuales**, no código de producción. El instructivo explícito es "recreate them pixel-perfectly en cualquier tecnología que sirva al codebase" — exactamente lo que vamos a hacer.

---

## 3. Inventario de pantallas

### 3.1 Mapeo a las 10 pantallas de Fase 2

| # | CLAUDE.md (Fase 2) | Ruta Next propuesta | Archivo del diseño | Match | Notas |
|---|---|---|---|---|---|
| 1 | Feed público de castings | `/` | `TalentHub.html` | ✅ Exacto | Sticky nav, sticky filter bar, "Recomendados para ti" + grid. |
| 2 | Detalle de un casting | `/castings/[id]` | `TalentHub Detail.html` | ✅ Exacto | Header 2-col + photo, sticky `ApplyBar` flotante, similares al final. |
| 3 | Login | `/login` | (`auth-modal.jsx` solamente) | ⚠️ Solo modal | El diseño no entrega ruta dedicada. Decisión §9.1. |
| 4 | Registro talento | `/register/talent` | `TalentHub Registro.html` (mismo modal) | ⚠️ Modal compartido | Modal único maneja login + registro vía toggle "Soy talento / Soy agencia". |
| 5 | Onboarding talento | `/onboarding` | `TalentHub Onboarding.html` (paso 1) + `TalentHub Completar Perfil.html` (paso 2) | ✅ Mejor que el brief | Diseño descompuso en 2 pasos: drop PDF → completar 4 campos. Sugerimos `/onboarding` y `/onboarding/completar`. |
| 6 | Perfil talento | `/profile` | `TalentHub Mi Perfil.html` | ✅ Exacto | Hero + galería 4-col + datos físicos 3×3 + idiomas + experiencia. |
| 7 | Aplicaciones del talento | `/applications` | `TalentHub Mis Aplicaciones.html` | ✅ Exacto | List vertical + tabs pill con counters + 4 estados de badge. |
| 8 | Dashboard agencia | `/agency/dashboard` | `TalentHub Mis Castings.html` | ✅ Exacto | 4-stats row + tabs (Activos/Borradores/Cerrados) + tabla densa. |
| 9 | Crear casting | `/agency/castings/new` | `TalentHub Publicar Casting.html` | ✅ Exacto | Form 600px max + colapsable "Detalles opcionales". |
| 10 | Aplicantes por casting | `/agency/castings/[id]/applicants` | `TalentHub Aplicantes.html` | ✅ Exacto | Filter pills + grid 3-col + summary right-rail. |

### 3.2 Estados implementados por pantalla

| Pantalla | Loading | Empty | Error | Hover | Active/Focus | Notas |
|---|---|---|---|---|---|---|
| 1. Feed | — | parcial (filtros vacíos sin estado) | — | sí (cards) | sí (filter pills) | Falta empty state cuando query/filtros no dan resultados. |
| 2. Detail | — | n/a | — | sí | sí | Estado `applied` toggleado en CTA. |
| 3+4. Auth modal | — | n/a | input email inválido (CTA disabled) | sí | sí (focus borders) | ESC + click-outside + body lock — completos. |
| 5a. Onboarding | sí (FileCard cycling AI states) | n/a (drop zone es la "vacía") | — | drag-over highlight | sí | "Saltar por ahora" lleva a paso 2. |
| 5b. Completar | — | n/a | — | sí | sí | Validación: ciudad + ≥1 categoría. |
| 6. Perfil | — | — | — | sí | — | Sin loading state. |
| 7. Aplicaciones | — | ✅ explícito (`EmptyState`) | — | sí | sí (tabs) | Empty state con CTA a `/`. |
| 8. Mis castings | — | sí (texto inline "No hay castings...") | — | sí (rows) | sí (tabs) | — |
| 9. Publicar | — | n/a | input mín 4/20 chars (CTA disabled) | sí | sí (focus borders) | — |
| 10. Aplicantes | — | sí (filter empty) | — | sí | sí (filter pills) | — |

**Gaps de estado a cubrir en Fase 2:**
- Loading skeletons para feed, detail, perfil (Fase 2 los exige).
- Error boundary / 500 / 404 — no diseñados.
- Empty state cuando filtros del feed devuelven 0 castings.
- Estado "perfil incompleto" en `/profile` (parcialmente cubierto por la barra "Perfil completo 85%").

---

## 4. Stack visual del output

| Capa | Implementación | Decisión migración |
|---|---|---|
| Runtime | React 18.3.1 (UMD) + ReactDOM 18.3.1 (UMD) + Babel-standalone 7.29.0 in-browser | **Descartar:** scaffolding solo de prototipo. Migrar a React 19 server components donde aplique. |
| Estilos | CSS plano + `:root` custom properties + inline `style={{...}}` (`react.style`) | **Reescribir a Tailwind**, mapeando vars CSS a tokens del `tailwind.config.ts`. Mantener nombres `--bg / --ink / ...` como CSS vars en `globals.css` para que `bg-background` etc. los referencien. |
| Tipografía | Google Fonts: Inter (400/500/600), Inter Tight (400/500/600/700). En "Mis Castings" además JetBrains Mono (400/500). `font-feature-settings: "ss01", "cv11"` en body. | **Migrar a `next/font`**, self-host. Decidir si JetBrains Mono se mantiene (uso muy puntual: contadores en tabla agencia). |
| Iconografía | Inline SVG custom — set propio en `components.jsx` (`Icon.{Chevron, Pin, Search, Calendar, Clock, Bookmark, Arrow, Close, Sparkle}`) y `detail-components.jsx` (`ReqIcon.{age, gender, height, features, language, exp}`). Custom: `PdfIcon`, `AISparkle`, `GoogleIcon`. | **Adaptar:** lucide-react cubre el 80% (Pin, Calendar, Clock, Bookmark, Search, ArrowRight, X, ChevronDown). Mantener inline SVG para los **custom** (`PdfIcon`, `AISparkle` con animación, `GoogleIcon` brand-colored). Ver §7. |
| Animación | CSS `@keyframes`: `th-fade-in`, `th-pop-in`, `th-fade-up`, `th-pulse-soft`, `th-shimmer`, `th-orbit`. Hooks de `window.scroll` para sticky `ApplyBar`. | **Portar verbatim** a `globals.css`. No introducir framer-motion en V1. |
| UI primitives | Hechos a mano. No shadcn, no Radix, no headlessui. | **Reescribir sobre shadcn/ui** donde haya equivalencia accesible: `Dialog` (AuthModal), `Select` / `Combobox` (CitySelector), `ToggleGroup` (chips multi-select), `Tabs`, `DropdownMenu` (UserMenu/AgencyMenu/RowActions), `Form` + `react-hook-form` + `zod`. Reskinear con tokens del diseño. |
| Forms | `useState` plain, validación inline, sin librería | **Reescribir** sobre `react-hook-form` + `zod` (Fase 2 lo exige). |
| Data layer | `window.CASTINGS` global desde `data.jsx` | **Adaptar:** mover a `src/mocks/castings.ts` con tipos en `src/lib/types/casting.ts`, expuesto por `src/lib/data/castings.ts` async. |

---

## 5. Tokens detectados (vs. §7 de CLAUDE.md)

### 5.1 Color

| Token | Valor (diseño) | §7 brief | Estado | Uso observado |
|---|---|---|---|---|
| `--bg` | `#FAFAF7` | `#FAFAF7` | ✅ Match | Fondo global, fondo de cards. |
| `--ink` | `#0A0A0A` | `#0A0A0A` | ✅ Match | Texto principal, fondos invertidos (CTA dark, sticky bar). |
| `--ink-muted` | `#6B6B66` | (no estaba) | ➕ Nuevo | Texto secundario, eyebrows, valores muted. **Crítico — usado en todas las pantallas.** |
| `--coral` | `#E85A4F` | `#E85A4F` | ✅ Match | Acento, CTAs primarios, dots de status urgente. |
| `--coral-deep` | `#D14A40` | (no estaba) | ➕ Nuevo | Hover de coral, texto sobre `coral-soft`. |
| `--coral-soft` | `#FCE7E4` | (no estaba) | ➕ Nuevo | Fondo de pills coral, badges "Verificada", AI sugerencias. |
| `--beige` | `#E8E4DC` | `#E8E4DC` | ✅ Match | Estado disabled de CTAs, fondo de chips activos sutiles. |
| `--beige-soft` | `#F1EEE7` | (no estaba) | ➕ Nuevo | Fondo de hover, eyebrows, sidebars, AI extracted panel header. |
| `--border` | `#E5E5E0` | `#E5E5E0` | ✅ Match | Bordes de todo (cards, inputs, dividers). |

**Veredicto §7 vs diseño:** los 5 tokens originales se mantienen idénticos. **El diseño no contradice el brief; lo extiende con 4 variantes intermedias necesarias para hover/disabled/soft-bg.**

### 5.2 Color — paleta semántica de estado (NUEVA, no estaba en §7)

Hardcodeada hex en pantallas 7, 8, 10 — debe tokenizarse.

| Semántica | text | bg | border | dot |
|---|---|---|---|---|
| **info** (Vista por agencia) | `#1F4FA8` | `#E8EEFB` | `#D2DCF2` | `#3B6FD3` |
| **success** (Pre-seleccionado / Activo / Δ↑) | `#1F6B3A` | `#E2F1E8` | `#C8E5D2` | `#2E8B4F` |
| **danger** (Cerrada / Δ↓) | `#8A3A3A` | `#F4E2E0` | `#EAD0CC` | `#B85651` |
| **neutral** (En revisión / Borrador / Descartado) | `var(--ink-muted)` | `var(--beige-soft)` | `var(--border)` | `#9A9A92` |

**Cierra hoy** y **Nuevo** reusan la paleta coral existente.

### 5.3 Tipografía

| Variable | Familia | Pesos | Uso |
|---|---|---|---|
| `--font-sans` (cuerpo) | **Inter** | 400, 500, 600 | Base 14px, body, UI controls. Features `ss01` + `cv11` activadas en `body`. |
| `--font-display` | **Inter Tight** | 400, 500, 600, 700 | Headlines (h1/h2/h3), valores prominentes en cards. |
| `--font-mono` | **JetBrains Mono** | 400, 500 | **Solo en `Mis Castings.html`** para contadores de aplicantes en filas de tabla. Decidir si se generaliza para "tabular numerals" o se descarta y se usa `font-variant-numeric: tabular-nums`. |

**Display sizes (clamp ranges encontrados):**
- h1 hero/landing: `clamp(36px, 5.4vw, 64px)`, `font-weight: 500`, `letter-spacing: -0.035em`, `line-height: 1.02`
- h1 detalle: `clamp(32px, 4vw, 48px)`, `letter-spacing: -0.03em`, `line-height: 1.05`
- h1 onboarding paso 1: `clamp(36px, 5vw, 56px)`
- h1 onboarding paso 2 / aplicaciones: `clamp(32px, 4vw, 44px)`
- h1 dashboard / publicar: `clamp(28–30px, 3.4–3.6vw, 38–40px)`
- h2 sección: `22–26px`, weight 500, tracking `-0.02 a -0.025em`
- h3 cards: `17–18px`, weight 500, tracking `-0.015 a -0.02em`
- Body: `14px` base, `15.5px` para descripciones largas
- Eyebrow / kicker: `11–11.5px` ALL CAPS, tracking `0.06–0.08em`, weight 500

**Convenciones a respetar al portar:**
- Coral period como acento de remate (`...del resto<span color=coral>.</span>`).
- `text-wrap: balance` en h1 importantes y `text-wrap: pretty` en párrafos.
- `font-variant-numeric: tabular-nums` en cualquier contador (counts en tabs, stats, deadlines).

### 5.4 Spacing / Container

- Container principal: `max-width: 1280px`, padding-x `32px` desktop, `20px` mobile.
- Container Mis Aplicaciones: `1100px` (más estrecho a propósito — list view).
- Container Completar Perfil: `1120px`.
- Sidebar agencia: `240px` ancho fijo.
- Right-rail (Aplicantes / Completar Perfil): `280–380px`.
- Modal AuthModal: `420px` max.
- Form max-width: `600px` (publicar), `520px` (completar perfil).

**Section vertical padding:** 36–40px arriba/abajo entre secciones grandes; 14–24px en headers internos.
**Card gap:** 12 / 14 / 16 / 20px (densidad creciente: dashboard tabla 12, grid principal 20).

### 5.5 Border radius

| Tamaño | Uso |
|---|---|
| `4px` | Chips muy pequeños (badge "Verificada", source filename), corner del logo PDF label. |
| `6–8px` | Botones de icono pequeños, avatar dropdown, internal radii. |
| `8–10px` | Botones default, inputs, dropdowns. |
| `10–12px` | Cards default, filter chips inputs grandes, info-grid cells. |
| `12–14px` | Cards más grandes (StatCard, drop zones, sticky CTAs). |
| `14–16px` | Cards hero del perfil, modal AuthModal, drop zone principal onboarding. |
| `18px` | Decorativo (placeholders soft shapes). |
| `20px` | DropZone mayor (onboarding hero). |
| `999px` (pill) | Status badges, filter pills, chips, sticky `ApplyBar`. |

### 5.6 Shadows

Mínimas, alineadas al brief de "sombras suaves o ausentes":
- Dropdowns / popovers: `0 8px 24px rgba(10,10,10,0.06)`
- Modal: `0 24px 60px rgba(10,10,10,0.18)`
- Sticky `ApplyBar`: `0 12px 40px rgba(10,10,10,0.18)`
- CTA primario destacado (Publicar Casting): `0 4px 14px rgba(232,90,79,0.25–0.28)` (coral glow)
- Cards: **sin sombra**, solo `border 1px`. Hover sube con `transform: translateY(-1 a -2px)` y `border-color: var(--ink)`.

### 5.7 Breakpoints

| px | Qué cambia |
|---|---|
| `1200` | Aplicantes: summary right-rail desaparece, grid 3→2 col. |
| `1100` | Mis Castings: stats 4→2 col, tabla esconde columnas Cierre/Publicado. |
| `960` | Detail header: 2-col → 1-col. |
| `900` | Grid principal 3→2 col, sidebar agencia oculto, profile-hero stack, datos físicos 3→1 col, filter sub-rows colapsan. |
| `700` | Mis Aplicaciones simplifica metadata, agency shell stack completo. |
| `600` | Grid 2→1 col, city selector oculto en nav móvil. |

Recomendación: **mapear a Tailwind defaults (`sm:640 md:768 lg:1024 xl:1280 2xl:1536`) ajustando umbrales más cercanos**. Usar custom screens en `tailwind.config.ts` para los críticos (`960`, `1100`, `1200`).

---

## 6. Inventario de componentes

> Importante: cada HTML define inline su propio `Logo`, `TopNav`, `UserMenu`/`AgencyMenu`, etc. Solo `TalentHub.html` y `TalentHub Detail.html` consumen los exports de `components.jsx`. **El resto duplica.** Al portar a Next consolidamos a un componente único por concepto.

### 6.1 Layout / shared

| Componente | Origen | Variantes detectadas | Migración |
|---|---|---|---|
| `Logo` | `components.jsx` + duplicado en 8 HTMLs | default (talento), centered (onboarding paso 1), agency (con pill "Agencias") | **Adaptar** → `<Logo variant="default" \| "centered" \| "agency" />` |
| `TopNav` | `components.jsx` + reescrito en cada HTML | público, talento logueado, agencia | **Reescribe** → 3 componentes en `components/shared/` |
| `UserMenu` | inline en perfil, aplicaciones | dropdown talento (avatar MR + 4 items + logout) | **Adapta** → shadcn `DropdownMenu` |
| `AgencyMenu` | inline en publicar, mis castings, aplicantes | dropdown agencia (avatar SB + 4 items) | **Adapta** → shadcn `DropdownMenu` |
| `Sidebar` | inline en 3 HTMLs agencia | nav 4 items + footer card "Este mes" | **Adapta** — un solo `<AgencySidebar>` con `usePathname` para `active` |
| `Footer` | `components.jsx` + minimal en algunas | full (homepage, detail) + 1-line (perfil, mis aplicaciones) | **Adapta** → `<Footer variant="full" \| "minimal" />` |
| `Breadcrumb` | `detail-components.jsx` + inline | items=[label, href] | **Porta** |
| `StepProgress` | inline en onboarding 1 y 2 | `step / total` con barras animadas | **Porta** |

### 6.2 Casting / talent dominio

| Componente | Origen | Decisión |
|---|---|---|
| `CastingCard` (vertical, grid) | `components.jsx` | **Porta** — usado en feed + similares + grid de datalle |
| `RecommendedCard` (horizontal) | `components.jsx` | **Porta** — solo en feed |
| `RecommendedRow` (scroll-snap) | `components.jsx` | **Porta** |
| `CastingGrid` | `components.jsx` | **Porta** |
| `Hero` | `components.jsx` | **Porta** — exclusivo de feed |
| `FilterBar` | `components.jsx` | **Porta** — grupo tabs + pills selectables |
| `TypeTag` (con dot color) | `components.jsx` | **Porta** |
| `Tag` (variants default/coral/beige) | `Mi Perfil.html` inline | **Porta** y unifica con `TypeTag` |
| `Placeholder` / `Photo` | `components.jsx` + 4 reescrituras inline | warm gradient + stripe + corner geometry, deterministic por seed | **Porta** — clave para fidelidad. Consolidar en `components/shared/photo-placeholder.tsx` |
| `DetailHeader`, `MetaCell`, `DetailSection`, `Description`, `Requirements`, `ReqIcon`, `AdditionalInfo`, `ApplyBar`, `InlineApplyCTA`, `Similares`, `VerifiedBadge` | `detail-components.jsx` | **Porta** todos |

### 6.3 Talent UI (Mi Perfil + Aplicaciones)

| Componente | Origen | Decisión |
|---|---|---|
| `ProfileHero`, `ProfileStats`, `Stat` | `Mi Perfil.html` | **Porta** |
| `Gallery` | `Mi Perfil.html` | **Porta** — grid 4-col, mixed aspect ratios |
| `PhysicalData` (table 3×3) | `Mi Perfil.html` | **Porta** |
| `Languages` (level pills) | `Mi Perfil.html` | **Porta** |
| `Experience` (timeline) | `Mi Perfil.html` | **Porta** |
| `AppCard` | `Mis Aplicaciones.html` | **Porta** — list-row clickeable a detalle |
| `StatusBadge` (talent — 4 estados) | `Mis Aplicaciones.html` | **Porta** + tokenizar paleta semántica (§5.2) |
| `EmptyState` | `Mis Aplicaciones.html` | **Porta** y generaliza a `<EmptyState icon title body cta />` reutilizable |

### 6.4 Agency UI

| Componente | Origen | Decisión |
|---|---|---|
| `StatCard` (4-up dashboard) | `Mis Castings.html` | **Porta** — con `delta`, `deltaTone`, `accent` props |
| `StatusPill` (casting — 4 estados) | `Mis Castings.html` | **Porta** + reutiliza paleta semántica |
| `RowActionsMenu` (⋯) | `Mis Castings.html` | **Adapta** → shadcn `DropdownMenu` |
| `CastingRow` (table) | `Mis Castings.html` | **Porta** — grid columns con responsive collapse |
| `Tabs` underline | `Mis Castings.html` | **Adapta** → shadcn `Tabs` reskineado |
| `Tabs` pill | `Mis Aplicaciones.html` | **Adapta** — variante distinta del anterior; mismo shadcn `Tabs` con classNames |
| `ApplicantCard` | `Aplicantes.html` | **Porta** |
| `StatusBadge` (applicant variant — overlay sobre foto) | `Aplicantes.html` | **Porta** — distinto al de talent (fondo blanco translúcido) |
| `SummarySidebar` (right-rail) | `Aplicantes.html` | **Porta** — 3 cards: Resumen + "Cierra hoy" + "IA sugiere" |
| `FilterPill` (dropdown) | `Aplicantes.html` | **Adapta** → shadcn `Popover` + custom trigger |
| `PhotoUpload` | `Publicar Casting.html` | **Porta** — drop zone + file card |
| `OptionalDetails` (collapsible) | `Publicar Casting.html` | **Adapta** → shadcn `Collapsible` |
| `Field`, `TextInput`, `Textarea` | `Publicar Casting.html` + variante en `Completar Perfil.html` | **Reescribe** sobre shadcn `Form` + RHF + zod (Fase 2 lo exige) |

### 6.5 Onboarding (paso 1 + 2)

| Componente | Origen | Decisión |
|---|---|---|
| `DropZone` | `Onboarding.html` | **Porta verbatim** — la UX mágica del producto |
| `FileCard` (post-upload AI cycling) | `Onboarding.html` | **Porta** — mantén las 4 etapas y la animación orbit |
| `AltInput` (Instagram URL expandable) | `Onboarding.html` | **Porta** |
| `AISparkle`, `Sparkle`, `PdfIcon` | `Onboarding.html` + `Completar Perfil.html` | **Porta inline** — son brand-icons |
| `ExtractedPreview` (sticky right-rail) | `Completar Perfil.html` | **Porta** — el "proof" de la IA |
| `CityDropdown` (single-select) | `Completar Perfil.html` | **Adapta** → shadcn `Select` |
| `ChipGroup` (multi-select) | `Completar Perfil.html` | **Adapta** → shadcn `ToggleGroup` (multi) |
| `PhoneInput` (+57 prefix) | `Completar Perfil.html` | **Porta** — el prefijo y bandera CO son específicos |

### 6.6 Auth

| Componente | Origen | Decisión |
|---|---|---|
| `AuthModal` (login + registro unified) | `auth-modal.jsx` | **Adapta** → shadcn `Dialog` reskineado, manteniendo: backdrop blur, segmented profile toggle (talento/agencia), botón Google primario dark, divider "O", email field + valid CTA, link a "Ya tienes cuenta", microcopy términos/privacidad. ESC + click-outside ya los maneja shadcn. |
| `GoogleIcon` | `auth-modal.jsx` | **Porta inline** (oficial 4-color) |

### 6.7 Tooling

| Archivo | Decisión |
|---|---|
| `tweaks-panel.jsx` | **DESCARTAR.** Es un helper de design-time de Claude Design (panel "Tweaks" para cambiar accent color en vivo). No tiene equivalente en producción. |
| `data.jsx` (`window.CASTINGS`) | **ADAPTA.** Mover a `src/mocks/castings.ts` tipado, exponer vía `src/lib/data/castings.ts` con `getCastings(): Promise<Casting[]>`. |

---

## 7. Decisión sobre el set de iconos

**Propuesta:** mezcla pragmática, no all-or-nothing.

| Icono diseño | Equivalente lucide-react | Decisión |
|---|---|---|
| `Icon.Pin` | `MapPin` | lucide |
| `Icon.Search` | `Search` | lucide |
| `Icon.Calendar` | `Calendar` | lucide |
| `Icon.Clock` | `Clock` | lucide |
| `Icon.Bookmark` (filled toggle) | `Bookmark` / `BookmarkCheck` | lucide |
| `Icon.Arrow` (flecha → con barra) | `ArrowRight` / `MoveRight` | lucide |
| `Icon.Close` | `X` | lucide |
| `Icon.Chevron` | `ChevronDown` / `ChevronUp` | lucide |
| `Icon.Sparkle` (4-rays + diamond) | (variante propia, no idéntica a `Sparkles`) | **inline custom** |
| `AISparkle` (animada con `th-pulse-soft`) | (animation custom) | **inline custom** |
| `PdfIcon` (page con corner fold + label PDF) | (no equivalente) | **inline custom** |
| `GoogleIcon` (4-color brand) | (no — lucide es monocromo) | **inline custom (brand)** |
| `ReqIcon.{age, gender, height, features, language, exp}` | parcialmente cubiertos por `User`, `Languages`, `Star`, `Briefcase`... pero **no matchean visualmente** | **inline custom** — preservar fidelidad con los del diseño |

→ Regla: lucide-react para iconos genéricos de UI; inline SVG para iconos que tienen identidad de marca o animación específica.

---

## 8. Dependencias asumidas / a instalar en Fase 1

**Lo que el código del diseño literalmente carga (vía CDN, descartar):**
- `react@18.3.1`, `react-dom@18.3.1`, `@babel/standalone@7.29.0` — solo prototipo

**Lo que necesitamos en Next para reproducir el diseño + cumplir Fase 2:**

Decididas en CLAUDE.md §4:
- `next` (App Router), `typescript`, `tailwindcss`, `eslint`, `prettier`, `prettier-plugin-tailwindcss`
- `shadcn/ui` (vía CLI, instala dependencias Radix)
- `lucide-react`
- Inter + Inter Tight vía `next/font/google`

A confirmar / añadir por el diseño:
- **JetBrains Mono** vía `next/font/google` — solo si confirmamos que queremos preservar contadores monoespaciados en la tabla de agencia (alternativa: `font-variant-numeric: tabular-nums` con Inter, ahorra una fuente).
- **`react-hook-form` + `zod` + `@hookform/resolvers`** (Fase 2 los exige; el diseño los necesita para validar email del modal, descripción mín 20 chars, etc.).

Componentes de shadcn a instalar en Fase 1 (de §4 CLAUDE.md, todos confirmados como necesarios): Button, Input, Label, Card, Badge, Avatar, Dialog (AuthModal), DropdownMenu (UserMenu/AgencyMenu/RowActions), Form, Select (CityDropdown, FilterPill base), Textarea, Toast.
**Adicionales detectados aquí:** ToggleGroup (chips multi-select), Tabs, Collapsible (OptionalDetails), Popover (FilterPill custom), Tooltip (VerifiedBadge `title=`), Separator, ScrollArea (RecommendedRow horizontal scroll si shadcn maneja mejor el scroll-snap).

Dependencias del diseño que NO portamos:
- ❌ Animation libs (CSS keyframes basta)
- ❌ State libs (useState/useMemo plain — RSC + URL state donde aplique)
- ❌ Theme libs (CSS vars + Tailwind nativo)

---

## 9. Decisiones tomadas (cierre de Fase 0 con David — 2026-05-01)

### 9.1 Login + Registro — **rutas + modal compartido**

`AuthModal` es **el** componente. `/login` y `/register/talent` lo renderizan en **modo página** (no como overlay sobre otra ruta).

**Implementación:**
- `components/auth/auth-modal.tsx` expone el componente con un prop de presentación `mode: "modal" | "page"`.
- En `mode="modal"` se monta dentro de un `Dialog` de shadcn (backdrop blur + lock scroll).
- En `mode="page"` se renderiza directamente como contenido de `src/app/(auth)/login/page.tsx` y `src/app/(auth)/register/talent/page.tsx`, centrado en viewport, mismo visual sin backdrop.
- El `redirect` post-auth se preserva vía query (`?next=/castings/c1`) en ambas rutas.

### 9.2 Onboarding — **dos rutas con draft state entre pasos**

- `/onboarding` — paso 1 (drop PDF / Instagram URL).
- `/onboarding/completar` — paso 2 (completar 4 campos sobre lo extraído por IA).

**Draft state:**
- **Fase 2:** `localStorage` con clave `talenthub:onboarding-draft` — almacena `{ source: "pdf"|"url", filename?, url?, extractedFields? }`. Sirve para recuperar progreso si el usuario refresca o sale entre pasos. Limpiar al completar onboarding o al cabo de 7 días (TTL).
- **Fase 3:** mover el draft a la DB (tabla `onboarding_drafts` con `user_id`, `payload jsonb`, `updated_at`). Migración: en login, si existe `localStorage` draft y no hay draft en DB, hidratar la DB y limpiar `localStorage`.

> Decisión registrar también en `docs/decisions.md` cuando se cree (Fase 1).

### 9.3 Iconos — **mezcla pragmática lucide + custom**

Ver tabla en §7.

**Custom icons** viven en **`src/components/icons/`** con **API compatible con lucide-react** para que sean drop-in replacements:

```tsx
// src/components/icons/sparkle.tsx
import { type LucideProps } from "lucide-react";
export function Sparkle({ size = 16, strokeWidth = 1.5, ...props }: LucideProps) { /* ... */ }
```

Convención:
- Cada icono custom es `default export` desde su propio archivo `kebab-case.tsx`.
- Re-export consolidado en `src/components/icons/index.ts` (`export { Sparkle } from "./sparkle"; ...`).
- Acepta los mismos props que lucide (`size`, `strokeWidth`, `color`, `className`, `...rest`).
- Preserva las animaciones inline donde aplica (`AISparkle` con `animation: th-pulse-soft`).

Lista de custom a portar: `Sparkle`, `AISparkle`, `PdfIcon`, `GoogleIcon`, `ReqAge`, `ReqGender`, `ReqHeight`, `ReqFeatures`, `ReqLanguage`, `ReqExp`.

### 9.4 JetBrains Mono — **descartar**

**Uso confirmado:** **una sola ocurrencia**, `TalentHub Mis Castings.html:434`, en el badge "Aplicantes" de cada fila de la tabla del dashboard agencia. Contenido 100% numérico (`{c.applicants}`). El span ya tenía `font-variant-numeric: tabular-nums` aplicado.

**Decisión:** se descarta la fuente. En su lugar, en el componente `<CastingRow>`, el badge usará Inter con:

```css
font-feature-settings: "tnum"; /* o utility tabular-nums */
font-weight: 600;
letter-spacing: -0.02em;
```

Resultado: misma sensación de "dato técnico" alineado, sin payload de fuente extra (~30KB ahorrados). Nota agregada en `design-system.md` §3.1.

### 9.5 Estados sintéticos derivados del patrón `EmptyState` — **generar 4 variantes**

Fase 2 exige loading / empty / error / success por pantalla. El diseño solo entregó 2 empty states. Generamos los faltantes derivando del componente `<EmptyState>` ya diseñado (`Mis Aplicaciones`, dashed border + icon-chip beige + h3 + body + CTA).

**Cuatro variantes con la misma estructura visual** (`components/shared/state-card.tsx`):

| Variante | Borde | Icon-chip color | Icono | Animación |
|---|---|---|---|---|
| `empty` (default, ya diseñado) | `1px dashed var(--border)` | `bg-beige-soft text-coral` | contextual (lucide o custom) | — |
| `error` | `1px solid var(--danger-border)` | `bg-danger-bg text-danger` | `AlertTriangle` (lucide) | — |
| `loading` (skeleton) | `1px solid var(--border)` | `bg-beige-soft` (sin ícono) | placeholder bars | `th-shimmer` (re-uso del keyframe ya en el sistema) |
| `success` (post-acción puntual) | `1px solid var(--success-border)` | `bg-success-bg text-success` | `CheckCircle` (lucide) | `th-fade-up` |

**Skeleton loaders adicionales (componentes específicos por contexto):**
- `<CastingCardSkeleton>` — silueta de card con bars `bg-beige-soft` animados con `th-shimmer`.
- `<ApplicationRowSkeleton>` — silueta de la fila de Mis Aplicaciones.
- `<CastingRowSkeleton>` — silueta de la fila de tabla agencia.
- `<ProfileHeroSkeleton>` — para `/profile`.

Especificación de skeleton:
- Background del bar: `linear-gradient(90deg, var(--beige-soft) 0%, var(--bg) 50%, var(--beige-soft) 100%)` con `background-size: 200% 100%` y `animation: th-shimmer 1.6s linear infinite`.
- Radius del bar: `4–6px` para texto, `8–12px` para imágenes.
- Sin labels, sin textos, sin "Loading..." — solo formas.

Los 4 estados se consolidan como variantes del **mismo componente base**, no 4 componentes distintos. Esto mantiene coherencia visual y reduce reescritura cuando se ajuste el diseño.

---

## 10. Plan de migración por archivo

| Archivo del diseño | Acción | Destino Next |
|---|---|---|
| `TalentHub.html` | Adapta | `src/app/(public)/page.tsx` + `components/casting/feed-*` |
| `TalentHub Detail.html` | Adapta | `src/app/(public)/castings/[id]/page.tsx` + `components/casting/detail-*` |
| `auth-modal.jsx` + `Registro.html` | Adapta a shadcn Dialog | `components/auth/auth-modal.tsx` |
| `Onboarding.html` | Porta verbatim | `src/app/(auth)/onboarding/page.tsx` + `components/talent/portfolio-uploader.tsx` |
| `Completar Perfil.html` | Porta + RHF | `src/app/(auth)/onboarding/completar/page.tsx` + `components/talent/profile-completion-form.tsx` |
| `Mi Perfil.html` | Porta | `src/app/(talent)/profile/page.tsx` + `components/talent/profile-*` |
| `Mis Aplicaciones.html` | Porta | `src/app/(talent)/applications/page.tsx` + `components/talent/application-card.tsx` |
| `Mis Castings.html` | Porta | `src/app/(agency)/dashboard/page.tsx` + `components/agency/casting-row.tsx` |
| `Publicar Casting.html` | Porta + RHF | `src/app/(agency)/castings/new/page.tsx` + `components/agency/casting-form.tsx` |
| `Aplicantes.html` | Porta | `src/app/(agency)/castings/[id]/applicants/page.tsx` + `components/agency/applicant-*` |
| `components.jsx` | Reescribe modular | `components/shared/*`, `components/casting/*` |
| `detail-components.jsx` | Reescribe modular | `components/casting/detail-*` |
| `data.jsx` | Adapta | `src/mocks/castings.ts` + `src/lib/data/castings.ts` |
| `tweaks-panel.jsx` | Descarta | — |

---

## 11. Criterios de "hecho" de Fase 0 (de CLAUDE.md §8)

- [x] `docs/design-audit.md` creado.
- [x] Revisado por David — 2026-05-01.
- [x] `docs/design-system.md` creado con tokens definitivos.
- [x] Lista de dependencias para Fase 1 acordada (§8 + cierre de §9.4).
- [x] Decisión tomada sobre cada componente (§6 — porta/adapta/reescribe/descarta).
- [x] 5 decisiones de producto resueltas (§9.1 a §9.5).

**Estado:** Fase 0 lista para cerrar. Próximo paso: actualizar `CLAUDE.md` §2 (Fase 0 ✅) y arrancar Fase 1.
