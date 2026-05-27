import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UIState {
  sidebarCollapsed: boolean
  settingsOpen: boolean
  createRoomOpen: boolean
  editRoomId: string | null

  toggleSidebar: () => void
  setSidebarCollapsed: (v: boolean) => void
  openSettings: () => void
  closeSettings: () => void
  openCreateRoom: () => void
  closeCreateRoom: () => void
  openEditRoom: (id: string) => void
  closeEditRoom: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      settingsOpen: false,
      createRoomOpen: false,
      editRoomId: null,

      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      openSettings: () => set({ settingsOpen: true }),
      closeSettings: () => set({ settingsOpen: false }),
      openCreateRoom: () => set({ createRoomOpen: true }),
      closeCreateRoom: () => set({ createRoomOpen: false }),
      openEditRoom: (id) => set({ editRoomId: id }),
      closeEditRoom: () => set({ editRoomId: null }),
    }),
    {
      name: 'tuespacio-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }),
    }
  )
)
