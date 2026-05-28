import { m } from 'motion/react'
import { Plus } from 'lucide-react'
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
  if (hour >= 6 && hour < 12) return 'Buenos dias'
  if (hour >= 12 && hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
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

  const handleRoomSelect = (id: string) => {
    setActiveRoom(id)
    setView('room')
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 select-none overflow-hidden">
      {/* Main centered content */}
      <div className="flex flex-col items-center gap-2 -mt-12">
        {/* Clock */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.05 }}
          className="font-display text-8xl sm:text-9xl text-[var(--color-text)] leading-none tracking-tight"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {time}
        </m.div>

        {/* Greeting + weather row */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
          className="flex items-center gap-3 mt-2"
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
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-sm text-[var(--color-muted)] capitalize mt-0.5"
        >
          {date}
        </m.div>

        {/* Room portals */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.35 }}
          className="flex items-start gap-2 sm:gap-4 mt-12 flex-wrap justify-center max-w-2xl"
        >
          {rooms.map((room) => (
            <RoomPortal
              key={room.id}
              room={room}
              onSelect={handleRoomSelect}
            />
          ))}

          {/* Add room button */}
          <m.button
            onClick={openCreateRoom}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] cursor-pointer select-none outline-none hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-surface-2)] border border-dashed border-[var(--color-border-strong)]">
              <Plus size={24} className="text-[var(--color-muted)]" />
            </div>
            <span className="text-sm font-medium text-[var(--color-muted)]">Nuevo</span>
          </m.button>
        </m.div>

        {/* Search hint */}
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          onClick={openCommandPalette}
          className="mt-10 text-xs text-[var(--color-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[10px] font-mono font-medium">
            ⌘K
          </kbd>
          <span>para buscar</span>
        </m.button>
      </div>

      {/* Ambient bar */}
      <AmbientBar />
    </div>
  )
}
