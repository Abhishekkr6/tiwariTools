import Image from "next/image"
import { CheckCircle, Users, Clock, Award } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"
import contentData from "@/data/content.json"

export const metadata = {
  title: "About Us - TiwariTools",
  description:
    "Learn about ToolMart - your trusted local wholesale and retail tools supplier with over 20 years of experience",
}

const highlights = [
  { icon: Clock, label: "20+ Years", description: "Of trusted service" },
  { icon: Users, label: "10,000+", description: "Happy customers" },
  { icon: Award, label: "Quality", description: "Assured products" },
]

const values = [
  "Genuine quality products from trusted brands",
  "Competitive wholesale and retail pricing",
  "Expert advice and product recommendations",
  "Wide selection across multiple categories",
  "Dedicated after-sales support",
  "Easy exchange and return policy",
]

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <SectionReveal as="section" className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {contentData.about.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {contentData.about.description1}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {contentData.about.description2}
            </p>
          </div>
          <div className="relative h-80 lg:h-125 rounded-2xl overflow-hidden">
            <Image src={contentData.about.image} alt="TiwariTools Shop" fill className="object-cover" />
          </div>
        </SectionReveal>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {highlights.map((item, index) => (
            <SectionReveal as="div" delay={index * 150} key={index} className="glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">{item.label}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </SectionReveal>
          ))}
        </section>

        {/* Our Values */}
        <SectionReveal as="section" className="glass-card rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Business Info */}
        <SectionReveal as="section" className="mt-20 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">Wholesale & Retail Available</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            We cater to both individual buyers and businesses. Get in touch with us for special wholesale pricing on
            bulk orders. Our dedicated team is here to help you find the right products for your specific needs.
          </p>
        </SectionReveal>
      </div>
    </div>
  )
}
