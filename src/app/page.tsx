// Update src/app/page.tsx
import Link from 'next/link';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import ProductGrid from '@/components/product/ProductGrid';
import { mockProducts } from '@/mock/products';
import Button from '@/components/ui/Button';

export default function Home() {
  // Get featured products
  const featuredProducts = mockProducts
    .filter(product => product.featured)
    .slice(0, 4);
  
  // Get sale products
  const saleProducts = mockProducts
    .filter(product => product.compareAtPrice && product.compareAtPrice > product.price)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Quality Products for Every Need
            </h1>
            <p className="text-xl mb-8">
              Shop our wide selection of premium products at competitive prices. 
              From electronics to home goods, we have everything you need.
            </p>
            <Link 
              href="/products" 
              className="bg-[#0f766e] hover:bg-[#0e6a62] text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          
          <ProductGrid products={featuredProducts} />
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">On Sale</h2>
            <Link href="/products?sale=true" className="text-[#0f766e] hover:underline">
              View all sales
            </Link>
          </div>
          
          <ProductGrid products={saleProducts} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#0f766e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="max-w-lg mx-auto mb-8">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white flex-grow text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-[#0f766e] hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}