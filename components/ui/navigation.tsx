"use client"

import { Home, User, FolderOpen, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "about", label: "About", icon: User, href: "/about" },
  { id: "projects", label: "Projects", icon: FolderOpen, href: "/projects" },
  { id: "coding", label: "Coding", icon: Code2, href: "/coding" },
] as const

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-2"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-xl transition-all duration-300",
                "flex items-center gap-2 text-sm font-medium",
                "bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg border border-slate-100",
                isActive
                  ? "text-sky-600 bg-sky-50 border-sky-200 shadow-sky-100"
                  : "text-slate-700 hover:text-sky-600 hover:bg-sky-50/50 hover:border-sky-100",
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          )
        })}
      </motion.div>
    </nav>
  )
}
