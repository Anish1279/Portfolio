"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const isLoaded = useAppStore((state) => state.isLoaded)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    // Short fade-out delay just to let the canvas paint its first frame so
    // there is no blank flash between loader and village.
    const timer = setTimeout(() => setShowLoader(false), 250)
    return () => clearTimeout(timer)
  }, [isLoaded])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            </div>

            <h2 className="text-xl font-bold text-glow mb-2">Loading Village...</h2>
            <p className="text-sm text-muted-foreground opacity-70">Preparing the battlefield</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
