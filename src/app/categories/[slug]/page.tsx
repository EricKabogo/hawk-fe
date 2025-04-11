// src/app/categories/[slug]/page.tsx
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: { slug: string };
}

// Map of valid category slugs
const validCategories = [
  'electronics', 
  'clothing', 
  'home', 
  'accessories'
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  // Check if this is a valid category
  if (!validCategories.includes(slug)) {
    notFound();
  }
  
  // Redirect to products page with category filter
  redirect(`/products?category=${slug}`);
}