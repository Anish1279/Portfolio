"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

const DRAGON_URL = "/images/phoenix_bird.glb"

type Props = {
  active?: boolean
  modelScale?: number | null
  orbitRadius?: number
  orbitSpeed?: number
  hoverHeight?: number
  lookAhead?: number
}

export function DragonModel({
  active = true,
  modelScale = null,
  orbitRadius = 12,
  orbitSpeed = 0.5,
  hoverHeight = 5,
  lookAhead = 0.15,
}: Props) {
  const groupRef = useRef<THREE.Group | null>(null)

  // cast to any to retain flexibility from useGLTF
  const { scene, animations } = useGLTF(DRAGON_URL) as any

  // useAnimations returns actions keyed by name, but values can be null.
  const api = useAnimations(animations, groupRef) as any
  const actions: Record<string, THREE.AnimationAction | null> = api.actions || {}
  const names: string[] = api.names || []
  const mixer: THREE.AnimationMixer | undefined = api.mixer

  const [ready, setReady] = useState(false)
  const [isFlying, setIsFlying] = useState(false)

  /* ---------------- AUTO SCALE & CENTER ---------------- */
  useEffect(() => {
    if (!groupRef.current || !scene) return

    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1

    const DESIRED_SIZE = 4.0
    const computedScale =
      modelScale && modelScale > 0 ? modelScale : DESIRED_SIZE / maxDim

    groupRef.current.scale.setScalar(computedScale)

    const center = box.getCenter(new THREE.Vector3())
    // move the scene so its geometric center sits at group origin
    scene.position.sub(center)

    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, modelScale])

  /* --------------- SAFE ACTION HELPERS ---------------- */
  const forEachAction = (fn: (a: THREE.AnimationAction) => void) => {
    Object.values(actions).forEach((action) => {
      if (!action) return
      fn(action)
    })
  }

  const findAnim = (keys: string[]) =>
    names.find((n) =>
      keys.some((k) => n.toLowerCase().includes(k.toLowerCase()))
    )

  /* ---------------- ANIMATION CONTROL ---------------- */
  useEffect(() => {
    if (!ready || !mixer) return

    const takeoffName = findAnim(["takeoff", "launch"])
    const flyName = findAnim(["fly", "flight", "fly_loop", "loop"])
    const glideName = findAnim(["glide"])
    const landName = findAnim(["land", "landing", "touchdown"])

    const playLoop = (name: string) => {
      const act = actions[name]
      if (!act) return
      act.reset()
      act.setLoop(THREE.LoopRepeat, Infinity)
      act.fadeIn(0.25)
      act.play()
      setIsFlying(true)
    }

    const fadeOutAll = (t: number) => forEachAction((a) => a.fadeOut(t))

    // strongly-typed runtime event object
    type MixerFinishedEvent = { type: "finished"; action: THREE.AnimationAction }

    const onFinished = (e: MixerFinishedEvent) => {
      // if takeoff finished -> start fly or glide or fallback
      if (takeoffName && actions[takeoffName] && e.action === actions[takeoffName]) {
        if (flyName) playLoop(flyName)
        else if (glideName) playLoop(glideName)
        else if (names[0]) playLoop(names[0])
      }

      // if land finished -> mark not flying
      if (landName && actions[landName] && e.action === actions[landName]) {
        setIsFlying(false)
      }
    }

    // ---- IMPORTANT FIX: call the mixer event methods via `any` to avoid TS "never" issue ----
    ;(mixer as any).addEventListener("finished", onFinished)

    // start by gently fading out anything leftover
    fadeOutAll(0.15)

    if (active) {
      if (takeoffName && actions[takeoffName]) {
        const act = actions[takeoffName]
        if (act) {
          act.reset()
          act.setLoop(THREE.LoopOnce, 1)
          act.clampWhenFinished = true
          act.fadeIn(0.2)
          act.play()
          // chain handled in onFinished
        }
      } else if (flyName) {
        playLoop(flyName)
      } else if (names[0]) {
        // fallback: loop the first clip
        playLoop(names[0])
      }
    } else {
      // deactivation: try landing, otherwise fade out
      if (landName && actions[landName]) {
        const act = actions[landName]
        if (act) {
          act.reset()
          act.setLoop(THREE.LoopOnce, 1)
          act.clampWhenFinished = true
          act.fadeIn(0.2)
          act.play()
        }
      } else {
        fadeOutAll(0.4)
        setIsFlying(false)
      }
    }

    return () => {
      ;(mixer as any).removeEventListener("finished", onFinished)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ready, names, actions, mixer])

  /* ---------------- ORBIT + HOVER ---------------- */
  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()
    const x = Math.sin(t * orbitSpeed) * orbitRadius
    const z = Math.cos(t * orbitSpeed) * orbitRadius
    const y = hoverHeight + Math.sin(t * 1.5) * 0.8

    groupRef.current.position.set(x, y, z)

    const lookX = Math.sin(t * orbitSpeed + lookAhead) * orbitRadius
    const lookZ = Math.cos(t * orbitSpeed + lookAhead) * orbitRadius
    groupRef.current.lookAt(lookX, y, lookZ)
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  )
}

useGLTF.preload(DRAGON_URL)
