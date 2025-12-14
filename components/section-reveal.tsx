"use client"

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionRevealProps<T extends ElementType> = {
  as?: T
  delay?: number
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">

export function SectionReveal<T extends ElementType = "section">({
  as,
  delay = 0,
  className,
  children,
  style,
  ...rest
}: SectionRevealProps<T>) {
  const Component = (as || "section") as ElementType
  const elementRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Component
      ref={elementRef as never}
      className={cn(
        "section-transition opacity-0 translate-y-10",
        isVisible && "section-transition-visible opacity-100 translate-y-0",
        className
      )}
      style={{
        ...(style || {}),
        transitionDelay: style?.transitionDelay ?? `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}
