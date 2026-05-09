"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useProgress } from "@react-three/drei"
import * as THREE from "three"
import { DragonModel } from "./dragon-model"
import { FloatingIsland } from "./floating-island"
import { BarbarianWarrior } from "./barbarian-warrior"
import { SceneEnvironment } from "./scene-environment"
import { MagicParticles } from "./particles"
import { CameraController } from "./camera-controller"
import { useAppStore } from "@/lib/store"

/**
 * Drives the global isLoaded flag from the actual GLTF loading manager
 * progress instead of the WebGL canvas-create event, so the loading screen
 * only hides once the priority asset (coc_base.glb) is fully streamed.
 */
function LoadProgressBridge() {
  const { active, progress } = useProgress()
  const setLoaded = useAppStore((s) => s.setLoaded)
  const isLoaded = useAppStore((s) => s.isLoaded)

  useEffect(() => {
    if (isLoaded) return
    if (!active && progress >= 100) setLoaded(true)
  }, [active, progress, isLoaded, setLoaded])

  // Safety net: if the GLB is served from disk cache, useProgress may never
  // emit a progress event before we mount. Force-resolve after 5s so the
  // loader can never get stuck on screen.
  useEffect(() => {
    if (isLoaded) return
    const id = setTimeout(() => setLoaded(true), 5000)
    return () => clearTimeout(id)
  }, [isLoaded, setLoaded])

  return null
}

function SceneContent() {
  // Defer barbarian + phoenix loads (~3.4 MB combined) until the village is
  // on screen and the browser has had an idle frame. Keeps the critical-path
  // payload to just coc_base.glb (~750 KB).
  const [secondaryReady, setSecondaryReady] = useState(false)

  useEffect(() => {
    const w = typeof window !== "undefined" ? (window as any) : null
    if (!w) return
    const idle: (cb: () => void) => number =
      w.requestIdleCallback ?? ((cb: () => void) => w.setTimeout(cb, 120))
    const cancel: (id: number) => void =
      w.cancelIdleCallback ?? ((id: number) => w.clearTimeout(id))
    const id = idle(() => setSecondaryReady(true))
    return () => cancel(id)
  }, [])

  return (
    <>
      <SceneEnvironment />
      <CameraController />
      <Suspense fallback={null}>
        <FloatingIsland />
      </Suspense>
      {secondaryReady && (
        <>
          <Suspense fallback={null}>
            <BarbarianWarrior />
          </Suspense>
          <Suspense fallback={null}>
            <DragonModel />
          </Suspense>
        </>
      )}
      <MagicParticles />
    </>
  )
}

export function Scene() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5])

  useEffect(() => {
    if (typeof window === "undefined") return
    // Cap at 1.5 even on high-DPI screens — visually nearly identical, ~50% fewer pixels to shade.
    const cap = Math.min(window.devicePixelRatio || 1, 1.5)
    setDpr([1, cap])
  }, [])

  return (
    <>
      <LoadProgressBridge />
      <Canvas
        shadows="basic"
        dpr={dpr}
        camera={{ position: [0, 8, 18], fov: 45, near: 0.1, far: 200 }}
        gl={{
          antialias: false,
          alpha: false,
          depth: true,
          stencil: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      >
        <SceneContent />
      </Canvas>
    </>
  )
}
