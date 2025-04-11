import { NextResponse } from 'next/server';
import { mockProducts } from '@/mock/products';

export async function GET(request: Request) {
  // Get the URL and parse query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  
  // Get price range filters
  const priceMin = searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : null;
  const priceMax = searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : null;
  
  // Get availability filters
  const inStock = searchParams.get('inStock') === 'true';
  const onSale = searchParams.get('onSale') === 'true';
  
  // Filter products based on query parameters
  let filteredProducts = [...mockProducts];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by price range
  if (priceMin !== null) {
    filteredProducts = filteredProducts.filter(product => product.price >= priceMin);
  }
  
  if (priceMax !== null) {
    filteredProducts = filteredProducts.filter(product => product.price <= priceMax);
  }
  
  // Filter by availability
  if (inStock) {
    filteredProducts = filteredProducts.filter(product => product.inStock);
  }
  
  // Filter by sale status
  if (onSale) {
    filteredProducts = filteredProducts.filter(
      product => product.compareAtPrice && product.compareAtPrice > product.price
    );
  }
  
  // Sort products
  if (sort) {
    switch (sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(filteredProducts);
}