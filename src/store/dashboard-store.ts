import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialTransactions } from '@/data/mock'

export type Role = 'viewer' | 'admin'

export type Transaction = {
  id: string
  date: string
  merchant: string
  category: string
  amount: number
  status: 'cleared' | 'pending'
}

export type Filters = {
  category: string | null
  search: string
}

type State = {
  role: Role
  theme: 'dark' | 'light'
  transactions: Transaction[]
  filters: Filters
  isBootLoading: boolean
  setRole: (r: Role) => void
  toggleTheme: () => void
  setFilters: (f: Partial<Filters>) => void
  setBootLoading: (v: boolean) => void
  updateTransaction: (id: string, patch: Partial<Transaction>) => void
  addTransaction: (transaction: Transaction) => void
  deleteTransaction: (id: string) => void
}

export const useDashboardStore = create<State>()(
  persist(
    (set) => ({
      role: 'viewer',
      theme: 'dark',
      transactions: initialTransactions,
      filters: { category: null, search: '' },
      isBootLoading: true,
      setRole: (role) => set({ role }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setFilters: (f) =>
        set((s) => ({ filters: { ...s.filters, ...f } })),
      setBootLoading: (isBootLoading) => set({ isBootLoading }),
      updateTransaction: (id, patch) =>
        set((s) => {
          if (s.role !== 'admin') return s
          return {
            transactions: s.transactions.map((t) =>
              t.id === id ? { ...t, ...patch } : t,
            ),
          }
        }),
      addTransaction: (transaction) =>
        set((s) => {
          if (s.role !== 'admin') return s
          return { transactions: [transaction, ...s.transactions] }
        }),
      deleteTransaction: (id) =>
        set((s) => {
          if (s.role !== 'admin') return s
          return { transactions: s.transactions.filter((t) => t.id !== id) }
        }),
    }),
    {
      name: 'spendora-dashboard',
      partialize: (s) => ({
        role: s.role,
        theme: s.theme,
        transactions: s.transactions,
        filters: s.filters,
      }),
    },
  ),
)
