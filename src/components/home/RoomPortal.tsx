import { m } from 'motion/react'
import type { Room } from '@/types'
import { cn } from '@/lib/utils'
import { RoomIcon } from '@/lib/icons'

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
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'flex flex-col items-center gap-3 p-5 rounded-[var(--radius-xl)] cursor-pointer',
        'select-none outline-none',
        'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40'
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${room.color} 6%, var(--color-bg))`,
      }}
    >
      {/* Icon container */}
      <div
        className="relative flex items-center justify-center w-16 h-16 rounded-2xl shadow-sm"
        style={{
          backgroundColor: `color-mix(in srgb, ${room.color} 12%, var(--color-surface))`,
          boxShadow: `0 2px 8px color-mix(in srgb, ${room.color} 15%, transparent)`,
          color: room.color,
        }}
      >
        <RoomIcon icon={room.icon} size={26} strokeWidth={1.6} />

        {/* Active pulse indicator */}
        {isActive && (
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-[var(--color-bg)]"
            style={{ backgroundColor: room.color }}
          >
            <span
              className="absolute inset-0 rounded-full status-pulse"
              style={{ backgroundColor: room.color }}
            />
          </span>
        )}
      </div>

      {/* Room name */}
      <span className="text-[13px] font-medium text-[var(--color-text)] leading-tight text-center max-w-[100px]">
        {room.name}
      </span>

      {/* Tool dots / connected count */}
      <div className="flex items-center gap-1.5">
        {connectedCount > 0 ? (
          <>
            {room.tools
              .filter((t) => t.connected)
              .slice(0, 4)
              .map((t) => (
                <span
                  key={t.id}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: room.color, opacity: 0.6 }}
                />
              ))}
            {connectedCount > 4 && (
              <span className="text-[10px] text-[var(--color-muted)] leading-none ml-0.5">
                +{connectedCount - 4}
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
