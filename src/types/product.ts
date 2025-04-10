export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    compareAtPrice?: number | null;
    images: string[];
    thumbnail: string;
    category: string;
    subcategory?: string;
    featured: boolean;
    inStock: boolean;
    stockQuantity: number;
    sku: string;
    attributes?: {
      [key: string]: string;
    };
    variants?: ProductVariant[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductVariant {
    id: string;
    title: string;
    sku: string;
    price: number;
    compareAtPrice?: number | null;
    attributes: {
      [key: string]: string;
    };
    stockQuantity: number;
    inStock: boolean;
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    parentId?: string;
  }