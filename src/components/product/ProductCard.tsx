// src/components/product/ProductCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/context/toast-context';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    
    // Add a small delay to simulate processing
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.thumbnail,
      });
      
      setIsLoading(false);
      showToast(`${product.name} added to cart`, 'success');
    }, 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <Link 
        href={`/products/${product.id}`} 
        className="block relative flex-shrink-0"
        aria-label={`View ${product.name} details`}
      >
        <div className="h-64 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
          <OptimizedImage
            src={product.thumbnail || '/images/placeholder.jpg'}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            objectFit="contain"
          />
          
          {/* Sale badge */}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </span>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white text-gray-800 font-medium px-3 py-1 rounded-full text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>
        
        {/* Product name */}
        <Link href={`/products/${product.id}`} className="block mt-1 flex-grow">
          <h3 className="text-lg font-medium hover:text-[#0f766e] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="mt-2 flex items-center">
          <span className="font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="ml-2 text-gray-500 line-through text-sm">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        
        {/* Add to cart button */}
        <div className="mt-4">
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            isLoading={isLoading}
            className="w-full"
            size="sm"
            aria-label={product.inStock ? `Add ${product.name} to cart` : 'Out of stock'}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;