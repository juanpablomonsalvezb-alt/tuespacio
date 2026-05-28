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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.7 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="glass flex items-center gap-3 px-5 py-2.5 rounded-full">
        {/* Music status */}
        <div className="flex items-center gap-2 text-[var(--color-muted)]">
          <Music size={13} />
          <span className="text-xs">Sin reproducción</span>
        </div>

        {/* Separator */}
        <div className="w-px h-3 bg-[var(--color-border)]" />

        {/* Connections */}
        <div className="flex items-center gap-2 text-[var(--color-muted)]">
          <Wifi size={13} />
          <span className="text-xs">
            {totalConnected} {totalConnected === 1 ? 'activa' : 'activas'}
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-3 bg-[var(--color-border)]" />

        {/* Settings */}
        <m.button
          onClick={openSettings}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150 cursor-pointer p-1"
          aria-label="Configuración"
        >
          <Settings size={13} />
        </m.button>
      </div>
    </m.div>
  )
}
