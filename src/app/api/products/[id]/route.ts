import { NextResponse } from 'next/server';
import { mockProducts } from '@/mock/products';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = mockProducts.find(p => p.id === params.id);
  
  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json(product);
}