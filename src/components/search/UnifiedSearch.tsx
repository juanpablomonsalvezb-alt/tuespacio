import { useState, useRef } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { SEARCH_ENGINES } from '@/lib/constants'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { cn } from '@/lib/utils'
import type { SearchEngine } from '@/types'

export function UnifiedSearch() {
  const { activeRoomId, roomSessions, setLastSearchEngine } = useWorkspaceStore()
  const currentSession = activeRoomId ? roomSessions[activeRoomId] : null
  const [query, setQuery] = useState('')
  const [enginePickerOpen, setEnginePickerOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedEngineId: SearchEngine = currentSession?.lastSearchEngine ?? 'claude'
  const selectedEngine = SEARCH_ENGINES.find((e) => e.id === selectedEngineId) ?? SEARCH_ENGINES[0]

  const handleSearch = () => {
    if (!query.trim()) return
    const url = selectedEngine.url + encodeURIComponent(query.trim())
    window.open(url, '_blank', 'noopener noreferrer')
    setQuery('')
    inputRef.current?.blur()
  }

  const selectEngine = (id: SearchEngine) => {
    if (activeRoomId) setLastSearchEngine(activeRoomId, id)
    setEnginePickerOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center gap-0 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] focus-within:border-[var(--color-border-strong)] focus-within:shadow-[var(--shadow-md)] transition-all overflow-hidden shadow-[var(--shadow-sm)]">
        {/* Engine selector */}
        <button
          onClick={() => setEnginePickerOpen(!enginePickerOpen)}
          className="flex items-center gap-1.5 h-11 pl-3 pr-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer border-r border-[var(--color-border)] flex-shrink-0"
          style={{ color: enginePickerOpen ? selectedEngine.color : undefined }}
        >
          <span className="font-medium" style={{ color: selectedEngine.color }}>
            {selectedEngine.name}
          </span>
          <ChevronDown size={11} />
        </button>

        {/* Input */}
        <div className="flex items-center flex-1 px-3">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={`Buscar en ${selectedEngine.name}...`}
            className="flex-1 h-11 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] outline-none"
          />
          <button
            onClick={handleSearch}
            className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer flex-shrink-0"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Engine picker dropdown */}
      <AnimatePresence>
        {enginePickerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute top-full left-0 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] py-1.5 z-30 shadow-[var(--shadow-lg)]"
          >
            {SEARCH_ENGINES.map((engine) => (
              <button
                key={engine.id}
                onClick={() => selectEngine(engine.id)}
                className={cn(
                  'flex items-center gap-2.5 w-full px-3 py-2 text-sm cursor-pointer transition-colors',
                  engine.id === selectedEngineId
                    ? 'bg-[var(--color-surface-hover)]'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                )}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: engine.color }}
                />
                <span
                  className={cn(
                    'text-sm',
                    engine.id === selectedEngineId ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'
                  )}
                >
                  {engine.name}
                </span>
                {engine.id === selectedEngineId && (
                  <span className="ml-auto text-[var(--color-muted)] text-xs">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
