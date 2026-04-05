import { categories, products } from './products'
import * as fs from 'fs'
import * as path from 'path'

const content = {
  hero: {
    badge: "Trusted Local Supplier",
    headline: "Wholesale & Retail Tools, Power Tools, Kitchen & Agriculture Supplies",
    subtext: "Your trusted local shop serving professionals and households with quality tools and supplies at competitive prices.",
    whatsapp: "916206507964",
    whatsappMessage: "Hi, I would like to enquire about your products",
    phone: "+916206507964"
  }
}

fs.writeFileSync(path.resolve(__dirname, 'products.json'), JSON.stringify(products, null, 2))
fs.writeFileSync(path.resolve(__dirname, 'categories.json'), JSON.stringify(categories, null, 2))
fs.writeFileSync(path.resolve(__dirname, 'content.json'), JSON.stringify(content, null, 2))

console.log('JSON files generated!')
