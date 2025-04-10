'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'newest';

  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);

  // Use our custom hook to fetch products
  const { products, isLoading, error, setParams } = useProducts({
    category: initialCategory,
    search: initialSearch,
    sort: initialSort as any,
  });

  // Update API params when filters change
  useEffect(() => {
    setParams({ category, search: initialSearch, sort: sort as any });
  }, [category, sort, initialSearch, setParams]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">
          {initialSearch 
            ? `Search results for "${initialSearch}"` 
            : category 
              ? `Browse our ${category} collection`
              : 'Browse our collection of high-quality products'
          }
        </p>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Filter by:</span>
          <select 
            className="border rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Sort by:</span>
          <select 
            className="border rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          An error occurred while loading products. Please try again.
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && !error && (
        <ProductGrid products={products} />
      )}
    </div>
  );
}