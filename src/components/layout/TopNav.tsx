import { motion } from 'framer-motion'
import { Moon, Shield, Sun, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboard-store'

export function TopNav() {
  const { role, theme, setRole, toggleTheme } = useDashboardStore()
  const isAdmin = role === 'admin'

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative z-20 flex w-full pb-8 pt-2 items-end justify-end"
      >
        <div className="hidden lg:flex items-center gap-4 md:gap-6">
          <div
            className={cn(
              'flex items-center gap-3 rounded-2xl border border-edge/80 bg-[var(--glass-fill)] px-4 py-3 shadow-float backdrop-blur-xl',
              'ring-1 ring-white/[0.03]',
            )}
          >
            <div className="flex items-center gap-2">
              <User
                className={cn(
                  'h-4 w-4 transition-colors',
                  isAdmin ? 'text-sage' : 'text-muted',
                )}
              />
              <Label htmlFor="role-mode" className="text-[11px] normal-case">
                Viewer
              </Label>
              <Switch
                id="role-mode"
                checked={isAdmin}
                onCheckedChange={(c) => setRole(c ? 'admin' : 'viewer')}
              />
              <Label htmlFor="role-mode" className="text-[11px] normal-case">
                Admin
              </Label>
            </div>
            <div
              className={cn(
                'hidden h-8 w-px bg-edge sm:block',
                'light:bg-edge',
              )}
            />
            <div className="flex items-center gap-2">
              <Shield
                className={cn(
                  'h-4 w-4',
                  isAdmin ? 'text-sage' : 'text-muted/50',
                )}
              />
              <span className="text-xs text-muted">
                Mode:{' '}
                <span className="font-medium text-ink">
                  {isAdmin ? 'Read-write' : 'Read-only'}
                </span>
              </span>
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-xl border-edge bg-panel/50 backdrop-blur-md"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-highlight" />
                ) : (
                  <Moon className="h-4 w-4 text-moss" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}
