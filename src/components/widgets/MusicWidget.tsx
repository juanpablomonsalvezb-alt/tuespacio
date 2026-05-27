import { Music, ExternalLink } from 'lucide-react'

export function MusicWidget() {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
          <Music size={16} className="text-[var(--color-muted)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-[var(--color-muted)]">Sin reproducción</div>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-accent)] hover:opacity-80 flex items-center gap-1 mt-0.5 cursor-pointer"
          >
            Conectar Spotify
            <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </div>
  )
}
