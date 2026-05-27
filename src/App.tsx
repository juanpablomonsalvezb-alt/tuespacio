import { LazyMotion, domAnimation } from 'motion/react'
import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { MainArea } from '@/components/layout/MainArea'
import { RightPanel } from '@/components/layout/RightPanel'
import { CreateRoomModal } from '@/components/rooms/CreateRoomModal'
import { SettingsPanel } from '@/components/settings/SettingsPanel'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col h-full bg-[var(--color-bg)]">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainArea />
          <RightPanel />
        </div>
      </div>

      <CreateRoomModal />
      <SettingsPanel />
    </LazyMotion>
  )
}

export default App
