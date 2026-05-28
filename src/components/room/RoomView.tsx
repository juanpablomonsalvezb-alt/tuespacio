import { m } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'
import { useEffect, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { ToolIcon, RoomIcon, Wrench } from '@/lib/icons'

/** Descriptions per tool type — adds context to bento tiles */
const TOOL_DESCRIPTIONS: Record<string, string> = {
  claude: 'Asistente de IA',
  gemini: 'IA de Google',
  chatgpt: 'IA de OpenAI',
  notion: 'Notas y docs',
  github: 'Código y repos',
  drive: 'Archivos en la nube',
  youtube: 'Videos y tutoriales',
  spotify: 'Música y podcasts',
  calendar: 'Agenda y eventos',
  canva: 'Diseño gráfico',
}

function getToolDescription(toolId: string): string {
  return TOOL_DESCRIPTIONS[toolId] ?? 'Herramienta externa'
}

export function RoomView() {
  const rooms = useWorkspaceStore((s) => s.rooms)
  const activeRoomId = useWorkspaceStore((s) => s.activeRoomId)
  const toggleToolConnection = useWorkspaceStore((s) => s.toggleToolConnection)
  const setView = useUIStore((s) => s.setView)

  const room = rooms.find((r) => r.id === activeRoomId)

  /** Phase 1: color wipe, Phase 2: content stagger */
  const [phase, setPhase] = useState<'wipe' | 'content'>('wipe')

  useEffect(() => {
    setPhase('wipe')
    const timer = setTimeout(() => setPhase('content'), 420)
    return () => clearTimeout(timer)
  }, [activeRoomId])

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

  const handleToggleTool = (
    e: React.MouseEvent,
    toolId: string,
    toolName: string,
    wasConnected: boolean
  ) => {
    e.preventDefault()
    e.stopPropagation()
    toggleToolConnection(room.id, toolId)
    if (wasConnected) {
      toast(`${toolName} desconectada`)
    } else {
      toast.success(`${toolName} conectada`)
    }
  }

  const showContent = phase === 'content'

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-20 flex flex-col overflow-hidden"
      style={{
        backgroundColor: `color-mix(in srgb, ${room.color} 4%, var(--color-bg))`,
      }}
    >
      {/* Circle-wipe color fill */}
      <div
        className="absolute inset-0 z-0 transition-[clip-path] duration-[420ms]"
        style={{
          backgroundColor: `color-mix(in srgb, ${room.color} 4%, var(--color-bg))`,
          clipPath:
            phase === 'wipe'
              ? 'inset(40% round 20px)'
              : 'inset(0% round 0px)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Top gradient tint from room color */}
      <div
        className="absolute inset-x-0 top-0 h-[200px] z-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${room.color} 8%, transparent), transparent)`,
        }}
      />

      {/* Floating pill — back + room name */}
      <m.div
        initial={{ opacity: 0, y: -12 }}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : -12,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 32, delay: 0.05 }}
        className="relative z-10 px-8 pt-8"
      >
        <m.button
          onClick={goHome}
          className="group glass flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full cursor-pointer select-none"
          whileTap={{ scale: 0.97 }}
          whileHover={{ x: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          aria-label="Volver al inicio"
        >
          <ArrowLeft
            size={15}
            className="text-[var(--color-muted)] group-hover:text-[var(--color-text)] transition-colors duration-150"
          />
          <span
            className="flex items-center justify-center leading-none"
            style={{ color: room.color }}
            aria-hidden
          >
            <RoomIcon icon={room.icon} size={20} strokeWidth={1.7} />
          </span>
          <span className="text-sm font-medium text-[var(--color-text)]">
            {room.name}
          </span>
          <span className="text-[10px] text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ml-1">
            Esc
          </span>
        </m.button>
      </m.div>

      {/* Bento grid tools */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-8 no-scrollbar">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min">
            {room.tools.map((tool, index) => {
              const isLarge = index < 2
              return (
                <m.a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: showContent ? 1 : 0,
                    y: showContent ? 0 : 20,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 30,
                    delay: showContent ? 0.08 + index * 0.05 : 0,
                  }}
                  whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'group relative flex flex-col justify-between rounded-[var(--radius-xl)] no-underline',
                    'bg-[var(--color-surface)] border border-[var(--color-border)]',
                    'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-hover)]',
                    'cursor-pointer transition-shadow duration-200',
                    'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 outline-none',
                    isLarge
                      ? 'col-span-2 p-7 min-h-[160px]'
                      : 'col-span-1 p-5 min-h-[130px]'
                  )}
                >
                  {/* Connection dot — top right */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <m.button
                      onClick={(e) =>
                        handleToggleTool(e, tool.id, tool.name, tool.connected)
                      }
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        'relative w-8 h-[18px] rounded-full cursor-pointer transition-colors duration-200',
                        tool.connected
                          ? 'bg-[var(--color-accent)]'
                          : 'bg-[var(--color-surface-2)] border border-[var(--color-border)]'
                      )}
                      style={
                        tool.connected
                          ? { backgroundColor: room.color }
                          : undefined
                      }
                      aria-label={
                        tool.connected
                          ? `Desconectar ${tool.name}`
                          : `Conectar ${tool.name}`
                      }
                    >
                      <m.div
                        className="absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm"
                        animate={{ left: tool.connected ? 12 : 2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    </m.button>
                  </div>

                  {/* Brand logo */}
                  <div className="flex">
                    <ToolIcon id={tool.id} size={isLarge ? 40 : 32} />
                  </div>
                  <div className="mt-auto pt-3">
                    <span
                      className={cn(
                        'block font-medium text-[var(--color-text)]',
                        isLarge ? 'text-base' : 'text-sm'
                      )}
                    >
                      {tool.name}
                    </span>
                    <span className="block text-xs text-[var(--color-muted)] mt-0.5">
                      {getToolDescription(tool.id)}
                    </span>
                    <span className="block text-xs font-medium text-[var(--color-muted)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      Abrir &rarr;
                    </span>
                  </div>
                </m.a>
              )
            })}

            {/* Empty state */}
            {room.tools.length === 0 && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ delay: 0.3 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <Wrench size={40} strokeWidth={1.4} className="text-[var(--color-muted)] mb-4" />
                <p className="text-sm text-[var(--color-muted)] max-w-xs">
                  Este cuarto aún no tiene herramientas.
                </p>
              </m.div>
            )}
          </div>
        </div>
      </div>

      {/* Watermark icon — personality without clutter */}
      <div
        className="absolute bottom-[-40px] right-[-40px] select-none pointer-events-none z-0"
        style={{ transform: 'rotate(-12deg)', color: room.color, opacity: 0.05 }}
        aria-hidden
      >
        <RoomIcon icon={room.icon} size={300} strokeWidth={1} />
      </div>
    </m.div>
  )
}
