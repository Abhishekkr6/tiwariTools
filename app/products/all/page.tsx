import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { SectionReveal } from "@/components/section-reveal"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "All Products - TiwariTools",
  description: "See every product we offer in one place with quick WhatsApp enquiry.",
}

export default function AllProductsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <SectionReveal as="section" className="mb-6 inline-flex">
          <Button variant="ghost" asChild>
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </Button>
        </SectionReveal>

        {/* Page Header */}
        <SectionReveal as="section" className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">All Products</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Browse our entire catalog in one place. Find detailed names, descriptions, and start a WhatsApp enquiry for
            any product instantly.
          </p>
        </SectionReveal>

        {/* Products Grid */}
        <SectionReveal as="section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SectionReveal>
      </div>
    </div>
  )
}

