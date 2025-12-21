import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
                <Image src="/logo.jpeg" alt="TiwariTools logo" width={40} height={40} className="object-contain rounded-xl" />
              </div>
              <span className="text-xl font-bold">TiwariTools</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted local shop for wholesale and retail tools, power tools, kitchen and agriculture supplies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products/hand-tools"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Hand Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/products/power-tools"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Power Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/products/kitchen-home"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Kitchen & Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products/agriculture-tools"
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  Agriculture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Bhalu market , Mora road , Bhagwanpur Hatt
                  <br />
                  Siwan, Bihar - 841408
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+911234567890" className="text-primary-foreground/80 hover:text-accent text-sm">
                  +91 6206507964
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:tiwaritools18@gmail.com" className="text-primary-foreground/80 hover:text-accent text-sm">
                  tiwaritools18@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <span className="text-primary-foreground/80 text-sm">Mon - Sun: 8AM - 9PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} TiwariTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
