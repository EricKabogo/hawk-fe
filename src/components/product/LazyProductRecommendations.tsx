// src/components/product/LazyProductRecommendations.tsx
'use client';

import { lazy, Suspense } from 'react';
import ProductGridSkeleton from './ProductGridSkeleton';

// Lazy load the ProductRecommendations component
const ProductRecommendations = lazy(() => import('./ProductRecommendations'));

interface LazyProductRecommendationsProps {
  title: string;
  type: 'featured' | 'related' | 'bestsellers' | 'recently-viewed' | 'sale';
  currentProductId?: string;
  category?: string;
  limit?: number;
}

export default function LazyProductRecommendations(props: LazyProductRecommendationsProps) {
  return (
    <Suspense fallback={<ProductGridSkeleton count={props.limit || 4} />}>
      <ProductRecommendations {...props} />
    </Suspense>
  );
}