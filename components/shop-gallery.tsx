import Image from "next/image"
import { SectionReveal } from "@/components/section-reveal"

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
