import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ShopGallery } from "@/components/shop-gallery"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <WhyChooseUs />
      <ShopGallery />
    </>
  )
}
