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

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'Buenos días'
  if (hour >= 12 && hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function parseTime(timeStr: string): { hours: string; minutes: string; suffix: string } {
  // timeStr is like "4:17 p. m." or "11:51 a. m." from useClock
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
      <div className="flex flex-col items-center gap-2 -mt-12">
        {/* Clock — NumberFlow animated digits */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.05 }}
          className="font-display text-8xl sm:text-9xl text-[var(--color-text)] leading-none tracking-tight flex items-baseline"
        >
          <NumberFlow
            value={parseInt(hours) || 0}
            format={{ minimumIntegerDigits: 1 }}
            transformTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            spinTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
          <span className="mx-1 opacity-40">:</span>
          <NumberFlow
            value={parseInt(minutes) || 0}
            format={{ minimumIntegerDigits: 2 }}
            transformTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            spinTiming={{ duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
          {suffix && (
            <span className="text-lg sm:text-xl font-sans font-light text-[var(--color-muted)] ml-2 self-end mb-2">
              {suffix}
            </span>
          )}
        </m.div>

        {/* Greeting + weather row */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
          className="flex items-center gap-3 mt-3"
        >
          <span className="text-xl sm:text-2xl font-light text-[var(--color-text-secondary)]">
            {greeting}
            {userName ? `, ${userName}` : ''}
          </span>

          {weatherInfo && weather && (
            <>
              <span className="w-px h-5 bg-[var(--color-border)]" />
              <span className="flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                <span>{weatherInfo.emoji}</span>
                <span>{weather.temperature}&deg;</span>
              </span>
            </>
          )}
        </m.div>

        {/* Date */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm text-[var(--color-muted)] capitalize mt-0.5"
        >
          {date}
        </m.div>

        {/* Room portals — staggered 50ms per Emil */}
        <div className="flex items-start gap-2 sm:gap-4 mt-14 flex-wrap justify-center max-w-2xl">
          {rooms.map((room, index) => (
            <m.div
              key={room.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 28,
                delay: 0.35 + index * 0.05,
              }}
            >
              <RoomPortal room={room} onSelect={handleRoomSelect} />
            </m.div>
          ))}

          {/* Add room button */}
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28,
              delay: 0.35 + rooms.length * 0.05,
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
              <span className="text-sm font-medium text-[var(--color-muted)]">Nuevo</span>
            </m.button>
          </m.div>
        </div>

        {/* Search hint */}
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={openCommandPalette}
          className="mt-12 text-xs text-[var(--color-muted)] hover:text-[var(--color-text-secondary)] transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
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
