import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Room, RoomSession, SearchEngine } from '@/types'
import { generateId } from '@/lib/utils'
import { DEFAULT_ROOM_COLORS, DEFAULT_ROOM_ICONS } from '@/lib/constants'
import { normalizeRoomIcon } from '@/lib/icons'

interface WorkspaceState {
  rooms: Room[]
  activeRoomId: string | null
  roomSessions: Record<string, RoomSession>

  setActiveRoom: (id: string) => void
  createRoom: (name: string, icon: string, color: string) => Room
  updateRoom: (id: string, partial: Partial<Room>) => void
  deleteRoom: (id: string) => void
  addToolToRoom: (roomId: string, tool: Room['tools'][0]) => void
  removeToolFromRoom: (roomId: string, toolId: string) => void
  toggleToolConnection: (roomId: string, toolId: string) => void
  updateRoomSession: (roomId: string, partial: Partial<RoomSession>) => void
  setLastSearchEngine: (roomId: string, engine: SearchEngine) => void
}

const DEFAULT_ROOMS: Room[] = [
  {
    id: 'trabajo-ia',
    name: 'Trabajo IA',
    color: DEFAULT_ROOM_COLORS[0],
    icon: 'ai',
    tools: [
      { id: 'claude', name: 'Claude', url: 'https://claude.ai', icon: '🤖', connected: true },
      { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com', icon: '✨', connected: false },
    ],
    status: 'active',
    lastActivity: Date.now(),
    contextSummary: '',
  },
  {
    id: 'contenido',
    name: 'Contenido',
    color: DEFAULT_ROOM_COLORS[1],
    icon: 'design',
    tools: [
      { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', icon: '▶️', connected: false },
      { id: 'spotify', name: 'Spotify', url: 'https://open.spotify.com', icon: '🎵', connected: false },
    ],
    status: 'paused',
    lastActivity: Date.now() - 3600000,
    contextSummary: '',
  },
  {
    id: 'estudio',
    name: 'Estudio',
    color: DEFAULT_ROOM_COLORS[2],
    icon: 'study',
    tools: [
      { id: 'notion', name: 'Notion', url: 'https://notion.so', icon: '📝', connected: false },
      { id: 'github', name: 'GitHub', url: 'https://github.com', icon: '🐙', connected: false },
    ],
    status: 'paused',
    lastActivity: Date.now() - 86400000,
    contextSummary: '',
  },
]

const DEFAULT_SESSION: RoomSession = {
  lastSearchQuery: '',
  lastToolUsed: null,
  lastSearchEngine: 'claude',
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      rooms: DEFAULT_ROOMS,
      activeRoomId: 'trabajo-ia',
      roomSessions: {},

      setActiveRoom: (id) => {
        set({ activeRoomId: id })
        set((state) => ({
          rooms: state.rooms.map((r) =>
            r.id === id
              ? { ...r, status: 'active', lastActivity: Date.now() }
              : r.status === 'active'
              ? { ...r, status: 'paused' }
              : r
          ),
        }))
      },

      createRoom: (name, icon, color) => {
        const room: Room = {
          id: generateId(),
          name,
          color,
          icon,
          tools: [],
          status: 'paused',
          lastActivity: Date.now(),
          contextSummary: '',
        }
        set((state) => ({ rooms: [...state.rooms, room] }))
        return room
      },

      updateRoom: (id, partial) =>
        set((state) => ({
          rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...partial } : r)),
        })),

      deleteRoom: (id) =>
        set((state) => ({
          rooms: state.rooms.filter((r) => r.id !== id),
          activeRoomId:
            state.activeRoomId === id
              ? (state.rooms.find((r) => r.id !== id)?.id ?? null)
              : state.activeRoomId,
        })),

      addToolToRoom: (roomId, tool) =>
        set((state) => ({
          rooms: state.rooms.map((r) =>
            r.id === roomId ? { ...r, tools: [...r.tools, tool] } : r
          ),
        })),

      removeToolFromRoom: (roomId, toolId) =>
        set((state) => ({
          rooms: state.rooms.map((r) =>
            r.id === roomId
              ? { ...r, tools: r.tools.filter((t) => t.id !== toolId) }
              : r
          ),
        })),

      toggleToolConnection: (roomId, toolId) =>
        set((state) => ({
          rooms: state.rooms.map((r) =>
            r.id === roomId
              ? {
                  ...r,
                  tools: r.tools.map((t) =>
                    t.id === toolId ? { ...t, connected: !t.connected } : t
                  ),
                }
              : r
          ),
        })),

      updateRoomSession: (roomId, partial) =>
        set((state) => ({
          roomSessions: {
            ...state.roomSessions,
            [roomId]: { ...DEFAULT_SESSION, ...state.roomSessions[roomId], ...partial },
          },
        })),

      setLastSearchEngine: (roomId, engine) => {
        get().updateRoomSession(roomId, { lastSearchEngine: engine })
      },
    }),
    {
      name: 'tuespacio-workspace',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted: unknown, fromVersion: number) => {
        const state = persisted as WorkspaceState
        if (fromVersion < 2 && state?.rooms) {
          // Upgrade legacy emoji room icons → Lucide keys
          state.rooms = state.rooms.map((r) => ({
            ...r,
            icon: normalizeRoomIcon(r.icon),
          }))
        }
        return state
      },
      partialize: (state) => ({
        rooms: state.rooms.map((r) => ({
          ...r,
          contextSummary: r.contextSummary.slice(0, 2000),
        })),
        activeRoomId: state.activeRoomId,
        roomSessions: state.roomSessions,
      }),
    }
  )
)

export { DEFAULT_ROOM_COLORS, DEFAULT_ROOM_ICONS }
