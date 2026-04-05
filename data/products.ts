import productsData from './products.json';
import categoriesData from './categories.json';

export type Product = {
  id: string
  name: string
  category: string
  image: string
  description: string
  useCase: string
  tags: string[]
}

export type Category = {
  id: string
  name: string
  description: string
  icon: string
  image: string
}

export const categories: Category[] = categoriesData as Category[];
export const products: Product[] = productsData as Product[];
