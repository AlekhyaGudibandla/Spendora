import { useEffect, useState } from 'react'

/** Slow background drift vs UI — subtle mouse parallax */
export function useParallaxBg(strength = 8) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const x = ((e.clientX - cx) / cx) * strength
      const y = ((e.clientY - cy) / cy) * strength
      setOffset({ x, y })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [strength])

  return offset
}
