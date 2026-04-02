import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'

export type Role = 'viewer' | 'admin'

export type Transaction = {
  id: string
  date: string
  merchant: string
  category: string
  amount: number
  status: 'cleared' | 'pending'
  type: 'investment' | 'purchase'
}

export type SortBy = 'date' | 'amount' | 'merchant'
export type SortOrder = 'asc' | 'desc'
export type GroupBy = 'none' | 'category' | 'type'

export type Filters = {
  category: string | null
  search: string
  sortBy: SortBy
  sortOrder: SortOrder
  groupBy: GroupBy
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
  fetchTransactions: () => Promise<void>
}

export const useDashboardStore = create<State>()(
  persist(
    (set, get) => ({
      role: 'viewer',
      theme: 'dark',
      transactions: [],
      filters: { 
        category: null, 
        search: '',
        sortBy: 'date',
        sortOrder: 'desc',
        groupBy: 'none'
      },
      isBootLoading: true,
      
      setRole: (role) => set({ role }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setFilters: (f) =>
        set((s) => ({ filters: { ...s.filters, ...f } })),
      setBootLoading: (isBootLoading) => set({ isBootLoading }),
      
      fetchTransactions: async () => {
        set({ isBootLoading: true })
        const data = await api.getTransactions()
        set({ transactions: data, isBootLoading: false })
      },

      updateTransaction: async (id, patch) => {
        const { role } = get()
        if (role !== 'admin') return
        await api.updateTransaction(id, patch)
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...patch } : t,
          ),
        }))
      },

      addTransaction: async (transaction) => {
        const { role } = get()
        if (role !== 'admin') return
        await api.addTransaction(transaction)
        set((s) => ({ transactions: [transaction, ...s.transactions] }))
      },

      deleteTransaction: async (id) => {
        const { role } = get()
        if (role !== 'admin') return
        await api.deleteTransaction(id)
        set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }))
      },
    }),
    {
      name: 'spendora-dashboard-v2',
      partialize: (s) => ({
        role: s.role,
        theme: s.theme,
        transactions: s.transactions,
        filters: s.filters,
      }),
    },
  ),
)
