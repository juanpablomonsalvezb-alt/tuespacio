import { useState, useEffect } from 'react'
import { formatTime, formatDate } from '@/lib/utils'

export function useClock() {
  const [time, setTime] = useState(() => formatTime(new Date()))
  const [date, setDate] = useState(() => formatDate(new Date()))

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(formatTime(now))
      setDate(formatDate(now))
    }
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return { time, date }
}
