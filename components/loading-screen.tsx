"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const isLoaded = useAppStore((state) => state.isLoaded)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShowLoader(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-16 h-16 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-glow mb-2">
              Loading Village...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              Preparing the battlefield
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
