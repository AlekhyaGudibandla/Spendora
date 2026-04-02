import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  Wallet,
} from 'lucide-react'
import { useCardTilt } from '@/hooks/use-tilt'
import { cn } from '@/lib/utils'
import { AnimatedCurrency } from '@/components/dashboard/AnimatedCurrency'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18, rotateX: 6 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

type CardProps = {
  title: string
  subtitle: string
  value: number
  trend: string
  trendUp?: boolean
  icon: ReactNode
  colorClass?: string
}

function OverviewGlassCard({
  title,
  subtitle,
  value,
  trend,
  trendUp,
  icon,
  colorClass = 'text-sage bg-moss/15',
}: CardProps) {
  const { ref, onMove, onLeave } = useCardTilt()

  return (
    <motion.div variants={item} className="perspective-[1400px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ z: 24, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        style={{
          transform:
            'perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)',
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'group relative overflow-hidden rounded-2xl border',
          'bg-[var(--glass-fill)] shadow-float backdrop-blur-2xl transition-all duration-300',
          'border-white/[0.06] dark:border-white/[0.06] light:border-edge/50',
          'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl',
          'dark:before:bg-glass-dark light:before:bg-transparent',
          'after:absolute after:inset-px after:rounded-[15px] dark:after:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] light:after:shadow-none',
          'hover:border-primary/30 hover:shadow-lift',
        )}
      >
        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                {title}
              </p>
              <p className="mt-1 text-[11px] text-muted/80">{subtitle}</p>
            </div>
            <div className={cn('rounded-xl border border-edge/60 p-2', colorClass)}>
              {icon}
            </div>
          </div>
          <div className="mt-6 font-display text-3xl font-semibold tabular-nums tracking-tight text-ink md:text-[1.75rem]">
            <AnimatedCurrency value={value} />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            {trendUp ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-sage" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-expense/90" />
            )}
            <span>{trend}</span>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sage/10 blur-3xl transition-opacity group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  )
}

type Props = {
  totalBalance: number
  totalIncome: number
  totalExpense: number
}

export function OverviewCards({
  totalBalance,
  totalIncome,
  totalExpense,
}: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-5 md:grid-cols-3"
    >
      <OverviewGlassCard
        title="Total Balance"
        subtitle="Current net worth"
        value={totalBalance}
        trend="+2.4% vs month avg"
        trendUp
        icon={<Wallet className="h-4 w-4" />}
      />
      <OverviewGlassCard
        title="Total Income"
        subtitle="Cumulative inflow"
        value={totalIncome}
        trend="+14.2% projected"
        trendUp
        icon={<TrendingUp className="h-4 w-4" />}
        colorClass="text-sage bg-moss/15"
      />
      <OverviewGlassCard
        title="Total Expenses"
        subtitle="Cumulative outflow"
        value={totalExpense}
        trend="−5.1% under budget"
        trendUp={false}
        icon={<Receipt className="h-4 w-4" />}
        colorClass="text-expense bg-expense/10"
      />
    </motion.section>
  )
}
