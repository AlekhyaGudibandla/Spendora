import { useMemo } from 'react'
import type { Transaction } from '@/store/dashboard-store'

export function useDashboardStats(transactions: Transaction[]) {
  return useMemo(() => {
    const net = transactions.reduce((a, t) => a + t.amount, 0)
    const spend = transactions
      .filter((t) => t.amount < 0 && t.date.startsWith('2026-03'))
      .reduce((a, t) => a + t.amount, 0)
    const weekly = Math.max(400, Math.abs(spend) / 4.2)
    const runway = Math.round((Math.max(net, 0) / weekly) * 10) / 10
    
    return {
      netPosition: net,
      monthlySpend: spend,
      runwayWeeks: Math.min(48, Math.max(4, runway)),
    }
  }, [transactions])
}
