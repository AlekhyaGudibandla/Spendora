import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  /** Weeks / counts — no currency symbol */
  format?: 'currency' | 'number'
}

export function AnimatedCurrency({
  value,
  className,
  prefix = '',
  suffix = '',
  format = 'currency',
}: Props) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)

  useEffect(() => {
    const c = animate(fromRef.current, value, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => {
        fromRef.current = value
      },
    })
    return () => c.stop()
  }, [value])

  const formatted =
    format === 'currency'
      ? Math.abs(display).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : Math.round(display).toLocaleString()

  const sign = format === 'currency' && value < 0 ? '−' : ''
  const sym = format === 'currency' ? '$' : ''

  return (
    <span className={className}>
      {prefix}
      {sign}
      {sym}
      {formatted}
      {suffix}
    </span>
  )
}
