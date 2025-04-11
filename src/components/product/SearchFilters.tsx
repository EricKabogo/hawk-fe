'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sliders, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

// Mock categories for filter options
const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'accessories', name: 'Accessories' },
];

// Price ranges
const priceRanges = [
  { id: '0-1000', name: 'Under KSh 1,000', min: 0, max: 1000 },
  { id: '1000-5000', name: 'KSh 1,000 - KSh 5,000', min: 1000, max: 5000 },
  { id: '5000-10000', name: 'KSh 5,000 - KSh 10,000', min: 5000, max: 10000 },
  { id: '10000-50000', name: 'KSh 10,000 - KSh 50,000', min: 10000, max: 50000 },
  { id: '50000-', name: 'Over KSh 50,000', min: 50000, max: null },
];

interface SearchFiltersProps {
  onFilterChange?: () => void;
  showMobileFilters: boolean;
  toggleMobileFilters: () => void;
}

export default function SearchFilters({ 
  onFilterChange, 
  showMobileFilters, 
  toggleMobileFilters 
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get filter values from URL params
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>(
    searchParams.get('price') || ''
  );
  const [inStock, setInStock] = useState<boolean>(
    searchParams.get('inStock') === 'true'
  );
  const [onSale, setOnSale] = useState<boolean>(
    searchParams.get('sale') === 'true'
  );
  
  // Get current search query
  const searchQuery = searchParams.get('q') || '';
  
  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // Preserve search query if exists
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    // Add filter params
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (selectedPriceRange) {
      params.set('price', selectedPriceRange);
    }
    
    if (inStock) {
      params.set('inStock', 'true');
    }
    
    if (onSale) {
      params.set('sale', 'true');
    }
    
    // Add sort if present in current URL
    const currentSort = searchParams.get('sort');
    if (currentSort) {
      params.set('sort', currentSort);
    }
    
    // Update URL
    router.push(`/products?${params.toString()}`);
    
    // Close mobile filters if open
    if (showMobileFilters) {
      toggleMobileFilters();
    }
    
    // Callback for parent components
    if (onFilterChange) {
      onFilterChange();
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedPriceRange('');
    setInStock(false);
    setOnSale(false);
    
    // Keep search query if exists
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    // Add sort if present in current URL
    const currentSort = searchParams.get('sort');
    if (currentSort) {
      params.set('sort', currentSort);
    }
    
    // Update URL
    router.push(`/products?${params.toString()}`);
    
    // Close mobile filters if open
    if (showMobileFilters) {
      toggleMobileFilters();
    }
    
    // Callback for parent components
    if (onFilterChange) {
      onFilterChange();
    }
  };
  
  // Check if any filters are active
  const hasActiveFilters = selectedCategory || selectedPriceRange || inStock || onSale;

  // Calculate current price range display
  const getCurrentPriceRangeDisplay = () => {
    if (!selectedPriceRange) return '';
    
    const range = priceRanges.find(range => range.id === selectedPriceRange);
    if (!range) return '';
    
    if (range.max === null) {
      return `Over ${formatPrice(range.min)}`;
    }
    
    return `${formatPrice(range.min)} - ${formatPrice(range.max)}`;
  };

  return (
    <div className={`${
      showMobileFilters 
        ? 'fixed inset-0 z-50 bg-white overflow-auto p-4' 
        : 'hidden md:block'
    }`}>
      {/* Mobile filter header */}
      {showMobileFilters && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <h2 className="text-xl font-bold">Filters</h2>
          <button 
            onClick={toggleMobileFilters}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
      )}
      
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="category-all"
                name="category"
                checked={selectedCategory === ''}
                onChange={() => setSelectedCategory('')}
                className="mr-2"
              />
              <label htmlFor="category-all">All Categories</label>
            </div>
            
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  checked={selectedCategory === category.id}
                  onChange={() => setSelectedCategory(category.id)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category.id}`}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="price-all"
                name="price"
                checked={selectedPriceRange === ''}
                onChange={() => setSelectedPriceRange('')}
                className="mr-2"
              />
              <label htmlFor="price-all">All Prices</label>
            </div>
            
            {priceRanges.map(range => (
              <div key={range.id} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${range.id}`}
                  name="price"
                  checked={selectedPriceRange === range.id}
                  onChange={() => setSelectedPriceRange(range.id)}
                  className="mr-2"
                />
                <label htmlFor={`price-${range.id}`}>{range.name}</label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Availability */}
        <div>
          <h3 className="font-medium mb-3">Availability</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="instock"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
                className="mr-2"
              />
              <label htmlFor="instock">In Stock Only</label>
            </div>
          </div>
        </div>
        
        {/* Deals */}
        <div>
          <h3 className="font-medium mb-3">Deals & Discounts</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sale"
                checked={onSale}
                onChange={() => setOnSale(!onSale)}
                className="mr-2"
              />
              <label htmlFor="sale">On Sale</label>
            </div>
          </div>
        </div>
        
        {/* Filter actions */}
        <div className="space-y-2 pt-4">
          <Button 
            onClick={applyFilters}
            className="w-full"
          >
            Apply Filters
          </Button>
          
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="w-full"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}