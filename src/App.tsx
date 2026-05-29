import { LazyMotion, domAnimation } from 'motion/react'
import { DailyCard } from '@/components/daily/DailyCard'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="paper-grain relative min-h-dvh w-full flex items-center justify-center py-12 px-4">
        <DailyCard />
      </div>
    </LazyMotion>
  )
}

export default App
