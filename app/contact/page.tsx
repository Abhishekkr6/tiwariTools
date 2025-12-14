import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/section-reveal"

export const metadata = {
  title: "Contact Us - TiwariTools",
  description: "Visit our shop or get in touch via phone or WhatsApp for product enquiries",
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Shop",
    details: ["Bhalu market , Mora road , Bhagwanpur Hatt", "Siwan, Bihar - 841408"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 6206507964", "+91 9801481529"],
    links: ["tel:+916206507964", "tel:+919801481529"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@tiwaritools.com", "sales@tiwaritools.com"],
    links: ["mailto:info@tiwaritools.com", "mailto:sales@tiwaritools.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Saturday: 8:00 AM - 9:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
  },
]

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <SectionReveal as="section" className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our products? Get in touch with us via WhatsApp, phone, or visit our shop
          </p>
        </SectionReveal>

        {/* Contact Cards */}
        <SectionReveal as="section" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <div key={index} className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground">
                      {item.links ? (
                        <a href={item.links[idx]} className="hover:text-primary transition-colors">
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </SectionReveal>

        {/* WhatsApp CTA */}
        <SectionReveal as="section" className="glass-card rounded-2xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Quick Enquiry via WhatsApp</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            The fastest way to get product information and pricing. Send us a message and we will respond promptly.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8" asChild>
            <a
              href="https://wa.me/916206507964?text=Hi, I would like to enquire about your products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Start WhatsApp Chat
            </a>
          </Button>
        </SectionReveal>

        {/* Map Section */}
        <SectionReveal as="section" className="glass-card rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Find Us on Map</h2>
          </div>
          <div className="relative h-80 md:h-100 bg-muted">
            {/* Google Maps Embed Placeholder */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.234567890123!2d72.12345678901234!3d19.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI0LjQiTiA3MsKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TiwariTools Location"
              className="absolute inset-0 borderless-iframe"
            />
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
