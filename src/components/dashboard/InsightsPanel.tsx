import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const insights = [
  {
    title: 'Discretionary drift',
    body: 'Dining clusters on weekends account for 62% of variable spend — consider a soft cap.',
  },
  {
    title: 'Subscription load',
    body: 'Software line items grew 9% quarter-over-quarter; two tools overlap in scope.',
  },
  {
    title: 'Liquidity cushion',
    body: 'Cash buffer covers 11.4 weeks at blended burn — inside your target band.',
  },
]

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
}

const row = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function InsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        className={cn(
          'relative overflow-hidden border-sage/30 bg-[var(--glass-fill)] shadow-lift backdrop-blur-2xl',
          'shadow-[0_0_52px_-14px_rgba(111,127,114,0.22)]',
        )}
      >
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss/25 text-sage ring-1 ring-sage/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="font-display text-base">Insights</CardTitle>
            <p className="text-sm text-muted">Sequential briefing</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-0 pt-2">
          <motion.ul
            variants={list}
            initial="hidden"
            animate="show"
            className="divide-y divide-edge/50"
          >
            {insights.map((line) => (
              <motion.li
                key={line.title}
                variants={row}
                className="py-4 first:pt-0 last:pb-0"
              >
                <p className="font-medium text-ink">{line.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {line.body}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
