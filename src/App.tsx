import { useEffect, useCallback } from 'react'
import { LazyMotion, domAnimation, AnimatePresence } from 'motion/react'
import { HomeCanvas } from '@/components/home/HomeCanvas'
import { RoomView } from '@/components/room/RoomView'
import { CommandPalette } from '@/components/search/CommandPalette'
import { CreateRoomModal } from '@/components/rooms/CreateRoomModal'
import { SettingsPanel } from '@/components/settings/SettingsPanel'
import { useUIStore } from '@/stores/useUIStore'

function App() {
  const view = useUIStore((s) => s.view)
  const toggleCommandPalette = useUIStore((s) => s.toggleCommandPalette)

  // Global Cmd+K shortcut
  const handleGlobalKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
    },
    [toggleCommandPalette]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleGlobalKeyDown])

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-full bg-[var(--color-bg)]">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <HomeCanvas key="home" />
          ) : (
            <RoomView key="room" />
          )}
        </AnimatePresence>
      </div>

      {/* Command Palette (Cmd+K) — always mounted for AnimatePresence */}
      <CommandPalette />

      {/* Modals */}
      <CreateRoomModal />
      <SettingsPanel />
    </LazyMotion>
  )
}

export default App
