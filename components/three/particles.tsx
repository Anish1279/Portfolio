"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

const PARTICLE_COUNT = 60

export function MagicParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const cols = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 10
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.random() * 15 - 5
      pos[i * 3 + 2] = Math.sin(angle) * radius

      const isTeal = Math.random() > 0.5
      cols[i * 3] = isTeal ? 0.13 : 0.2
      cols[i * 3 + 1] = isTeal ? 0.59 : 0.8
      cols[i * 3 + 2] = isTeal ? 0.56 : 0.8
    }
    return { positions: pos, colors: cols }
  }, [])

  // Spin the entire point cloud as a cheap stand-in for per-particle motion.
  // The previous per-particle Y-jitter wrote into a Float32Array every frame and
  // forced a GPU buffer upload (60+ FPS × 100 particles = 18k writes/sec).
  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}
