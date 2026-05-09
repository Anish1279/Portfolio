"use client"

import { useThree } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import * as THREE from "three"

export function SceneEnvironment() {
  const { scene } = useThree()

  // Build the sky gradient texture exactly once per mount; reuse on re-render.
  const skyTexture = useMemo(() => {
    if (typeof document === "undefined") return null
    const canvas = document.createElement("canvas")
    canvas.width = 2
    canvas.height = 256
    const ctx = canvas.getContext("2d")!

    const gradient = ctx.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, "#3AB0FF")
    gradient.addColorStop(0.35, "#7AD5FF")
    gradient.addColorStop(0.65, "#FFD7A8")
    gradient.addColorStop(1, "#F6F8FF")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2, 256)

    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
    return tex
  }, [])

  useEffect(() => {
    if (!skyTexture) return
    scene.background = skyTexture
    scene.fog = new THREE.FogExp2("#dfeaff", 0.01)

    return () => {
      skyTexture.dispose()
      // @ts-ignore
      scene.fog = null
      scene.background = null
    }
  }, [scene, skyTexture])

  return (
    <>
      <ambientLight intensity={0.9} color="#fff7ea" />
      <directionalLight
        position={[15, 25, 15]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0005}
        color="#fff4e3"
      />
      <directionalLight position={[-10, 10, -5]} intensity={0.45} color="#e8f6ff" />
      <hemisphereLight color="#7bd0ff" groundColor="#e8d8b0" intensity={0.6} />
    </>
  )
}
