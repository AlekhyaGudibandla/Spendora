import { Filter, Search, Plus, SortAsc, SortDesc, Library } from 'lucide-react'
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap gap-3">
          {/* Search */}
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

          {/* Category Filter */}
          <div className="relative group/filter min-w-[160px]">
            <Filter className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within/filter:text-primary" />
            <select
              className={cn(
                'h-11 w-full appearance-none rounded-2xl border border-edge bg-[var(--glass-fill)] pl-10 pr-10 text-sm focus:ring-4 focus:ring-primary/10 transition-all outline-none',
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

      {/* Advanced Tools Row */}
      <div className="flex flex-wrap items-center gap-4 border-t border-edge/40 pt-4">
        <div className="flex items-center gap-2">
           <span className="text-xs font-medium text-muted uppercase tracking-wider">Sort by:</span>
           <div className="flex rounded-xl border border-edge bg-panel/30 p-1">
             <button 
               onClick={() => setFilters({ sortBy: 'date' })}
               className={cn("px-3 py-1 text-[11px] rounded-lg transition-all", filters.sortBy === 'date' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-ink")}
             >
               Date
             </button>
             <button 
               onClick={() => setFilters({ sortBy: 'amount' })}
               className={cn("px-3 py-1 text-[11px] rounded-lg transition-all", filters.sortBy === 'amount' ? "bg-primary text-white shadow-sm" : "text-muted hover:text-ink")}
             >
               Amount
             </button>
           </div>
           <button 
             onClick={() => setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
             className="p-2 rounded-xl hover:bg-highlight/10 text-muted transition-colors"
           >
             {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
           </button>
        </div>

        <div className="h-4 w-px bg-edge/60 hidden sm:block" />

        <div className="flex items-center gap-2">
           <Library className="h-4 w-4 text-muted" />
           <span className="text-xs font-medium text-muted uppercase tracking-wider">Group:</span>
           <select 
             className="bg-transparent text-xs font-bold text-ink outline-none cursor-pointer dark:[&>option]:bg-[#111413] dark:[&>option]:text-[#F3F5F1] [&>option]:bg-white [&>option]:text-black"
             value={filters.groupBy}
             onChange={(e) => setFilters({ groupBy: e.target.value as any })}
           >
             <option value="none">None</option>
             <option value="category">Category</option>
             <option value="type">Type</option>
           </select>
        </div>
      </div>
    </div>
  )
}
