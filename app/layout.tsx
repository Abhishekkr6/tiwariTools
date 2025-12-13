import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomBar } from "@/components/mobile-bottom-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TiwariTools & PowerTools - Wholesale & Retail Tools, Power Tools, Kitchen & Agriculture Supplies",
  description:
    "Your trusted local shop for wholesale and retail tools, power tools, kitchen and agriculture supplies. Quality products at competitive prices.",
  keywords: [
    "tools",
    "power tools",
    "hand tools",
    "hardware",
    "kitchen supplies",
    "agriculture tools",
    "wholesale",
    "retail",
  ],
  generator: "v0.app",
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
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileBottomBar />
        <Analytics />
      </body>
    </html>
  )
}
