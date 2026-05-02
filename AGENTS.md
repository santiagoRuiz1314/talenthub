# Agent rules

Para contexto del proyecto, convenciones, fase actual, decisiones tomadas y workflow, leer **[CLAUDE.md](./CLAUDE.md)** primero.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Notas específicas de Next.js 16 para esta sesión

- `cookies()`, `headers()`, `params`, `searchParams` son **async** — siempre `await`.
- Turbopack es el bundler por defecto en `next dev` y `next build`. No agregar `--turbopack` a los scripts.
- `next lint` fue removido — usar `eslint` directamente (ya configurado en `package.json`).
- Usar `next typegen` para generar `PageProps<'/route'>` y `LayoutProps<'/route'>` cuando se trabaje con rutas dinámicas (Fase 2 en adelante).
