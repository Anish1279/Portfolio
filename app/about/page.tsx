"use client"

import { motion } from "framer-motion"
import { Trophy, Users, Briefcase, Code, GraduationCap } from "lucide-react"
import { SkillsGrid } from "@/components/about/skills-grid"
import { AchievementCard } from "@/components/about/achievement-card"
import { Navigation } from "@/components/ui/navigation"

const achievements = [
  {
    id: "ffe",
    title: "Amazon FFE UG Scholar",
    subtitle: "Foundation For Excellence",
    period: "Nov 2022 - April 2026",
    description: [
      "Awarded for academic excellence and leadership potential",
      "Selected from thousands of applicants through a competitive process",
      "Received financial support for tuition and living expenses",
      "Participated in exclusive leadership and development programs",
      "Access to a network of scholars, professionals, and mentors",
    ],
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    accentColor: "#3b82f6",
  },
  {
    id: "sih",
    title: "Winner SIH (2023)",
    subtitle: "Smart India Hackathon",
    period: "Nov 2023 - Dec 2023",
    description: [
      "Led a team of 6 members to participate in the hackathon",
      "Coordinated project planning, task delegation, and progress tracking",
      "Demonstrated strong analytical skills and innovative thinking",
      "Won among 26 competing teams at the prestigious national hackathon",
    ],
    icon: Trophy,
    color: "from-amber-500 to-orange-500",
    accentColor: "#f59e0b",
  },
  {
    id: "hncc",
    title: "Treasurer at HNCC",
    subtitle: "Coding Club of BIT Sindri",
    period: "2025 - Present",
    description: [
      "Managing finances and budget allocation for club activities",
      "Organizing coding competitions and workshops",
      "Mentoring junior students in programming fundamentals",
      "Coordinating with administration for club operations",
    ],
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    accentColor: "#10b981",
  },
  {
    id: "technix",
    title: "SDE Intern at Technix India",
    subtitle: "Software Development",
    period: "July 2025 - Sep 2025",
    description: [
      "Built Node.js backend for AI YouTube toolkit with Gemini Flash 2.5",
      "Deployed Stripe subscription billing generating $75K ARR",
      "Secured REST APIs with JWT auth for 5K+ users",
      "Engineered AWS microservices to handle 200% traffic spikes",
    ],
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
    accentColor: "#8b5cf6",
  },
  {
    id: "leetcode",
    title: "Active LeetCoder",
    subtitle: "Competitive Programming",
    period: "Ongoing",
    description: [
      "1000+ problems solved across multiple platforms",
      "LeetCode maximum rating: 1781",
      "Global Rank 942 out of 30,000+ in Biweekly Contest 148",
      "CodeChef maximum rating: 1551, Global Rank 633",
    ],
    icon: Code,
    color: "from-orange-500 to-red-500",
    accentColor: "#f97316",
  },
]

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">About Me</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore my journey—a fusion of academic excellence and professional prowess. From honing my skills in CSE
              to contributing value at esteemed organizations.
            </p>
          </motion.div>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">My Skills</h2>
            <SkillsGrid />
          </motion.section>

          {/* Career Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Career Summary</h2>
            <p className="text-slate-600 leading-relaxed max-w-4xl">
              {
                "I am a passionate software developer pursuing B.Tech in Computer Science at BIT Sindri with an 8.30 CGPA. My trajectory is a testament to dedication and innovation. Dive into the chronicles of my education and work history, where every experience has shaped me into the versatile professional I am today."
              }
            </p>
          </motion.section>

          {/* Achievements Timeline */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Achievements & Experience</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 hidden lg:block" />

              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    index={index}
                    isEven={index % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  )
}
