import { saveAs } from 'file-saver'
import type { Transaction } from '@/store/dashboard-store'

export async function exportToCsv(data: Transaction[], filename: string = 'spendora_export.csv') {
  const headers = ['Date', 'Merchant', 'Category', 'Amount', 'Status']
  const rows = data.map((t) => [
    t.date,
    `"${t.merchant.replace(/"/g, '""')}"`,
    t.category,
    t.amount.toString(),
    t.status,
  ])

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, filename)
}

export async function exportToJson(data: Transaction[], filename: string = 'spendora_export.json') {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
  saveAs(blob, filename)
}
