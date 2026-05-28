import { Claude, Gemini, OpenAI, Perplexity, Google } from '@lobehub/icons'
import {
  SiNotion,
  SiGithub,
  SiSpotify,
  SiYoutube,
  SiGoogledrive,
  SiGooglecalendar,
  SiCanva,
  SiFigma,
} from 'react-icons/si'
import {
  Home,
  Briefcase,
  Palette,
  BookOpen,
  Music,
  Globe,
  Zap,
  FlaskConical,
  Gamepad2,
  Lightbulb,
  Leaf,
  Flame,
  Bot,
  MessageSquare,
  Sparkles,
  Box,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/* ----------------------------------------------------------------
   TOOL BRAND LOGOS — real official logos, resolved by tool id.
   @lobehub/icons for AI brands (multi-color), react-icons/si for rest.
   ---------------------------------------------------------------- */

export function ToolIcon({ id, size = 24 }: { id: string; size?: number }) {
  switch (id) {
    case 'claude':
      return <Claude.Color size={size} />
    case 'gemini':
      return <Gemini.Color size={size} />
    case 'chatgpt':
      return <OpenAI size={size} />
    case 'perplexity':
      return <Perplexity.Color size={size} />
    case 'google':
      return <Google.Color size={size} />
    case 'notion':
      return <SiNotion size={size} />
    case 'github':
      return <SiGithub size={size} />
    case 'spotify':
      return <SiSpotify size={size} color="#1DB954" />
    case 'youtube':
      return <SiYoutube size={size} color="#FF0000" />
    case 'drive':
      return <SiGoogledrive size={size} color="#1FA463" />
    case 'calendar':
      return <SiGooglecalendar size={size} color="#4285F4" />
    case 'canva':
      return <SiCanva size={size} color="#00C4CC" />
    case 'figma':
      return <SiFigma size={size} />
    default:
      return <Box size={size} strokeWidth={1.5} className="text-[var(--color-muted)]" />
  }
}

/* ----------------------------------------------------------------
   ROOM ICONS — tasteful Lucide line icons, keyed by short string.
   Backward-compatible: legacy emoji values map to a Lucide icon.
   ---------------------------------------------------------------- */

const ROOM_ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  work: Briefcase,
  design: Palette,
  study: BookOpen,
  music: Music,
  web: Globe,
  energy: Zap,
  science: FlaskConical,
  game: Gamepad2,
  idea: Lightbulb,
  nature: Leaf,
  fire: Flame,
  ai: Bot,
  chat: MessageSquare,
  spark: Sparkles,
}

/** Legacy emoji → Lucide key (auto-upgrade persisted rooms) */
const EMOJI_TO_KEY: Record<string, string> = {
  '🏠': 'home',
  '💼': 'work',
  '🎨': 'design',
  '📚': 'study',
  '🎵': 'music',
  '🌐': 'web',
  '⚡': 'energy',
  '🔬': 'science',
  '🎮': 'game',
  '💡': 'idea',
  '🌿': 'nature',
  '🔥': 'fire',
  '🤖': 'ai',
  '💬': 'chat',
  '✨': 'spark',
}

export const ROOM_ICON_KEYS = Object.keys(ROOM_ICON_MAP)

/** Resolve any stored room icon (key or legacy emoji) to a Lucide key */
export function normalizeRoomIcon(icon: string): string {
  if (ROOM_ICON_MAP[icon]) return icon
  if (EMOJI_TO_KEY[icon]) return EMOJI_TO_KEY[icon]
  return 'home'
}

export function RoomIcon({
  icon,
  size = 24,
  strokeWidth = 1.6,
}: {
  icon: string
  size?: number
  strokeWidth?: number
}) {
  const key = normalizeRoomIcon(icon)
  const Comp = ROOM_ICON_MAP[key] ?? Home
  return <Comp size={size} strokeWidth={strokeWidth} />
}

export { Wrench }
