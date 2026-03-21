"use client"

import { type ReactNode } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

type SectionRevealProps = {
  as?: "section" | "div"
  delay?: number
  className?: string
  children: ReactNode
} & HTMLMotionProps<any>

export function SectionReveal({
  as = "section",
  delay = 0,
  className,
  children,
  ...rest
}: SectionRevealProps) {
  const Component = as === "div" ? motion.div : motion.section;

  return (
    <Component
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
      className={cn("w-full relative", className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
