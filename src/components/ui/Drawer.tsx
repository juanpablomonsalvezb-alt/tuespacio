import { type ReactNode } from 'react'
import { Drawer as VaulDrawer } from 'vaul'
import { cn } from '@/lib/utils'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/12 backdrop-blur-[2px] z-40" />
        <VaulDrawer.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 mt-24 flex flex-col rounded-t-[24px]',
            'bg-[var(--color-surface)] border-t border-[var(--color-border)]',
            'shadow-[0_-8px_32px_rgba(0,0,0,0.08)] max-h-[85dvh]',
            className
          )}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-10 h-1 rounded-full bg-[var(--color-border-strong)]" />
          </div>

          {/* Header */}
          <div className="px-6 pb-4">
            <VaulDrawer.Title className="font-display text-lg text-[var(--color-text)]">
              {title}
            </VaulDrawer.Title>
          </div>

          {/* Content */}
          <div className="px-6 pb-8 overflow-y-auto flex-1">
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  )
}
