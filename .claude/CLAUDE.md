# tuespacio — Instrucciones del proyecto

## ⚠️ PRODUCTO (pivote mayo 2026)
tuespacio = **Cuarto de Control de Agentes**: inbox calmo cross-vendor donde un dev ve qué hacen sus agentes AI (Claude Code, Cursor, MCP, webhooks), qué terminó, qué pide aprobación, qué falló. NO es dashboard personal / Notion / new-tab. Es herramienta dev densa en datos. Detalle: `memory/project_tuespacio_pivot.md`.

## ⚠️ DISEÑO = LEY: leer `DESIGN.md` ANTES de tocar UI
`/Users/juanpablomonsalvez/tuespacio/DESIGN.md` es la constitución de diseño. Referencia ÚNICA: **Linear**, dark-first, densidad = estética. Revisar el **checklist de rechazo de 15 ítems** contra CADA pantalla antes de entregar. Si falla un ítem, no se entrega. El diseño salía genérico por ausencia de sistema — DESIGN.md es el sistema.

## Filosofía de diseño (complementa DESIGN.md)

Este proyecto sigue la filosofía de **Emil Kowalski** (Design Engineer en Linear) — coherente con la referencia Linear de DESIGN.md.
El skill file completo está en `.claude/skills/emil-design-eng.md`.

### Reglas clave activas:

1. **Taste is trained, not innate** — Cada detalle importa, los invisibles componen
2. **Buttons**: `scale(0.97)` en `:active` / `whileTap` — siempre
3. **Never animate from scale(0)** — mínimo `scale(0.95)` con `opacity: 0`
4. **Asymmetric timing** — enter más lento que exit
5. **Stagger**: 30-80ms entre items en listas/grids
6. **Only animate transform + opacity** — nunca `transition: all`
7. **Custom easing**: `cubic-bezier(0.16, 1, 0.3, 1)` para springs suaves
8. **Blur to mask imperfect transitions**
9. **prefers-reduced-motion**: reduce, no remove
10. **CSS transitions > keyframes** en la mayoría de casos

## Stack

- Vite 6 + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first, @theme en index.css)
- motion/react (LazyMotion + domAnimation)
- Zustand v5 con persist middleware
- Sonner (toasts — Emil Kowalski)
- Vaul (drawers — Emil Kowalski)
- @number-flow/react (animated numbers)
- DM Sans Variable + DM Serif Display (Fontsource)

## Arquitectura

- Canvas único centrado (NO 3 columnas)
- HomeCanvas: reloj héroe + portales de rooms
- RoomView: takeover de viewport
- CommandPalette: ⌘K overlay
- AmbientBar: dock flotante inferior con glass effect
- Drawer para settings/crear room (no modales centrados)

## CSS Variables

Todos los colores via `var(--color-xxx)` definidos en `src/index.css` @theme.
Nunca hardcodear colores. Nunca usar clases dark-mode (bg-white/XX).
