import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useDashboardStore, type Transaction } from '@/store/dashboard-store'
import { TransactionRow } from '@/components/transactions/TransactionRow'
import { TransactionFilters } from '@/components/transactions/TransactionFilters'
import { TransactionModal } from '@/components/transactions/TransactionModal'
import { Button } from '@/components/ui/button'
import { Download, ChevronDown, ChevronRight } from 'lucide-react'
import { exportToCsv, exportToJson } from '@/lib/export-utils'
import { cn } from '@/lib/utils'

export function TransactionsSection({ loading }: { loading: boolean }) {
  const {
    transactions,
    filters,
    setFilters,
    role,
    deleteTransaction,
    fetchTransactions,
  } = useDashboardStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const filteredAndSortedTransactions = useMemo(() => {
    // 1. Filtering
    const filtered = transactions.filter((t) => {
      const matchesCategory = !filters.category || t.category === filters.category
      const matchesSearch = !filters.search || 
        t.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      return matchesCategory && matchesSearch
    })

    // 2. Sorting
    return [...filtered].sort((a, b) => {
      const order = filters.sortOrder === 'asc' ? 1 : -1
      if (filters.sortBy === 'amount') {
        return (a.amount - b.amount) * order
      }
      if (filters.sortBy === 'merchant') {
        return a.merchant.localeCompare(b.merchant) * order
      }
      return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order
    })
  }, [transactions, filters])

  // 3. Grouping
  const groups = useMemo(() => {
    if (filters.groupBy === 'none') return null
    
    return filteredAndSortedTransactions.reduce((acc, t) => {
      const key = t[filters.groupBy as keyof Transaction] as string
      if (!acc[key]) acc[key] = []
      acc[key].push(t)
      return acc
    }, {} as Record<string, Transaction[]>)
  }, [filteredAndSortedTransactions, filters.groupBy])

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  const toggleGroup = (key: string) => {
    setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const renderTableContent = () => {
    if (filters.groupBy !== 'none' && groups) {
      return Object.entries(groups).map(([groupKey, items]) => (
        <TableBody key={groupKey} className="border-t-[8px] border-transparent">
          <TableRow 
            className="bg-highlight/5 hover:bg-highlight/10 cursor-pointer border-none"
            onClick={() => toggleGroup(groupKey)}
          >
            <TableCell colSpan={6} className="py-3 px-6">
              <div className="flex items-center gap-2">
                {collapsedGroups[groupKey] ? <ChevronRight className="h-4 w-4 text-muted" /> : <ChevronDown className="h-4 w-4 text-muted" />}
                <span className="text-sm font-bold text-ink uppercase tracking-wider">{groupKey}</span>
                <span className="ml-auto text-xs text-muted font-medium px-2 py-0.5 rounded-full bg-panel/50 border border-edge/40">
                  {items.length} items
                </span>
                <span className="text-sm font-bold text-ink ml-4">
                  ${items.reduce((a, b) => a + Math.abs(b.amount), 0).toLocaleString()}
                </span>
              </div>
            </TableCell>
          </TableRow>
          {!collapsedGroups[groupKey] && items.map((t) => (
            <TransactionRow
              key={t.id}
              t={t}
              role={role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </TableBody>
      ))
    }

    return (
      <TableBody>
        {filteredAndSortedTransactions.map((t) => (
          <TransactionRow
            key={t.id}
            t={t}
            role={role}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </TableBody>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-ink">Ledger Activity</h3>
            
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-edge hover:bg-highlight/10 gap-2 h-9"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className={cn("h-3 w-3 transition-transform", showExportMenu && "rotate-180")} />
              </Button>
              
              {showExportMenu && (
                <div className="absolute right-0 top-[calc(100%+4px)] z-[100] w-40 rounded-xl border border-edge bg-panel/95 backdrop-blur-xl p-1 shadow-2xl animate-in fade-in slide-in-from-top-1">
                  <button 
                    onClick={() => { exportToCsv(filteredAndSortedTransactions, 'spendora_ledger.csv'); setShowExportMenu(false) }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-muted hover:text-ink hover:bg-highlight/10 rounded-lg transition-colors"
                  >
                    Export as CSV
                  </button>
                  <button 
                    onClick={() => { exportToJson(filteredAndSortedTransactions, 'spendora_ledger.json'); setShowExportMenu(false) }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-muted hover:text-ink hover:bg-highlight/10 rounded-lg transition-colors"
                  >
                    Export as JSON
                  </button>
                </div>
              )}
            </div>
          </div>

          <TransactionFilters onAddTransaction={handleAdd} />
        </div>

        <div className="overflow-hidden rounded-3xl border border-edge/80 bg-panel/40 shadow-xl backdrop-blur-xl">
          {loading ? (
            <div className="space-y-4 p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-2xl bg-edge/20" />
              ))}
            </div>
          ) : filteredAndSortedTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <div className="rounded-full bg-highlight/10 p-6">
                 <p className="text-lg font-bold text-ink">No Transactions Found</p>
                 <p className="mt-1 text-sm text-muted max-w-[280px]">
                    We couldn't find any ledger entries matching your current filters.
                 </p>
              </div>
              <Button
                variant="outline"
                className="rounded-xl border-edge hover:bg-highlight/10"
                onClick={() => setFilters({ category: null, search: '' })}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto min-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-edge/50 bg-highlight/5 hover:bg-highlight/5">
                    <TableHead className="w-[120px] font-bold text-xs uppercase tracking-widest text-muted/60 pl-6">
                      <button className="flex items-center gap-1" onClick={() => setFilters({ sortBy: 'date', sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}>
                        Date {filters.sortBy === 'date' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-widest text-muted/60">
                       <button className="flex items-center gap-1" onClick={() => setFilters({ sortBy: 'merchant', sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}>
                        Merchant {filters.sortBy === 'merchant' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-widest text-muted/60">Category</TableHead>
                    <TableHead className="text-right font-bold text-xs uppercase tracking-widest text-muted/60">
                       <button className="ml-auto flex items-center gap-1" onClick={() => setFilters({ sortBy: 'amount', sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}>
                        Amount {filters.sortBy === 'amount' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead className="text-right font-bold text-xs uppercase tracking-widest text-muted/60">Status</TableHead>
                    <TableHead className="w-[100px] pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                {renderTableContent()}
              </Table>
            </div>
          )}
        </div>

        <TransactionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editingTransaction={editingTransaction}
        />
      </motion.section>
    </TooltipProvider>
  )
}
