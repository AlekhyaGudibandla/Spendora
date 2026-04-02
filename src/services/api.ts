import type { Transaction } from '@/store/dashboard-store'
import { initialTransactions } from '@/data/mock'

const DELAY = 800 // Simulating network lag

export const api = {
  async getTransactions(): Promise<Transaction[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...initialTransactions])
      }, DELAY)
    })
  },

  async addTransaction(t: Transaction): Promise<Transaction> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(t)
      }, DELAY)
    })
  },

  async updateTransaction(_id: string, _patch: Partial<Transaction>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, DELAY)
    })
  },

  async deleteTransaction(_id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, DELAY)
    })
  },
}
