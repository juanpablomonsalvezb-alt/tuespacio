import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useUIStore } from '@/stores/useUIStore'
import { useUserStore } from '@/stores/useUserStore'

export function SettingsPanel() {
  const { settingsOpen, closeSettings } = useUIStore()
  const { name, accentColor, city, spaceName, setName, setAccentColor, setCity, setSpaceName } =
    useUserStore()

  return (
    <Modal open={settingsOpen} onClose={closeSettings} title="Configuración" className="max-w-lg">
      <div className="flex flex-col gap-5">
        {/* Identidad */}
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Identidad
          </div>
          <div className="flex flex-col gap-3">
            <Input
              label="Nombre del espacio"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              placeholder="Mi Espacio"
            />
            <Input
              label="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ej: Juan Pablo"
            />
            <Input
              label="Ciudad (para el clima)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="ej: Concepción"
            />
          </div>
        </div>

        {/* Apariencia */}
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Apariencia
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-[var(--color-text)]">Color de acento</div>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-10 h-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-transparent cursor-pointer p-0.5"
            />
            <div className="flex gap-1.5">
              {['#c8a87a', '#7c9aba', '#8fb38f', '#b08db8', '#c47b7b', '#78b4b4'].map((c) => (
                <button
                  key={c}
                  onClick={() => setAccentColor(c)}
                  className="w-6 h-6 rounded-full border-2 transition-all cursor-pointer hover:scale-110"
                  style={{
                    backgroundColor: c,
                    borderColor: accentColor === c ? 'white' : 'transparent',
                    transform: accentColor === c ? 'scale(1.2)' : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Preview del acento */}
          <div className="mt-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-xs text-[var(--color-text)] font-medium">
              Vista previa del color de acento
            </span>
          </div>
        </div>

        <Button variant="accent" onClick={closeSettings}>
          Guardar cambios
        </Button>
      </div>
    </Modal>
  )
}
