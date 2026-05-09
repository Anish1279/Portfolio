"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const BASE_URL = "/images/coc_base.glb"
const DESIRED_BASE = 20

/**
 * FloatingIsland – renders only the base island (coc_base.glb).
 * The barbarian warrior is now a separate component (barbarian-warrior.tsx)
 * rendered as a scene-level sibling to avoid:
 *   - edgePositions race condition
 *   - shared GLTF cache mutation on re-mount
 *   - double-scaling from base * character scale
 *   - frustum-culling bugs from bobbing parent group
 */
export function FloatingIsland() {
  const baseRef = useRef<THREE.Group | null>(null)
  const tRef = useRef(0)

  const { scene: baseScene } = useGLTF(BASE_URL) as any

  // Synchronous one-time setup — runs during the first render right after the
  // GLTF resolves. Avoids the double-render that an effect-based version
  // causes (mount with raw scene, then re-render after material edits).
  const { sceneToRender, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(baseScene)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const computedScale = DESIRED_BASE / maxDim

    const center = box.getCenter(new THREE.Vector3())
    baseScene.position.sub(center)

    baseScene.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m: any) => {
          if ("emissive" in m) {
            try {
              m.emissive.set(0x000000)
            } catch {}
            m.emissiveMap = null
            m.emissiveIntensity = 0
          }
          m.envMap = null
          m.lightMap = null
          if ("metalness" in m) m.metalness = Math.min(m.metalness ?? 0, 0.45)
          if ("roughness" in m) m.roughness = Math.max(m.roughness ?? 0.6, 0.35)
        })
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })

    return { sceneToRender: baseScene, scale: computedScale }
  }, [baseScene])

  // gentle bobbing
  useFrame((_, delta) => {
    tRef.current += delta
    if (baseRef.current) {
      baseRef.current.position.y = -0.5 + Math.sin(tRef.current * 0.25) * 0.045
      baseRef.current.rotation.y = Math.sin(tRef.current * 0.06) * 0.02
    }
  })

  return (
    <group ref={baseRef} position={[0, -1, 0]} scale={scale}>
      <primitive object={sceneToRender} />
    </group>
  )
}

// Preload base asset at module level — this is the priority asset.
useGLTF.preload(BASE_URL)
