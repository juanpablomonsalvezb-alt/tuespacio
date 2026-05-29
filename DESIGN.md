# tuespacio — Constitución de Diseño v2 (LEY)

> Única fuente de verdad visual. Cada pantalla se revisa contra el checklist de rechazo antes de entregarse. Si falla un ítem, no se entrega. El diseño salió genérico antes por falta de sistema y de concepto. Ahora hay ambos.

---

## 0. Qué es el producto

**tuespacio = espacio digital pre-armado por perfil.** Primer perfil: **universitario**. El estudiante abre y su espacio YA está armado (cero página en blanco, cero `/`). Conecta sus apps existentes (calendario, Spotify, clima, Netflix, ramos) y el sistema las CRUZA en un **"aviso del día" inteligente** (motor de reglas, costo $0):

> *"Ojo — 2 certámenes la próxima semana, tu rendimiento bajó, organízate. Ese día llueve (tips). ¿Música para estudiar? Hay un documental en Netflix que complementa tu ramo."*

**El motor de crecimiento**: el espacio genera una **"Carta del día" hermosa y compartible** (formato 9:16) que el estudiante postea en studygram/TikTok → otros la ven → "quiero la mía". El producto se distribuye solo. **Si no es hermoso, no se comparte, no hay negocio. El diseño ES el producto.**

---

## 1. Dirección visual: FUSIÓN A+B = "Warm Academia con energía compartible"

Cozy pero vivo. Íntimo pero se postea. La calidez de un escritorio de madera a la hora dorada (A) + la energía expresiva y el motor viral de Gen-Z (B) — pero **toda la energía teñida en paleta cálida, NUNCA neón.**

**Regla madre de la fusión:**
- De **A** tomamos: paleta cálida, papel, serif literario, halo dorado, intimidad
- De **B** tomamos: la ESTRUCTURA (card 9:16 compartible, chips tipo sticker, sombras "presionables", micro-rebote, lo screenshot-native)
- **NUNCA** tomamos de B: los neones (`#6C4DF6`, `#FF5FA2`...). Los chips de sticker van en terracota/oro/salvia.

---

## 2. Tokens — única fuente de verdad (a `src/index.css`)

```css
@theme {
  /* ===== Fondos: papel cálido, nunca blanco puro ===== */
  --color-bg:        #F4EBDD;  /* crema papel envejecido */
  --color-bg-deep:   #EADFCB;  /* paneles bajos */
  --color-surface:   #FBF5EA;  /* card levantada */
  --color-surface-2: #F0E4D0;  /* inset / wells */

  /* Texto: tinta nogal, jamás negro puro */
  --color-text:        #3A2E25;
  --color-text-muted:  #7A6A58;
  --color-text-faint:  #A89881;

  /* Bordes: hairline tinta-de-té */
  --color-border:        #DEC9A8;
  --color-border-strong: #C9B088;

  /* Acento: terracota */
  --color-accent:       #C06B4A;
  --color-accent-hover: #A8543A;
  --color-accent-soft:  #EBD4C4;  /* chips/badges tintados */

  /* Soporte (con avaricia, solo en estados/chips) */
  --color-sage: #8A9A7B;  /* "estás libre" / calma */
  --color-gold: #D9A441;  /* sol/clima/highlight hora dorada */

  /* Tipografía: serif literario + sans moderno */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body:    'Bricolage Grotesque', system-ui, sans-serif;

  /* Escala (densa donde hay datos, aireada entre secciones) */
  --fs-greeting: 1.75rem; --fs-h1: 2.25rem; --fs-h2: 1.5rem;
  --fs-body: 1rem; --fs-meta: 0.8125rem; --fs-label: 0.72rem;

  /* Radio: generoso, suave, jamás filoso */
  --r-sm: 12px; --r-md: 16px; --r-lg: 22px; --r-pill: 999px;

  /* Sombras: cálidas (marrón, NO gris). Luz = lámpara de escritorio */
  --shadow-sm: 0 1px 2px rgba(58,46,37,.06);
  --shadow-md: 0 6px 20px -6px rgba(80,55,35,.18);
  --shadow-chunky: 4px 5px 0 var(--color-border-strong); /* de B, suavizado a cálido */
  --glow-gold: 0 0 40px -8px rgba(217,164,65,.35);

  /* Motion: rebote sutil (de B) pero contenido */
  --ease-bounce: cubic-bezier(.34, 1.4, .64, 1);
  --ease: cubic-bezier(.32,.72,0,1);
  --dur-fast: 120ms; --dur-base: 200ms;
}
```

Grano de papel ~4% sobre el fondo. Halo dorado SOLO en la card hero.

---

## 3. Las firmas (lo que lo hace inconfundible)

1. **Banda de luz dorada** (de A): gradiente radial cálido cae desde arriba-derecha detrás del saludo — sol de tarde sobre madera. `radial-gradient(120% 140% at 90% -20%, #F7E3C2, #F4EBDD 55%)` + `--glow-gold`.
2. **Línea punteada bajo títulos** (de A): `border-bottom: 1px dashed var(--color-border)` — papel de cuaderno.
3. **La "Carta del día" compartible** (de B): card 9:16 screenshot-perfect, con chips tipo sticker (countdown examen, clima, Spotify, Netflix) en tonos cálidos, contorno suave, 1 tap → exporta imagen. **ESTE es el motor viral.**
4. **Chips presionables** (de B teñido): `box-shadow: var(--shadow-chunky)`, `:active` hunde el chip. Pero en crema/terracota, no neón.

---

## 4. Tipografía con alma

- **Fraunces** (serif, cursiva en saludos): da el alma académica/literaria. Saludos, números grandes, títulos.
- **Bricolage Grotesque** (sans): UI, datos, body. Moderno, evita que se vuelva disfraz nostálgico.
- Saludo siempre en Fraunces cursiva: *"Buenas tardes, Juan"*.

---

## 5. CHECKLIST DE RECHAZO — rechazar si tiene CUALQUIERA

- [ ] Fondo blanco puro `#FFFFFF` o negro puro (debe ser papel cálido)
- [ ] Color neón / saturado frío (violeta `#6C4DF6`, etc) — los chips van en cálido
- [ ] Sombra gris (debe ser cálida marrón) o `shadow-md/lg/xl` de Tailwind crudo
- [ ] Emoji usado como ícono de sistema (los emoji SOLO permitidos dentro de la Carta compartible como stickers expresivos)
- [ ] Más de un radio base mezclado sin criterio
- [ ] Datos técnicos sin jerarquía / sin la línea punteada de cuaderno en títulos
- [ ] La Carta del día NO se ve screenshot-worthy (si no da ganas de postearla, está mal)
- [ ] Más de: 1 acento (terracota) + 2 soportes (salvia, oro). Nada de arcoíris
- [ ] Layout centrado vacío sin contenido real (debe haber datos del estudiante)
- [ ] Serif usado para body/datos (Fraunces solo display/saludo)
- [ ] Animación >200ms o decorativa sin función
- [ ] Se siente corporate/SaaS genérico en vez de "escritorio de estudiante"

---

## 6. Cómo lograr que se sienta autorado

1. Tokens antes que JSX.
2. Empezar por la **Carta del día** (el corazón + el motor viral), no por un hero vacío.
3. Quitar hasta que duela.
4. La prueba final de cada pantalla: **¿un universitario haría screenshot de esto y lo postearía?** Si no → no está listo.

---

## 7. Lo que se MATA del diseño anterior

Reloj DM Serif gigante centrado · aurora mesh genérica · glass ambient bar · room portals vacíos · paleta fría/gris · cursor glow · íconos emoji de sistema · todo lo "agent control room" (ese pivote murió). El producto ahora es: **espacio de estudiante, cálido, con aviso inteligente y carta compartible.**
