"use client"

import { Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
export function MobileBottomBar() {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 glass border-t border-border"
    >
      <div className="grid grid-cols-2">
        <a
          href="tel:+916206507964"
          className="flex items-center justify-center gap-2 py-4 text-primary font-medium hover:bg-primary/5 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>Call Now</span>
        </a>
        <a
          href="https://wa.me/916206507964?text=Hi, I would like to enquire about your products"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </motion.div>
  )
}
