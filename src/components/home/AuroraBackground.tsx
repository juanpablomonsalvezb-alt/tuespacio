import { useUserStore } from '@/stores/useUserStore'

/**
 * Aurora background — large, soft, slowly-drifting gradient blobs.
 * Visible but calm. GPU-composited (transform/opacity only).
 * Palette derives from the user accent + warm complements.
 * Frozen by prefers-reduced-motion via CSS.
 */
export function AuroraBackground() {
  const accent = useUserStore((s) => s.accentColor)

  return (
    <div className="aurora pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <span
        className="aurora-blob aurora-blob-1"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 65%)` }}
      />
      <span
        className="aurora-blob aurora-blob-2"
        style={{ background: 'radial-gradient(circle, #b6c9e0 0%, transparent 65%)' }}
      />
      <span
        className="aurora-blob aurora-blob-3"
        style={{ background: 'radial-gradient(circle, #e0c4d4 0%, transparent 65%)' }}
      />
      <span
        className="aurora-blob aurora-blob-4"
        style={{ background: 'radial-gradient(circle, #c9dcc4 0%, transparent 65%)' }}
      />
    </div>
  )
}
