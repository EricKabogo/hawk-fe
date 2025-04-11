'use client';

import { useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';
import ProductRecommendations from '@/components/product/ProductRecommendations';
import { Product } from '@/types/product';
import { mockProducts } from '@/mock/products';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addItem } = useCart();
  
  // Instead of using the non-existent useProduct hook, let's use mockProducts directly
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  // Load product data on component mount
  useState(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const foundProduct = mockProducts.find(p => p.id === params.id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  });
  
  // Fetch related products
  const { products: relatedProducts } = useProducts({
    category: product?.category,
  });
  
  // Filter out the current product
  const filteredRelatedProducts = relatedProducts.filter(p => p.id !== params.id).slice(0, 4);
  
  // Handle quantity change
  const incrementQuantity = () => {
    if (product && quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.thumbnail,
      });
      
      // Show a success message or redirect to cart
      // For now, just redirect to cart
      router.push('/cart');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f766e]"></div>
      </div>
    );
  }
  
  if (error || !product) {
    return notFound();
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-[#0f766e]">Home</Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link href="/products" className="text-gray-500 hover:text-[#0f766e]">Products</Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link 
              href={`/products?category=${encodeURIComponent(product.category)}`} 
              className="text-gray-500 hover:text-[#0f766e]"
            >
              {product.category}
            </Link>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button 
                  key={index} 
                  className="aspect-square bg-gray-100 rounded-md flex items-center justify-center hover:ring-2 hover:ring-[#0f766e]"
                >
                  <span className="text-xs text-gray-500">Image {index + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          {/* Product Name */}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Price */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-gray-500 line-through">{formatPrice(product.compareAtPrice)}</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 text-xs font-bold rounded">
                  {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                In Stock ({product.stockQuantity} available)
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Out of Stock
              </span>
            )}
          </div>
          
          {/* Description */}
          <div className="prose prose-sm mb-6">
            <p>{product.description}</p>
          </div>
          
          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Colors</h3>
              <div className="flex space-x-3">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      variant.inStock
                        ? 'hover:border-[#0f766e] focus:outline-none focus:ring-2 focus:ring-[#0f766e]'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!variant.inStock}
                  >
                    {variant.attributes.color}
                    {!variant.inStock && ' (Out of Stock)'}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selector and Add to Cart */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex border rounded-md max-w-[120px]">
              <button 
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
                onClick={decrementQuantity}
              >-</button>
              <input
                type="number"
                className="w-full text-center border-x"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                readOnly
              />
              <button 
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
                onClick={incrementQuantity}
              >+</button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-grow"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
          
          {/* SKU and Category */}
          <div className="mt-8 pt-6 border-t text-sm text-gray-600">
            <p><span className="font-medium">SKU:</span> {product.sku}</p>
            <p><span className="font-medium">Category:</span> {product.category}</p>
            {product.subcategory && (
              <p><span className="font-medium">Subcategory:</span> {product.subcategory}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-6 py-3 ${
                activeTab === 'description' 
                  ? 'border-b-2 border-[#0f766e] font-medium text-[#0f766e]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-6 py-3 ${
                activeTab === 'specifications' 
                  ? 'border-b-2 border-[#0f766e] font-medium text-[#0f766e]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`px-6 py-3 ${
                activeTab === 'reviews' 
                  ? 'border-b-2 border-[#0f766e] font-medium text-[#0f766e]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies 
                nisl nisl nec nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl 
                aliquam nisl, nec ultricies nisl nisl nec nisl.
              </p>
              <p>
                Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec 
                ultricies nisl nisl nec nisl. Sed euismod, nec ultricies lacinia, 
                nisl nisl aliquam nisl, nec ultricies nisl nisl nec nisl.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.attributes || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-6 py-4 whitespace-nowrap bg-gray-50 text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {String(value)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-50 text-sm font-medium text-gray-500">
                        SKU
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sku}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap bg-gray-50 text-sm font-medium text-gray-500">
                        In Stock
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.inStock ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
              <p className="text-gray-500 italic">No reviews yet. Be the first to review this product.</p>
              
              <Button className="mt-4">Write a Review</Button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {filteredRelatedProducts.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <ProductGrid products={filteredRelatedProducts} />
        </div>
      )}

      {/* Recently Viewed Products */}
      <div className="border-t pt-12 mt-12">
        <ProductRecommendations 
          title="Recently Viewed" 
          type="recently-viewed" 
          currentProductId={product.id}
          limit={4}
        />
      </div>
    </div>
  );
}