import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/section-reveal"
import { MessageCircle, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

const heroImages = [
  "/adjustable-wrench-set-chrome.jpg",
  "/agriculture-farming-tools-sprayer-sickle.jpg",
  "/Anchor Bolt Set.jpg",
  "/Angle Grinder.jpg",
  "/Cabinet Handles.jpg",
  "/Cable Tie Gun.jpg",
  "/Chain Link 5m.jpg",
  "/Circular Saw.jpg",
  "/combination-pliers-tool.jpg",
  "/cordless-drill-20v-power-tool.jpg",
  "/Crimping Tool Set.jpg",
  "/Cutting Board Wooden.jpg",
  "/DEKOPRO 228 Piece Socket Wrench Auto Repair Tool Combination Package Mixed Tool Set Hand Tool Kit with Plastic Toolbox Storage Case.jpeg",
  "/Digital Multimeter.jpg",
  "/Door Hinges.jpg",
  "/download.jpeg",
  "/Electric Blower.jpg",
  "/electrical-tools-testers-wire-strippers.jpg",
  "/Extension Cord 10m.jpg",
  "/Garden Rake.jpg",
  "/Garden Shovel.jpg",
  "/Garden Sprayer.jpg",
  "/hacksaw-frame-metal-cutting.jpg",
  "/hand-tools-collection-hammers-wrenches.jpg",
  "/hardware-screws-nuts-bolts-collection.jpg",
  "/Heat Gun.jpg",
  "/Hedge Trimmer Manual.webp",
  "/Hoe Garden Tool.jpg",
  "/HOE.jpg",
  "/Impact Wrench Electric.jpg",
  "/Jigsaw Variable.jpg",
  "/Kadhai Deep Fry Pan.jpg",
  "/Kitchen Ladle Set.jpg",
  "/kitchen-cookware-utensils-pans.jpg",
  "/measuring-tape-5-meter.jpg",
  "/Non-Stick Tawa.jpg",
  "/Padlock Heavy Duty.jpg",
  "/pipe-wrench-plumbing-tool.jpg",
  "/power-tools-drill-grinder-collection.jpg",
  "/Pressure Cooker.jpg",
  "/professional-claw-hammer-tool.jpg",
  "/Pruning Shears.jpg",
  "/Screw Assortment Box.jpg",
  "/screwdriver-set-12-piece.jpg",
  "/Sickle Curved Blade.jpg",
  "/Stainless Steel Pot Set.jpg",
  "/Storage Container Set.jpg",
  "/Thyme & Table 32-Piece Non-Stick Cookware & Bakeware Set, Black.jpeg",
  "/Tools.jpeg",
  "/Top Best Tools 2018 Rankings &amp; Reviews.jpeg",
  "/Voltage Tester Pen.jpg",
  "/Water Filter Jug.jpg",
  "/Watering Can.jpg",
  "/Welding Machine.jpg",
  "/Wire Stripper Automatic.jpg",
  "/wire-cutter-heavy-duty-tool.jpg",
] as const

function HeroBackgroundCarousel() {
  return (
    <div className="hero-bg-wrapper" aria-hidden="true">
      {heroImages.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="hero-bg-panel hero-bg-panel-fade"
          style={{
            backgroundImage: `url(${encodeURI(src)})`,
            animationDelay: `${index * 6}s`,
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  return (
    <SectionReveal as="section" className="relative overflow-hidden">
      <HeroBackgroundCarousel />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-background/30" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Trusted Local Supplier
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            Wholesale & Retail <span className="text-primary">Tools</span>,{" "}
            <span className="text-accent">Power Tools</span>, Kitchen & Agriculture Supplies
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Your trusted local shop serving professionals and households with quality tools and supplies at competitive
            prices.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8" asChild>
              <a
                href="https://wa.me/916206507964?text=Hi, I would like to enquire about your products"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Enquiry
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <a href="tel:+916206507964" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Browse Products Link */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-8 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            Browse Our Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </SectionReveal>
  )
}
