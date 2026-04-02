import type { Transaction } from '@/store/dashboard-store'

export const initialTransactions: Transaction[] = [
  {
    id: 't1',
    date: '2026-03-28',
    merchant: 'Atelier North',
    category: 'Retail',
    amount: -124.5,
    status: 'cleared',
  },
  {
    id: 't2',
    date: '2026-03-27',
    merchant: 'Harbor Transit',
    category: 'Transit',
    amount: -42.0,
    status: 'cleared',
  },
  {
    id: 't3',
    date: '2026-03-26',
    merchant: 'Olive & Grain',
    category: 'Dining',
    amount: -68.2,
    status: 'cleared',
  },
  {
    id: 't4',
    date: '2026-03-25',
    merchant: 'Studio Cloud',
    category: 'Software',
    amount: -49.0,
    status: 'pending',
  },
  {
    id: 't5',
    date: '2026-03-24',
    merchant: 'Northwind Energy',
    category: 'Utilities',
    amount: -210.0,
    status: 'cleared',
  },
  {
    id: 't6',
    date: '2026-03-22',
    merchant: 'Ledger Payroll',
    category: 'Income',
    amount: 4820.0,
    status: 'cleared',
  },
  {
    id: 't7',
    date: '2026-03-21',
    merchant: 'Frame Works',
    category: 'Retail',
    amount: -312.0,
    status: 'cleared',
  },
  {
    id: 't8',
    date: '2026-03-20',
    merchant: 'Urban Gym',
    category: 'Wellness',
    amount: -89.0,
    status: 'pending',
  },
]

/** Monthly series for charts (synthetic, calm curves) */
export const cashflowSeries = [
  { m: 'Oct', inflow: 12400, outflow: 9800 },
  { m: 'Nov', inflow: 13200, outflow: 10100 },
  { m: 'Dec', inflow: 11800, outflow: 11200 },
  { m: 'Jan', inflow: 14100, outflow: 10500 },
  { m: 'Feb', inflow: 13800, outflow: 9900 },
  { m: 'Mar', inflow: 15200, outflow: 10800 },
]

export const categoryBreakdown = [
  { name: 'Dining', value: 18 },
  { name: 'Transit', value: 12 },
  { name: 'Software', value: 22 },
  { name: 'Retail', value: 28 },
  { name: 'Other', value: 20 },
]
