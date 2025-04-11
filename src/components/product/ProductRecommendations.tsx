// src/components/product/ProductRecommendations.tsx
'use client';

import { useState, useEffect } from 'react';
import { mockProducts } from '@/mock/products';
import { Product } from '@/types/product';
import ProductGrid from './ProductGrid';

interface ProductRecommendationsProps {
  title: string;
  type: 'featured' | 'related' | 'bestsellers' | 'recently-viewed' | 'sale';
  currentProductId?: string;
  category?: string;
  limit?: number;
}

export default function ProductRecommendations({
  title,
  type,
  currentProductId,
  category,
  limit = 4
}: ProductRecommendationsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let recommendedProducts: Product[] = [];
        
        switch (type) {
          case 'featured':
            recommendedProducts = mockProducts.filter(product => product.featured);
            break;
          
          case 'related':
            if (category) {
              recommendedProducts = mockProducts.filter(
                product => product.category === category && product.id !== currentProductId
              );
            }
            break;
          
          case 'bestsellers':
            // In a real app, you would have a "bestseller" flag or sort by sales
            // For now, just get some random products
            recommendedProducts = [...mockProducts].sort(() => 0.5 - Math.random());
            break;
          
          case 'recently-viewed':
            // In a real app, you would get this from localStorage or user history
            // For now, just get some random products
            recommendedProducts = [...mockProducts].sort(() => 0.5 - Math.random());
            break;
          
          case 'sale':
            recommendedProducts = mockProducts.filter(
              product => product.compareAtPrice && product.compareAtPrice > product.price
            );
            break;
        }
        
        // Limit the number of products
        setProducts(recommendedProducts.slice(0, limit));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [type, currentProductId, category, limit]);
  
  if (isLoading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <ProductGrid products={products} />
    </div>
  );
}