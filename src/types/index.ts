export type Theme = 'dark' | 'light'

export type RoomStatus = 'active' | 'paused' | 'silenced'

export type ToolId =
  | 'claude'
  | 'gemini'
  | 'chatgpt'
  | 'google'
  | 'notion'
  | 'github'
  | 'drive'
  | 'calendar'
  | 'youtube'
  | 'spotify'
  | 'canva'
  | 'custom'

export interface Tool {
  id: ToolId | string
  name: string
  url: string
  icon: string
  connected: boolean
  lastActivity?: number
}

export interface RoomSession {
  lastSearchQuery: string
  lastToolUsed: string | null
  lastSearchEngine: SearchEngine
}

export interface Room {
  id: string
  name: string
  color: string
  icon: string
  tools: Tool[]
  status: RoomStatus
  lastActivity: number
  contextSummary: string
}

export type SearchEngine = 'claude' | 'gemini' | 'chatgpt' | 'google' | 'perplexity'

export interface SearchEngineConfig {
  id: SearchEngine
  name: string
  url: string
  color: string
}

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  tempMax: number
  tempMin: number
  cityName: string
}

export interface SpotifyTrack {
  name: string
  artist: string
  album: string
  albumArt: string | null
  isPlaying: boolean
  progress: number
  duration: number
}
