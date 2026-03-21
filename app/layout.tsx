import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomBar } from "@/components/mobile-bottom-bar"
import { LenisProvider } from "@/components/lenis-provider"

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
        url: "/logo.jpeg",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/webLogo.png",
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
      <body className={`font-sans antialiased relative min-h-screen`}>
        {/* Dynamic Premium Glass Background */}
        <div className="fixed inset-0 -z-50 bg-background overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[140px] mix-blend-screen animate-pulse duration-[10000ms]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[150px] mix-blend-screen animate-pulse duration-[12000ms]" />
          <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-secondary/20 blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]" />
        </div>

        <LenisProvider />
        <Header />
        <main className="min-h-screen relative z-0">{children}</main>
        <Footer />
        <MobileBottomBar />
        <Analytics />
      </body>
    </html>
  )
}
