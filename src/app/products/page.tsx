'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sliders, X } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/product/ProductGrid';
import SearchFilters from '@/components/product/SearchFilters';
import Button from '@/components/ui/Button';

// Define the sort type to match what your API expects
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

// Separate component that uses useSearchParams
function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Get search parameters
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const price = searchParams.get('price') || '';
  const inStock = searchParams.get('inStock') === 'true';
  const onSale = searchParams.get('sale') === 'true';
  
  // Get sort parameter with 'newest' as default and ensure it's a valid type
  const rawSort = searchParams.get('sort') || 'newest';
  const sort: SortOption = ['newest', 'price-low', 'price-high', 'name'].includes(rawSort) 
    ? rawSort as SortOption 
    : 'newest';
  
  // Convert price range to min/max values using useMemo to prevent unnecessary recalculations
  const priceRange = useMemo(() => {
    if (!price) return { min: null, max: null };
    
    const [min, max] = price.split('-').map(val => val ? parseInt(val) : null);
    return { min, max };
  }, [price]);
  
  // Use our custom hook to fetch products
  const { products, isLoading, error, setParams } = useProducts({
    search: query,
    category,
    sort,
    // Additional params for advanced filtering
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    inStock,
    onSale,
  });
  
  // Update API params when filters change
  useEffect(() => {
    setParams({
      search: query,
      category,
      sort,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      inStock,
      onSale,
    });
  }, [query, category, sort, priceRange.min, priceRange.max, inStock, onSale, setParams]);
  
  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  
  // Get page title based on filters
  const getPageTitle = () => {
    if (query) {
      return `Search results for "${query}"`;
    }
    
    if (category) {
      // Convert category ID to display name (e.g., 'electronics' to 'Electronics')
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      return categoryName;
    }
    
    return 'All Products';
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
        <div className="flex items-center text-gray-600">
          {query && <span className="mr-2">Showing search results for &quot;{query}&quot;</span>}
          
          {/* Show active filters */}
          <div className="flex flex-wrap gap-2">
            {category && (
              <span className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center">
                Category: {category.charAt(0).toUpperCase() + category.slice(1)}
                <Link href={`/products?${new URLSearchParams({
                  ...(query ? { q: query } : {}),
                  ...(sort !== 'newest' ? { sort } : {}),
                  ...(inStock ? { inStock: 'true' } : {}),
                  ...(onSale ? { sale: 'true' } : {}),
                  ...(price ? { price } : {}),
                })}`} className="ml-1">
                  <X size={14} />
                </Link>
              </span>
            )}
            
            {price && (
              <span className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center">
                Price: {priceRange.min && `KSh ${priceRange.min.toLocaleString()}`} 
                {priceRange.min && priceRange.max && ' - '} 
                {priceRange.max && `KSh ${priceRange.max.toLocaleString()}`}
                {priceRange.min && !priceRange.max && '+'} 
                <Link href={`/products?${new URLSearchParams({
                  ...(query ? { q: query } : {}),
                  ...(category ? { category } : {}),
                  ...(sort !== 'newest' ? { sort } : {}),
                  ...(inStock ? { inStock: 'true' } : {}),
                  ...(onSale ? { sale: 'true' } : {}),
                })}`} className="ml-1">
                  <X size={14} />
                </Link>
              </span>
            )}
            
            {inStock && (
              <span className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center">
                In Stock Only
                <Link href={`/products?${new URLSearchParams({
                  ...(query ? { q: query } : {}),
                  ...(category ? { category } : {}),
                  ...(sort !== 'newest' ? { sort } : {}),
                  ...(onSale ? { sale: 'true' } : {}),
                  ...(price ? { price } : {}),
                })}`} className="ml-1">
                  <X size={14} />
                </Link>
              </span>
            )}
            
            {onSale && (
              <span className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center">
                On Sale
                <Link href={`/products?${new URLSearchParams({
                  ...(query ? { q: query } : {}),
                  ...(category ? { category } : {}),
                  ...(sort !== 'newest' ? { sort } : {}),
                  ...(inStock ? { inStock: 'true' } : {}),
                  ...(price ? { price } : {}),
                })}`} className="ml-1">
                  <X size={14} />
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="md:w-64 flex-shrink-0">
          <SearchFilters 
            onFilterChange={() => {}} 
            showMobileFilters={showMobileFilters}
            toggleMobileFilters={toggleMobileFilters}
          />
        </div>
        
        {/* Products */}
        <div className="flex-grow">
          {/* Mobile filter and sort buttons */}
          <div className="flex justify-between mb-6 md:hidden">
            <Button 
              variant="outline" 
              onClick={toggleMobileFilters}
              className="flex items-center"
            >
              <Sliders size={16} className="mr-2" />
              Filters
            </Button>
            
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('sort', e.target.value);
                  window.location.href = `/products?${params.toString()}`;
                }}
                className="appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Desktop sort controls */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <p className="text-gray-500">
              {isLoading ? 'Loading products...' : `${products.length} products found`}
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('sort', e.target.value);
                  window.location.href = `/products?${params.toString()}`;
                }}
                className="border rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
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
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f766e]"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              An error occurred while loading products. Please try again.
            </div>
          )}

          {/* Product Grid */}
          {!isLoading && !error && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">No Products Found</h2>
                  <p className="text-gray-600 mb-6">
                    We couldn&apos;t find any products matching your criteria. Try adjusting your filters.
                  </p>
                  <Link href="/products">
                    <Button variant="outline">View All Products</Button>
                  </Link>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function ProductsPageLoading() {
  return (
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters skeleton - Desktop */}
          <div className="md:w-64 flex-shrink-0 hidden md:block">
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="flex items-center">
                        <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Products skeleton */}
          <div className="flex-grow">
            {/* Mobile controls skeleton */}
            <div className="flex justify-between mb-6 md:hidden">
              <div className="h-10 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            
            {/* Desktop controls skeleton */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-32"></div>
            </div>

            {/* Product grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageLoading />}>
      <ProductsPageContent />
    </Suspense>
  );
}