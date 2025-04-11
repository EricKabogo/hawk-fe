// src/components/home/FeaturedCategories.tsx
import Link from 'next/link';
import { Smartphone, ShoppingBag, Home, Watch, Gift } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    description: 'Gadgets, devices, and smart tech',
    slug: 'electronics',
    icon: <Smartphone size={40} className="text-[#0f766e]" />,
    color: 'bg-blue-50',
  },
  {
    name: 'Clothing',
    description: 'Fashion and apparel',
    slug: 'clothing',
    icon: <ShoppingBag size={40} className="text-[#0f766e]" />,
    color: 'bg-green-50',
  },
  {
    name: 'Home & Kitchen',
    description: 'Essentials for your living space',
    slug: 'home',
    icon: <Home size={40} className="text-[#0f766e]" />,
    color: 'bg-yellow-50',
  },
  {
    name: 'Accessories',
    description: 'Complete your style',
    slug: 'accessories',
    icon: <Watch size={40} className="text-[#0f766e]" />,
    color: 'bg-purple-50',
  },
  {
    name: 'Sale',
    description: 'Special discounts and deals',
    slug: 'sale',
    icon: <Gift size={40} className="text-[#f97316]" />,
    color: 'bg-red-50',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={category.slug === 'sale' 
                ? '/products?sale=true' 
                : `/products?category=${category.slug}`
              }
              className={`${category.color} rounded-lg p-6 text-center transition-transform hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="flex justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}