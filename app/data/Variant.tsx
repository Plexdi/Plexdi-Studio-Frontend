export interface ProductVariant {
  id: string;
  name: string;
  priceGBP: number;
  stripeLink?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  tags: string[];
  cover: string;
  hover?: string;
  gallery: string[];
  includes: string[];
  software: string[];
  licenseSummary: string;
  variants: ProductVariant[];
  featured?: boolean;
  updatedAt: string;
}

export const products: Product[] = [ /* ...test products from earlier... */ ];
