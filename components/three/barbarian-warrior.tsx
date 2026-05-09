"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const BARBARIAN_URL = "/images/barbarian_warrior.glb"

/**
 * World-space position for the barbarian warrior.
 * Derived from the old floating-island edge computation:
 *   edge corner ≈ [3.5, ~top, -3.5] + tweak [7.9, -0.5, -8.9] + base offset [0, -1, 0]
 * Adjusted empirically to match the screenshot: right side, floating in air,
 * partially overlapping the blue glassmorphism card.
 */
const WORLD_POSITION: [number, number, number] = [8.5, 2.8, -7.5]

/**
 * Desired visual size of the barbarian (longest axis in world units).
 * The old code used desiredSize=4.0 * baseScale(~3.3) then divided by model's own
 * bounding max dim inside CharacterLoader — effectively ~4 world units tall.
 * We do the same calculation once, cleanly.
 */
const DESIRED_SIZE = 4.0

/** Idle floating animation parameters */
const BOB_AMPLITUDE = 0.3
const BOB_SPEED = 1.2

/** How fast the model slerps its Y-rotation toward the camera (0–1 per frame) */
const FACE_CAMERA_LERP = 0.02

/**
 * BarbarianWarrior – production-grade, deterministic 3D hero element.
 *
 * Key stability guarantees:
 * 1. Clones the GLTF scene so the shared cache is never mutated.
 * 2. Positioned in world space (not nested under the bobbing base group).
 * 3. Explicit renderOrder > base island to prevent depth-order lottery.
 * 4. frustumCulled=false on every mesh to prevent stale-bounding-sphere culling.
 * 5. depthWrite forced true on all materials to avoid z-fighting.
 * 6. All setup done in useMemo (synchronous with first render) – no useEffect race.
 * 7. Smooth idle bob + gentle camera-facing rotation in useFrame.
 */
export function BarbarianWarrior() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene: originalScene } = useGLTF(BARBARIAN_URL) as any

  // Quaternion used for smooth camera-facing slerp
  const targetQuat = useRef(new THREE.Quaternion())
  const currentQuat = useRef(new THREE.Quaternion())

  /**
   * Clone the scene and apply all one-time setup synchronously.
   * useMemo ensures this runs exactly once per mount and never mutates the GLTF cache.
   */
  const preparedScene = useMemo(() => {
    // Deep-clone so we don't mutate the shared useGLTF cache
    const clone = originalScene.clone(true)

    // 1. Compute bounding box of the raw clone
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = DESIRED_SIZE / maxDim

    // 2. Center the geometry so transforms are predictable
    const center = box.getCenter(new THREE.Vector3())
    clone.position.sub(center)

    // 3. Shift model up so its bottom sits at local Y=0
    clone.updateWorldMatrix(true, true)
    const box2 = new THREE.Box3().setFromObject(clone)
    clone.position.y -= box2.min.y * scale // account for upcoming scale

    // 4. Apply scale at the clone root
    clone.scale.setScalar(scale)

    // 5. Fix materials for stability & aesthetics
    clone.traverse((obj: any) => {
      if (obj.isMesh) {
        // Prevent frustum culling with stale bounds
        obj.frustumCulled = false

        // Force render after base island
        obj.renderOrder = 10

        // Enable shadows
        obj.castShadow = true
        obj.receiveShadow = true

        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m: any) => {
          // Guarantee depth buffer writes (prevents z-fighting)
          m.depthWrite = true
          m.depthTest = true

          // Clamp emissive to zero (prevent glow artifacts)
          if ("emissive" in m) {
            try { m.emissive.set(0x000000) } catch {}
            m.emissiveMap = null
            m.emissiveIntensity = 0
          }

          // Clear env/light maps
          m.envMap = null
          m.lightMap = null

          // Clamp PBR to realistic values
          if ("metalness" in m) m.metalness = Math.min(m.metalness ?? 0, 0.5)
          if ("roughness" in m) m.roughness = Math.max(m.roughness ?? 0.4, 0.25)

          // If material is transparent, set a high polygon offset to avoid z-fight
          if (m.transparent) {
            m.polygonOffset = true
            m.polygonOffsetFactor = -1
            m.polygonOffsetUnits = -1
          }

          m.needsUpdate = true
        })
      }
    })

    return clone
  }, [originalScene])

  /**
   * Per-frame animation:
   * - Gentle sine-wave bob on Y axis (floating effect)
   * - Soft slerp of Y-rotation toward the camera (always faces viewer)
   */
  useFrame((state) => {
    const group = groupRef.current
    if (!group) return

    const t = state.clock.getElapsedTime()

    // Idle bob
    group.position.set(
      WORLD_POSITION[0],
      WORLD_POSITION[1] + Math.sin(t * BOB_SPEED) * BOB_AMPLITUDE,
      WORLD_POSITION[2],
    )

    // Compute target quaternion that faces the camera (Y-axis only)
    const camPos = state.camera.position
    const dx = camPos.x - group.position.x
    const dz = camPos.z - group.position.z
    const targetAngle = Math.atan2(dx, dz)

    // Build target quaternion from Y-axis rotation
    targetQuat.current.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      targetAngle,
    )

    // Slerp current rotation toward target for smooth tracking
    currentQuat.current.copy(group.quaternion)
    currentQuat.current.slerp(targetQuat.current, FACE_CAMERA_LERP)
    group.quaternion.copy(currentQuat.current)
  })

  return (
    <group
      ref={groupRef}
      position={WORLD_POSITION}
      renderOrder={10}
    >
      <primitive object={preparedScene} />
    </group>
  )
}

// Intentionally NOT preloading at module level — the warrior is deferred
// behind an idle-callback gate in scene.tsx so it streams in *after* the
// village is on screen, keeping the critical path small.
