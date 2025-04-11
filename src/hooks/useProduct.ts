'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

type FetchProductsParams = {
  search?: string;
  category?: string;
  sort?: 'newest' | 'price-low' | 'price-high' | 'name';
  priceMin?: number | null;
  priceMax?: number | null;
  inStock?: boolean;
  onSale?: boolean;
};

export function useProducts(initialParams?: FetchProductsParams) {
  const [state, setState] = useState<ProductsState>({
    products: [],
    isLoading: true,
    error: null,
  });
  const [params, setParams] = useState<FetchProductsParams>(initialParams || {});

  useEffect(() => {
    const fetchProducts = async () => {
      setState(prevState => ({ ...prevState, isLoading: true, error: null }));
      
      try {
        // Build query string
        const queryParams = new URLSearchParams();
        if (params.search) queryParams.set('search', params.search);
        if (params.category) queryParams.set('category', params.category);
        if (params.sort) queryParams.set('sort', params.sort);
        if (params.priceMin !== undefined && params.priceMin !== null) {
          queryParams.set('priceMin', params.priceMin.toString());
        }
        if (params.priceMax !== undefined && params.priceMax !== null) {
          queryParams.set('priceMax', params.priceMax.toString());
        }
        if (params.inStock) queryParams.set('inStock', 'true');
        if (params.onSale) queryParams.set('onSale', 'true');
        
        const url = `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        setState({
          products: data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          products: [],
          isLoading: false,
          error: error instanceof Error ? error : new Error('An unknown error occurred'),
        });
      }
    };
    
    fetchProducts();
  }, [params]);

  return {
    ...state,
    setParams,
  };
}