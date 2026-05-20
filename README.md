# TalentHub

Marketplace web que conecta agencias de casting con talento creativo (modelos, actores, creadores) en Colombia. Propuesta de valor: **fricción mínima** en ambos lados, gracias a IA que procesa portafolios PDF automáticamente y aplicación de un solo click.

> **Para Claude Code y otros agentes:** lee primero **[CLAUDE.md](./CLAUDE.md)** — contiene fase actual, decisiones tomadas, convenciones y workflow del proyecto.

---

## Stack

- **Next.js 16** (App Router, Turbopack, RSC)
- **TypeScript** strict
- **Tailwind CSS v4** (config en `src/app/globals.css` vía `@theme inline`)
- **shadcn/ui** (estilo `base-nova`, basado en `@base-ui/react`)
- **lucide-react** + iconos custom en `src/components/icons/` (API compatible)
- **Inter + Inter Tight** vía `next/font/google`
- **pnpm** (vía corepack)
- Hosting: **Vercel** (planeado, Fase 5)

Backend, auth, IA y observabilidad: **a decidir** en sus respectivas fases. Ver `CLAUDE.md` §10.

---

## Comandos

```bash
# Dev server (Turbopack por default en Next 16)
pnpm dev

# Build de producción
pnpm build
pnpm start

# Lint
pnpm lint

# Añadir un componente shadcn
pnpm dlx shadcn@latest add <component>
```

Abre [http://localhost:3000](http://localhost:3000). El sandbox visual de tokens y componentes está en [`/sandbox`](http://localhost:3000/sandbox).

---

## Estructura

Ver `CLAUDE.md` §5 para la estructura objetivo. Las carpetas existentes en Fase 1:

- `src/app/` — App Router (route groups `(public)`, `(auth)`, `(talent)`, `(agency)` listos para Fase 2).
- `src/components/ui/` — primitivas de shadcn (no editar manualmente).
- `src/components/{shared,casting,talent,agency,icons}/` — componentes propios (vacíos hasta Fase 2).
- `src/lib/{data,types,ai,auth}/` — capa de datos y helpers (Fase 2/3/4).
- `src/mocks/` — mock data (Fase 2).
- `docs/` — documentación viva (`design-audit.md`, `design-system.md`).
- `design-source/` — bundle local del output de Claude Design (ignorado, no committeado).

---

## Documentación

- [`CLAUDE.md`](./CLAUDE.md) — documento maestro. Fase actual, decisiones, convenciones.
- [`docs/design-audit.md`](./docs/design-audit.md) — diagnóstico del bundle de Claude Design (Fase 0).
- [`docs/design-system.md`](./docs/design-system.md) — tokens canónicos y patrones (Fase 0).
- [`AGENTS.md`](./AGENTS.md) — notas para agentes de IA, incl. cambios de Next 16.

---

## Estado

**Fase 1 — Fundamentos** ✅ cerrada (2026-05-02).
**Fase 2 — Maquetación estática** (en curso): tipos, capa de datos abstracta y mocks antes de tocar las 10 pantallas. Ver `CLAUDE.md` §2.

Próximas fases: backend + auth, capa de IA, pulido y deploy.
