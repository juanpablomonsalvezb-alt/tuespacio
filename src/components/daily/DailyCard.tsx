import { m } from 'motion/react'
import {
  CalendarClock,
  CloudRain,
  Headphones,
  Clapperboard,
  Share2,
} from 'lucide-react'

/* ---- Datos simulados (luego vendrán de las conexiones reales) ---- */
const DATA = {
  name: 'Juan',
  greeting: 'Buenas tardes',
  date: 'Jueves 28 de mayo',
  exams: [
    { ramo: 'Cálculo II', dias: 3 },
    { ramo: 'Historia del Arte', dias: 5 },
  ],
  performanceNote: 'Tu ritmo de estudio bajó esta semana — vale la pena retomar.',
  weather: { label: 'Lluvia', temp: 12, tip: 'Día perfecto para encerrarte a repasar.' },
  music: { playlist: 'Lofi para concentrarse', tracks: 42 },
  doc: { title: 'El dilema de las redes', match: 'complementa Historia del Arte' },
}

/* Chip presionable estilo B, teñido cálido */
function StickerChip({
  icon,
  label,
  tone = 'accent',
}: {
  icon: React.ReactNode
  label: string
  tone?: 'accent' | 'sage' | 'gold'
}) {
  const bg =
    tone === 'sage'
      ? 'var(--color-sage-soft)'
      : tone === 'gold'
        ? 'var(--color-gold-soft)'
        : 'var(--color-accent-soft)'
  const fg =
    tone === 'sage'
      ? 'var(--color-sage)'
      : tone === 'gold'
        ? '#9A7420'
        : 'var(--color-accent)'
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[12px] font-semibold"
      style={{ backgroundColor: bg, color: fg }}
    >
      {icon}
      {label}
    </span>
  )
}

export function DailyCard() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-5">
      {/* La Carta — formato vertical, screenshot-worthy */}
      <m.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="w-[380px] max-w-[92vw] rounded-[var(--radius-xl)] overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header con banda dorada */}
        <div className="golden-band px-7 pt-7 pb-5" style={{ boxShadow: 'var(--glow-gold)' }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Tu día · {DATA.date}
          </p>
          <h1
            className="font-display text-[var(--color-text)] leading-[1.1] mt-2"
            style={{ fontSize: '1.9rem', fontStyle: 'italic', fontWeight: 500 }}
          >
            {DATA.greeting}, {DATA.name}.
          </h1>
          <p className="font-display text-[var(--color-accent)] mt-1" style={{ fontSize: '1.05rem' }}>
            Quedan {DATA.exams[0].dias} días para {DATA.exams[0].ramo}.
          </p>
        </div>

        {/* Cuerpo */}
        <div className="px-7 py-6 flex flex-col gap-5">
          {/* Próximos certámenes */}
          <section>
            <h2 className="notebook-rule pb-1.5 mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
              <CalendarClock size={14} className="text-[var(--color-accent)]" />
              Próximos certámenes
            </h2>
            <div className="flex flex-wrap gap-2">
              {DATA.exams.map((e) => (
                <StickerChip
                  key={e.ramo}
                  icon={<span className="font-bold">{e.dias}d</span>}
                  label={e.ramo}
                  tone="accent"
                />
              ))}
            </div>
            <p className="text-[13px] text-[var(--color-text-muted)] mt-2.5 leading-snug">
              {DATA.performanceNote}
            </p>
          </section>

          {/* Clima */}
          <section>
            <h2 className="notebook-rule pb-1.5 mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
              <CloudRain size={14} className="text-[var(--color-sage)]" />
              Hoy: {DATA.weather.label} · {DATA.weather.temp}°
            </h2>
            <p className="text-[13px] text-[var(--color-text-muted)] leading-snug">
              {DATA.weather.tip}
            </p>
          </section>

          {/* Música + Documental */}
          <section className="flex flex-col gap-3">
            <div
              className="flex items-center gap-3 p-3 rounded-[var(--radius-md)]"
              style={{ backgroundColor: 'var(--color-surface-2)' }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] flex-shrink-0"
                style={{ backgroundColor: 'var(--color-sage-soft)', color: 'var(--color-sage)' }}
              >
                <Headphones size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[var(--color-text)] truncate">
                  {DATA.music.playlist}
                </p>
                <p className="text-[11px] text-[var(--color-text-faint)]">
                  {DATA.music.tracks} canciones · para concentrarte
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-[var(--radius-md)]"
              style={{ backgroundColor: 'var(--color-surface-2)' }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] flex-shrink-0"
                style={{ backgroundColor: 'var(--color-gold-soft)', color: '#9A7420' }}
              >
                <Clapperboard size={17} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[var(--color-text)] truncate">
                  {DATA.doc.title}
                </p>
                <p className="text-[11px] text-[var(--color-text-faint)]">
                  Netflix · {DATA.doc.match}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Firma inferior */}
        <div
          className="px-7 py-3 flex items-center justify-between"
          style={{ borderTop: '1px dashed var(--color-border)' }}
        >
          <span className="font-display text-[15px] italic text-[var(--color-text)]">
            tuespacio
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-faint)]">
            Universitario
          </span>
        </div>
      </m.div>

      {/* Botón compartir — chunky presionable, teñido cálido */}
      <m.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 24 }}
        whileTap={{ x: 4, y: 5, boxShadow: '0 0 0 var(--color-border-strong)' }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-pill)] font-semibold text-[14px] cursor-pointer"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: '#FBF5EA',
          boxShadow: 'var(--shadow-chunky)',
        }}
      >
        <Share2 size={15} />
        Compartir mi día
      </m.button>
    </div>
  )
}
