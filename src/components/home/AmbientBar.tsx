import { m } from 'motion/react'
import { Settings, Music, Wifi } from 'lucide-react'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'

export function AmbientBar() {
  const rooms = useWorkspaceStore((s) => s.rooms)
  const openSettings = useUIStore((s) => s.openSettings)

  const totalConnected = rooms.reduce(
    (acc, r) => acc + r.tools.filter((t) => t.connected).length,
    0
  )

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="glass flex items-center gap-3 px-5 py-2.5 rounded-full">
        {/* Music status */}
        <div className="flex items-center gap-2 text-[var(--color-muted)]">
          <Music size={14} />
          <span className="text-xs">Sin reproduccion</span>
        </div>

        {/* Separator */}
        <div className="w-px h-3.5 bg-[var(--color-border)]" />

        {/* Connections */}
        <div className="flex items-center gap-2 text-[var(--color-muted)]">
          <Wifi size={14} />
          <span className="text-xs">
            {totalConnected} {totalConnected === 1 ? 'activa' : 'activas'}
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-3.5 bg-[var(--color-border)]" />

        {/* Settings */}
        <button
          onClick={openSettings}
          className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer p-1"
          aria-label="Configuracion"
        >
          <Settings size={14} />
        </button>
      </div>
    </m.div>
  )
}
