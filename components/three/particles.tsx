"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function MagicParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 100

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
        cols[i * 3] = 0.13
        cols[i * 3 + 1] = 0.59
        cols[i * 3 + 2] = 0.56
      } else {
        cols[i * 3] = 0.2
        cols[i * 3 + 1] = 0.8
        cols[i * 3 + 2] = 0.8
      }
    }
    return cols
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const positionsArr = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      positionsArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.003
    }

    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}
