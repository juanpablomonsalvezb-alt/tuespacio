import { motion, type Variants } from 'motion/react'
import { Plus } from 'lucide-react'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'
import { RoomCard } from './RoomCard'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 } as const,
  },
}

export function RoomGrid() {
  const { rooms, activeRoomId } = useWorkspaceStore()
  const { openCreateRoom } = useUIStore()

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-medium">
          Cuartos
        </h2>
        <button
          onClick={openCreateRoom}
          className="flex items-center gap-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
        >
          <Plus size={12} />
          Nuevo cuarto
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {rooms.map((room) => (
          <motion.div key={room.id} variants={itemVariants}>
            <RoomCard room={room} isActive={room.id === activeRoomId} />
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <button
            onClick={openCreateRoom}
            className="w-full rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-4 text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-white/20 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[120px]"
          >
            <Plus size={20} />
            <span className="text-xs">Crear cuarto</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
