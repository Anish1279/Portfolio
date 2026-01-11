"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface Achievement {
  id: string
  title: string
  subtitle: string
  period: string
  description: string[]
  icon: LucideIcon
  color: string
  accentColor: string
}

interface AchievementCardProps {
  achievement: Achievement
  index: number
  isEven: boolean
}

export function AchievementCard({ achievement, index, isEven }: AchievementCardProps) {
  const Icon = achievement.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -15 : 15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className={`relative flex items-center gap-8 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      {/* Card */}
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -5,
          rotateY: isEven ? 5 : -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex-1 bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden group cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        {/* Accent bar */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${achievement.color}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        />

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
          style={{ background: `radial-gradient(circle at center, ${achievement.accentColor}, transparent 70%)` }}
        />

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-1">{achievement.title}</h3>
            <p className="text-slate-500 text-sm mb-4">{achievement.subtitle}</p>

            <ul className="space-y-2">
              {achievement.description.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
                  className="text-sm text-slate-600 flex items-start gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: achievement.accentColor }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Timeline connector for large screens */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
          className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${achievement.color} shadow-lg flex items-center justify-center z-10`}
        >
          <Icon className="w-6 h-6 text-white" />

          {/* Pulse effect */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${achievement.color}`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Period badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="text-sm text-slate-500 font-medium whitespace-nowrap"
        >
          {achievement.period}
        </motion.div>
      </div>

      {/* Mobile period display */}
      <div className="lg:hidden absolute -top-8 left-0 flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${achievement.color} shadow-md flex items-center justify-center`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-slate-500 font-medium">{achievement.period}</span>
      </div>
    </motion.div>
  )
}
