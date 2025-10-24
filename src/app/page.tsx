import Link from 'next/link';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import ProductGrid from '@/components/product/ProductGrid';
import FeaturedProductCarousel from '@/components/product/FeaturedProductCarousel';
import { mockProducts } from '@/mock/products';
import Button from '@/components/ui/Button';

export default function Home() {
  // Get featured products
  const featuredProducts = mockProducts
    .filter(product => product.featured);
  
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

          <FeaturedProductCarousel products={featuredProducts} />

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

    </div>
  );
}