import { ChartsSection } from '@/components/dashboard/ChartsSection'
import { InsightsPanel } from '@/components/dashboard/InsightsPanel'

export function Analytics() {
  return (
    <div className="space-y-12">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Global <span className="text-primary">Analytics</span>
          </h2>
          <p className="mt-4 text-lg text-muted md:text-xl">
            Correlated market data and spending velocity
          </p>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ChartsSection />
        <InsightsPanel />
      </div>
    </div>
  )
}
