"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { ExternalLink, Github, X } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: "prepai",
    title: "PrepAI",
    description:
      "AI Career Coach with Next.js and TypeScript. Implemented SSR, SEO optimization, and Prisma-based database schema.",
    tags: ["Next.js", "TypeScript", "Prisma", "Gemini API"],
    link: "https://prep-ai-lac.vercel.app",
    github: "https://github.com/Anish1279/PrepAI",
    image: "/ai-career-coaching-app-interface.jpg",
  },  
  
  {
    id: "youtube-toolkit",
    title: "BuzzTube",
    description: "Backend for AI-powered thumbnail, title, and description generation. Serving 1.2K creators monthly.",
    tags: ["Node.js", "Gemini AI", "Stripe", "AWS"],
    link: "#",
    github: "#",
    image: "/youtube-content-creator-dashboard.jpg",
  },

  {
    id: "rightsy",
    title: "Rightsy",
    description: "Gamified legal education platform for ages 6-16 with 10+ interactive games and story-based videos.",
    tags: ["Next.js", "React", "MongoDB", "YouTube API"],
    link: "#",
    github: "#",
    image: "/kids-legal-education-game-platform.jpg",
  },

  {
    id: "innobyte",
    title: "Oasis",
    description: "Responsive SPA with Google Maps integration and WhatsApp API for bookings. 30% user retention boost.",
    tags: ["Next.js", "TypeScript", "Tailwind", "REST APIs"],
    link: "#",
    github: "#",
    image: "/booking-service-mobile-app.jpg",
  },
]

export function ProjectsSection() {
  const { currentSection, setSection } = useAppStore()
  const isVisible = currentSection === "projects"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-y-0 right-0 z-40 w-full max-w-2xl overflow-y-auto"
        >
          <div className="min-h-full glass p-8 pt-20">
            <button
              onClick={() => setSection("home")}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-2 text-glow"
            >
              Projects
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-8"
            >
              Featured projects showcasing my expertise in full-stack development.
            </motion.p>

            <div className="grid gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "glass-card rounded-xl overflow-hidden",
                    "border border-transparent hover:border-primary/30",
                    "transition-all duration-300 group",
                  )}
                >
                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </a>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </a>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="h-24" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
