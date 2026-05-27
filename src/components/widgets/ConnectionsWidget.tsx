import { ExternalLink } from 'lucide-react'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { cn } from '@/lib/utils'

export function ConnectionsWidget() {
  const { rooms } = useWorkspaceStore()

  const allTools = rooms.flatMap((room) =>
    room.tools.map((tool) => ({ ...tool, roomName: room.name, roomColor: room.color }))
  )

  if (allTools.length === 0) {
    return (
      <div className="px-4 py-3">
        <p className="text-xs text-[var(--color-muted)]">Sin herramientas conectadas</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-2 flex flex-col gap-1.5">
      {allTools.slice(0, 6).map((tool, i) => (
        <div
          key={`${tool.id}-${i}`}
          className="flex items-center gap-2 py-1"
        >
          <div className="relative flex-shrink-0">
            <span className="text-sm">{tool.icon}</span>
            <span
              className={cn(
                'absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full',
                tool.connected ? 'bg-emerald-500 status-pulse' : 'bg-[var(--color-muted)]'
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs text-[var(--color-text)] truncate">{tool.name}</span>
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: tool.roomColor }}
              />
            </div>
            <div className="text-[10px] text-[var(--color-muted)] truncate">{tool.roomName}</div>
          </div>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <ExternalLink size={10} />
          </a>
        </div>
      ))}
    </div>
  )
}
