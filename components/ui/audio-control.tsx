"use client"

import { useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function AudioControl() {
  const { isMuted, toggleMute } = useAppStore() 
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/Portfolio-main/public/audio/game-theme-n4YE77J0eVfkfSsWvfxo1WRPc8AyxD.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    audioRef.current.preload = "auto"

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.pause()
    } else {
      const playPromise = audio.play()
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error)
        })
      }
    }
  }, [isMuted])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" && !e.ctrlKey && !e.metaKey) {
        toggleMute()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleMute])

  return (
    <button
      onClick={toggleMute}
      className={cn(
        // CHANGED HERE: switched from "top-4 right-4" to "bottom-4 left-4"
        "fixed bottom-4 left-4 z-50 p-3 rounded-full glass glow-gold",
        "transition-all duration-300 hover:scale-110 active:scale-95",
        "flex items-center gap-2",
        "cursor-pointer"
      )}
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? <VolumeX className="w-5 h-5 text-gold" /> : <Volume2 className="w-5 h-5 text-gold" />}
      <span className="text-xs text-muted-foreground hidden sm:inline">Press M</span>
    </button>
  )
}
