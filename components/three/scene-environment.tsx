"use client"

import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"

export function SceneEnvironment() {
  const { scene } = useThree()

  useEffect(() => {
    // ... (Your existing canvas gradient code remains exactly the same) ...
    const canvas = document.createElement("canvas")
    canvas.width = 2
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    const gradient = ctx.createLinearGradient(0, 0, 0, 512)
    gradient.addColorStop(0, "#3AB0FF")
    gradient.addColorStop(0.35, "#7AD5FF")
    gradient.addColorStop(0.65, "#FFD7A8")
    gradient.addColorStop(1, "#F6F8FF")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2, 512)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    scene.background = texture
    scene.fog = new THREE.FogExp2("#dfeaff", 0.01)

    return () => {
      texture.dispose()
      // @ts-ignore
      scene.fog = null
      scene.background = null
    }
  }, [scene])

  return (
    <>
      <ambientLight intensity={0.9} color="#fff7ea" />
      <directionalLight
        position={[15, 25, 15]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#fff4e3"
      />
      <directionalLight position={[-10, 10, -5]} intensity={0.45} color="#e8f6ff" />

      {/* FIX IS HERE: Changed skyColor to color */}
      <hemisphereLight color="#7bd0ff" groundColor="#e8d8b0" intensity={0.6} />
    </>
  )
}
