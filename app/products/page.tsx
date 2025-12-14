import Link from "next/link"
import Image from "next/image"
import { categories } from "@/data/products"
import { ArrowRight } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"

export const metadata = {
  title: "Products - TiwariTools",
  description: "Browse our complete range of tools, power tools, kitchen and agriculture supplies",
}

export default function ProductsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <SectionReveal as="section" className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Browse our extensive collection of quality tools and supplies across all categories
          </p>
        </SectionReveal>

        {/* Categories Grid */}
        <SectionReveal as="section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/${category.id}`}
              className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:text-accent transition-colors">
                  Explore Category
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </SectionReveal>
      </div>
    </div>
  )
}
