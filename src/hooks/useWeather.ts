import { useState, useEffect, useCallback } from 'react'
import { fetchWeather, getUserLocation } from '@/lib/weather'
import { useUserStore } from '@/stores/useUserStore'
import type { WeatherData } from '@/types'

interface WeatherState {
  data: WeatherData | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useWeather(): WeatherState {
  const city = useUserStore((s) => s.city)
  const setCity = useUserStore((s) => s.setCity)
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch_ = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const coords = await getUserLocation()
      const weather = await fetchWeather(coords.latitude, coords.longitude)
      setData(weather)
      if (!city && weather.cityName !== 'Tu ciudad') {
        setCity(weather.cityName)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el clima')
    } finally {
      setLoading(false)
    }
  }, [city, setCity])

  useEffect(() => {
    fetch_()
    const id = setInterval(fetch_, 10 * 60 * 1000) // actualizar cada 10 min
    return () => clearInterval(id)
  }, [fetch_])

  return { data, loading, error, refetch: fetch_ }
}
