import { motion } from 'motion/react'
import { useClock } from '@/hooks/useClock'
import { useUserStore } from '@/stores/useUserStore'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { RoomGrid } from '@/components/rooms/RoomGrid'
import { UnifiedSearch } from '@/components/search/UnifiedSearch'

function getGreeting(hour: number): string {
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

export function MainArea() {
  const { name } = useUserStore()
  const { rooms, activeRoomId } = useWorkspaceStore()
  const { date } = useClock()

  const hour = new Date().getHours()
  const greeting = getGreeting(hour)
  const activeRoom = rooms.find((r) => r.id === activeRoomId)

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl text-[var(--color-text)] leading-tight">
          {greeting}{name ? `, ${name}` : ''}.
        </h1>
        <p className="text-sm text-[var(--color-muted)] mt-1.5 capitalize">{date}</p>

        {activeRoom && (
          <div className="flex items-center gap-2 mt-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeRoom.color }}
            />
            <span className="text-xs text-[var(--color-muted)]">
              Cuarto activo:{' '}
              <span className="text-[var(--color-text)]">
                {activeRoom.icon} {activeRoom.name}
              </span>
            </span>
          </div>
        )}
      </motion.div>

      {/* Unified Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        className="mb-8"
      >
        <UnifiedSearch />
      </motion.div>

      {/* Room Grid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
      >
        <RoomGrid />
      </motion.div>
    </main>
  )
}
