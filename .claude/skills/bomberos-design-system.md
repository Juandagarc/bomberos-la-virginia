---
name: bomberos-design-system
description: Sistema visual de Bomberos La Virginia — tokens, tipografía, componentes inventados. Úsalo cuando modifiques cualquier estilo o agregues una sección nueva.
metadata:
  type: skill
---

# Sistema visual · Bomberos La Virginia

## Cuándo usar

- Cualquier cambio en `apps/web/src/styles/*.css`.
- Cualquier sección nueva o componente nuevo en `apps/web/src/components/`.
- Cuando te pidan "ajustar color X" o "agregar sección Y".

## Cómo funciona

El diseño viene de un bundle Claude Design. La regla absoluta: **no
rediseñes**. Lee y respeta lo que ya está. Solo agrega.

### Tokens (en `:root` de `base.css`)

```css
--rojo: #d32027; /* rojo bombero — color del sistema */
--rojo-d: #a8161c; /* hover/pressed */
--ember: #ff6b1a; /* brasas, glow naranja */
--amber: #ffc72c; /* señalización, scotch tape de las polaroids */
--noche: #0a0a0a; /* fondo dark dominante */
--marfil: #f1ebde; /* texto sobre dark, fondo paper */
--tinta: #1a1a1a; /* texto sobre paper */
```

### Tipografías

| Variable      | Familia                   | Uso                                           |
| ------------- | ------------------------- | --------------------------------------------- |
| `--f-display` | Anton, Bebas Neue, Impact | Titulares heroicos, números gigantes          |
| `--f-serif`   | Instrument Serif italic   | Acentos emocionales (palabras en cursiva)     |
| `--f-body`    | Manrope                   | Cuerpo general                                |
| `--f-mono`    | JetBrains Mono            | Etiquetas técnicas, códigos OP·01, timestamps |

### Componentes inventados (no son genéricos)

- **`.curtain`** — entrada de pantalla completa que sube al desaparecer.
- **`.statusbar`** — barra superior fija con reloj real y canal rotativo.
- **`.hero__embers` / `.hero__sparks`** — DOM-poblado por `useAnimations`.
- **`.marquee`** — track infinito; CSS controla velocidad vía
  `animation-duration`. Para cambiarla en runtime: `window.__applyTweaks({ marqueeSpeed: 40 })`.
- **`.hose`** — SVG con `stroke-dasharray` animado al entrar al viewport.
- **`.polaroid`** — tilt 3D con `data-rot` base + perspective del contenedor.
- **`.op-card`** — radial glow rojo en hover.
- **`.cromo`** — foil shine diagonal en hover (carta coleccionable).
- **`.dispatch__track`** — marquee horizontal con timestamps y códigos 10-X.
- **`.cursor-blob`** — sigue al mouse con `mix-blend-mode: difference`.

### Reveals

- `.reveal` → entra opacity+translateY al cruzar viewport.
- `.reveal-stagger > *` → hijos entran con 80ms stagger.
- `[data-count]` → contador animado de 0 al valor target.
- Lógica en `IntersectionObserver` dentro de `useAnimations`.

## Reglas

1. **No introduzcas Tailwind ni CSS-in-JS nuevos.** El sistema ya es vanilla
   CSS con variables y no hay razón para cambiarlo.
2. **Si agregas un componente, agrega también su CSS en uno de los 3 archivos
   existentes** (`base.css`, `sections.css`, `crew-ig-cta.css`), no archivos
   nuevos.
3. **Texto en español rioplatense colombiano**: tono coloquial pero respetuoso,
   nombres reales del CBV (Sgto. Aníbal Cano, lema, fundación 1963, teléfono
   311 354 82 81).
4. **`prefers-reduced-motion`** — siempre respétalo. Ya está al final de
   `crew-ig-cta.css`.
