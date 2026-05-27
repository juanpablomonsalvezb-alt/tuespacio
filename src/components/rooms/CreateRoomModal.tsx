import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { useUIStore } from '@/stores/useUIStore'
import { DEFAULT_ROOM_COLORS, DEFAULT_ROOM_ICONS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function CreateRoomModal() {
  const { createRoomOpen, closeCreateRoom } = useUIStore()
  const { createRoom, setActiveRoom } = useWorkspaceStore()

  const [name, setName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState(DEFAULT_ROOM_ICONS[0])
  const [selectedColor, setSelectedColor] = useState(DEFAULT_ROOM_COLORS[0])

  const handleCreate = () => {
    if (!name.trim()) return
    const room = createRoom(name.trim(), selectedIcon, selectedColor)
    setActiveRoom(room.id)
    setName('')
    setSelectedIcon(DEFAULT_ROOM_ICONS[0])
    setSelectedColor(DEFAULT_ROOM_COLORS[0])
    closeCreateRoom()
  }

  return (
    <Modal open={createRoomOpen} onClose={closeCreateRoom} title="Nuevo cuarto">
      <div className="flex flex-col gap-4">
        <Input
          label="Nombre del cuarto"
          placeholder="ej: Trabajo IA, Estudio, Personal..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          autoFocus
        />

        <div>
          <div className="text-xs text-[var(--color-muted)] mb-2">Ícono</div>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_ROOM_ICONS.map((icon) => (
              <button
                key={icon}
                onClick={() => setSelectedIcon(icon)}
                className={cn(
                  'w-9 h-9 rounded-[var(--radius-md)] text-lg flex items-center justify-center transition-all cursor-pointer',
                  selectedIcon === icon
                    ? 'bg-[var(--color-accent-dim)] border border-[var(--color-accent)]/40 scale-110'
                    : 'bg-[var(--color-surface-2)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
                )}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-[var(--color-muted)] mb-2">Color</div>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_ROOM_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'w-7 h-7 rounded-full transition-all cursor-pointer border-2',
                  selectedColor === color
                    ? 'scale-125 border-[var(--color-text)]'
                    : 'border-transparent hover:scale-110'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-border)]">
          <div
            className="w-0.5 h-8 rounded-full flex-shrink-0"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-xl">{selectedIcon}</span>
          <span className="text-sm text-[var(--color-text)]">
            {name || 'Nombre del cuarto'}
          </span>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={closeCreateRoom}>Cancelar</Button>
          <Button variant="accent" onClick={handleCreate} disabled={!name.trim()}>
            Crear cuarto
          </Button>
        </div>
      </div>
    </Modal>
  )
}
