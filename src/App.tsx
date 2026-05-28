import { useEffect, useCallback } from 'react'
import { LazyMotion, domAnimation, AnimatePresence } from 'motion/react'
import { Toaster } from 'sonner'
import { AuroraBackground } from '@/components/home/AuroraBackground'
import { HomeCanvas } from '@/components/home/HomeCanvas'
import { RoomView } from '@/components/room/RoomView'
import { CommandPalette } from '@/components/search/CommandPalette'
import { CreateRoomModal } from '@/components/rooms/CreateRoomModal'
import { SettingsPanel } from '@/components/settings/SettingsPanel'
import { useUIStore } from '@/stores/useUIStore'

function getAmbientColor(): string {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 10) return 'rgba(255, 180, 120, 0.06)'   // dawn — warm peach
  if (hour >= 10 && hour < 17) return 'rgba(200, 168, 122, 0.05)'  // day — warm gold
  if (hour >= 17 && hour < 20) return 'rgba(200, 140, 160, 0.06)'  // dusk — rose
  if (hour >= 20) return 'rgba(160, 140, 200, 0.06)'               // evening — lavender
  return 'rgba(120, 140, 200, 0.06)'                                // night — deep blue
}

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

  // Mouse tracking for cursor glow — rAF-throttled, one write per frame
  useEffect(() => {
    let rafId = 0
    let x = 0
    let y = 0
    let pending = false

    const flush = () => {
      const root = document.documentElement.style
      root.setProperty('--mouse-x', `${x}px`)
      root.setProperty('--mouse-y', `${y}px`)
      pending = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!pending) {
        pending = true
        rafId = requestAnimationFrame(flush)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Time-based ambient color — update every minute
  useEffect(() => {
    const updateAmbient = () => {
      document.documentElement.style.setProperty('--ambient-color', getAmbientColor())
    }
    updateAmbient()
    const id = setInterval(updateAmbient, 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <AuroraBackground />
      <div className="h-full ambient-bg cursor-glow">
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

      {/* Sonner toasts — Emil Kowalski style */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            fontSize: '13px',
            boxShadow: 'var(--shadow-lg)',
            borderRadius: 'var(--radius-md)',
          },
        }}
        offset={72}
      />
    </LazyMotion>
  )
}

export default App
