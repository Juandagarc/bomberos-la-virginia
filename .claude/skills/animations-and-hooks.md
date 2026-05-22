---
name: animations-and-hooks
description: Cómo agregar o modificar animaciones — todas viven en `useAnimations`. Úsalo cuando toques DOM imperativamente o agregues efectos.
metadata:
  type: skill
---

# Animaciones · `useAnimations`

## Cuándo usar

- Vas a agregar un `addEventListener` global o un `IntersectionObserver`.
- Vas a tocar el curtain, embers, sparks, parallax, cursor blob, marquee,
  contadores, o cualquier efecto JS del hero/footer.

## Cómo funciona

`apps/web/src/hooks/useAnimations.ts` es **el único** sitio donde vive lógica
DOM imperativa. Se llama una vez en `App`. Estructura:

1. Cada efecto registra sus listeners y timers.
2. Cada uno empuja un cleanup a un array `cleanups`.
3. El `useEffect` retorna una función que corre todos los cleanups.

## Patrón para agregar un efecto

```ts
// dentro del useEffect, antes de `return () => ...`
const myEl = document.querySelector('.my-target');
if (myEl) {
  const handler = (e: Event) => {
    /* ... */
  };
  myEl.addEventListener('click', handler);
  cleanups.push(() => myEl.removeEventListener('click', handler));
}
```

**Importante**: cualquier `setInterval`, `setTimeout`, `requestAnimationFrame`,
o `addEventListener` debe registrar su cleanup. StrictMode corre el efecto dos
veces en dev — si no limpias, vas a tener listeners duplicados, embers
duplicados, contadores que disparan dos veces, etc.

## Tweaks API

`useAnimations` expone:

```ts
window.__tweaks; // { accent, grain, embers, marqueeSpeed }
window.__applyTweaks({ accent: '#0F766E' }); // patch parcial
```

Si vas a agregar un nuevo tweak, extiende el type `Tweaks` y la función
`applyTweaks` dentro del hook.

## Reglas

- **No** crees hooks separados para animaciones individuales. Centralizado >
  esparcido para este sitio.
- **No** uses librerías de animación (Framer Motion, GSAP) sin discutirlo —
  todo el sistema está construido sobre CSS keyframes + DOM imperativo.
- Si necesitas un efecto que dependa del DOM de un componente específico, usa
  `useEffect` dentro de ese componente con un `ref`, no `document.querySelector`.
