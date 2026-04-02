import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { cashflowSeries } from '@/data/mock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const chartWrap = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const PIE_COLORS = ['#6F7F72', '#A06A5F', '#A8B59F', '#5F6B63', '#DCE3D8', '#E6EBE4']

type Props = {
  spendingBreakdown?: { name: string; value: number }[]
}

export function ChartsSection({ spendingBreakdown = [] }: Props) {
  return (
    <div className="grid gap-6">
      {/* Time-based: Cashflow Rhythm */}
      <motion.div variants={chartWrap} initial="hidden" animate="show">
        <Card className="overflow-hidden border-edge/80 bg-[var(--glass-fill)] shadow-lift backdrop-blur-2xl">
          <CardHeader className="pb-0">
            <CardTitle className="font-display text-base">
              Cashflow rhythm
            </CardTitle>
            <p className="text-sm text-muted">
              Inflow vs outflow — six month glide path
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[280px] w-full md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <AreaChart
                  data={cashflowSeries}
                  margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="inG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6F7F72" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#6F7F72" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A06A5F" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#A06A5F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 10"
                    stroke="var(--color-edge)"
                    strokeOpacity={0.45}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="m"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--color-muted)', fontSize: 11 }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--color-muted)', fontSize: 11 }}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <RTooltip
                    animationDuration={300}
                    isAnimationActive={true}
                    contentStyle={{
                      background: 'var(--color-panel)',
                      border: '1px solid var(--color-edge)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: 'var(--color-ink)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                    }}
                    labelStyle={{ color: 'var(--color-muted)' }}
                    formatter={(val) => [
                      `$${Number(val ?? 0).toLocaleString()}`,
                      '',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="inflow"
                    stroke="#6F7F72"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#inG)"
                    animationDuration={1200}
                  />
                  <Area
                    type="monotone"
                    dataKey="outflow"
                    stroke="#A06A5F"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#outG)"
                    animationDuration={1400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Categorical: Spending Breakdown */}
      <motion.div variants={chartWrap} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
        <Card className="overflow-hidden border-edge/80 bg-[var(--glass-fill)] shadow-lift backdrop-blur-2xl">
          <CardHeader className="pb-0">
            <CardTitle className="font-display text-base">
              Spending breakdown
            </CardTitle>
            <p className="text-sm text-muted">
              Allocation across categories
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <PieChart>
                  <Pie
                    data={spendingBreakdown}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {spendingBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="rgba(255,255,255,0.05)" />
                    ))}
                  </Pie>
                  <RTooltip
                    contentStyle={{
                      background: 'var(--color-panel)',
                      border: '1px solid var(--color-edge)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: 'var(--color-ink)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                    }}
                    formatter={(val, name) => [`$${Number(val ?? 0).toLocaleString()}`, name]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span style={{ color: 'var(--color-muted)', fontSize: '11px', fontWeight: 500 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
