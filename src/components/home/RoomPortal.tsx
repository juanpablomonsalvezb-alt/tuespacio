import { m } from 'motion/react'
import type { Room } from '@/types'
import { cn } from '@/lib/utils'

interface RoomPortalProps {
  room: Room
  onSelect: (id: string) => void
}

export function RoomPortal({ room, onSelect }: RoomPortalProps) {
  const connectedCount = room.tools.filter((t) => t.connected).length
  const isActive = room.status === 'active'

  return (
    <m.button
      onClick={() => onSelect(room.id)}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] cursor-pointer',
        'transition-shadow duration-300 select-none outline-none',
        'hover:shadow-[var(--shadow-hover)]',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40'
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${room.color} 8%, var(--color-surface))`,
      }}
    >
      {/* Icon container */}
      <div
        className="relative flex items-center justify-center w-16 h-16 rounded-2xl text-3xl"
        style={{
          backgroundColor: `color-mix(in srgb, ${room.color} 14%, var(--color-surface))`,
        }}
      >
        {room.icon}

        {/* Active pulse indicator */}
        {isActive && (
          <span
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full status-pulse"
            style={{ backgroundColor: room.color }}
          />
        )}
      </div>

      {/* Room name */}
      <span className="text-sm font-medium text-[var(--color-text)] leading-tight text-center max-w-[100px] truncate">
        {room.name}
      </span>

      {/* Tool dots / connected count */}
      <div className="flex items-center gap-1.5">
        {connectedCount > 0 ? (
          <>
            {room.tools
              .filter((t) => t.connected)
              .slice(0, 3)
              .map((t) => (
                <span
                  key={t.id}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: room.color, opacity: 0.7 }}
                />
              ))}
            {connectedCount > 3 && (
              <span className="text-[10px] text-[var(--color-muted)] leading-none">
                +{connectedCount - 3}
              </span>
            )}
          </>
        ) : (
          <span className="text-[10px] text-[var(--color-muted)] leading-none">
            {room.tools.length} {room.tools.length === 1 ? 'herramienta' : 'herramientas'}
          </span>
        )}
      </div>
    </m.button>
  )
}
