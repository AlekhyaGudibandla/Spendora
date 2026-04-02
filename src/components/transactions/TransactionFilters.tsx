import { Filter, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboard-store'

export function TransactionFilters({
  onAddTransaction,
}: {
  onAddTransaction: () => void
}) {
  const { filters, setFilters, transactions, role } = useDashboardStore()

  const categories = Array.from(new Set(transactions.map((x) => x.category))).sort()
  const isAdmin = role === 'admin'

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap gap-3">
        <div className="relative group/search flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within/search:text-primary" />
          <input
            type="search"
            placeholder="Search merchant or category…"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            className={cn(
              'h-11 w-full rounded-2xl border border-edge bg-[var(--glass-fill)] pl-10 pr-4 text-sm text-ink',
              'placeholder:text-muted/60 backdrop-blur-md outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10',
            )}
          />
        </div>

        <div className="relative group/filter">
          <Filter className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within/filter:text-primary" />
          <select
            className={cn(
               'h-11 appearance-none rounded-2xl border border-edge bg-[var(--glass-fill)] pl-10 pr-10 text-sm focus:ring-4 focus:ring-primary/10 transition-all outline-none',
               'text-ink dark:text-[#F3F5F1] light:text-[#111413]',
               'dark:[&>option]:bg-[#111413] dark:[&>option]:text-[#F3F5F1] [&>option]:bg-[#FFFFFF] [&>option]:text-[#111413]',
            )}
            value={filters.category ?? ''}
            onChange={(e) => setFilters({ category: e.target.value || null })}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 border-l border-t border-muted/50 transition-colors transform rotate-[225deg]" />
        </div>
      </div>

      {isAdmin && (
        <Button
          onClick={onAddTransaction}
          className="h-11 rounded-2xl px-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      )}
    </div>
  )
}
