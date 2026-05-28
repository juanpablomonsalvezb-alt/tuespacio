# tuespacio — Constitución de Diseño (LEY, no sugerencia)

> Este documento es la única fuente de verdad visual. **Toda pantalla se revisa contra el checklist de rechazo antes de darse por hecha.** Si falla un solo ítem, no se entrega. El diseño genérico fue siempre por ausencia de sistema — esto es el sistema.

---

## 0. Qué es el producto (define toda decisión)

**tuespacio = Cuarto de Control de Agentes.** Un inbox calmo y cross-vendor donde un dev ve qué hacen sus agentes AI (Claude Code, Cursor, MCP, webhooks), qué terminó, qué necesita aprobación, qué se rompió — en una sola superficie.

**NO es**: un dashboard personal bonito, un Notion, un new-tab page. Eso murió. Es una **herramienta de dev densa en datos**. La densidad ES la estética. El lujo es la precisión, no la decoración.

---

## 1. Referencia ÚNICA y obligatoria: **Linear**

Una sola referencia. No "inspiración de 10 sitios". Cada decisión se justifica contra **Linear** (linear.app). Secundarias solo para confirmar: Vercel/Geist (mono para datos), Resend (limpieza). Nada más.

Si una decisión no se parece a Linear → está mal por default.

---

## 2. Tokens — única fuente de verdad (copiar a `src/index.css`)

```css
@theme {
  /* ===== DARK-FIRST. La profundidad viene del LADDER de superficie, NO de sombras ===== */
  --color-bg:        #08090A;  /* app, lo más profundo */
  --color-surface:   #0F1011;  /* paneles */
  --color-elevated:  #16171A;  /* cards */
  --color-hover:     #1C1D21;  /* hover de card/fila */

  /* Texto — 3 niveles, jamás más */
  --color-text:        #F7F8F8;
  --color-text-secondary: #9CA0A8;
  --color-text-tertiary:  #62666D;

  /* UN acento. Indigo. Solo acción primaria + focus ring + estado activo. <10% superficie */
  --color-accent:       #5E6AD2;
  --color-accent-hover: #6E79DD;

  /* Estados semánticos — usados SOLO en indicadores de estado de agente, no decoración */
  --color-running: #5E6AD2;  /* corriendo (indigo) */
  --color-done:    #3FB950;  /* terminó (verde sobrio) */
  --color-wait:    #D29922;  /* necesita aprobación (ámbar) */
  --color-failed:  #F85149;  /* falló (rojo) */

  /* Bordes — hairline por opacidad. Separan superficies ANTES que cualquier sombra */
  --border:        rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.12);

  /* Tipografía */
  --font-sans: "Inter", -apple-system, system-ui, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
  --fs-xs: 12px; --fs-sm: 13px; --fs-base: 14px; --fs-lg: 16px; --fs-xl: 20px; --fs-2xl: 28px;
  --fw-regular: 400; --fw-medium: 510; --fw-semibold: 590;  /* pesos custom, NO 500/600 stock */

  /* Espaciado — base 4px, usar con TENSIÓN (denso en datos, aireado entre secciones) */
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-6:24px; --sp-8:32px;

  /* UN radio. 6px en todo. (cards pueden 8px, nada más) */
  --r: 6px; --r-lg: 8px;

  /* Motion — rápido, funcional, jamás decorativo */
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast: 100ms; --dur-base: 150ms;

  /* Sombra — SOLO para overlays/popovers reales. Nunca en cards de la grilla */
  --shadow-popover: 0 8px 24px rgba(0,0,0,0.5);
}
```

---

## 3. Las 5 no-negociables que separan élite de genérico

1. **Profundidad por surface-ladder, NO sombras.** Cards = fondo un paso más claro. Cero `shadow-md/lg/xl`.
2. **Monospace para TODO dato técnico** — IDs de run, timestamps, hashes, nombres de branch, rutas, métricas, payloads. Es el tell #1 de herramienta seria.
3. **UN acento, usado con avaricia.** Indigo solo en: botón primario, focus ring, estado "corriendo". Nada más lleva color (salvo los 4 estados de agente).
4. **13–14px base. JAMÁS 16px.** Denso, profesional. Inter en pesos 510/590, no 500/600.
5. **Bordes hairline 8% + motion <150ms.** Nada rebota, nada decora, nada hace "bounce".

---

## 4. Layout — anclado, no centrado

- **Prohibido `flex items-center justify-center` como layout principal.** Eso es el tell #1 de AI.
- Estructura de cuarto de control: **sidebar izquierda angosta** (fuentes/filtros) + **lista densa de runs** (columna principal, anclada izquierda) + **panel de detalle** (derecha, aparece al seleccionar).
- Grilla de 12 columnas. Contenido alineado a la izquierda. Números y timestamps alineados a una base monoespaciada.
- La lista de agentes/runs es el héroe — filas densas tipo Linear issues, no cards gigantes.

---

## 5. Componentes núcleo (especificados)

- **Fila de Run**: altura ~40px. `[dot estado] [nombre agente mono] [título] [fuente] [timestamp mono] [duración mono]`. Hover = `--color-hover`. Borde inferior hairline. Densa.
- **Dot de estado**: 8px. Color = estado. "Corriendo" pulsa sutil (opacity, ≤2s). El resto estático.
- **Card de aprobación**: la ÚNICA pieza con peso visual. Borde `--color-accent` a baja opacidad, fondo `--color-elevated`, botones Approve (accent) / Reject (ghost). Mono para el comando/acción propuesta.
- **Badges de estado**: pill, texto 12px, fondo = `color-mix(estado 12%, surface)`, texto = estado. Sin gradiente.
- **Botón primario**: fondo `--color-accent`, texto blanco, peso 590, radio 6px, `:active` scale 0.97, transición 100ms. Único botón con color.
- **Todo lo demás**: ghost (texto secundario, hover = surface-2).

---

## 6. Íconos

- **Lucide únicamente.** Un solo set, un solo stroke-width (1.5). Tamaño 14-16px en UI.
- Logos de marca (`@lobehub/icons` color, `react-icons/si`) SOLO para identificar la fuente del agente (Claude, Cursor, OpenAI) — en mono/pequeño, nunca grande/decorativo.
- **CERO emoji.** En ningún lado. Nunca.

---

## 7. CHECKLIST DE RECHAZO — rechazar si tiene CUALQUIERA

- [ ] Contenido principal centrado (`items-center justify-center`) sin razón funcional
- [ ] Gradiente / aurora / mesh / blob / glow decorativo
- [ ] Fondo claro (este producto es dark-first)
- [ ] Un solo emoji en cualquier parte
- [ ] `shadow-md`/`lg`/`xl` de Tailwind sin customizar, o sombra en cards de grilla
- [ ] Más de un radio de borde (todo es 6px, cards 8px)
- [ ] Más de 2 familias tipográficas, o serif para datos/reloj
- [ ] Datos técnicos (IDs, timestamps, duración) NO en monospace
- [ ] Más de 1 acento de color (fuera de los 4 estados de agente)
- [ ] `backdrop-blur`/glass sin propósito funcional
- [ ] Cards grandes con placeholder en vez de datos densos reales
- [ ] Espaciado 100% uniforme (todo `gap-4`/`p-6`) sin tensión denso/aireado
- [ ] Base tipográfica de 16px (debe ser 13-14px)
- [ ] Animación decorativa o >150ms
- [ ] Mezcla de stroke-width o sets de íconos

---

## 8. Cómo lograr que se sienta autorado

1. Tokens ANTES que JSX. Ningún valor mágico en componentes.
2. Empezar por la **vista más densa** (la lista de runs), nunca por un "hero".
3. Quitar hasta que duela. Después quitar uno más.
4. UNA decisión memorable (ej: el dot de estado pulsante, o la card de aprobación) ejecutada con precisión. Solo una.
5. Revisar contra el checklist. Si falla, no se entrega.

---

## 9. Lo que se MATA del diseño anterior (explícito)

Reloj DM Serif gigante · aurora mesh · glass ambient bar · room portals · paleta cálida light · frases diarias · cursor glow · fondo `#fafaf9`. **Todo fuera.** Eran decoración sin función. El producto nuevo es denso, oscuro, preciso, dev-grade.
