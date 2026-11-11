import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"//@ts-ignore
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anish Singh | Full-Stack AI & Cloud Engineer",
  description:
    "Full-Stack AI & Cloud Engineer building production-ready AI products, document intelligence workflows, and AWS/GCP deployments with DNS, SSL, CI/CD, and handover.",
  generator: "v0.app",
  keywords: [
    "full-stack AI engineer",
    "AI product development",
    "document intelligence",
    "AWS deployment",
    "GCP deployment",
    "DevOps",
    "DNS configuration",
    "SSL",
    "Next.js",
    "FastAPI",
    "portfolio",
  ],
  authors: [{ name: "Anish Singh" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a1020",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Kick off the village download in parallel with the JS bundle. */}
        <link
          rel="preload"
          as="fetch"
          href="/images/coc_base.glb"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
