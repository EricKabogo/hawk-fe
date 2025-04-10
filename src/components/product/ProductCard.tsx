'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import Button from '../ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
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
    }, 300);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative h-64 w-full overflow-hidden">
          {/* Placeholder while we don't have real images */}
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
          
          {/* When we have real images, use this instead */}
          {/* <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          /> */}
          
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

      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>
        
        {/* Product name */}
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-medium mt-1 hover:text-[#0f766e] transition-colors">
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
            disabled={!product.inStock}
            isLoading={isLoading}
            className="w-full"
            size="sm"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;