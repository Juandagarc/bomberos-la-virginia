# CLAUDE.md — Bomberos La Virginia

Sitio del **Cuerpo de Bomberos Voluntarios de La Virginia, Risaralda**.
Monorepo Turborepo + React + Vite + TypeScript, listo para despliegue en Coolify.

## Stack

- **Monorepo**: Turborepo + pnpm workspaces (`apps/*`, `packages/*`).
- **App**: `apps/web` — Vite + React 19 + TypeScript estricto.
- **Lint/Format**: ESLint flat config + Prettier.
- **Commits**: Conventional Commits (commitlint).
- **Hooks**: Husky 9.
- **Despliegue**: Coolify (estático).

## Comandos clave

```bash
pnpm install         # bootstrap
pnpm dev             # arranca apps/web en http://localhost:5173
pnpm doctor          # gate: prettier + typecheck + eslint + build
pnpm build           # build de producción
pnpm format          # formatea todo
```

## Gates de calidad

Hay **un único concepto** llamado `react doctor`:

1. **Pre-commit** (`.husky/pre-commit`): corre `pnpm doctor`. Si reporta cualquier
   issue, el commit se aborta.
2. **Pre-push** (`.husky/pre-push`): si la rama destino es `main` o `master`,
   corre `pnpm doctor`. Si reporta cualquier issue, el push se aborta.
   Pushes a otras ramas no requieren el gate.
3. **Commit-msg** (`.husky/commit-msg`): valida que el mensaje siga Conventional
   Commits.

`doctor` corre, en orden: `prettier --check`, `tsc --noEmit` (por workspace),
`eslint` (por workspace), `vite build` (por workspace). Sale con código 0 sólo
si **todos** pasan. Implementado en `scripts/doctor.mjs`.

## Sistema visual (no inventar — está en el CSS)

Tokens en `apps/web/src/styles/base.css :root`:

- **Rojo bombero**: `--rojo: #D32027`. Ámbar señalización: `--amber: #FFC72C`.
- **Tipografías**: Anton (display heroico), Instrument Serif italic (acentos
  emocionales), JetBrains Mono (etiquetas técnicas), Manrope (cuerpo).
- **Animaciones**: curtain de entrada, embers y sparks en el hero, marquee
  infinito, contadores, parallax suave, cursor blob con `mix-blend-mode:
difference`, botones magnéticos, polaroid tilt 3D.

## Componentes inventados (deliberados, no IA-genéricos)

- `DispatchTicker` (footer) · faux radio scroll con códigos 10-4 / 10-70.
- `EmberLayer` y `SparkLayer` · chispas DOM-generadas en `useAnimations`.
- `PolaroidStack` · 3 polaroids con cinta scotch amarilla y tilt 3D.
- `Cromos` · cartas coleccionables de voluntarios con foil shine en hover.
- `HoseDivider` · SVG que se "desenrolla" como manguera al entrar al viewport.
- `LiveCard` · panel flotante con contador subiendo + scan line.
- `EditorialMast` · dropcap rojo y comilla del Sgto. Aníbal Cano.

## Reglas

- **No reescribir el diseño**: el CSS bajo `apps/web/src/styles/` viene del
  bundle de Claude Design y debe preservarse pixel-perfect. Si necesitas
  cambiar estilos, edita en sitio — no rediseñes.
- **Lógica DOM en un solo hook**: `useAnimations` centraliza todo lo que el
  `app.js` original hacía. No diseminar `addEventListener` por componentes.
- **Datos del CBV son canon**:
  - Fundación: 4 oct 1963.
  - Lema: Valor, Abnegación y Disciplina.
  - Línea de emergencia: 311 354 82 81.
  - Instagram: `@cuerpodebomberoslavirginia`.
- **Reduced motion**: respeta `prefers-reduced-motion` (ya manejado en
  `crew-ig-cta.css`).

## Despliegue Coolify

`apps/web` produce un `dist/` estático. Configurar Coolify como "Static Site":
build = `pnpm install --frozen-lockfile && pnpm -F @bomberos/web build`,
output = `apps/web/dist`.

## Skills disponibles

| Skill                                      | Cuándo                             |
| ------------------------------------------ | ---------------------------------- |
| `.claude/skills/bomberos-design-system.md` | Cambios visuales, nuevas secciones |
| `.claude/skills/animations-and-hooks.md`   | Añadir/modificar animaciones       |
| `.claude/skills/doctor-and-gates.md`       | Tocar el gate o sus checks         |
