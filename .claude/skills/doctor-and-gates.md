---
name: doctor-and-gates
description: El gate `react doctor` que bloquea commits y pushes a main. Úsalo cuando toques scripts/doctor.mjs, .husky/*, o quieras agregar/quitar un check.
metadata:
  type: skill
---

# Doctor · gate de commit y push a main

## Qué es

`pnpm doctor` ejecuta los checks de calidad y sale con código 0 sólo si **todos
pasan**. Es la fuente de verdad para "¿esta rama está lista?".

## Hooks

| Hook                | Cuándo corre | Qué hace                                                                                              |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `.husky/commit-msg` | Cada commit  | Valida Conventional Commits                                                                           |
| `.husky/pre-commit` | Cada commit  | Corre `pnpm doctor` — **bloquea** si falla                                                            |
| `.husky/pre-push`   | Cada push    | Si el remote ref es `main`/`master`, corre `pnpm doctor` — bloquea si falla. Otras ramas: pasa libre. |

## Checks dentro del doctor

Definidos en `scripts/doctor.mjs` en el array `CHECKS`:

1. `prettier --check` — formato.
2. `tsc --noEmit` — types (por workspace).
3. `eslint` — lint (por workspace).
4. `vite build` — build (por workspace).

Salen en serie. Si uno falla, los siguientes igual corren — el reporte final
muestra todos los issues juntos.

## Agregar un check

```js
// scripts/doctor.mjs
const CHECKS = [
  // ...
  { id: 'tests', label: 'Vitest', cmd: 'pnpm', args: ['-r', 'test'] },
];
```

El check **debe**:

- Salir con código no-cero al fallar.
- No requerir input interactivo.
- Correr en CI/headless sin variables de entorno especiales.

## Bypass (sólo emergencia)

`git commit --no-verify` o `git push --no-verify` saltan los hooks. **No lo
hagas en condiciones normales** — significa que el código no pasa el gate.
Si necesitas hacerlo, abre una issue inmediatamente.

## Reglas

- **Nunca** debilites un check para que pase. Arregla el código.
- **Nunca** muevas `.husky/` o cambies los scripts sin actualizar este archivo.
- El gate sólo bloquea `main`/`master`. Otras ramas son libres para experimentar.
