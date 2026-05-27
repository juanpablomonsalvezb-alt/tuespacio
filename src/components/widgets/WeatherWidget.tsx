import { RefreshCw, MapPin, Droplets, Wind } from 'lucide-react'
import { useWeather } from '@/hooks/useWeather'
import { getWeatherDescription } from '@/lib/weather'
import { Button } from '@/components/ui/Button'

export function WeatherWidget() {
  const { data, loading, error, refetch } = useWeather()

  if (loading && !data) {
    return (
      <div className="px-4 py-3">
        <div className="text-xs text-[var(--color-muted)] animate-pulse">Obteniendo clima...</div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="px-4 py-3">
        <div className="text-xs text-[var(--color-muted)] mb-1.5">Clima no disponible</div>
        <button
          onClick={refetch}
          className="text-xs text-[var(--color-accent)] hover:opacity-80 cursor-pointer"
        >
          Permitir ubicación
        </button>
      </div>
    )
  }

  if (!data) return null

  const { label, emoji } = getWeatherDescription(data.weatherCode)

  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl text-[var(--color-text)] leading-none">
              {data.temperature}°
            </span>
            <span className="text-xl">{emoji}</span>
          </div>
          <div className="text-xs text-[var(--color-muted)] mt-1">{label}</div>
        </div>
        <Button variant="ghost" size="icon" onClick={refetch} className="h-6 w-6 opacity-50 hover:opacity-100">
          <RefreshCw size={11} />
        </Button>
      </div>

      <div className="flex items-center gap-1.5 mt-2 text-xs text-[var(--color-muted)]">
        <MapPin size={10} />
        <span>{data.cityName}</span>
      </div>

      <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-muted)]">
        <div className="flex items-center gap-1">
          <Droplets size={10} />
          <span>{data.humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind size={10} />
          <span>{data.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-1">
          <span>↑{data.tempMax}° ↓{data.tempMin}°</span>
        </div>
      </div>
    </div>
  )
}
