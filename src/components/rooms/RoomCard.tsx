import { motion } from 'motion/react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { Room } from '@/types'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'
import { timeAgo, cn } from '@/lib/utils'

interface RoomCardProps {
  room: Room
  isActive: boolean
}

export function RoomCard({ room, isActive }: RoomCardProps) {
  const { setActiveRoom, deleteRoom } = useWorkspaceStore()
  const { openEditRoom } = useUIStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <motion.div
      layout
      layoutId={`room-${room.id}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative rounded-[var(--radius-lg)] border overflow-hidden cursor-pointer group',
        'bg-[var(--color-surface)] transition-colors duration-200',
        isActive
          ? 'border-[var(--color-accent)]/40 shadow-[0_0_0_1px_var(--color-accent)/20]'
          : 'border-[var(--color-border)] hover:border-white/15'
      )}
      onClick={() => setActiveRoom(room.id)}
    >
      {/* Color stripe */}
      <div
        className="h-0.5 w-full flex-shrink-0"
        style={{ backgroundColor: room.color }}
      />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{room.icon}</span>
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text)] leading-tight">
                {room.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={cn(
                    'text-[10px]',
                    room.status === 'active'
                      ? 'text-emerald-400'
                      : 'text-[var(--color-muted)]'
                  )}
                >
                  {room.status === 'active'
                    ? 'Activo ahora'
                    : room.status === 'silenced'
                    ? 'Silenciado'
                    : timeAgo(room.lastActivity)}
                </span>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
              className="opacity-0 group-hover:opacity-100 h-6 w-6 rounded flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/10 transition-all cursor-pointer"
            >
              <MoreHorizontal size={14} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-7 z-20 w-36 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[var(--radius-md)] py-1 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => { openEditRoom(room.id); setMenuOpen(false) }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-[var(--color-text)] hover:bg-white/05 cursor-pointer"
                >
                  <Pencil size={12} />
                  Editar cuarto
                </button>
                <button
                  onClick={() => { deleteRoom(room.id); setMenuOpen(false) }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <Trash2 size={12} />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tools */}
        {room.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {room.tools.slice(0, 4).map((tool) => (
              <div
                key={tool.id}
                className={cn(
                  'flex items-center gap-1 h-5 px-1.5 rounded-full text-[10px]',
                  tool.connected
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]'
                )}
              >
                <span>{tool.icon}</span>
                <span>{tool.name}</span>
              </div>
            ))}
            {room.tools.length > 4 && (
              <div className="flex items-center h-5 px-1.5 rounded-full text-[10px] bg-[var(--color-surface-2)] text-[var(--color-muted)] border border-[var(--color-border)]">
                +{room.tools.length - 4}
              </div>
            )}
          </div>
        )}

        {room.tools.length === 0 && (
          <div className="text-[10px] text-[var(--color-muted)]">Sin herramientas</div>
        )}
      </div>

      {/* Active glow */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[var(--radius-lg)] opacity-5"
          style={{ background: `radial-gradient(circle at 50% 0%, ${room.color}, transparent 70%)` }}
        />
      )}
    </motion.div>
  )
}
