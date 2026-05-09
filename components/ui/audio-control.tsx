"use client"

import { useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const AUDIO_SRC =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/Portfolio-main/public/audio/game-theme-n4YE77J0eVfkfSsWvfxo1WRPc8AyxD.mp3"

export function AudioControl() {
  const { isMuted, toggleMute } = useAppStore()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Lazily construct the audio element only when the user first unmutes.
  // Avoids a ~1.8 MB MP3 fetch competing with GLB downloads on first paint.
  const ensureAudio = () => {
    if (audioRef.current) return audioRef.current
    const audio = new Audio()
    audio.preload = "none"
    audio.loop = true
    audio.volume = 0.3
    audio.src = AUDIO_SRC
    audioRef.current = audio
    return audio
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isMuted) {
      audioRef.current?.pause()
      return
    }
    const audio = ensureAudio()
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Autoplay prevented:", error)
      })
    }
  }, [isMuted])

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
        "fixed bottom-4 left-4 z-50 p-3 rounded-full glass glow-gold",
        "transition-all duration-300 hover:scale-110 active:scale-95",
        "flex items-center gap-2",
        "cursor-pointer",
      )}
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? <VolumeX className="w-5 h-5 text-gold" /> : <Volume2 className="w-5 h-5 text-gold" />}
      <span className="text-xs text-muted-foreground hidden sm:inline">Press M</span>
    </button>
  )
}
