"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { X, ExternalLink, TrendingUp, Target, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const codingProfiles = [
  {
    platform: "LeetCode",
    username: "anish1279",
    rating: 1781,
    maxRating: 1781,
    problemsSolved: 500,
    globalRank: 942,
    contestRank: "Contest 148",
    color: "from-amber-500 to-orange-600",
    link: "https://leetcode.com",
  },
  {
    platform: "CodeChef",
    username: "anish1279",
    rating: 1551,
    maxRating: 1551,
    problemsSolved: 200,
    globalRank: 633,
    contestRank: "Starters 172",
    color: "from-amber-700 to-yellow-600",
    link: "https://codechef.com",
  },
  {
    platform: "CodeForces",
    username: "anish1279",
    rating: 1400,
    maxRating: 1450,
    problemsSolved: 150,
    color: "from-blue-500 to-cyan-500",
    link: "https://codeforces.com",
  },
  {
    platform: "GeeksforGeeks",
    username: "anish1279",
    problemsSolved: 250,
    color: "from-emerald-500 to-green-600",
    link: "https://geeksforgeeks.org",
  },
]

const stats = [
  { label: "Total Problems", value: "1000+", icon: Target },
  { label: "Best Global Rank", value: "633", icon: TrendingUp },
  { label: "Contests Participated", value: "50+", icon: Award },
]

export function CodingSection() {
  const { currentSection, setSection } = useAppStore()
  const isVisible = currentSection === "coding"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-x-0 bottom-0 z-40 max-h-[80vh] overflow-y-auto"
        >
          <div className="glass rounded-t-3xl p-8 pt-6">
            <div className="flex items-center justify-between mb-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-glow"
              >
                Coding Profiles
              </motion.h2>
              <button
                onClick={() => setSection("home")}
                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overall Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="glass-card rounded-xl p-4 text-center"
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {codingProfiles.map((profile, i) => (
                <motion.a
                  key={profile.platform}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={cn(
                    "glass-card rounded-xl p-5 block",
                    "border border-transparent hover:border-primary/30",
                    "transition-all duration-300 group",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg mb-3 flex items-center justify-center",
                      "bg-gradient-to-br",
                      profile.color,
                    )}
                  >
                    <span className="text-white font-bold text-sm">{profile.platform.slice(0, 2).toUpperCase()}</span>
                  </div>

                  <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    {profile.platform}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  {profile.rating && (
                    <p className="text-sm text-muted-foreground">
                      Rating: <span className="text-primary font-medium">{profile.rating}</span>
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Solved: <span className="text-foreground">{profile.problemsSolved}+</span>
                  </p>

                  {profile.globalRank && (
                    <p className="text-xs text-accent mt-2">
                      Rank #{profile.globalRank} in {profile.contestRank}
                    </p>
                  )}
                </motion.a>
              ))}
            </div>

            <div className="h-20" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
