import { Outlet } from 'react-router-dom'
import { Sidebar, SidebarContent } from './Sidebar'
import { TopNav } from './TopNav'
import { ShaderBackdrop } from '@/components/background/ShaderBackdrop'
import { FloatingOrb } from '@/components/background/FloatingOrb'
import { useParallaxBg } from '@/hooks/use-parallax-bg'
import { useDashboardStore } from '@/store/dashboard-store'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const { theme } = useDashboardStore()
  const bg = useParallaxBg(10)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-canvas text-ink transition-colors duration-500 font-sans">
      <ShaderBackdrop parallaxX={bg.x} parallaxY={bg.y} theme={theme} />
      <FloatingOrb />

      <Sidebar />

      {/* Mobile Menu Trigger - Sleek & Transparent */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-6 left-6 z-50 p-2 text-ink lg:hidden transition-all hover:scale-110 active:scale-95 active:opacity-70"
      >
        <Menu className="h-7 w-7 stroke-[1.5]" />
      </button>

      {/* Mobile Drawer (Simplistic version) */}
      <div 
        className={cn(
          "fixed inset-0 z-[80] bg-canvas/80 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={cn(
            "h-full w-4/5 max-w-sm bg-panel border-r border-edge transition-transform duration-300 transform shadow-2xl",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
             <h1 className="text-2xl font-bold mb-8 text-ink">Spendora</h1>
             <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </div>

      <main className="relative z-10 flex-1 overflow-y-auto px-6 pt-20 pb-12 lg:pt-0 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <TopNav />
          <Outlet />
        </div>
      </main>
    </div>
  )
}
