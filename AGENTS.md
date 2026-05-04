# AGENTS.md

## 1. Role of the Agent

- Work as an execution agent for TalentHub inside the boundaries defined by `CLAUDE.md`.
- Execute only the task that belongs to the current phase and current confirmed scope.
- Preserve the project strategy, architecture, product decisions, visual system, and phased workflow already documented.
- Before proposing or making changes, identify the current phase from `CLAUDE.md` section "Estado actual".
- Keep implementation operational, minimal, and aligned with existing project conventions.
- Do not invent new product, architecture, backend, auth, AI, payment, analytics, or deployment decisions.
- Do not advance to another phase without explicit confirmation from David.
- Do not mix work from different phases in the same PR or commit.
- Do not override `CLAUDE.md`, `docs/design-audit.md`, or `docs/design-system.md`.

## 2. Source of Truth

- `CLAUDE.md` is the single source of truth for project strategy, architecture, current phase, confirmed decisions, pending decisions, workflow, and Definition of Done.
- Read `CLAUDE.md` first at the start of every session.
- Read files in this order before coding:
  - `CLAUDE.md`
  - `AGENTS.md`
  - `talenthub-contexto-proyecto.md` when product context is needed
  - `docs/design-audit.md` and `docs/design-system.md` for Fase 1+
- For visual implementation, `docs/design-audit.md` and `docs/design-system.md` are binding after Fase 0.
- If `CLAUDE.md` and `AGENTS.md` appear to conflict, follow `CLAUDE.md` and update/propose an update to `AGENTS.md`.
- If a new context file is added, register it in `CLAUDE.md`.
- If a decision changes project direction, document it in `CLAUDE.md` section "Decisiones tomadas" with date and reason before relying on it.
- If work belongs to a future phase, do not implement it; record or propose it under pending decisions.

## 3. Project Constraints

- Framework: Next.js 16.2.4 with App Router.
- React: React 19.
- Language: TypeScript strict.
- Package manager: pnpm.
- Styling: Tailwind CSS v4, CSS-first configuration.
- UI components: shadcn 4.6 with style `base-nova`.
- shadcn `base-nova` uses `@base-ui/react`; do not assume Radix legacy APIs.
- Icons: `lucide-react` for generic icons.
- Custom brand icons live in `src/components/icons/` and must keep lucide-compatible ergonomics.
- Fonts: Inter and Inter Tight via `next/font`.
- Toasts: use `sonner`; mount `<Toaster />` once in the app tree.
- Linting/formatting: ESLint and Prettier.
- Hosting target: Vercel.
- Tailwind has no `tailwind.config.ts`; do not create one unless `CLAUDE.md` is explicitly changed.
- Tailwind tokens live in `src/app/globals.css` inside `:root` and `@theme inline`.
- If asked to adjust Tailwind config, edit `globals.css` tokens instead.
- Use tokens from `docs/design-system.md` and `globals.css`; do not invent one-off visual tokens.
- Next.js 16 operational rules:
  - `cookies()`, `headers()`, `params`, and `searchParams` are async; always `await` them.
  - Turbopack is the default for `next dev` and `next build`; do not add `--turbopack`.
  - `next lint` was removed; use `eslint` through `pnpm lint`.
  - Use `next typegen` for `PageProps<'/route'>` and `LayoutProps<'/route'>` when working with dynamic routes from Fase 2 onward.
  - Read relevant docs in `node_modules/next/dist/docs/` before using APIs that may have changed.

## 4. Workflow Rules

- Current phase: Fase 2 - Maquetación estática (11 pantallas).
- Sub-block status (branch `fase-2/fundamentos`):
  - Bloque A (tipos TypeScript): completed (commit d9ffcf5).
  - Bloque B (capa de datos abstracta): completed (commit b41ccd3).
  - Bloque C (mock data realista): completed (commit 5fdc5c4).
  - Bloque D (pre-pantallas — `src/lib/constants.ts`, `CastingWithAgency`, `getCastingWithAgency`/`getCastingsWithAgency`, defensive shallow spread in id-getters, `@fase2` JSDoc on `createApplication`): completed.
  - Bloque E (Pantalla 1 — feed público `/`): completed (commit 43a697a).
- Screens completed:
  - Pantalla 1 — feed público (`/`): completed (commit 43a697a).
  - Pantalla 2 — detalle casting (`/castings/[id]`): completed (commit 27bf55f).
- Current next step: implement screen 3 — Login (`/login`).
- Phases are strictly sequential:
  - Fase 0: design diagnosis.
  - Fase 1: project foundations.
  - Fase 2: static 11-screen mock implementation.
  - Fase 3: backend, data, auth.
  - Fase 4: AI layer.
  - Fase 5: polish and deployment.
- Do not start Fase 3 until Fase 2 is complete and David confirms phase advancement.
- Do not start Fase 4 until Fase 3 is complete and David confirms phase advancement.
- Do not start Fase 5 until Fase 4 is complete and David confirms phase advancement.
- At the end of a phase, propose updating `CLAUDE.md` section "Estado actual"; wait for confirmation.
- Definition of Done is the checklist in `CLAUDE.md` for the active phase.
- Fase 2 must produce 11 static, navigable, responsive screens with mock data and no backend.
- Fase 2 screen order (✅ = done, ← = next):
  - `/` ✅
  - `/castings/[id]` ✅
  - `/login` ←
  - `/register/talent`
  - `/onboarding`
  - `/onboarding/completar`
  - `/profile`
  - `/applications`
  - `/agency/dashboard`
  - `/agency/castings/new`
  - `/agency/castings/[id]/applicants`
- Fase 2 per-screen DoD:
  - visual fidelity at least 95% to Claude Design
  - responsive from 320px to desktop
  - loading, empty, error, and success states
  - working navigation to and from other screens
  - no hydration errors
  - no React warnings
  - Lighthouse Performance and Accessibility above 90
- Fase 2 phase DoD:
  - all 10 screens complete
  - global Lighthouse above 90
  - `src/lib/data/` has defined interfaces and working mocks
  - PR/demo navigable end to end
- Auth in Fase 2 is simulated only, using a sandbox header toggle or mock cookie.
- Applying to a casting in Fase 2 shows toast text "Aplicación enviada" and does not persist data.

## 5. Coding Rules

- Use TypeScript strict everywhere.
- Do not use `any`; use `unknown` and narrow when the type is not known.
- Server components are the default.
- Use `"use client"` only for state, effects, browser APIs, event handlers, or client-only libraries.
- Fetch data in server components with direct `await` when possible.
- Do not use `useEffect` for V1 data fetching when server fetching can solve it.
- Use absolute imports with `@/`.
- Use `cn()` from `@/lib/utils` for conditional class composition.
- Prefer inline Tailwind classes; avoid `@apply` except for highly reused component-level patterns.
- Component files use `kebab-case.tsx`.
- React components use `PascalCase`.
- Hooks use `use-camel-case.ts` and export `useCamelCase()`.
- Types and interfaces use `PascalCase` with no `I` prefix.
- Data-layer functions use verb + noun names, such as `getCastings` and `createApplication`.
- Mock exports use the `mock` prefix, such as `mockCastings`.
- Business-logic comments should be in Spanish.
- Technical comments may be in English.
- Keep comments scarce and useful.
- Respect target structure:
  - route files in `src/app/`
  - shadcn primitives in `src/components/ui/`
  - shared components in `src/components/shared/`
  - domain components in `src/components/casting/`, `src/components/talent/`, `src/components/agency/`
  - abstract data access in `src/lib/data/`
  - shared types in `src/lib/types/`
  - schemas in `src/lib/schemas/`
  - mocks in `src/mocks/`
- Do not manually edit `src/components/ui/` unless the task is explicitly about generated shadcn component ownership or a required local fix.
- Before adding a dependency, verify whether shadcn/ui, Tailwind, or an existing package already solves the need.

## 6. Branching & Commits

- Production branch: `main`.
- Feature branches: `fase-X/nombre-tarea`.
- Keep commits atomic.
- Use commit formats:
  - `feat(fase-X): descripción`
  - `fix(fase-X): descripción`
  - `docs: descripción`
  - `refactor: descripción`
  - `chore: descripción`
- Do not mix phase work in a commit.
- PRs must state what changed, which DoD criteria were met, and include screenshots for UI work.
- First Fase 1 commit was expected as `chore(fase-1): proyecto inicializado`; do not rewrite history for this unless David asks.

## 7. UI & Design System Rules

- The visual source of truth is Claude Design as documented in `docs/design-audit.md` and `docs/design-system.md`.
- Do not improvise visual style.
- Use TalentHub tokens from `src/app/globals.css`.
- Canonical palette includes off-white background, near-black text, warm coral accent, soft beige secondary, and subtle gray borders as reconciled in `docs/design-system.md`.
- Typography uses Inter Tight for display/headings and Inter for body.
- Visual principles:
  - ample whitespace
  - talent photos are protagonist content
  - UI must not cover important photos
  - subtle borders
  - 8-12px radius range unless component tokens define otherwise
  - soft or absent shadows
  - clear hierarchy
  - editorial sensitivity aligned with Linear, Arc, Are.na, Cosmos.so, and Airbnb references
- Accessibility is required from Fase 1 onward.
- Meet WCAG AA minimum.
- Every input needs a label.
- Every image needs meaningful alt text or intentional decorative handling.
- Focus must remain visible.
- Do not break accessibility provided by shadcn/base-ui primitives.
- Use lucide icons for generic actions.
- Use custom icons only for brand-specific needs already documented.
- `base-nova` has no shadcn `Form` component; do not import or create one as a compatibility shim.
- Forms use direct primitives: `Input`, `Label`, `Textarea`, `Select`, `ToggleGroup`, and related local UI components.
- `ToggleGroup` in `base-nova` does not use legacy `type="multiple"`; use value arrays where multiple selection is needed.
- Use `sonner` for toasts, not legacy shadcn toast APIs.

## 8. Data Layer Rules

- From Fase 2 onward, all data access must pass through `src/lib/data/*`.
- Screens and components must not import directly from `src/mocks/*`.
- In Fase 2, `src/lib/data/*` reads from mocks.
- In Fase 3, `src/lib/data/*` implementations are replaced with real backend queries.
- Data-layer function signatures must remain stable so screens do not change during Fase 3.
- Every data-layer function must be async and return `Promise<T>`, even when backed by mock data.
- Define shared domain types before screens in `src/lib/types/`.
- Create realistic Fase 2 mocks:
  - at least 30 castings
  - at least 50 talents
  - at least 8 agencies
- Mock data must support loading, empty, error, and success UI states.
- Backend and database selection is postponed until the start of Fase 3.
- At the start of Fase 3, create a mini-RFC in `docs/decisions.md` comparing Supabase, Convex, Drizzle + Neon + NextAuth, and Pocketbase.
- Fase 3 backend comparison must cover implementation speed, V1 and scaling cost, Colombia habeas data compliance, auth quality, file storage, edge/serverless AI support, and team familiarity.
- Do not implement real auth, storage, database persistence, RLS, or route-handler data mutations before Fase 3.
- Fase 3 must preserve data-layer signatures while replacing mock internals.
- Fase 4 AI prompts belong under `src/lib/ai/prompts/` and must be versioned.
- Fase 4 AI outputs must be validated with `zod`.
- Fase 4 must include fallback to manual profile completion when confidence is below threshold or extraction fails.

## 9. Anti-Patterns (Critical)

- Never override or reinterpret `CLAUDE.md`.
- Never advance phases without explicit confirmation from David.
- Never mix work from multiple phases in one PR or commit.
- Never implement future-phase scope because it seems easy.
- Never choose backend, auth, storage, LLM, embeddings, payments, analytics, or error tracking before the phase that owns that decision.
- Never bypass `src/lib/data/*` from screens or domain components.
- Never import mock data directly into route screens.
- Never make data-layer mock functions synchronous.
- Never change data-layer signatures in a way that forces screen rewrites in Fase 3.
- Never create `tailwind.config.ts` for the current Tailwind v4 setup.
- Never assume Tailwind v3 configuration patterns.
- Never assume shadcn legacy Radix APIs for `base-nova`.
- Never use a shadcn `Form` wrapper in this project.
- Never use legacy shadcn toast APIs instead of `sonner`.
- Never add `--turbopack` to scripts.
- Never use `next lint`.
- Never access `cookies()`, `headers()`, `params`, or `searchParams` synchronously in Next.js 16.
- Never use `any`.
- Never add dependencies before checking existing stack capability.
- Never improvise visual style outside the documented design system.
- Never edit generated/base UI primitives casually.
- Never hide validation errors in tooltips or modals.
- Never validate forms on every keystroke by default.
- Never implement Fase 2 apply behavior as persistent storage.
- Never implement real user authorization before the Fase 3 backend/auth decision.
- Never ignore habeas data requirements once working in Fase 3 or beyond.
- Never introduce dark mode as V1 product behavior; current dark tokens are placeholders.

## 10. Execution Protocol

- Start every task by reading `CLAUDE.md` and identifying:
  - current phase
  - next step
  - active DoD
  - relevant confirmed decisions
  - pending decisions that must not be resolved prematurely
- Then read `AGENTS.md` for operational rules.
- For Fase 1 and later, read `docs/design-audit.md` and `docs/design-system.md` before UI work.
- For product flow questions, read `talenthub-contexto-proyecto.md`.
- Before coding, classify the task by phase.
- If the task does not belong to the current phase, ask David before proceeding.
- If a requirement is unclear and cannot be resolved from repo documents, ask David.
- If the ambiguity is low-risk and `CLAUDE.md` already implies a default, follow the documented default and state the assumption.
- If work would change architecture or project direction, stop and propose a documented decision first.
- For Fase 2 implementation, perform work in this order:
  - define shared domain types
  - define async abstract data-layer functions
  - create realistic mocks
  - implement shared state components
  - implement screens in the documented order
  - verify responsive behavior, states, navigation, hydration, lint, and Lighthouse targets
- For forms, use the canonical pattern:
  - `react-hook-form`
  - `zod`
  - schema in `src/lib/schemas/<entity>.ts`
  - inferred type reused in types where appropriate
  - validation mode `onBlur`
  - inline errors with `text-xs text-danger mt-1`
  - direct shadcn primitives, no `Form` wrapper
- If a screen has a justified reason to diverge from a documented pattern, record the reason in `CLAUDE.md` section "Decisiones tomadas" or ask David before doing it.
- At task completion, verify the relevant checks from `CLAUDE.md`.
- At phase completion, propose updates to `CLAUDE.md` status and wait for David's confirmation.
