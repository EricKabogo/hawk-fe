'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { mockProducts } from '@/mock/products';
import { Product } from '@/types/product';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';

// Separate component that uses useSearchParams
function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  
  // Perform search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        router.replace('/products');
        return;
      }
      
      setIsLoading(true);
      
      try {
        // In a real app, you would call your search API
        // For now, we'll simulate a search using mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const results = mockProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        setSearchResults(results);
        
        // Generate search suggestions
        const suggestions = generateSearchSuggestions(query, results.length);
        setSearchSuggestions(suggestions);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [query, router]);
  
  // Generate search suggestions based on query and results count
  const generateSearchSuggestions = (query: string, resultsCount: number): string[] => {
    if (resultsCount > 0) return [];
    
    // If no results, suggest related search terms
    const suggestions = [
      `${query} accessories`,
      `affordable ${query}`,
      `premium ${query}`,
      `${query} alternatives`,
    ];
    
    return suggestions;
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                name="search"
                defaultValue={query}
                placeholder="Search products..."
                className="w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0f766e]"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
        
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f766e]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              name="search"
              defaultValue={query}
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0f766e]"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Search results for &quot;{query}&quot;
        </h1>
        <p className="text-gray-600">
          {searchResults.length} products found
        </p>
      </div>
      
      {searchResults.length > 0 ? (
        <>
          <ProductGrid products={searchResults} />
          
          <div className="mt-8 text-center">
            <Link href={`/products?q=${encodeURIComponent(query)}`}>
              <Button variant="outline" className="flex items-center mx-auto">
                Advanced Filters
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find any products matching &quot;{query}&quot;.
          </p>
          
          {searchSuggestions.length > 0 && (
            <div className="mb-8">
              <p className="font-medium mb-2">Try searching for:</p>
              <ul className="space-y-2">
                {searchSuggestions.map((suggestion, index) => (
                  <li key={index}>
                    <Link 
                      href={`/search?q=${encodeURIComponent(suggestion)}`}
                      className="text-[#0f766e] hover:underline"
                    >
                      {suggestion}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Loading fallback component
function SearchPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Search bar skeleton */}
        <div className="mb-8">
          <div className="flex items-center w-full max-w-lg mx-auto">
            <div className="relative w-full">
              <div className="w-full h-12 bg-gray-200 rounded-md"></div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Title skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
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
  );
}

// Main component with Suspense wrapper
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}