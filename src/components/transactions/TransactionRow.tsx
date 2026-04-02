import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { type Role, type Transaction } from '@/store/dashboard-store'

function formatMoney(n: number) {
  const sign = n < 0 ? '−' : '+'
  return `${sign}$${Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function TransactionRow({
  t,
  role,
  onEdit,
  onDelete,
}: {
  t: Transaction
  role: Role
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}) {
  const isAdmin = role === 'admin'

  return (
    <TableRow className="group hover:bg-highlight/5 transition-colors">
      <TableCell className="font-mono text-xs text-muted">{t.date}</TableCell>
      <TableCell className="font-medium">{t.merchant}</TableCell>
      <TableCell>
        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-muted font-medium transition-colors group-hover:bg-accent/20 group-hover:text-ink">
          {t.category}
        </span>
      </TableCell>
      <TableCell
        className={cn(
          'text-right font-mono tabular-nums font-semibold',
          t.amount < 0 ? 'text-expense' : 'text-sage',
        )}
      >
        {formatMoney(t.amount)}
      </TableCell>
      <TableCell className="text-right">
        <span
          className={cn(
            'text-xs uppercase tracking-widest font-bold',
            t.status === 'cleared' ? 'text-sage' : 'text-muted',
          )}
        >
          {t.status}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1 opacity-0 transition-all group-hover:opacity-100">
          {isAdmin ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted hover:text-primary hover:bg-primary/10"
                onClick={() => onEdit(t)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted hover:text-expense hover:bg-expense/10"
                onClick={() => onDelete(t.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex cursor-not-allowed">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled
                    className="h-8 w-8 text-muted/30"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">Admin access required</TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
