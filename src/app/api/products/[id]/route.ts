import { NextResponse } from 'next/server';
import { mockProducts } from '@/mock/products';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Await the params since they're now a Promise
  const { id } = await context.params;
  
  const product = mockProducts.find(p => p.id === id);
  
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