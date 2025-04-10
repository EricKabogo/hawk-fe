import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Mock featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      image: '/images/product-1.jpg',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 149.99,
      image: '/images/product-2.jpg',
      category: 'Electronics',
    },
    {
      id: '3',
      name: 'Leather Backpack',
      price: 79.99,
      image: '/images/product-3.jpg',
      category: 'Accessories',
    },
    {
      id: '4',
      name: 'Bluetooth Speaker',
      price: 59.99,
      image: '/images/product-4.jpg',
      category: 'Electronics',
    },
  ];

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
              className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  {/* Replace with actual images when available */}
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-sm text-gray-500">{product.category}</span>
                  <h3 className="text-lg font-medium mt-1">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">Ksh{product.price.toFixed(2)}</span>
                    <button className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-dark transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="border border-primary text-primary hover:bg-primary hover:text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Electronics Image</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-medium mb-2">Electronics</h3>
                <Link 
                  href="/products/category/electronics" 
                  className="text-primary hover:underline"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Clothing Image</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-medium mb-2">Clothing</h3>
                <Link 
                  href="/products/category/clothing" 
                  className="text-primary hover:underline"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Home Goods Image</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-medium mb-2">Home</h3>
                <Link 
                  href="/products/category/home" 
                  className="text-primary hover:underline"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
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
              className="bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}