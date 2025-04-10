'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { mockProducts } from '@/mock/products';
import { formatPrice } from '@/lib/utils';

const ProductSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof mockProducts>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      const filtered = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered.slice(0, 5)); // Limit to 5 results
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
        <input
          type="text"
          placeholder="Search products..."
          className="py-2 px-4 w-full rounded-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {searchTerm ? (
          <button 
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={() => {
              setSearchTerm('');
              setResults([]);
            }}
          >
            <X size={16} />
          </button>
        ) : (
          <div className="p-2 text-gray-500">
            <Search size={16} />
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchTerm.trim().length > 2 && (
        <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div>
              {results.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className="block p-3 hover:bg-gray-50 border-b last:border-0"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 mr-3 flex items-center justify-center">
                      <span className="text-xs text-gray-500">Image</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link 
                href={`/products?search=${encodeURIComponent(searchTerm)}`}
                className="block p-3 text-center text-primary hover:bg-gray-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                View all results
              </Link>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;