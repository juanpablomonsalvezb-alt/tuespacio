import { useMemo } from 'react'
import { m } from 'motion/react'
import { Plus } from 'lucide-react'
import NumberFlow from '@number-flow/react'
import { useClock } from '@/hooks/useClock'
import { useWeather } from '@/hooks/useWeather'
import { useUserStore } from '@/stores/useUserStore'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'
import { getWeatherDescription } from '@/lib/weather'
import { RoomPortal } from './RoomPortal'
import { AmbientBar } from './AmbientBar'

const MICRO_PHRASES = [
  'Tu espacio, tus reglas.',
  'Las herramientas te esperan.',
  'Todo comienza aquí.',
  'Un paso a la vez.',
  'Crea algo increíble.',
  'El momento es ahora.',
  'Construye sin límites.',
  'Tu ritmo, tu camino.',
]

function getDailyPhrase(): string {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return MICRO_PHRASES[seed % MICRO_PHRASES.length]
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'Buenos días'
  if (hour >= 12 && hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function parseTime(timeStr: string): { hours: string; minutes: string; suffix: string } {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(.*)$/)
  if (!match) return { hours: '', minutes: '', suffix: '' }
  return { hours: match[1], minutes: match[2], suffix: match[3] }
}

export function HomeCanvas() {
  const { time, date } = useClock()
  const { data: weather } = useWeather()
  const userName = useUserStore((s) => s.name)
  const rooms = useWorkspaceStore((s) => s.rooms)
  const setActiveRoom = useWorkspaceStore((s) => s.setActiveRoom)
  const setView = useUIStore((s) => s.setView)
  const openCreateRoom = useUIStore((s) => s.openCreateRoom)
  const openCommandPalette = useUIStore((s) => s.openCommandPalette)

  const greeting = getGreeting()
  const weatherInfo = weather ? getWeatherDescription(weather.weatherCode) : null
  const { hours, minutes, suffix } = parseTime(time)
  const dailyPhrase = useMemo(() => getDailyPhrase(), [])

  const handleRoomSelect = (id: string) => {
    setActiveRoom(id)
    setView('room')
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col items-center justify-center h-full px-6 select-none overflow-hidden"
    >
      {/* Main centered content */}
      <div className="flex flex-col items-center -mt-8">
        {/* Clock — MASSIVE, DM Serif Display, NumberFlow animated digits */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.05 }}
          className="font-display text-[8rem] sm:text-[10rem] lg:text-[12rem] text-[var(--color-text)] leading-none tracking-tight flex items-baseline"
        >
          <NumberFlow
            value={parseInt(hours) || 0}
            format={{ minimumIntegerDigits: 1 }}
            transformTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            spinTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
          <span className="mx-1 colon-pulse">:</span>
          <NumberFlow
            value={parseInt(minutes) || 0}
            format={{ minimumIntegerDigits: 2 }}
            transformTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            spinTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
          {suffix && (
            <span className="text-lg sm:text-xl font-sans font-light text-[var(--color-muted)] ml-2.5 self-end mb-4">
              {suffix}
            </span>
          )}
        </m.div>

        {/* Greeting — elegant, light weight */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
          className="text-xl sm:text-2xl font-light text-[var(--color-text-secondary)] mt-2"
        >
          <span>
            {greeting}
            {userName ? `, ${userName}` : ''}
          </span>
          <span className="cursor-blink ml-0.5 text-[var(--color-accent)]">|</span>
        </m.div>

        {/* Date + Weather — one integrated line, muted */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-2.5 text-sm text-[var(--color-muted)] capitalize mt-2"
        >
          <span>{date}</span>
          {weatherInfo && weather && (
            <>
              <span className="text-[var(--color-border-strong)]">/</span>
              <span className="flex items-center gap-1.5">
                <span>{weatherInfo.emoji}</span>
                <span>{weather.temperature}&deg;</span>
              </span>
            </>
          )}
        </m.div>

        {/* Daily micro-phrase */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xs text-[var(--color-muted)] mt-3 tracking-wide italic"
          style={{ opacity: 0.6 }}
        >
          {dailyPhrase}
        </m.p>

        {/* Section divider — "Cuartos" label */}
        <m.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center mt-20"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
            Cuartos
          </span>
          <div className="w-48 h-px bg-[var(--color-border)]" />
        </m.div>

        {/* Room portals — staggered 50ms per Emil */}
        <div className="flex items-start gap-3 sm:gap-5 mt-8 flex-wrap justify-center max-w-2xl">
          {rooms.map((room, index) => (
            <m.div
              key={room.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 28,
                delay: 0.45 + index * 0.05,
              }}
            >
              <RoomPortal room={room} onSelect={handleRoomSelect} />
            </m.div>
          ))}

          {/* Add room button — matches portal style */}
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28,
              delay: 0.45 + rooms.length * 0.05,
            }}
          >
            <m.button
              onClick={openCreateRoom}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] cursor-pointer select-none outline-none hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-surface-2)] border border-dashed border-[var(--color-border-strong)]">
                <Plus size={24} className="text-[var(--color-muted)]" />
              </div>
              <span className="text-[13px] font-medium text-[var(--color-muted)]">Nuevo</span>
            </m.button>
          </m.div>
        </div>

        {/* Command palette hint */}
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={openCommandPalette}
          className="mt-16 text-xs text-[var(--color-muted)] hover:text-[var(--color-text-secondary)] cursor-pointer flex items-center gap-1.5"
          style={{ opacity: 0.5, transition: 'color 0.2s, opacity 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5' }}
        >
          <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[10px] font-mono font-medium">
            ⌘K
          </kbd>
          <span>para buscar</span>
        </m.button>
      </div>

      {/* Ambient bar */}
      <AmbientBar />
    </m.div>
  )
}
