import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function OrbMesh() {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.08
    ref.current.rotation.y += delta * 0.12
  })
  return (
    <mesh ref={ref} scale={1.15}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#6F7F72"
        metalness={0.35}
        roughness={0.55}
        transparent
        opacity={0.14}
        wireframe={false}
      />
    </mesh>
  )
}

/** Small ambient shape — low cost, single mesh */
export function FloatingOrb() {
  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-0 h-40 w-40 opacity-70 mix-blend-screen md:h-48 md:w-48"
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 3.2], fov: 42 }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[4, 4, 6]} intensity={0.45} color="#DCE3D8" />
        <OrbMesh />
      </Canvas>
    </div>
  )
}
