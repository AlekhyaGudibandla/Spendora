import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { type Transaction, useDashboardStore } from '@/store/dashboard-store'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export function TransactionModal({
  isOpen,
  onClose,
  editingTransaction,
}: {
  isOpen: boolean
  onClose: () => void
  editingTransaction: Transaction | null
}) {
  const { addTransaction, updateTransaction } = useDashboardStore()
  
  const [merchant, setMerchant] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [status, setStatus] = useState<'cleared' | 'pending'>('cleared')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editingTransaction) {
      setMerchant(editingTransaction.merchant)
      setCategory(editingTransaction.category)
      setAmount(String(Math.abs(editingTransaction.amount)))
      setType(editingTransaction.amount < 0 ? 'expense' : 'income')
      setStatus(editingTransaction.status)
    } else {
      setMerchant('')
      setCategory('')
      setAmount('')
      setType('expense')
      setStatus('cleared')
    }
    setError(null)
  }, [editingTransaction, isOpen])

  const handleSave = () => {
    if (!merchant || !category || !amount) {
      setError('Please fill in all required fields.')
      return
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid positive amount.')
      return
    }

    const finalAmount = type === 'expense' ? -numAmount : numAmount

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, {
        merchant,
        category,
        amount: finalAmount,
        status,
      })
    } else {
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
        merchant,
        category,
        amount: finalAmount,
        status,
      }
      addTransaction(newTransaction)
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[480px] rounded-3xl border-edge bg-panel/95 backdrop-blur-2xl shadow-2xl overflow-hidden p-0">
        <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight text-ink">
              {editingTransaction ? 'Edit' : 'New'} <span className="text-primary text-2xl">Transaction</span>
            </DialogTitle>
            <DialogDescription className="text-muted/80 pt-1">
              {editingTransaction ? 'Update the details of your ledger entry.' : 'Record a new movement in your fiscal flow.'}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid gap-6 p-6">
          {error && (
            <div className="flex items-center gap-3 rounded-2xl bg-expense/10 px-4 py-3 text-sm text-expense border border-expense/20 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="merchant" className="text-xs font-bold uppercase tracking-widest text-muted/60 pl-1">
                Merchant
              </Label>
              <input
                id="merchant"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                placeholder="e.g. Apple Store"
                className="h-11 w-full rounded-2xl border border-edge bg-canvas/30 px-4 text-sm text-ink outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-muted/60 pl-1">
                  Category
                </Label>
                <input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Tech"
                  className="h-11 w-full rounded-2xl border border-edge bg-canvas/30 px-4 text-sm text-ink outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-widest text-muted/60 pl-1">
                  Amount
                </Label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="h-11 w-full rounded-2xl border border-edge bg-canvas/30 px-4 text-sm text-ink outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 pl-1">Type</Label>
                <div className="flex p-1 gap-1 rounded-2xl bg-canvas/30 border border-edge h-11">
                  <button
                    onClick={() => setType('expense')}
                    className={cn(
                      'flex-1 text-xs font-bold rounded-xl transition-all',
                      type === 'expense' ? 'bg-panel text-expense shadow-sm ring-1 ring-edge' : 'text-muted hover:text-ink'
                    )}
                  >
                    Expense
                  </button>
                  <button
                    onClick={() => setType('income')}
                    className={cn(
                      'flex-1 text-xs font-bold rounded-xl transition-all',
                      type === 'income' ? 'bg-panel text-sage shadow-sm ring-1 ring-edge' : 'text-muted hover:text-ink'
                    )}
                  >
                    Income
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 pl-1">Status</Label>
                <div className="flex p-1 gap-1 rounded-2xl bg-canvas/30 border border-edge h-11">
                  <button
                    onClick={() => setStatus('cleared')}
                    className={cn(
                      'flex-1 text-xs font-bold rounded-xl transition-all',
                      status === 'cleared' ? 'bg-panel text-sage shadow-sm ring-1 ring-edge' : 'text-muted hover:text-ink'
                    )}
                  >
                    Cleared
                  </button>
                  <button
                    onClick={() => setStatus('pending')}
                    className={cn(
                      'flex-1 text-xs font-bold rounded-xl transition-all',
                      status === 'pending' ? 'bg-panel text-muted shadow-sm ring-1 ring-edge' : 'text-muted hover:text-ink'
                    )}
                  >
                    Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="bg-panel/50 p-6 border-t border-edge flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-2xl h-11 text-muted hover:text-ink hover:bg-highlight/10 font-bold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-2xl h-11 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
             {editingTransaction ? (
               <>
                 Confirm Changes
                 <CheckCircle2 className="ml-2 h-4 w-4" />
               </>
             ) : (
               <>
                 Create Entry
                 <CheckCircle2 className="ml-2 h-4 w-4" />
               </>
             )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
