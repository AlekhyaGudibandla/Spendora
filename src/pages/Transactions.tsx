import { TransactionsSection } from '@/components/dashboard/TransactionsSection'
import { useDashboardStore } from '@/store/dashboard-store'

export function Transactions() {
  const { isBootLoading } = useDashboardStore()

  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Financial <span className="text-primary">Ledger</span>
          </h2>
          <p className="mt-4 text-lg text-muted md:text-xl">
            Detailed breakdown of every byte of your capital
          </p>
        </div>
      </header>

      <TransactionsSection loading={isBootLoading} />
    </div>
  )
}
