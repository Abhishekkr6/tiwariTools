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
        url: "/webLogo.png",
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
      <body className={`font-sans antialiased`}>
        <LenisProvider />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileBottomBar />
        <Analytics />
      </body>
    </html>
  )
}
