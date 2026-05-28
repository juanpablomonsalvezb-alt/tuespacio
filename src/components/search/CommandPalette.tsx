import { useState, useRef, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { Search } from 'lucide-react'
import { SEARCH_ENGINES } from '@/lib/constants'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'
import { cn } from '@/lib/utils'
import { ToolIcon } from '@/lib/icons'
import type { SearchEngine } from '@/types'

export function CommandPalette() {
  const commandPaletteOpen = useUIStore((s) => s.commandPaletteOpen)
  const closeCommandPalette = useUIStore((s) => s.closeCommandPalette)
  const { activeRoomId, roomSessions, setLastSearchEngine, rooms } = useWorkspaceStore()

  const currentSession = activeRoomId ? roomSessions[activeRoomId] : null
  const activeRoom = activeRoomId ? rooms.find((r) => r.id === activeRoomId) : null

  const [query, setQuery] = useState('')
  const [selectedEngineId, setSelectedEngineId] = useState<SearchEngine>(
    currentSession?.lastSearchEngine ?? 'claude'
  )
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync engine from session when palette opens
  useEffect(() => {
    if (commandPaletteOpen) {
      const engine = currentSession?.lastSearchEngine ?? 'claude'
      setSelectedEngineId(engine)
      setQuery('')
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [commandPaletteOpen, currentSession?.lastSearchEngine])

  const selectedEngine = SEARCH_ENGINES.find((e) => e.id === selectedEngineId) ?? SEARCH_ENGINES[0]

  const handleSearch = useCallback(() => {
    if (!query.trim()) return
    const url = selectedEngine.url + encodeURIComponent(query.trim())
    window.open(url, '_blank', 'noopener noreferrer')
    setQuery('')
    closeCommandPalette()
  }, [query, selectedEngine.url, closeCommandPalette])

  const selectEngine = useCallback(
    (id: SearchEngine) => {
      setSelectedEngineId(id)
      if (activeRoomId) setLastSearchEngine(activeRoomId, id)
      inputRef.current?.focus()
    },
    [activeRoomId, setLastSearchEngine]
  )

  // Handle Escape key
  useEffect(() => {
    if (!commandPaletteOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeCommandPalette()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, closeCommandPalette])

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop — fast fade */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/12 backdrop-blur-[3px] z-50"
            onClick={closeCommandPalette}
          />

          {/* Palette — spring enter, fast exit (asymmetric per Emil) */}
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4, transition: { duration: 0.12 } }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className="fixed top-[28%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
          >
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] overflow-hidden">
              {/* Room context badge */}
              {activeRoom && (
                <div className="px-4 pt-3 pb-0">
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${activeRoom.color} 12%, var(--color-surface-2))`,
                      color: activeRoom.color,
                    }}
                  >
                    <span>{activeRoom.icon}</span>
                    <span>{activeRoom.name}</span>
                  </div>
                </div>
              )}

              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3">
                <Search size={18} className="text-[var(--color-muted)] flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch()
                  }}
                  placeholder={`Buscar en ${selectedEngine.name}...`}
                  className="flex-1 bg-transparent text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none"
                />
              </div>

              {/* Engine selector — pills */}
              <div className="px-4 pb-3 flex items-center gap-1.5 flex-wrap">
                {SEARCH_ENGINES.map((engine) => (
                  <m.button
                    key={engine.id}
                    onClick={() => selectEngine(engine.id)}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer',
                      'transition-colors duration-150',
                      engine.id === selectedEngineId
                        ? 'text-white shadow-[var(--shadow-sm)]'
                        : 'text-[var(--color-muted)] bg-[var(--color-surface-2)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                    )}
                    style={
                      engine.id === selectedEngineId
                        ? { backgroundColor: engine.color }
                        : undefined
                    }
                  >
                    <span className="flex items-center justify-center w-4 h-4">
                      <ToolIcon id={engine.id} size={14} />
                    </span>
                    {engine.name}
                  </m.button>
                ))}
              </div>

              {/* Keyboard hint */}
              <div className="px-4 py-2.5 border-t border-[var(--color-border)] flex items-center justify-between">
                <span className="text-[11px] text-[var(--color-muted)]">
                  Enter para buscar
                </span>
                <span className="text-[11px] text-[var(--color-muted)]">
                  Esc para cerrar
                </span>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
