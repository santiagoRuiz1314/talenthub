# TalentHub — Documento maestro para Claude Code

> **Para Claude Code:** Lee este archivo al inicio de cada sesión. Antes de proponer cambios, identifica la **fase actual** (sección "📍 Estado actual") y respeta los criterios de "hecho" de esa fase. No avances de fase sin confirmación explícita del autor (David).

---

## 1. 🎯 Visión del proyecto

**TalentHub** es un marketplace web que conecta agencias de casting con talento creativo (modelos, actores, creadores de contenido) en Colombia. Propuesta de valor: **fricción mínima** en ambos lados, gracias a IA que procesa portafolios PDF automáticamente y aplicación de un solo click.

Ver `talenthub-contexto-proyecto.md` (en la raíz del repo o en `/docs/`) para el brief completo de producto, usuarios, flujos y mercado.

**Resumen mínimo de producto:**
- Lado talento: sube PDF → IA completa el perfil → explora castings → aplica con 1 click.
- Lado agencia: publica casting en <1 min → recibe aplicantes en dashboard → filtra y pre-selecciona.
- Visitante público: explora castings sin login.
- V1: solo Colombia, español, web responsive.

---

## 2. 📍 Estado actual

```
Fase actual: 2 — Maquetación estática (10 pantallas)

Sub-bloques en rama fase-2/fundamentos:
  [x] Bloque A — tipos TypeScript                (commit d9ffcf5)
  [x] Bloque B — capa de datos abstracta         (commit b41ccd3)
  [x] Bloque C — mock data realista              (commit 5fdc5c4)
  [~] Bloque D — pre-pantallas (constants, CastingWithAgency,
                 helpers hidratados, spread defensivo en getters)

Próximo paso: Pantalla 1 — feed público (/) tras cerrar Bloque D.
Bloqueadores: Ninguno
```

> **Importante:** Esta sección debe actualizarse al finalizar cada fase. Cuando Claude Code complete una fase, propone actualizar este bloque y espera confirmación.

**Historial de fases:**
- [x] Fase 0 — Diagnóstico del diseño (cerrada 2026-05-01)
- [x] Fase 1 — Fundamentos del proyecto (cerrada 2026-05-02)
- [ ] Fase 2 — Maquetación estática (10 pantallas)
- [ ] Fase 3 — Backend, datos, auth
- [ ] Fase 4 — Capa de IA
- [ ] Fase 5 — Pulido y despliegue

---

## 3. 🤝 Cómo trabajar con Claude Code en este proyecto

### 📂 Archivos de contexto

Hay cuatro tipos de archivo que cualquier agente debe conocer. **Lee en este orden** al iniciar una sesión:

1. **`CLAUDE.md`** (este archivo) — visión del proyecto, fase actual, decisiones tomadas, convenciones, riesgos. Fuente de verdad para el "qué" y el "por qué".
2. **`AGENTS.md`** — reglas operacionales urgentes del stack actual (breaking changes que pueden no estar en tu training data: Next 16 async APIs, Turbopack default, `next lint` removido, etc.). **Léelo antes de escribir código.**
3. **`talenthub-contexto-proyecto.md`** — brief de producto: usuarios, flujos, mercado, modelo de negocio. (En la raíz o en `/docs/`.)
4. **`docs/design-audit.md`** y **`docs/design-system.md`** — referencia visual: inventario de pantallas, tokens canónicos, patrones. Indispensable desde Fase 2.

Si añades un archivo de contexto nuevo (ej. `docs/data-model.md` en Fase 3, `docs/decisions.md` para ADRs), regístralo aquí.

---

**Reglas de oro:**

1. **Una fase a la vez.** No mezcles trabajo de fases diferentes en un mismo PR/commit. Si encuentras algo que pertenece a una fase futura, anótalo en "❓ Decisiones pendientes" y sigue.
2. **El diseño es la fuente de verdad visual.** Una vez completada Fase 0, los archivos de Claude Design dictan look & feel. No improvises estilos.
3. **Next.js es la fuente de verdad arquitectónica.** App Router, server components, convenciones de Next se respetan aunque el diseño original use otra cosa.
4. **Capa de datos abstracta desde Fase 2.** Todo acceso a datos pasa por `src/lib/data/*`. En Fase 2 son mocks; en Fase 3 se reemplazan sin tocar las pantallas.
5. **Antes de instalar una librería nueva**, verifica si `shadcn/ui`, Tailwind o algo ya en el stack lo resuelve. Mantén dependencias bajas.
6. **Commits atómicos** con mensaje claro. Formato: `feat(fase-X): descripción` / `fix(fase-X): descripción` / `docs: descripción`.
7. **Si una decisión cambia el rumbo del proyecto** (ej: cambiar de Supabase a Convex), regístrala en "🧠 Decisiones tomadas" con fecha y razón.

**Workflow esperado al iniciar una sesión:**

```
1. Leer CLAUDE.md → identificar fase actual y próximo paso.
2. Leer AGENTS.md → reglas operacionales del stack (no skip — versiones recientes pueden no estar en tu training).
3. Leer talenthub-contexto-proyecto.md si necesitas contexto de producto.
4. Si es Fase 0, leer también el output de Claude Design.
5. Si es Fase ≥1, leer docs/design-audit.md y docs/design-system.md.
6. Confirmar con David qué tarea específica de la fase trabajar hoy.
7. Trabajar. Commitear. Actualizar checklist al cierre.
```

---

## 4. 🛠 Stack técnico

### Decidido (no cambiar sin discusión)

| Capa | Tecnología | Razón |
|---|---|---|
| Framework | **Next.js 16 (App Router)** | Requisito del autor. SSR/RSC, ecosistema maduro. **Ver `AGENTS.md` para reglas operacionales críticas del stack actual.** |
| Lenguaje | TypeScript (strict) | Seguridad de tipos en marketplace con muchos modelos de datos. |
| Estilos | **Tailwind CSS v4** | Config CSS-first (`@theme inline` en `globals.css`). Match con la inspiración Linear/Arc/Are.na. |
| Componentes UI | shadcn/ui (style `base-nova`) | Basado en `@base-ui/react` (no Radix). Accesible, ownership del código, fácil de tematizar. |
| Iconos | lucide-react | Default de shadcn, consistente. |
| Fuentes | Inter + Inter Tight (vía `next/font`) | Definidas en el brief de identidad visual. |
| Package manager | pnpm | Más rápido, mejor con monorepos si crecemos. |
| Linting | ESLint + Prettier | Estándar. |
| Hosting frontend | Vercel | Integración nativa con Next.js. |

### Pendiente (decidir en su fase)

| Capa | Opciones | Decisión en | Notas |
|---|---|---|---|
| Backend / DB | Supabase, Convex, Drizzle+Neon, Pocketbase | **Inicio de Fase 3** | David quiere comparar antes de comprometerse. |
| Auth | Clerk, Supabase Auth, NextAuth | Inicio de Fase 3 | Depende de elección de backend. |
| Almacenamiento PDFs | Supabase Storage, S3, R2, UploadThing | Inicio de Fase 3 | |
| LLM para PDF | Claude (Sonnet/Opus), GPT-4o | Inicio de Fase 4 | Probable Claude por preferencia del autor + buen handling de docs. |
| Embeddings | Voyage, OpenAI, Cohere | Inicio de Fase 4 | |
| Pagos | Wompi, PayU, Mercado Pago | Post-V1 | No prioritario. |
| Analytics | Plausible, Posthog, Vercel Analytics | Fase 5 | |
| Error tracking | Sentry | Fase 5 | |

### Particularidades del stack

> Las advertencias operacionales detalladas viven en `AGENTS.md`. Aquí solo lo arquitectónico.

- **Tailwind v4 sin `tailwind.config.ts`.** No existe ese archivo. Todos los tokens (colores, fuentes, breakpoints, radii, shadows, animations) viven en `src/app/globals.css` dentro de bloques `@theme inline { ... }` y `:root { ... }`. Si te dicen "ajusta el tailwind config", traduce a "edita `globals.css`".
- **shadcn `base-nova` ≠ shadcn legacy.** Las primitivas usan `@base-ui/react` (Vercel) en lugar de `@radix-ui/react-*`. APIs ligeramente distintas (ej. `ToggleGroup` no acepta `type="multiple"` — usa `value` array). Nombres de archivos en `src/components/ui/` son los mismos.
- **No existe componente `Form` en `base-nova`.** El primer formulario de Fase 2 establece el patrón con `react-hook-form` + `zod` + `Input`/`Label`/`Textarea` directos. Ver §6 "Patrón de formularios".
- **Toast → `sonner`.** El `toast` legacy de shadcn está deprecado. `sonner` se importa desde el package homónimo; `<Toaster />` se monta una vez en el árbol (ya está en `/sandbox`).

---

## 5. 🗂 Estructura del proyecto

> Esta es la estructura objetivo. Se construye en Fase 1 y se respeta en adelante.

```
talenthub/
├── CLAUDE.md                          # Este archivo
├── README.md                          # Brief, apunta a CLAUDE.md
├── talenthub-contexto-proyecto.md     # Brief de producto
├── docs/
│   ├── design-audit.md                # Output de Fase 0
│   ├── design-system.md               # Tokens, principios visuales
│   ├── data-model.md                  # Schema (Fase 3)
│   └── decisions.md                   # Log de ADRs
├── public/
│   ├── fonts/
│   └── images/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (public)/                  # Rutas sin auth
│   │   │   ├── page.tsx               # Feed de castings
│   │   │   ├── castings/[id]/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (auth)/                    # Login, registro, onboarding
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── onboarding/page.tsx
│   │   ├── (talent)/                  # Dashboard talento
│   │   │   ├── profile/page.tsx
│   │   │   └── applications/page.tsx
│   │   ├── (agency)/                  # Dashboard agencia
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── castings/new/page.tsx
│   │   │   └── castings/[id]/applicants/page.tsx
│   │   ├── api/                       # Route handlers (Fase 3+)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                        # shadcn/ui (no editar manualmente)
│   │   ├── shared/                    # Componentes compartidos (Header, Footer, EmptyState…)
│   │   ├── casting/                   # CastingCard, CastingFilters, CastingDetail…
│   │   ├── talent/                    # TalentCard, ProfileForm, PortfolioUploader…
│   │   └── agency/                    # AgencyDashboard, ApplicantList…
│   ├── lib/
│   │   ├── data/                      # Capa de datos abstracta
│   │   │   ├── castings.ts            # getCastings(), getCasting(id)…
│   │   │   ├── talents.ts
│   │   │   ├── agencies.ts
│   │   │   └── applications.ts
│   │   ├── types/                     # TypeScript types compartidos
│   │   │   ├── casting.ts
│   │   │   ├── talent.ts
│   │   │   ├── agency.ts
│   │   │   └── application.ts
│   │   ├── ai/                        # Funciones de IA (Fase 4)
│   │   │   ├── extract-portfolio.ts
│   │   │   └── match-castings.ts
│   │   ├── auth/                      # Helpers de auth (Fase 3)
│   │   ├── utils/                     # cn(), formatters, etc.
│   │   └── constants.ts               # Ciudades CO, tipos de casting, etc.
│   ├── mocks/                         # Mock data (Fase 2)
│   │   ├── castings.ts
│   │   ├── talents.ts
│   │   └── agencies.ts
│   └── styles/
├── components.json                    # Config shadcn
├── next.config.ts
├── tsconfig.json
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
└── package.json
```

---

## 6. 📐 Convenciones

### Naming
- **Archivos de componentes:** `kebab-case.tsx` (ej: `casting-card.tsx`).
- **Componentes React:** `PascalCase` (ej: `<CastingCard />`).
- **Hooks:** `use-camel-case.ts` (ej: `use-castings.ts`, exporta `useCastings()`).
- **Tipos / interfaces:** `PascalCase`, sin prefijo `I` (ej: `Casting`, `Application`).
- **Funciones de data layer:** verbo + sustantivo (ej: `getCastings`, `createApplication`).
- **Mocks:** prefijo `mock` (ej: `mockCastings`).

### Código
- **Server components por defecto.** Solo `"use client"` cuando hay estado, efectos, o eventos.
- **Async data fetching en server components** con `await` directo. No `useEffect` para data en V1 si se puede evitar.
- **Tailwind sin `@apply`** salvo en componentes muy reutilizados. Preferir clases inline.
- **Helpers de Tailwind:** `cn()` de `@/lib/utils` para combinar clases condicionalmente.
- **Imports absolutos** con alias `@/` (ej: `import { cn } from "@/lib/utils"`).
- **No `any`.** Si no sabes el tipo, usa `unknown` y haz narrowing.
- **Comentarios en español** cuando expliquen lógica de negocio. Inglés ok para detalles técnicos.

### Git
- **Ramas:** `main` (producción) + feature branches `fase-X/nombre-tarea`.
- **Commits:** `feat(fase-X): ...`, `fix(fase-X): ...`, `refactor: ...`, `docs: ...`, `chore: ...`.
- **PR template:** qué se hizo, criterios de DoD cumplidos, screenshots si hay UI.

### Accesibilidad
- WCAG AA mínimo desde Fase 1.
- Labels en todos los inputs, alt en todas las imágenes, foco visible.
- Componentes shadcn ya vienen accesibles — no los rompas.

### Patrón de formularios

> El primer formulario de Fase 2 establece el patrón canónico. **Sugerencia: empieza por "Crear casting" (`/agency/castings/new`)** porque tiene un mix representativo (texto requerido, textarea con counter, file upload, sección colapsable, requisitos numéricos, selectors).

**Stack:**
- **`react-hook-form`** para estado del form (no `useState` por campo).
- **`zod`** para schema de validación. El schema vive en `src/lib/schemas/<entidad>.ts` y exporta el tipo inferido (`type CastingForm = z.infer<typeof castingSchema>`) que se reusa en `src/lib/types/`.
- **shadcn primitivas directas:** `<Input>`, `<Label>`, `<Textarea>`, `<Select>`, `<ToggleGroup>` (no hay wrapper `<Form>` en `base-nova`).
- **Modo de validación:** `onBlur` por defecto en todos los formularios. Esto valida cuando el usuario sale del campo, no en cada keystroke (ruidoso) ni solo al submit (frustrante).
- **Errores inline** debajo del input con `text-xs text-danger mt-1`. Sin tooltips, sin modales de error.
- **Hook custom** (`use-<entidad>-form.ts`) si la lógica se repite en >1 pantalla. Si solo se usa en una, déjalo inline.

**Estructura visual canónica:**

```tsx
const { register, handleSubmit, formState: { errors, isValid } } = useForm<CastingForm>({
  resolver: zodResolver(castingSchema),
  mode: "onBlur",
  defaultValues: { /* ... */ }
});

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <Label htmlFor="title">Título *</Label>
      <Input id="title" {...register("title")} />
      {errors.title && (
        <p className="text-danger text-xs mt-1">{errors.title.message}</p>
      )}
    </div>
    ...
    <Button type="submit" disabled={!isValid}>Publicar</Button>
  </form>
);
```

**Si encuentras razón para divergir** del patrón en una pantalla específica (ej. usar `useState` plain en un filtro trivial de 1 campo), regístralo en §9 con la razón, antes de hacerlo.

---

## 7. 🎨 Sistema de diseño (tentativo, ajustar tras Fase 0)

> Estos tokens vienen del brief original. **Tras Fase 0**, se reconcilian con los del output de Claude Design y se documentan en `docs/design-system.md`.

**Paleta:**
- Fondo: off-white cálido `#FAFAF7`
- Texto: casi-negro `#0A0A0A`
- Acento: coral cálido `#E85A4F`
- Secundario: beige suave `#E8E4DC`
- Bordes: gris sutil `#E5E5E0`

**Tipografía:**
- Titulares: Inter Tight
- Body: Inter

**Principios:**
- Mucho espacio en blanco.
- Las fotos del talento son protagonistas; UI no las tapa.
- Bordes sutiles, border radius 8–12px, sombras suaves o ausentes.
- Jerarquía clara entre secciones.
- Sensibilidad editorial (referencias: Linear, Arc, Are.na, Cosmos.so, Airbnb).

---

## 8. 📋 Fases

---

### Fase 0 — Diagnóstico del diseño

**Objetivo:** Entender exactamente qué generó Claude Design para poder traducirlo a Next.js sin sorpresas.

**Tareas:**

1. Ejecutar el comando que aporta David:
   ```
   Fetch this design file, read its readme, and implement the relevant aspects of the design.
   https://api.anthropic.com/v1/design/h/waBicjvq1mU5m-K_0hFEzw
   Implement: the designs in this project
   ```
   (En esta fase **no implementamos**, solo leemos y catalogamos.)

2. Crear `docs/design-audit.md` con:
   - **Inventario de pantallas:** qué de las 10 pantallas objetivo están y cuáles faltan.
   - **Inventario de componentes:** lista de componentes encontrados, props, estados.
   - **Stack visual del output:** ¿usa Tailwind? ¿CSS modules? ¿shadcn? ¿librerías de animación? ¿iconos?
   - **Tokens detectados:** colores, fuentes, spacings, radii, sombras (comparar contra § 7 de este doc).
   - **Dependencias asumidas:** lista de paquetes que el código del diseño espera.
   - **Decisión de migración por componente:** "porta verbatim" / "adapta" / "reescribe" / "descarta".
   - **Gaps:** funcionalidades del brief de producto sin pantalla diseñada todavía.

3. Crear `docs/design-system.md` consolidando los tokens finales (los del diseño tienen prioridad sobre § 7 si hay conflicto).

**Criterios de "hecho":**
- [ ] `docs/design-audit.md` creado y revisado por David.
- [ ] `docs/design-system.md` creado con tokens definitivos.
- [ ] Lista de dependencias para Fase 1 acordada.
- [ ] Decisión tomada sobre cada componente (portar / adaptar / reescribir).

**Salidas:** dos archivos en `docs/`, ninguna línea de código aún.

---

### Fase 1 — Fundamentos del proyecto

**Objetivo:** Tener un proyecto Next.js inicializado, con design system aplicado y componentes base listos para recibir las pantallas.

**Tareas:**

1. **Inicializar Next.js:**
   ```bash
   pnpm create next-app@latest talenthub --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"
   ```
2. **Configurar Tailwind** con tokens de `docs/design-system.md` (colores, fuentes, radii, etc.).
3. **Instalar shadcn/ui:**
   ```bash
   pnpm dlx shadcn@latest init
   ```
   Configurar `components.json` con tema TalentHub.
4. **Instalar componentes base de shadcn:** Button, Input, Label, Card, Badge, Avatar, Dialog, DropdownMenu, Form, Select, Textarea, Toast.
5. **Configurar fuentes** vía `next/font` (Inter + Inter Tight).
6. **Crear estructura de carpetas** según § 5.
7. **Configurar Prettier + ESLint** (incluir `prettier-plugin-tailwindcss`).
8. **Crear página `/sandbox`** que renderice todos los componentes base con todos sus estados (para QA visual rápido).
9. **Crear layouts root:** `app/layout.tsx` con providers (Theme, Toast), fuentes y metadata base.
10. **Inicializar git**, crear `.env.local.example`, crear `README.md` mínimo apuntando a `CLAUDE.md`.

**Criterios de "hecho":**
- [ ] `pnpm dev` arranca sin errores ni warnings.
- [ ] `/sandbox` muestra todos los componentes base correctamente estilizados.
- [ ] Linter y formatter pasan en limpio.
- [ ] Tokens del design system funcionan (ej: `bg-background` usa `#FAFAF7`).
- [ ] README.md y .env.local.example existen.
- [ ] Primer commit: `chore(fase-1): proyecto inicializado`.

---

### Fase 2 — Maquetación estática (10 pantallas)

**Objetivo:** Las 10 pantallas implementadas con mock data, sin backend, totalmente navegables y responsive.

**Pre-requisitos:**
- Definir los **tipos TypeScript** en `src/lib/types/` antes de implementar pantallas.
- Definir la **capa de datos abstracta** en `src/lib/data/` con mocks. Toda función debe ser `async` y retornar `Promise<T>` aunque sea mock — esto facilita Fase 3.
- Generar **mock data realista** en `src/mocks/` (mínimo 30 castings, 50 talentos, 8 agencias).

**Las 10 pantallas (en orden sugerido de implementación):**

1. **Feed público de castings** — `/`
2. **Detalle de un casting** — `/castings/[id]`
3. **Login** — `/login`
4. **Registro talento** — `/register/talent`
5. **Onboarding talento (subir PDF + completar)** — `/onboarding`
6. **Perfil talento** — `/profile`
7. **Aplicaciones del talento** — `/applications`
8. **Dashboard agencia** — `/agency/dashboard`
9. **Crear casting** — `/agency/castings/new`
10. **Aplicantes por casting** — `/agency/castings/[id]/applicants`

**Reglas para esta fase:**
- Todo se renderiza con mock data. Auth se simula con un toggle en el header del sandbox o un cookie mock.
- Cada pantalla es responsive (≥320px hasta desktop).
- Cada pantalla tiene estados: loading, vacío, error, success.
- Los formularios validan client-side con `react-hook-form` + `zod`.
- En este punto, "Aplicar" muestra un toast "Aplicación enviada" — no persiste nada.

**Criterios de "hecho" por pantalla:**
- [ ] Visual fidelity ≥ 95% al diseño de Claude Design.
- [ ] Responsive correcto en mobile, tablet, desktop.
- [ ] Todos los estados (loading, empty, error) implementados.
- [ ] Navegación a/desde otras pantallas funciona.
- [ ] Sin errores de hydration ni warnings de React.
- [ ] Lighthouse > 90 en Performance y Accessibility.

**Criterios de "hecho" de la fase:**
- [ ] Las 10 pantallas terminadas.
- [ ] Lighthouse global > 90.
- [ ] Capa de datos en `lib/data/` con interfaces definidas y mocks funcionando.
- [ ] PR/demo navegable de punta a punta.

---

### Fase 3 — Backend, datos, auth

**Objetivo:** Reemplazar mocks con backend real. Auth funcional. PDFs almacenados.

**Decisión inicial obligatoria:**

Antes de codear, abrir un mini-RFC en `docs/decisions.md` comparando opciones de backend según estos criterios:
- Velocidad de implementación.
- Costo en V1 y al escalar.
- Cumplimiento habeas data Colombia.
- Calidad de auth incluido.
- Storage de archivos.
- Edge functions / serverless para IA.
- Familiaridad del equipo.

Candidatos: Supabase, Convex, Drizzle + Neon + NextAuth, Pocketbase.
Tomar decisión, documentar razones, **luego** ejecutar.

**Tareas:**

1. Diseñar schema en `docs/data-model.md` (entidades: User, Talent, Agency, Casting, Application, Portfolio).
2. Implementar schema en backend elegido.
3. Configurar storage para PDFs (con políticas de acceso).
4. Implementar auth (Google + email/password).
5. Reemplazar funciones de `lib/data/*` con queries reales (las firmas no cambian → las pantallas no se tocan).
6. Implementar verificación de agencias (flujo manual al inicio: marca en DB).
7. Configurar RLS / security rules (un usuario solo ve su data).
8. Cumplir habeas data: política de privacidad, consentimiento explícito al registro, opción de borrado de cuenta.
9. Migrar páginas a server components donde tenga sentido (data fetch directo).

**Criterios de "hecho":**
- [ ] Las 10 pantallas funcionan con data real persistida.
- [ ] Login con Google y con email funciona.
- [ ] Subir PDF lo guarda en storage y queda asociado al talento.
- [ ] Un talento no puede ver/modificar data de otro talento.
- [ ] Una agencia solo ve aplicantes de sus propios castings.
- [ ] Flujo de verificación manual de agencias funciona.
- [ ] Política de privacidad publicada y aceptación registrada.

---

### Fase 4 — Capa de IA

**Objetivo:** Las funcionalidades que hacen mágica la propuesta de valor.

**Tareas:**

1. **Extracción de portafolios PDF:**
   - Endpoint que recibe PDF → llama a Claude (vision/document) → extrae JSON estructurado: nombre, edad, ciudad, medidas, idiomas, experiencia, redes sociales.
   - Prompt versionado en `lib/ai/prompts/extract-portfolio.ts`.
   - Validación de salida con `zod`.
   - Fallback a manual si confidence < umbral o si falla.
2. **Auto-completado de perfil:**
   - Tras subir PDF, pre-llenar formulario con datos extraídos.
   - El talento revisa, edita lo que esté mal, y guarda.
3. **Matching / "Recomendados para ti":**
   - Embeddings de castings (descripción + requisitos) y de perfiles (extracto del portafolio).
   - Función `getRecommendedCastings(talentId)` que retorna top-N por similitud + filtros duros (ciudad, edad).
4. **Filtros automáticos en aplicaciones:**
   - Si un talento aplica y no cumple requisitos duros (ciudad/edad/género), warning antes de enviar.
5. **Tests con portafolios reales:**
   - Mínimo 10 PDFs reales de modelos colombianos. Medir precisión de extracción.

**Criterios de "hecho":**
- [ ] Subir PDF → perfil pre-completado en < 30 segundos.
- [ ] Precisión de extracción ≥ 80% en campos críticos (nombre, ciudad, medidas).
- [ ] "Recomendados para ti" muestra 5–10 castings relevantes para cada talento de prueba.
- [ ] Logs y observabilidad de cada llamada a LLM (costo, latencia, errores).
- [ ] Costo estimado por usuario nuevo documentado.

---

### Fase 5 — Pulido y despliegue

**Objetivo:** Producto en producción, listo para entrevistas con agencias y talento real.

**Tareas:**

1. **Performance:**
   - Optimización de imágenes (`next/image` con loaders correctos).
   - Lazy loading de secciones pesadas.
   - ISR / cache donde aplique (feed público, detalle de casting).
   - Lighthouse > 95 en Performance.
2. **SEO:**
   - Metadata dinámica por pantalla.
   - Open Graph + Twitter cards.
   - Sitemap, robots.txt.
   - Schema.org structured data para castings.
3. **Accesibilidad:**
   - Auditoría con axe / Lighthouse → corregir todo.
4. **Internacionalización (preparada, no usada):**
   - Estructura `next-intl` o similar pensando en LATAM, default español-CO.
5. **Analytics + tracking:**
   - Plausible o Posthog para uso.
   - Sentry para errores.
6. **Deploy:**
   - Vercel project conectado a `main`.
   - Variables de entorno configuradas.
   - Dominio (a comprar).
7. **Pruebas con usuarios:**
   - 5–10 agencias reales publicando.
   - 10–15 talentos reales registrándose y aplicando.
   - Feedback estructurado en `docs/user-feedback.md`.

**Criterios de "hecho":**
- [ ] Live en URL pública con dominio propio.
- [ ] Lighthouse > 95 en las 4 categorías.
- [ ] Sentry recibiendo eventos.
- [ ] Analytics activo.
- [ ] 5+ agencias y 10+ talentos validan en producción.
- [ ] Documento de retrospectiva escrito.

---

## 9. 🧠 Decisiones tomadas

> Formato: fecha — decisión — razón.

- **2026-05-01** — Next.js (App Router) como framework. — Requisito del autor; familiaridad y ecosistema.
- **2026-05-01** — TypeScript strict. — Marketplace con muchos modelos de datos.
- **2026-05-01** — Tailwind + shadcn/ui. — Match con la estética buscada y velocidad.
- **2026-05-01** — pnpm como package manager. — Velocidad y mejor manejo de monorepos si crecemos.
- **2026-05-01** — Capa de datos abstracta desde Fase 2. — Permite cambiar backend en Fase 3 sin tocar pantallas.
- **2026-05-01** — Decisión de backend pospuesta a inicio de Fase 3. — Comparar Supabase, Convex, Drizzle+Neon antes de comprometerse.
- **2026-05-01** — Auth como modal compartido + rutas `/login` y `/register/talent` que renderizan el mismo `AuthModal` en modo página. — Preserva fricción mínima desde "Aplicar" y permite deep-link.
- **2026-05-01** — Onboarding en 2 rutas (`/onboarding`, `/onboarding/completar`) con draft state intermedio (localStorage en Fase 2, DB en Fase 3). — El paso 2 ocurre tras la llamada a IA; URL distinta hace explícito el progreso.
- **2026-05-01** — Iconos: lucide-react para genéricos + custom en `src/components/icons/` con API compatible con lucide. — Mantiene fidelidad de marca (Sparkle animado, PdfIcon, ReqIcon) sin sacrificar ergonomía del set lucide.
- **2026-05-01** — JetBrains Mono descartada. — Apareció en una sola pantalla (`Mis Castings.html` línea 434) para contadores numéricos; Inter + `tabular-nums` cubre el caso sin payload extra de fuente.
- **2026-05-01** — State patterns (empty/loading/error/success) derivados del `EmptyState` del diseño como variantes de un solo `<StateCard>`. — Coherencia visual + un solo componente que mantener.
- **2026-05-02** — Next.js 16 (App Router). — Tomamos lo que `create-next-app@latest` instaló al inicializar (16.2.4) y lo aceptamos con sus breaking changes documentados en `AGENTS.md`. Mantenemos la versión pineada en `package.json`; cualquier upgrade mayor (Next 17, etc.) será una decisión explícita registrada aquí, no automática.
- **2026-05-02** — Tailwind CSS v4 con config CSS-first en `globals.css`. — Default actual de `create-next-app@latest`. No hay `tailwind.config.ts`; tokens viven en `@theme inline`.
- **2026-05-02** — shadcn 4.6 con style `base-nova` (basado en `@base-ui/react`). — Default actual del init de shadcn. Implica APIs ligeramente distintas a la versión Radix legacy y la ausencia del componente `Form` (cubierto por el patrón de §6).
- **2026-05-02** — `sonner` reemplaza al antiguo `toast` legacy de shadcn. — Recomendación oficial de shadcn; API más limpia y package más liviano.
- **2026-05-02** — `AGENTS.md` como complemento operacional de `CLAUDE.md`. — Aloja reglas urgentes del stack que pueden no estar en el training de un agente; `CLAUDE.md` aloja la visión y las decisiones. Cada agente debe leer ambos al iniciar (workflow §3).
- **2026-05-02** — Patrón canónico de formularios: `react-hook-form` + `zod` + primitivas shadcn directas, modo de validación `onBlur`. — Establecido en §6. El primer form de Fase 2 ("Crear casting") materializa el patrón.

---

## 10. ❓ Decisiones pendientes

- **Backend / DB:** decidir al inicio de Fase 3 (ver § 4).
- **Auth:** decidir al inicio de Fase 3 (depende de backend).
- **LLM para PDF:** Claude vs GPT-4o — decidir en Fase 4 con un mini-benchmark.
- **Modelo de negocio:** freemium vs comisión vs suscripción. Post-V1.
- **Verificación de agencias:** manual vs automatizada (KYB). V1 manual, automatizar después.
- **Mensajería interna:** ¿incluir en V1 o dejar para V2? Default actual: V2.
- **App móvil nativa:** post-V1.

---

## 11. 📚 Comandos útiles

> Esta sección se completa al final de Fase 1. Por ahora, placeholder.

> **Nota operativa:** El bundle de Claude Design vive en `design-source/` y está en `.gitignore` — es contexto local para el agente, no código de producción. Si el bundle se actualiza, se vuelve a descargar/extraer ahí mismo y los docs en `docs/` se regeneran. Para re-leer el bundle sin re-descargarlo, está extraído en esa carpeta.

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Lint y format
pnpm lint
pnpm format

# Añadir componente shadcn
pnpm dlx shadcn@latest add <component>

# Tests (a definir en Fase 5)
# pnpm test
```

---

## 12. ⚠️ Riesgos a vigilar (del brief de producto)

- **Huevo y gallina:** sin agencias, no hay talento; sin talento, no hay agencias. **Mitigación:** cerrar manualmente 5–10 agencias amigas antes de lanzamiento.
- **Calidad del análisis de PDF:** portafolios vienen en formatos muy variados. **Mitigación:** Fase 4 con tests reales y fallback manual.
- **Fraude / castings falsos:** verificación manual de agencias en V1.
- **Aplicaciones masivas no calificadas:** filtros duros automáticos por ciudad/edad/género al aplicar.
- **Habeas data Colombia:** consentimiento explícito + política de privacidad + opción de borrado.

---

## 13. 📖 Glosario

- **Casting:** convocatoria para seleccionar talento.
- **Portafolio:** PDF con fotos, medidas, experiencia y datos del talento.
- **Agencia:** quien publica el casting (productora, agencia, marca).
- **Talento:** quien aplica al casting (modelo, actor, creador).
- **Foundation screen:** primera pantalla generada por Claude Design que establece el sistema visual.
- **DoD (Definition of Done):** criterios objetivos para considerar terminada una fase o tarea.
- **RFC:** Request For Comments — propuesta breve de decisión técnica.
- **ADR:** Architecture Decision Record — registro de una decisión técnica con razones.

---

**Mantenido por:** David
**Última actualización:** Mayo 2026
**Estado:** Conceptualización / Inicio de Fase 0
