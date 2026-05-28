import type { SearchEngineConfig } from '@/types'

export const SEARCH_ENGINES: SearchEngineConfig[] = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/new?q=', color: '#cc785c' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/app?q=', color: '#4285f4' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/?q=', color: '#10a37f' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/search?q=', color: '#9b5de5' },
  { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=', color: '#ea4335' },
]

// Lucide icon keys (see src/lib/icons.tsx) — not emoji
export const DEFAULT_ROOM_ICONS = [
  'home', 'work', 'design', 'study', 'music', 'web',
  'energy', 'science', 'game', 'idea', 'nature', 'fire',
]

export const DEFAULT_ROOM_COLORS = [
  '#c8a87a', // oro cálido
  '#7c9aba', // azul piedra
  '#8fb38f', // verde musgo
  '#b08db8', // lavanda
  '#c47b7b', // rosa tierra
  '#78b4b4', // teal
  '#d4a96a', // ámbar
  '#8898c8', // índigo suave
]

export const DEFAULT_TOOLS = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai', icon: '🤖', connected: false },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com', icon: '✨', connected: false },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com', icon: '💬', connected: false },
  { id: 'notion', name: 'Notion', url: 'https://notion.so', icon: '📝', connected: false },
  { id: 'github', name: 'GitHub', url: 'https://github.com', icon: '🐙', connected: false },
  { id: 'drive', name: 'Drive', url: 'https://drive.google.com', icon: '📁', connected: false },
  { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', icon: '▶️', connected: false },
  { id: 'spotify', name: 'Spotify', url: 'https://open.spotify.com', icon: '🎵', connected: false },
]
