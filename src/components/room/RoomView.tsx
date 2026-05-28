import { m } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'
import { useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

export function RoomView() {
  const rooms = useWorkspaceStore((s) => s.rooms)
  const activeRoomId = useWorkspaceStore((s) => s.activeRoomId)
  const toggleToolConnection = useWorkspaceStore((s) => s.toggleToolConnection)
  const setView = useUIStore((s) => s.setView)

  const room = rooms.find((r) => r.id === activeRoomId)

  const goHome = useCallback(() => {
    setView('home')
  }, [setView])

  // Escape key to go back home
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        goHome()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goHome])

  if (!room) return null

  const handleToggleTool = (toolId: string, toolName: string, wasConnected: boolean) => {
    toggleToolConnection(room.id, toolId)
    if (wasConnected) {
      toast(`${toolName} desconectada`)
    } else {
      toast.success(`${toolName} conectada`)
    }
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-20 flex flex-col"
      style={{
        backgroundColor: `color-mix(in srgb, ${room.color} 3%, var(--color-bg))`,
      }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-4 px-8 pt-8 pb-4">
        <m.button
          onClick={goHome}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150 cursor-pointer"
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={18} />
        </m.button>

        <div className="flex items-center gap-3">
          <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.1 }}
            className="flex items-center justify-center w-12 h-12 rounded-2xl text-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${room.color} 14%, var(--color-surface))`,
              boxShadow: `0 2px 8px color-mix(in srgb, ${room.color} 12%, transparent)`,
            }}
          >
            {room.icon}
          </m.div>
          <div>
            <h1 className="font-display text-2xl text-[var(--color-text)] leading-tight">
              {room.name}
            </h1>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              {room.tools.length} {room.tools.length === 1 ? 'herramienta' : 'herramientas'}
              {' · '}
              {room.tools.filter((t) => t.connected).length} conectadas
            </p>
          </div>
        </div>
      </div>

      {/* Tools grid — staggered entry per Emil (50ms) */}
      <div className="flex-1 overflow-y-auto px-8 py-6 no-scrollbar">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {room.tools.map((tool, index) => (
              <m.a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 28,
                  delay: 0.1 + index * 0.05,
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'flex flex-col items-center gap-3 p-6 rounded-[var(--radius-xl)]',
                  'bg-[var(--color-surface)] border border-[var(--color-border)]',
                  'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-hover)]',
                  'cursor-pointer no-underline',
                  'transition-shadow duration-200',
                  'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 outline-none'
                )}
              >
                <span className="text-4xl">{tool.icon}</span>
                <span className="text-sm font-medium text-[var(--color-text)]">
                  {tool.name}
                </span>

                {/* Connection toggle */}
                <m.button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleToggleTool(tool.id, tool.name, tool.connected)
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer',
                    'transition-colors duration-150',
                    tool.connected
                      ? 'text-white'
                      : 'bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  )}
                  style={
                    tool.connected
                      ? { backgroundColor: room.color }
                      : undefined
                  }
                >
                  {tool.connected ? 'Conectada' : 'Conectar'}
                </m.button>
              </m.a>
            ))}

            {/* Empty state */}
            {room.tools.length === 0 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="col-span-full flex flex-col items-center justify-center py-16 text-center"
              >
                <span className="text-5xl mb-4">🔧</span>
                <p className="text-sm text-[var(--color-muted)] max-w-xs">
                  Este cuarto aún no tiene herramientas. Agrega herramientas desde la configuración del cuarto.
                </p>
              </m.div>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center pb-6"
      >
        <span className="text-[11px] text-[var(--color-muted)]">
          Esc para volver al inicio
        </span>
      </m.div>
    </m.div>
  )
}
