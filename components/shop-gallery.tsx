"use client"

import Image from "next/image"
import { SectionReveal } from "@/components/section-reveal"
import { motion } from "framer-motion"

const galleryImages = [
  { src: "/placeholder.svg?height=400&width=600", alt: "Shop Interior" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Power Tools Section" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Hand Tools Display" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Customer Service" },
]

export function ShopGallery() {
  return (
    <SectionReveal as="section" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Visit Our Shop</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse of our well-stocked showroom and organized product displays
          </p>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden group shadow-lg"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div 
                className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0"
              >
                <span className="text-white font-semibold text-lg drop-shadow-md">{image.alt}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  )
}
