import { motion } from 'motion/react'
import { Settings, Plus, Zap } from 'lucide-react'
import { useClock } from '@/hooks/useClock'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUserStore } from '@/stores/useUserStore'
import { useUIStore } from '@/stores/useUIStore'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function TopBar() {
  const { time } = useClock()
  const { rooms, activeRoomId, setActiveRoom } = useWorkspaceStore()
  const { spaceName } = useUserStore()
  const { openSettings, openCreateRoom } = useUIStore()

  const activeConnections = rooms
    .flatMap((r) => r.tools)
    .filter((t) => t.connected).length

  return (
    <header className="flex items-center h-12 px-4 gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex-shrink-0 z-30">
      <div className="flex items-center gap-2 mr-2">
        <span className="font-display text-[var(--color-accent-text)] text-base leading-none tracking-tight">
          {spaceName}
        </span>
      </div>

      <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
        {rooms.map((room) => (
          <motion.button
            key={room.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveRoom(room.id)}
            className={cn(
              'flex items-center gap-1.5 h-7 px-2.5 rounded-[var(--radius-sm)] text-xs whitespace-nowrap transition-all duration-150 cursor-pointer',
              activeRoomId === room.id
                ? 'bg-[var(--color-surface-2)] text-[var(--color-text)] shadow-[var(--shadow-sm)] font-medium'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)]'
            )}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: room.color }}
            />
            <span>{room.icon}</span>
            <span>{room.name}</span>
            {room.status === 'active' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-pulse" />
            )}
          </motion.button>
        ))}

        <Button variant="ghost" size="icon" onClick={openCreateRoom} className="h-7 w-7 flex-shrink-0 ml-1">
          <Plus size={13} />
        </Button>
      </div>

      <div className="flex items-center gap-3 ml-auto flex-shrink-0">
        {activeConnections > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{activeConnections} activa{activeConnections !== 1 ? 's' : ''}</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-[var(--color-muted)] font-mono tabular-nums">
          {time}
        </div>

        <Button variant="ghost" size="icon" onClick={openSettings} className="h-7 w-7">
          <Settings size={14} />
        </Button>
      </div>
    </header>
  )
}
