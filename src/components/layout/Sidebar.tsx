import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, BarChart3, Menu, Sun, Moon, Shield, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboard-store'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Transactions', icon: Receipt, path: '/transactions' },
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
]

export function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const { role, theme, setRole, toggleTheme } = useDashboardStore()
  const isAdmin = role === 'admin'

  const handleRoleChange = (c: boolean) => {
    setRole(c ? 'admin' : 'viewer')
    onItemClick?.()
  }

  const handleThemeToggle = () => {
    toggleTheme()
    onItemClick?.()
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <nav className="flex-1 space-y-3 p-6 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all group outline-none whitespace-nowrap',
                isActive
                  ? 'bg-primary/5 text-primary outline-primary/20 hover:bg-primary/10'
                  : 'text-muted hover:bg-highlight/10 hover:text-ink'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" />
            <span className="opacity-100 transition-opacity duration-300">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* System Toggles - ONLY visible in sidebar on smaller screens (lg:hidden) */}
      <div className="mt-auto border-t border-edge p-6 space-y-6 lg:hidden">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 px-2">
             <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted" />
                <span className="text-[11px] font-bold text-muted uppercase tracking-[0.1em]">Access Level</span>
             </div>
             <div className="flex items-center justify-around bg-highlight/5 rounded-xl p-3 border border-edge/20">
                <Label className="text-[10px] font-bold text-muted uppercase tracking-wider">Viewer</Label>
                <Switch 
                  checked={isAdmin}
                  onCheckedChange={handleRoleChange}
                  className="scale-75"
                />
                <Label className="text-[10px] font-bold text-muted uppercase tracking-wider">Admin</Label>
             </div>
          </div>

          <button
            onClick={handleThemeToggle}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted transition-all hover:bg-highlight/10 hover:text-ink"
          >
            <div className="flex items-center gap-3">
               {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
               <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </button>
        </div>

        <div className="flex items-center gap-2 px-2 text-[10px] text-muted/60">
           <Shield className="h-3 w-3" />
           <span>Security: {isAdmin ? 'Full Access' : 'Read Only'}</span>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* Desktop Trigger Icon - Smaller and transparent */}
      <div 
        className="fixed top-6 left-6 z-[60] group/sidebar-trigger hidden lg:flex items-center justify-center cursor-pointer pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border border-edge bg-transparent backdrop-blur-sm text-muted shadow-none transition-all duration-500",
          "group-hover/sidebar-trigger:scale-110 group-hover/sidebar-trigger:text-ink group-hover/sidebar-trigger:rotate-90",
          isHovered ? "opacity-0 scale-90" : "opacity-100"
        )}>
          <Menu className="h-4 w-4" />
        </div>
      </div>

      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-[70] hidden flex-col border-r border-edge bg-panel/90 backdrop-blur-3xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex overflow-hidden transform",
          isHovered ? "w-64 translate-x-0 shadow-2xl" : "w-64 -translate-y-full lg:-translate-x-full lg:translate-y-0"
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-edge px-8 flex-shrink-0">
          <h1 className="bg-gradient-to-br from-ink to-ink/60 bg-clip-text text-xl font-bold tracking-tight text-transparent whitespace-nowrap">
            Spendora
          </h1>
          <button onClick={() => setIsHovered(false)}>
            <Menu className="h-4 w-4 text-muted/50 hover:text-primary transition-colors" />
          </button>
        </div>

        <SidebarContent />
      </aside>
    </>
  )
}
