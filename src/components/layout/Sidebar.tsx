import { motion, AnimatePresence } from 'motion/react'
import {
  Home,
  Search,
  FileText,
  Calendar,
  Music,
  Settings,
  User,
  PanelLeft,
} from 'lucide-react'
import { useUIStore } from '@/stores/useUIStore'
import { cn } from '@/lib/utils'

interface NavItem {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, openSettings } = useUIStore()

  const navItems: NavItem[] = [
    { icon: <Home size={18} />, label: 'Inicio', active: true },
    { icon: <Search size={18} />, label: 'Búsqueda' },
    { icon: <FileText size={18} />, label: 'Notas' },
    { icon: <Calendar size={18} />, label: 'Calendario' },
    { icon: <Music size={18} />, label: 'Música' },
  ]

  const bottomItems: NavItem[] = [
    { icon: <User size={18} />, label: 'Perfil' },
    { icon: <Settings size={18} />, label: 'Configuración', onClick: openSettings },
  ]

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 56 : 200 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-border)] flex-shrink-0 overflow-hidden h-full"
    >
      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 p-2 flex-1 mt-1">
        {navItems.map((item) => (
          <NavButton key={item.label} item={item} collapsed={sidebarCollapsed} />
        ))}
      </nav>

      {/* Bottom items */}
      <div className="flex flex-col gap-0.5 p-2 border-t border-[var(--color-border)] mb-1">
        {bottomItems.map((item) => (
          <NavButton key={item.label} item={item} collapsed={sidebarCollapsed} />
        ))}

        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 h-9 px-2.5 rounded-[var(--radius-md)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer mt-1"
        >
          <PanelLeft size={16} />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="text-xs whitespace-nowrap"
              >
                Colapsar
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}

function NavButton({
  item,
  collapsed,
}: {
  item: NavItem
  collapsed: boolean
}) {
  return (
    <button
      onClick={item.onClick}
      className={cn(
        'flex items-center gap-2 h-9 px-2.5 rounded-[var(--radius-md)] transition-colors cursor-pointer text-left w-full',
        item.active
          ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent-text)]'
          : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
      )}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.08 } }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            className="text-sm whitespace-nowrap overflow-hidden"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
