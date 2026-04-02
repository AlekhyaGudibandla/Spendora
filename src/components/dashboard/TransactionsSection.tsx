import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
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

export function TransactionsSection({ loading }: { loading: boolean }) {
  const {
    transactions,
    filters,
    setFilters,
    role,
    deleteTransaction,
  } = useDashboardStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesCategory = !filters.category || t.category === filters.category
      const matchesSearch = !filters.search || 
        t.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [transactions, filters])

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

  return (
    <TooltipProvider delayDuration={200}>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <TransactionFilters onAddTransaction={handleAdd} />

        <div className="overflow-hidden rounded-3xl border border-edge/80 bg-panel/40 shadow-xl backdrop-blur-xl">
          {loading ? (
            <div className="space-y-4 p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-2xl bg-edge/20" />
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-edge/50 bg-highlight/5 hover:bg-highlight/5">
                    <TableHead className="w-[120px] font-bold text-xs uppercase tracking-widest text-muted/60 pl-6">Date</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-widest text-muted/60">Merchant</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-widest text-muted/60">Category</TableHead>
                    <TableHead className="text-right font-bold text-xs uppercase tracking-widest text-muted/60">Amount</TableHead>
                    <TableHead className="text-right font-bold text-xs uppercase tracking-widest text-muted/60">Status</TableHead>
                    <TableHead className="w-[100px] pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((t) => (
                    <TransactionRow
                      key={t.id}
                      t={t}
                      role={role}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </TableBody>
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
