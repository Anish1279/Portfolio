"use client"

import { motion } from "framer-motion"
import { ExternalLink, TrendingUp, Target, Award, Trophy } from "lucide-react"
import { Navigation } from "@/components/ui/navigation"

const codingProfiles = [
  {
    platform: "LeetCode",
    username: "anish1279",
    rating: 1781,
    maxRating: 1781,
    problemsSolved: 500,
    globalRank: 942,
    contestRank: "Contest 148",
    color: "from-amber-400 to-orange-500",
    icon: "LC",
    link: "https://leetcode.com/u/anish1279singh/",
  },
  {
    platform: "CodeChef",
    username: "anish1279",
    rating: 1551,
    maxRating: 1551,
    problemsSolved: 100,
    color: "from-amber-600 to-yellow-500",
    icon: "CC",
    link: "https://www.codechef.com/users/anish1279singh",
  },
  {
    platform: "CodeForces",
    username: "anish1279",
    rating: 1200,
    maxRating: 1350,
    problemsSolved: 100,
    color: "from-blue-400 to-cyan-500",
    icon: "CF",
    link: "https://codeforces.com/profile/as1729",
  },
  {
    platform: "GeeksforGeeks",
    username: "anish1279",
    problemsSolved: 100,
    color: "from-emerald-400 to-green-500",
    icon: "GG",
    link: "https://www.geeksforgeeks.org/profile/anish1277ssv",
  },
]

const stats = [
  { label: "Total Problems Solved", value: "1000+", icon: Target, color: "from-purple-500 to-pink-500" },
  { label: "Best Global Rank", value: "633", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
  { label: "Contests Participated", value: "50+", icon: Trophy, color: "from-emerald-500 to-teal-500" },
  { label: "Max Rating", value: "1781", icon: Award, color: "from-blue-500 to-cyan-500" },
]

export default function CodingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-cyan-50 overflow-y-auto">
      <Navigation />

      {/* Content */}
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Coding Profiles</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Track my competitive programming journey across multiple platforms. Consistently solving problems and
              participating in contests.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 text-center cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Platform Cards */}
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Platform Profiles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {codingProfiles.map((profile, i) => (
              <motion.a
                key={profile.platform}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                }}
                className="group bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 block relative overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${profile.color}`} />

                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-lg">{profile.icon}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">
                        {profile.platform}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="space-y-1 text-sm">
                      {profile.rating && (
                        <p className="text-slate-600">
                          Rating: <span className="font-semibold text-slate-800">{profile.rating}</span>
                          {profile.maxRating && profile.maxRating !== profile.rating && (
                            <span className="text-slate-400"> (Max: {profile.maxRating})</span>
                          )}
                        </p>
                      )}
                      <p className="text-slate-600">
                        Problems Solved: <span className="font-semibold text-slate-800">{profile.problemsSolved}+</span>
                      </p>
                      {profile.globalRank && (
                        <p className="text-sky-600 font-medium">
                          Rank #{profile.globalRank} in {profile.contestRank}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
