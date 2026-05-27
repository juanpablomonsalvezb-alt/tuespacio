import { useClock } from '@/hooks/useClock'

export function ClockWidget() {
  const { time, date } = useClock()

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="font-display text-4xl text-[var(--color-text)] leading-none tabular-nums">
        {time}
      </div>
      <div className="text-xs text-[var(--color-muted)] mt-1.5 capitalize">{date}</div>
    </div>
  )
}
