"use client"

import Link from "next/link"
import Image from "next/image"
import { categories } from "@/data/products"
import { ArrowRight } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"
import { motion } from "framer-motion"

export function CategoryGrid() {
  return (
    <SectionReveal as="section" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Our Product Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of quality tools and supplies for every need
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <Link
                href={`/products/${category.id}`}
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:text-accent transition-colors">
                    View Products
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  )
}
