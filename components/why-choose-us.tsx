"use client"

import { Shield, Truck, Banknote, Users, Award, Clock } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All products are sourced from trusted manufacturers with quality guarantees",
  },
  {
    icon: Banknote,
    title: "Competitive Pricing",
    description: "Wholesale and retail rates that fit every budget",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Our knowledgeable staff helps you find the right tools for your needs",
  },
  {
    icon: Truck,
    title: "Bulk Orders",
    description: "Special arrangements for bulk and wholesale orders",
  },
  {
    icon: Award,
    title: "Years of Trust",
    description: "Serving the community for over 20 years with dedication",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Fast and efficient service to save your valuable time",
  },
]

export function WhyChooseUs() {
  return (
    <SectionReveal as="section" className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are committed to providing the best products and service to our customers
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
                }
              }}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block h-full"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  )
}
