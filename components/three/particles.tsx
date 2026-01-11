"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function MagicParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 10
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.random() * 15 - 5
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const isTeal = Math.random() > 0.5
      if (isTeal) {
        // Teal color
        cols[i * 3] = 0.13
        cols[i * 3 + 1] = 0.59
        cols[i * 3 + 2] = 0.56
      } else {
        // Cyan/light teal color
        cols[i * 3] = 0.2
        cols[i * 3 + 1] = 0.8
        cols[i * 3 + 2] = 0.8
      }
    }
    return cols
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const positionsArr = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      positionsArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.003
    }
    ;(pointsRef.current.geometry.attributes.position as any).needsUpdate = true
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[]} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} args={[]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}
