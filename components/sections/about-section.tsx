"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { Award, Trophy, Users, Briefcase, Code, X } from "lucide-react"
import { cn } from "@/lib/utils"

const achievements = [
  {
    id: "ffe",
    title: "FFE Scholar",
    description: "Foundation for Excellence Scholarship recipient for academic merit and leadership.",
    icon: Award,
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "sih",
    title: "SIH Winner 2023",
    description: "Winner of Smart India Hackathon 2023 - National level competition.",
    icon: Trophy,
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "hncc",
    title: "Treasurer at HNCC",
    description: "Managing finances and operations for HNCC at BIT Sindri.",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "technix",
    title: "SDE Intern at Technix",
    description: "Built Node.js backend for AI YouTube toolkit serving 1.2K creators monthly.",
    icon: Briefcase,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "leetcode",
    title: "Active Leetcoder",
    description: "1000+ problems solved, Max rating 1781, Global Rank 942 in Contest 148.",
    icon: Code,
    color: "from-orange-500 to-red-600",
  },
]

const skills = [
  { name: "TypeScript", level: 90 },
  { name: "React/Next.js", level: 95 },
  { name: "Node.js", level: 85 },
  { name: "PostgreSQL", level: 80 },
  { name: "MongoDB", level: 85 },
  { name: "C++", level: 90 },
]

export function AboutSection() {
  const { currentSection, setSection } = useAppStore()
  const isVisible = currentSection === "about"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-y-0 left-0 z-40 w-full max-w-2xl overflow-y-auto"
        >
          <div className="min-h-full glass p-8 pt-20">
            <button
              onClick={() => setSection("home")}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2 text-glow"
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              I am a passionate software developer pursuing B.Tech in Computer Science at BIT Sindri with an 8.30 CGPA.
              I love building scalable applications and solving complex algorithmic problems.
            </motion.p>
            {/* Skills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-primary">Skills</h3>
              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Achievement Cards */}
            <h3 className="text-lg font-semibold mb-4 text-primary">Achievements</h3>
            <div className="grid gap-4">
              {achievements.map((achievement, i) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={cn(
                      "glass-card rounded-xl p-4 cursor-pointer",
                      "border border-transparent hover:border-primary/30",
                      "transition-all duration-300",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-lg bg-gradient-to-br", achievement.color)}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <div className="h-24" /> {/* Bottom spacing for navigation */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
