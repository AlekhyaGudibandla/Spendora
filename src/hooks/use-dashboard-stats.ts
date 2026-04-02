import { useMemo } from 'react'
import type { Transaction } from '@/store/dashboard-store'

export function useDashboardStats(transactions: Transaction[]) {
  return useMemo(() => {
    const totalBalance = transactions.reduce((a, t) => a + t.amount, 0)
    const totalIncome = transactions
      .filter((t) => t.amount > 0)
      .reduce((a, t) => a + t.amount, 0)
    const totalExpense = transactions
      .filter((t) => t.amount < 0)
      .reduce((a, t) => a + Math.abs(t.amount), 0)
    
    const marchSpend = transactions
      .filter((t) => t.amount < 0 && t.date.startsWith('2026-03'))
      .reduce((a, t) => a + Math.abs(t.amount), 0)
    
    const weeklyBurn = Math.max(400, marchSpend / 4.2)
    const runway = Math.round((Math.max(totalBalance, 0) / weeklyBurn) * 10) / 10
    
    // Group by category for visualization
    const categoryTotals = transactions.reduce((acc, t) => {
      const amt = Math.abs(t.amount)
      acc[t.category] = (acc[t.category] || 0) + amt
      return acc
    }, {} as Record<string, number>)

    const spendingBreakdown = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value)

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      runwayWeeks: Math.min(48, Math.max(4, runway)),
      spendingBreakdown
    }
  }, [transactions])
}
