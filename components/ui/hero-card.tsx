"use client"

import { motion } from "framer-motion"
import { Rocket, Sparkles, Trophy } from "lucide-react"

export function HeroCard() {
  return (
    // 1. Perspective Container: This establishes the 3D space
    <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md perspective-1000">
      <motion.div
        // Initial Entrance
        initial={{ opacity: 0, y: 100, scale: 0.5, rotateX: 45 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
        
        // 2. The "Floating" 3D Animation Loop
        style={{ transformStyle: "preserve-3d" }} // Critical for 3D depth
        className="relative"
      >
        <motion.div
          // Continuous Floating Animation
          animate={{
            y: [-15, 15, -15],        // Up and down movement
            rotateX: [5, -5, 5],      // Gentle tilt forward/back
            rotateY: [-5, 5, -5],     // Gentle turn left/right
          }}
          transition={{
            duration: 6,              // Slow, dream-like speed
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-2xl px-6 py-8 shadow-[0_20px_50px_rgba(8,112,184,0.7)] border border-sky-400/50 backdrop-blur-md"
        >
          {/* Decorative Background Elements (Deep Layer) */}
          <div 
            className="absolute -top-10 -right-10 w-32 h-32 bg-sky-300/20 rounded-full blur-2xl" 
            style={{ transform: "translateZ(-20px)" }} 
          />
          <div 
            className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-600/30 rounded-full blur-2xl" 
            style={{ transform: "translateZ(-20px)" }} 
          />

          {/* Content Layer (Popped Out for 3D Effect) */}
          <div 
            className="relative z-10 flex flex-col items-center gap-3"
            style={{ transform: "translateZ(30px)" }} // Pushes text physically forward
          >
            
            {/* Greeting */}
            <motion.div className="flex items-center justify-center gap-2">
              <span className="text-lg font-medium text-sky-100 shadow-black drop-shadow-md">{"Hi! I'm"}</span>
              <span className="text-3xl font-bold tracking-tight drop-shadow-lg">Anish Singh</span>
            </motion.div>

            {/* Main Title */}
            <div className="flex items-center gap-2 bg-black/10 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
              <h2 className="text-xl font-bold text-white drop-shadow-md">
                Full-Stack Architect
              </h2>
              <Rocket className="w-5 h-5 text-yellow-300 animate-pulse drop-shadow-md" />
            </div>

            {/* Problem Solver Badge */}
            <div className="flex items-center justify-center gap-2 text-sky-100">
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span className="text-sm font-semibold uppercase tracking-wider shadow-black drop-shadow-sm">Problem Solver</span>
              <Sparkles className="w-4 h-4 text-sky-200" />
            </div>

            {/* Achievement Pill */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-3 bg-gradient-to-r from-sky-600 to-blue-600 border border-sky-400/50 rounded-xl px-5 py-2 flex items-center gap-3 shadow-lg"
              style={{ transform: "translateZ(50px)" }} // Pushes this button even further forward
            >
              <Trophy className="w-5 h-5 text-yellow-400 drop-shadow-md" />
              <div className="text-left leading-tight">
                <p className="text-xs text-sky-200 font-medium">Winner & Expert</p>
                <p className="text-sm font-bold text-white">SIH '23 & Scalability</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
      
      {/* CSS Helper for Perspective */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}
