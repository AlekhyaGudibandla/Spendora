import { lazy, Suspense } from 'react'
import { cn } from '@/lib/utils'

const ShaderGradientCanvas = lazy(() =>
  import('@shadergradient/react').then((m) => ({
    default: m.ShaderGradientCanvas,
  })),
)
const ShaderGradient = lazy(() =>
  import('@shadergradient/react').then((m) => ({ default: m.ShaderGradient })),
)

type Props = {
  parallaxX: number
  parallaxY: number
  theme?: 'dark' | 'light'
  className?: string
}

export function ShaderBackdrop({
  parallaxX,
  parallaxY,
  theme = 'dark',
  className,
}: Props) {
  const colors =
    theme === 'light'
      ? { c1: '#E6E9E4', c2: '#B8C4B2', c3: '#8A9A8D' }
      : { c1: '#0B0D0C', c2: '#2F3B33', c3: '#6F7F72' }
  return (
    <div
      className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}
      aria-hidden
    >
      <div
        className="absolute inset-[-8%] will-change-transform"
        style={{
          transform: `translate3d(${parallaxX * 0.35}px, ${parallaxY * 0.35}px, 0) scale(1.04)`,
          transition: 'transform 0.6s ease-out',
        }}
      >
        <Suspense
          fallback={
            <div className="h-full w-full bg-gradient-to-br from-moss via-canvas to-canvas" />
          }
        >
          <ShaderGradientCanvas
            lazyLoad
            pointerEvents="none"
            fov={45}
            pixelDensity={1.25}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <ShaderGradient
              control="props"
              animate="on"
              type="plane"
              wireframe={false}
              shader="defaults"
              uSpeed={theme === 'light' ? 0.18 : 0.25}
              uStrength={theme === 'light' ? 0.12 : 0.18}
              uDensity={1.1}
              uFrequency={5.5}
              uAmplitude={3.2}
              color1={colors.c1}
              color2={colors.c2}
              color3={colors.c3}
              reflection={0.12}
              brightness={0.85}
              positionX={0}
              positionY={0}
              positionZ={0}
              rotationX={-18}
              rotationY={12}
              rotationZ={0}
              cDistance={4.2}
              cameraZoom={8}
            />
          </ShaderGradientCanvas>
        </Suspense>
      </div>
      <div
        className={
          theme === 'light'
            ? 'absolute inset-0 bg-gradient-to-b from-canvas/35 via-transparent to-canvas/95'
            : 'absolute inset-0 bg-gradient-to-b from-canvas/20 via-transparent to-canvas/90'
        }
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(111,127,114,0.12),transparent_55%)]" />
    </div>
  )
}
