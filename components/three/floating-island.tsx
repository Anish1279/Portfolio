"use client"

import { useRef, useEffect, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const BASE_URL = "/images/coc_base.glb"
// Removed other characters, keeping only Barbarian
const CHAR_URLS = {
  barbarian: "/images/barbarian_warrior.glb",
}

type CharDef = {
  url: string
  desiredSize: number
  rotation?: [number, number, number]
  tweak?: [number, number, number] // manual micro offsets (x,y,z) in base-local units
}

/**
 * CharacterLoader improvements:
 * - centers the model
 * - scales it to `desiredSize`
 * - finds the model bounding-box minimum (lowest vertex) and shifts mesh so that its bottom sits at local Y=0.
 * - aggressively clears emissive/env/light maps and clamps PBR values to avoid glow
 * - sets cast/receiveShadow
 */
function CharacterLoader({
  url,
  rotation = [0, 0, 0],
  desiredSize = 1,
}: {
  url: string
  rotation?: [number, number, number]
  desiredSize?: number
}) {
  const gRef = useRef<THREE.Group | null>(null)
  const { scene } = useGLTF(url) as any

  useEffect(() => {
    if (!gRef.current || !scene) return

    // 1) compute bounding box & scale
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const finalScale = desiredSize / maxDim
    gRef.current.scale.setScalar(finalScale)

    // 2) center geometry (so transforms are stable)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)

    // 3) recompute box after centering & scaling to get bottom (min.y)
    const box2 = new THREE.Box3().setFromObject(scene)
    const minY = box2.min.y || 0

    // shift model up so its lowest point sits at local y=0 (group origin)
    scene.position.y -= minY

    // 4) remove emissive/env/light maps & clamp PBR values
    scene.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m: any) => {
          if ("emissive" in m) {
            try {
              m.emissive.set(0x000000)
            } catch (e) {}
            m.emissiveMap = null
            m.emissiveIntensity = 0
          }
          m.envMap = null
          m.lightMap = null
          if ("metalness" in m) m.metalness = Math.min(m.metalness ?? 0, 0.5)
          if ("roughness" in m) m.roughness = Math.max(m.roughness ?? 0.4, 0.25)
          m.needsUpdate = true
        })
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, desiredSize])

  return (
    <group ref={gRef} rotation={rotation}>
      <primitive object={scene} />
    </group>
  )
}

export function FloatingIsland() {
  const baseRef = useRef<THREE.Group | null>(null)
  const tRef = useRef(0)

  // outward push fraction relative to max(base width, depth)
  const OUTWARD_PERCENT = 0.06

  // Character definitions (Only Barbarian remains)
  const charDefs: CharDef[] = useMemo(
    () => [
      {
        url: CHAR_URLS.barbarian,
        desiredSize: 4.0,
        rotation: [0.0, Math.PI * 0.0012, 0.0],
        tweak: [7.9, -0.5, -8.9],
      },
    ],
    [],
  )

  const { scene: baseScene } = useGLTF(BASE_URL) as any
  const [edgePositions, setEdgePositions] = useState<[number, number, number][]>([])
  const baseScaleRef = useRef<number>(1)

  useEffect(() => {
    if (!baseRef.current || !baseScene) return

    // compute base bounding box & scale
    const box = new THREE.Box3().setFromObject(baseScene)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1

    const DESIRED_BASE = 20
    const scale = DESIRED_BASE / maxDim
    baseRef.current.scale.setScalar(scale)
    baseScaleRef.current = scale

    // center the base
    const center = box.getCenter(new THREE.Vector3())
    baseScene.position.sub(center)

    // clear emissive/env/light maps on base to remove glow
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
          m.needsUpdate = true
        })
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })

    // recompute box after centering
    const newBox = new THREE.Box3().setFromObject(baseScene)
    const min = newBox.min.clone()
    const max = newBox.max.clone()
    const centerVec = new THREE.Vector3().addVectors(min, max).multiplyScalar(0.5)

    const rangeX = Math.abs(max.x - min.x)
    const rangeZ = Math.abs(max.z - min.z)
    const outwardOffset = Math.max(rangeX, rangeZ) * OUTWARD_PERCENT

    const topY = max.y

    const corners = [
      new THREE.Vector3(min.x, topY, max.z),
      new THREE.Vector3(max.x, topY, max.z),
      new THREE.Vector3(min.x, topY, min.z),
      new THREE.Vector3(max.x, topY, min.z),
    ]

    const computed = corners.map((c) => {
      const dir = c.clone().sub(centerVec)
      dir.y = 0
      if (dir.length() > 0.0001) dir.normalize().multiplyScalar(outwardOffset)
      const pushed = c.clone().add(dir)
      pushed.y += 0.03 // small nudge
      return [pushed.x, pushed.y, pushed.z] as [number, number, number]
    })

    setEdgePositions(computed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseScene, baseRef.current])

  // gentle bobbing
  useFrame((_, delta) => {
    tRef.current += delta
    if (baseRef.current) {
      baseRef.current.position.y = -0.5 + Math.sin(tRef.current * 0.25) * 0.045
      baseRef.current.rotation.y = Math.sin(tRef.current * 0.06) * 0.02
    }
  })

  // preload assets
  useGLTF.preload(BASE_URL)
  Object.values(CHAR_URLS).forEach((u) => useGLTF.preload(u))

  const fallback: [number, number, number][] = [
    [-3.5, 0.6, 3.5],
    [3.5, 0.6, 3.5],
    [-3.5, 0.6, -3.5],
    [3.5, 0.6, -3.5],
  ]

  return (
    <group ref={baseRef} position={[0, -1, 0]}>
      <primitive object={baseScene} />

      {/* Render characters at computed edges + per-character tweaks */}
      {charDefs.map((c, idx) => {
        const baseScale = baseScaleRef.current || 1
        const desiredFinal = (c.desiredSize ?? 1.0) * baseScale
        const pos = edgePositions.length === 4 ? edgePositions[idx] : fallback[idx]
        const tweak = c.tweak ?? [0, 0, 0]
        const finalPos: [number, number, number] = [pos[0] + tweak[0], pos[1] + tweak[1], pos[2] + tweak[2]]
        return (
          <group key={`char-${idx}`} position={finalPos}>
            <CharacterLoader url={c.url} rotation={c.rotation} desiredSize={desiredFinal} />
          </group>
        )
      })}
    </group>
  )
}
