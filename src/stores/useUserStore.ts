import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { applyAccentColor } from '@/lib/utils'

interface UserState {
  name: string
  accentColor: string
  city: string
  avatarUrl: string
  spaceName: string
  setName: (name: string) => void
  setAccentColor: (color: string) => void
  setCity: (city: string) => void
  setAvatarUrl: (url: string) => void
  setSpaceName: (name: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      accentColor: '#c8a87a',
      city: '',
      avatarUrl: '',
      spaceName: 'Mi Espacio',
      setName: (name) => set({ name }),
      setAccentColor: (color) => {
        applyAccentColor(color)
        set({ accentColor: color })
      },
      setCity: (city) => set({ city }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
      setSpaceName: (name) => set({ spaceName: name }),
    }),
    {
      name: 'tuespacio-user',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.accentColor) applyAccentColor(state.accentColor)
      },
    }
  )
)
