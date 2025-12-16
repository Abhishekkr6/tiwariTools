import { notFound } from "next/navigation"
import Link from "next/link"
import { categories, getProductsByCategory, getCategoryById } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/section-reveal"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categoryId } = await params
  const category = getCategoryById(categoryId)
  if (!category) return { title: "Category Not Found" }

  return {
    title: `${category.name} - TiwariTools`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params
  const category = getCategoryById(categoryId)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(categoryId)

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
        <SectionReveal as="section" className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{category.name}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{category.description}</p>
        </SectionReveal>

        {/* Products Grid */}
        {products.length > 0 ? (
          <SectionReveal as="section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SectionReveal>
        ) : (
          <SectionReveal as="section" className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </SectionReveal>
        )}

        {/* Other Categories */}
        <SectionReveal as="section" className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.id !== categoryId)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/products/${c.id}`}
                  className="px-4 py-2 glass-card rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
