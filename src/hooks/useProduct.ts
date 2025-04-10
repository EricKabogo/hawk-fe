'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

type ProductState = {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
};

export function useProduct(id: string) {
  const [state, setState] = useState<ProductState>({
    product: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setState(prevState => ({ ...prevState, isLoading: true, error: null }));
      
      try {
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        
        setState({
          product: data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          product: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error('An unknown error occurred'),
        });
      }
    };
    
    fetchProduct();
  }, [id]);

  return state;
}