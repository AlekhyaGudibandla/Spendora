import { useEffect } from 'react'
import { ChartsSection } from '@/components/dashboard/ChartsSection'
import { InsightsPanel } from '@/components/dashboard/InsightsPanel'
import { OverviewCards } from '@/components/dashboard/OverviewCards'
import { TransactionsSection } from '@/components/dashboard/TransactionsSection'
import { useDashboardStore } from '@/store/dashboard-store'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'

export function Dashboard() {
  const {
    transactions,
    isBootLoading,
    setBootLoading,
  } = useDashboardStore()

  const { netPosition, monthlySpend, runwayWeeks } = useDashboardStats(transactions)

  useEffect(() => {
    const t = window.setTimeout(() => setBootLoading(false), 900)
    return () => window.clearTimeout(t)
  }, [setBootLoading])

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Financial <span className="text-primary">Overview</span>
          </h2>
          <p className="mt-4 text-lg text-muted md:text-xl">
            Real-time insights across your fiscal stack
          </p>
        </div>
      </header>

      <OverviewCards
        netPosition={netPosition}
        monthlySpend={monthlySpend}
        runwayWeeks={runwayWeeks}
      />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ChartsSection />
        <InsightsPanel />
      </div>

      <TransactionsSection loading={isBootLoading} />
    </div>
  )
}
