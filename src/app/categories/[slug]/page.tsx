import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Map of valid category slugs
const validCategories = [
  'electronics', 
  'clothing', 
  'home', 
  'accessories'
];

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the params since they're now a Promise
  const { slug } = await params;
  
  // Check if this is a valid category
  if (!validCategories.includes(slug)) {
    notFound();
  }
  
  // Redirect to products page with category filter
  redirect(`/products?category=${slug}`);
}