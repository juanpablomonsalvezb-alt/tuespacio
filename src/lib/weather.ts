import type { WeatherData } from '@/types'

const WMO_CODES: Record<number, { label: string; emoji: string }> = {
  0: { label: 'Despejado', emoji: '☀️' },
  1: { label: 'Mayormente despejado', emoji: '🌤️' },
  2: { label: 'Parcialmente nublado', emoji: '⛅' },
  3: { label: 'Nublado', emoji: '☁️' },
  45: { label: 'Niebla', emoji: '🌫️' },
  48: { label: 'Niebla con escarcha', emoji: '🌫️' },
  51: { label: 'Llovizna leve', emoji: '🌦️' },
  53: { label: 'Llovizna moderada', emoji: '🌦️' },
  55: { label: 'Llovizna intensa', emoji: '🌧️' },
  61: { label: 'Lluvia leve', emoji: '🌧️' },
  63: { label: 'Lluvia moderada', emoji: '🌧️' },
  65: { label: 'Lluvia intensa', emoji: '🌧️' },
  71: { label: 'Nieve leve', emoji: '🌨️' },
  73: { label: 'Nieve moderada', emoji: '❄️' },
  75: { label: 'Nevada intensa', emoji: '❄️' },
  80: { label: 'Chubascos leves', emoji: '🌦️' },
  81: { label: 'Chubascos moderados', emoji: '🌧️' },
  82: { label: 'Chubascos intensos', emoji: '⛈️' },
  95: { label: 'Tormenta', emoji: '⛈️' },
  99: { label: 'Tormenta con granizo', emoji: '⛈️' },
}

export function getWeatherDescription(code: number): { label: string; emoji: string } {
  return WMO_CODES[code] ?? { label: 'Desconocido', emoji: '🌡️' }
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', lat.toString())
  url.searchParams.set('longitude', lon.toString())
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code')
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min')
  url.searchParams.set('timezone', 'auto')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Error al obtener el clima')
  const data = await res.json()

  const cityName = await reverseGeocode(lat, lon)

  return {
    temperature: Math.round(data.current.temperature_2m),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
    tempMax: Math.round(data.daily.temperature_2m_max[0]),
    tempMin: Math.round(data.daily.temperature_2m_min[0]),
    cityName,
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'es' } }
    )
    const data = await res.json()
    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      'Tu ciudad'
    )
  } catch {
    return 'Tu ciudad'
  }
}

export function getUserLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no disponible'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { timeout: 10000 }
    )
  })
}
