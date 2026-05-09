"use client"

import dynamic from "next/dynamic"
import { HeroCard } from "@/components/ui/hero-card"
import { Navigation } from "@/components/ui/navigation"
import { AudioControl } from "@/components/ui/audio-control"
import { LoadingScreen } from "@/components/loading-screen"

const Scene = dynamic(
  () => import("@/components/three/scene").then((m) => m.Scene),
  { ssr: false, loading: () => null },
)

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <LoadingScreen />
      <Scene />
      <HeroCard />
      <AudioControl />
      <Navigation />
    </main>
  )
}
