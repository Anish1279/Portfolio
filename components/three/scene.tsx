"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { DragonModel } from "./dragon-model"
import { FloatingIsland } from "./floating-island"
import { SceneEnvironment } from "./scene-environment"
import { MagicParticles } from "./particles"
import { CameraController } from "./camera-controller"
import { useAppStore } from "@/lib/store"

function SceneContent() {
  return (
    <>
      <SceneEnvironment />
      <CameraController />
      <FloatingIsland />
      <Suspense fallback={null}>
        <DragonModel />
      </Suspense>
      <MagicParticles />
    </>
  )
}

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 8, 18], fov: 45 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      onCreated={() => useAppStore.getState().setLoaded(true)}
    >
      <SceneContent />
    </Canvas>
  )
}
