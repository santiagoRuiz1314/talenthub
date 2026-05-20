# TalentHub

## 🎯 Qué es

**TalentHub** es un marketplace web que conecta agencias de casting con talento creativo (modelos, actores, creadores de contenido) en Colombia.

**Propuesta de valor:** fricción mínima en ambos lados gracias a IA que procesa portafolios PDF automáticamente y aplicación de un solo click.

**Alcance V1:** solo Colombia, en español, web responsive.

---

## 👥 Usuarios y flujos

**Talento** (modelos, actores, creadores)
Sube su portafolio en PDF → la IA extrae y completa el perfil automáticamente → explora castings disponibles → aplica con un solo click.

**Agencia** (productoras, agencias, marcas)
Publica un casting en menos de un minuto → recibe aplicantes en su dashboard → filtra y pre-selecciona candidatos.

**Visitante público**
Explora el feed de castings disponibles sin necesidad de crear cuenta.

Brief completo de producto, mercado y modelo de negocio: `talenthub-contexto-proyecto.md`.

---

## 🛠 Stack técnico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| React | React 19 |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 (config CSS-first en `globals.css`, sin `tailwind.config.ts`) |
| Componentes UI | shadcn 4.6 — style `base-nova` (basado en `@base-ui/react`, no Radix) |
| Formularios | `react-hook-form` + `zod` + `standardSchemaResolver` |
| Iconos | lucide-react + iconos custom en `src/components/icons/` |
| Fuentes | Inter + Inter Tight vía `next/font` |
| Toasts | `sonner` |
| Linting | ESLint + Prettier |
| Package manager | pnpm |
| Hosting | Vercel |

**Pendiente de decidir:** backend/DB, auth, storage de PDFs, LLM para extracción, embeddings, pagos, analytics.

---

## 🎨 Diseño

El sistema visual fue generado con **Claude Design** y es la fuente de verdad estética del proyecto. El bundle original vive en `design-source/` (gitignored, contexto local).

Documentación viva del sistema:
- `docs/design-audit.md` — inventario de pantallas y componentes del diseño original.
- `docs/design-system.md` — tokens canónicos (colores, tipografía, spacing, radii).

**Paleta base:**
- Fondo: off-white cálido `#FAFAF7`
- Texto: casi-negro `#0A0A0A`
- Acento: coral cálido `#E85A4F`
- Secundario: beige suave `#E8E4DC`
- Bordes: gris sutil `#E5E5E0`

**Tipografía:** Inter Tight para display/headings, Inter para body.

**Principios visuales:** mucho espacio en blanco, fotos del talento como protagonistas (la UI no las tapa), bordes sutiles (radius 8–12px), sombras suaves o ausentes, jerarquía clara, sensibilidad editorial (referencias: Linear, Arc, Are.na, Cosmos.so, Airbnb).

> **Nota:** el dark mode no es comportamiento de producto en V1; los tokens dark actuales son placeholders.

---

## 📐 Características clave

- **Capa de datos abstracta** en `src/lib/data/*`: todas las funciones son `async` y retornan `Promise<T>`, incluso con mocks. Las pantallas y componentes nunca importan directo desde `src/mocks/*`. Esto permite cambiar el backend sin tocar pantallas.
- **Auth como modal compartido** + rutas `/login` y `/register/talent` que renderizan el mismo `AuthModal` en modo página. Preserva fricción mínima desde "Aplicar" y permite deep-link.
- **Onboarding en 2 rutas** (`/onboarding`, `/onboarding/completar`) con draft state intermedio. El paso 2 ocurre tras la llamada a IA; URL distinta hace explícito el progreso.
- **Server components por defecto.** Solo `"use client"` cuando hay estado, efectos, APIs de navegador, event handlers o librerías client-only. Async data fetching directo con `await`, sin `useEffect` cuando se puede evitar.
- **Accesibilidad WCAG AA** desde el inicio: labels en todos los inputs, alt significativo en imágenes, foco visible. No romper la accesibilidad que ya traen las primitivas de shadcn/base-ui.
- **Responsive** desde 320px hasta desktop.
- **Estados completos** en cada pantalla: loading, empty, error, success — derivados de un `<StateCard>` con variantes.

---

## 🗂 Estructura de carpetas

```
talenthub/
├── CLAUDE.md                          # Este archivo — contexto del proyecto
├── talenthub-contexto-proyecto.md     # Brief de producto
├── docs/
│   ├── design-audit.md                # Inventario del diseño original
│   ├── design-system.md               # Tokens canónicos
│   ├── data-model.md                  # Schema de DB
│   └── decisions.md                   # Log de ADRs
├── design-source/                     # Bundle de Claude Design (gitignored)
├── src/
│   ├── app/                           # App Router (grupos: (public), (auth), (talent), (agency))
│   ├── components/
│   │   ├── ui/                        # shadcn — no editar manualmente
│   │   ├── shared/                    # Header, Footer, StateCard…
│   │   ├── casting/                   # CastingCard, CastingFilters…
│   │   ├── talent/                    # TalentCard, ProfileForm…
│   │   ├── agency/                    # AgencyDashboard, ApplicantList…
│   │   └── icons/                     # Iconos custom de marca
│   ├── lib/
│   │   ├── data/                      # Capa de datos abstracta
│   │   ├── types/                     # Tipos compartidos
│   │   ├── schemas/                   # Schemas zod
│   │   ├── ai/                        # Funciones de IA (con prompts versionados en ai/prompts/)
│   │   ├── auth/                      # Helpers de auth
│   │   ├── utils/                     # cn(), formatters
│   │   └── constants.ts               # Ciudades CO, tipos de casting…
│   └── mocks/                         # Mock data
└── components.json                    # Config shadcn
```

---

## 🔗 Archivos de referencia

| Archivo | Para qué |
|---|---|
| `CLAUDE.md` | Contexto del proyecto (este archivo) |
| `talenthub-contexto-proyecto.md` | Brief de producto: usuarios, mercado, modelo de negocio |
| `docs/design-audit.md` | Inventario visual del diseño original |
| `docs/design-system.md` | Tokens canónicos |
| `docs/decisions.md` | Decisiones técnicas registradas (ADRs) |

---

## 🌎 Contexto regional

Colombia es el mercado objetivo de V1. Esto implica:

- Habeas data: consentimiento explícito al registro, política de privacidad, opción de borrado de cuenta.
- Verificación manual de agencias en V1 (automatización post-V1).
- Constantes locales: ciudades colombianas, formatos de teléfono, moneda COP.
- Idioma único: español. La estructura queda preparada para i18n LATAM, pero no se activa en V1.

---

**Mantenido por:** David