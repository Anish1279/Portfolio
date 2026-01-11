"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Sparkles } from "lucide-react"
import { Navigation } from "@/components/ui/navigation"
import Image from "next/image"

const projects = [
  {
    id: "prepai",
    title: "PrepAI",
    description:
      "AI Career Coach with Next.js and TypeScript. Implemented SSR, SEO optimization, and Prisma-based database schema. Integrated Gemini API for secure in-app transactions.",
    tags: ["Next.js", "TypeScript", "Prisma", "Gemini API"],
    link: "https://prep-ai-lac.vercel.app/",
    github: "https://github.com/Anish1279/PrepAI",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    highlights: ["15% faster page load", "100% data consistency", "50+ pilot subscriptions"],
    image: "/prepAi.png",
  },

  {
    id: "youtube-toolkit",
    title: "BuzzTube",
    description:
      "Backend for AI-powered thumbnail, title, and description generation using Gemini Flash 2.5. Serving 1.2K creators monthly with 60% prep time reduction.",
    tags: ["Node.js", "Gemini AI", "Stripe", "AWS"],
    link: "https://buzz-tube-dzwe-d0v7j0w75-anish1279s-projects.vercel.app/",
    github: "https://github.com/Anish1279/BuzzTube",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    highlights: ["$75K ARR", "30% MoM revenue growth", "99.9% uptime"],
    image: "/buzztube.png",
  },

  {
    id: "rightsy",
    title: "Rightsy",
    description:
      "Gamified legal education platform for ages 6-16 with 10+ interactive games and story-based videos. Scaled to 1000+ monthly visitors.",
    tags: ["Next.js", "React", "MongoDB", "YouTube API"],
    link: "https://github.com/Anish1279/Rightsy",
    github: "https://github.com/Anish1279/Rightsy",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    highlights: ["45% engagement increase", "25% retention boost", "<200ms response time"],
    image: "/rightsy.png",
  },
  
  {
    id: "innobyte",
    title: "Oasis",
    description:
      "Responsive SPA with Google Maps integration and WhatsApp API for bookings. Boosted user retention by 30% and earned 4.8/5 UX rating.",
    tags: ["Next.js", "TypeScript", "Tailwind", "REST APIs"],
    link: "https://v0-kingsukh-guesthouse-clone.vercel.app/",
    github: "https://v0-kingsukh-guesthouse-clone.vercel.app/",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    highlights: ["30% retention boost", "50% faster bookings", "4.8/5 UX rating"],
    image: "/oasis.png",
  },
]

export default function ProjectsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">My Projects</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Featured projects showcasing my expertise in full-stack development, AI integration, and scalable
              architecture.
            </p>
          </motion.div>

          {/* Projects Grid - Enhanced 3D cards with images */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{
                  y: -12,
                  rotateX: -5,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 transform-gpu">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`} />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          <Github className="w-5 h-5 text-slate-600" />
                        </motion.a>
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-slate-600" />
                        </motion.a>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>

                    {/* Highlights with 3D pop effect */}
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8, z: -20 }}
                          animate={{ opacity: 1, scale: 1, z: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                          whileHover={{
                            scale: 1.1,
                            z: 10,
                            boxShadow: "0 10px 20px -5px rgba(14, 165, 233, 0.3)",
                          }}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-sm font-medium cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" />
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
