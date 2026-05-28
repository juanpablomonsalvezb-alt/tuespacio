import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type View = 'home' | 'room'

interface UIState {
  view: View
  sidebarCollapsed: boolean
  settingsOpen: boolean
  createRoomOpen: boolean
  editRoomId: string | null
  commandPaletteOpen: boolean

  setView: (view: View) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  openSettings: () => void
  closeSettings: () => void
  openCreateRoom: () => void
  closeCreateRoom: () => void
  openEditRoom: (id: string) => void
  closeEditRoom: () => void
  openCommandPalette: () => void
  closeCommandPalette: () => void
  toggleCommandPalette: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      view: 'home',
      sidebarCollapsed: false,
      settingsOpen: false,
      createRoomOpen: false,
      editRoomId: null,
      commandPaletteOpen: false,

      setView: (view) => set({ view }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      openSettings: () => set({ settingsOpen: true }),
      closeSettings: () => set({ settingsOpen: false }),
      openCreateRoom: () => set({ createRoomOpen: true }),
      closeCreateRoom: () => set({ createRoomOpen: false }),
      openEditRoom: (id) => set({ editRoomId: id }),
      closeEditRoom: () => set({ editRoomId: null }),
      openCommandPalette: () => set({ commandPaletteOpen: true }),
      closeCommandPalette: () => set({ commandPaletteOpen: false }),
      toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
    }),
    {
      name: 'tuespacio-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed, view: s.view }),
    }
  )
)
