"use client"

import { Scene } from "@/components/three/scene"
import { HeroCard } from "@/components/ui/hero-card"
import { Navigation } from "@/components/ui/navigation"
import { AudioControl } from "@/components/ui/audio-control"
import { LoadingScreen } from "@/components/loading-screen"

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
