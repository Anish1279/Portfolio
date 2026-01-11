"use client"

import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"

export function SceneEnvironment() {
  const { scene } = useThree()

  useEffect(() => {
    // Create vertical gradient canvas for a vibrant sky
    const canvas = document.createElement("canvas")
    canvas.width = 2
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    // Vibrant sky: deep teal -> blue -> soft pink near horizon
    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, "#3AB0FF") // bright azure
    gradient.addColorStop(0.35, "#7AD5FF") // light cyan
    gradient.addColorStop(0.65, "#FFD7A8") // warm peach near horizon
    gradient.addColorStop(1, "#F6F8FF") // very light

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2, 512)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    scene.background = texture

    // soft fog for depth
    scene.fog = new THREE.FogExp2("#dfeaff", 0.01)

    return () => {
      texture.dispose()
      // clear fog/background cleanly
      // @ts-ignore
      scene.fog = null
      scene.background = null
    }
  }, [scene])

  return (
    <>
      {/* Main warm sunlight */}
      <ambientLight intensity={0.9} color="#fff7ea" />
      <directionalLight
        position={[15, 25, 15]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#fff4e3"
      />
      {/* Fill light */}
      <directionalLight position={[-10, 10, -5]} intensity={0.45} color="#e8f6ff" />
      {/* Hemisphere to give colorful ambient mixing */}
      <hemisphereLight skyColor="#7bd0ff" groundColor="#e8d8b0" intensity={0.6} />
    </>
  )
}
