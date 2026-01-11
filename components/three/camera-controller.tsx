"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { useAppStore } from "@/lib/store"

// Closer camera positions (zoom in)
const CAMERA_POSITIONS: Record<
  string,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  home: { position: [0, 8, 18], target: [0, 2.2, 0] },
  about: { position: [-10, 7.5, 14], target: [-2, 2.5, 0] },
  projects: { position: [10, 7.5, 14], target: [2, 2.5, 0] },
  coding: { position: [0, 10, 15], target: [0, 3, 0] },
}

export function CameraController() {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const currentSection = useAppStore((state) => state.currentSection)
  const targetPosition = useRef(new THREE.Vector3(0, 8, 18))
  const targetLookAt = useRef(new THREE.Vector3(0, 2.2, 0))

  useEffect(() => {
    const config = CAMERA_POSITIONS[currentSection] ?? CAMERA_POSITIONS.home
    targetPosition.current.set(...(config.position as [number, number, number]))
    targetLookAt.current.set(...(config.target as [number, number, number]))
  }, [currentSection])

  useFrame((state, delta) => {
    if (!controlsRef.current) return

    camera.position.lerp(targetPosition.current, delta * 2.0)
    controlsRef.current.target.lerp(targetLookAt.current, delta * 2.0)
    controlsRef.current.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 6}
    />
  )
}
