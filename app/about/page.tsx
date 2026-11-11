"use client"

import { motion } from "framer-motion"
import { Trophy, Users, Briefcase, Code, GraduationCap, Cloud, GitBranch, Globe } from "lucide-react"
import { SkillsGrid } from "@/components/about/skills-grid"
import { AchievementCard } from "@/components/about/achievement-card"
import { Navigation } from "@/components/ui/navigation"

const achievements = [
  {
    id: "blue-bricks",
    title: "Full-Stack AI Engineer",
    subtitle: "Blue Bricks | Perth, Australia (Remote)",
    period: "Jul 2026 - Present",
    description: [
      "Building end-to-end AI-powered products and production web experiences for a Perth-based team.",
      "Developing reliable application workflows, APIs, and document-intelligence solutions for real business needs.",
      "Collaborating remotely to ship practical AI solutions with a focus on maintainable, cloud-ready delivery.",
    ],
    icon: Briefcase,
    color: "from-sky-500 to-indigo-500",
    accentColor: "#0284c7",
  },
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
    period: "2025 - 2026",
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
      "LeetCode maximum rating: 1860",
      "Global Rank 942 out of 30,000+ in Biweekly Contest 148",
      "CodeChef maximum rating: 1551, Global Rank 633",
    ],
    icon: Code,
    color: "from-orange-500 to-red-500",
    accentColor: "#f97316",
  },
  {
    id: "trendgully",
    title: "Software Development Engineer Intern",
    subtitle: "Trendgully, Bengaluru, India",
    period: "Feb 2026 - Jun 2026",
    description: [
      "Designed and implemented asynchronous, production-grade REST and WebSocket services in Python (FastAPI, async) for real-time trend ingestion; modeled schemas with Pydantic and tuned PostgreSQL indexes and query plans for relational database workloads – reduced average query latency by 30%.",
      "Built fault-tolerant microservices with Docker and Kubernetes; introduced Redis caching and async background workers, improving system throughput by 40% and reducing origin DB load by 35%.",
      "Hardened security with JWT/OAuth2, integrated CI/CD pipelines (GitHub Actions), and added observability – decreased mean time to recovery (MTTR) by 25%.",
    ],
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
    accentColor: "#d946ef",
  },
]

const deliveryCapabilities = [
  {
    title: "AI product engineering",
    description:
      "From a focused idea to a production-ready application: polished product experiences, secure APIs, and practical AI workflows.",
    details: ["AI workflows & document intelligence", "Full-stack web applications", "APIs, data models & integrations"],
    icon: GitBranch,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Cloud deployment & reliability",
    description:
      "Cloud-ready delivery across AWS and GCP, with containerization, CI/CD, observability, and performance-minded architecture.",
    details: ["AWS & GCP deployment", "Docker, Kubernetes & CI/CD", "Monitoring & launch readiness"],
    icon: Cloud,
    color: "from-sky-500 to-cyan-500",
  },
  {
    title: "Launch, DNS & handover",
    description:
      "A complete path to launch, including custom-domain setup, DNS and SSL configuration, documentation, and a clean handover.",
    details: ["Custom domains, DNS & SSL", "Deployment & rollback notes", "Clear production handover"],
    icon: Globe,
    color: "from-emerald-500 to-teal-500",
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
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              I build production-ready AI products, document-intelligence workflows, and cloud systems that teams can
              confidently launch and operate.
            </p>
          </motion.div>

          {/* Client delivery capabilities */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex flex-col gap-2 mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">Built for client delivery</p>
              <h2 className="text-2xl font-bold text-slate-800">From idea to a dependable launch</h2>
              <p className="text-slate-600 max-w-3xl leading-relaxed">
                I can own the technical path from a product brief through development, cloud deployment, and a documented
                production handover.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {deliveryCapabilities.map((capability, index) => {
                const Icon = capability.icon

                return (
                  <motion.article
                    key={capability.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + index * 0.08 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 35px -18px rgba(14, 165, 233, 0.35)" }}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50"
                  >
                    <div
                      className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${capability.color} shadow-md`}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{capability.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{capability.description}</p>
                    <ul className="mt-4 space-y-2">
                      {capability.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                )
              })}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">My Skills</h2>
            <SkillsGrid />
          </motion.section>

          {/* Career Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Career Summary</h2>
            <p className="text-slate-600 leading-relaxed max-w-4xl">
              I am a Full-Stack AI &amp; Cloud Engineer at Blue Bricks, working remotely with a Perth, Australia-based
              team since July 2026. I turn product ideas into dependable software - from AI-enabled workflows and
              full-stack development to AWS/GCP deployment, Docker, CI/CD, custom domains, DNS/SSL, and documented
              production handover.
            </p>
          </motion.section>

          {/* Achievements Timeline */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
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
