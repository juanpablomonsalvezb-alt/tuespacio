import { motion } from 'motion/react'
import { ClockWidget } from '@/components/widgets/ClockWidget'
import { WeatherWidget } from '@/components/widgets/WeatherWidget'
import { MusicWidget } from '@/components/widgets/MusicWidget'
import { ConnectionsWidget } from '@/components/widgets/ConnectionsWidget'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-medium">
        {title}
      </div>
      {children}
      <div className="mx-4 h-px bg-[var(--color-border)]" />
    </div>
  )
}

export function RightPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.05 }}
      className="w-64 flex-shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)] flex flex-col overflow-y-auto"
    >
      <Section title="Hora">
        <ClockWidget />
      </Section>

      <Section title="Clima">
        <WeatherWidget />
      </Section>

      <Section title="Música">
        <MusicWidget />
      </Section>

      <div>
        <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-medium">
          Herramientas
        </div>
        <ConnectionsWidget />
      </div>
    </motion.aside>
  )
}
