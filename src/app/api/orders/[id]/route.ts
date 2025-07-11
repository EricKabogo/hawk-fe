import { NextResponse } from 'next/server';
import { Order } from '@/types/order';

// Import the mock orders from the previous file
// This is just for illustration - in a real project, you'd have a better way to share this data
const mockOrders: Order[] = [
  {
    id: 'ORD-1234-ABCD',
    userId: '1',
    items: [
      {
        id: 'item-1',
        productId: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 9999,
        quantity: 1,
        image: '/images/headphones-1.jpg',
      },
      {
        id: 'item-2',
        productId: '3',
        name: 'Premium Leather Backpack',
        price: 7999,
        quantity: 1,
        image: '/images/backpack-1.jpg',
      },
    ],
    status: 'delivered',
    subtotal: 17998,
    shipping: 599,
    tax: 2880,
    total: 21477,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      country: 'Kenya',
      phone: '+254712345678',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      country: 'Kenya',
      phone: '+254712345678',
    },
    paymentMethod: 'mpesa',
    shippingInfo: {
      method: 'Standard Shipping',
      carrier: 'DHL',
      trackingNumber: 'DHL1234567890',
      estimatedDelivery: '2023-06-18',
      cost: 599,
    },
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T14:20:00Z',
  },
  {
    id: 'ORD-5678-EFGH',
    userId: '1',
    items: [
      {
        id: 'item-3',
        productId: '5',
        name: 'Ultra HD Smart TV - 55"',
        price: 49999,
        quantity: 1,
        image: '/images/tv-1.jpg',
      },
    ],
    status: 'shipped',
    subtotal: 49999,
    shipping: 1499,
    tax: 8000,
    total: 59498,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      country: 'Kenya',
      phone: '+254712345678',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      country: 'Kenya',
      phone: '+254712345678',
    },
    paymentMethod: 'credit_card',
    shippingInfo: {
      method: 'Express Shipping',
      carrier: 'FedEx',
      trackingNumber: 'FDX9876543210',
      estimatedDelivery: '2023-06-01',
      cost: 1499,
    },
    createdAt: '2023-05-29T08:15:00Z',
    updatedAt: '2023-05-30T11:45:00Z',
  },
  {
    id: 'ORD-9012-IJKL',
    userId: '1',
    items: [
      {
        id: 'item-4',
        productId: '2',
        name: 'Smart Fitness Watch',
        price: 14999,
        quantity: 1,
        image: '/images/watch-1.jpg',
      },
      {
        id: 'item-5',
        productId: '8',
        name: 'Premium Coffee Maker',
        price: 12999,
        quantity: 1,
        image: '/images/coffee-maker-1.jpg',
      },
    ],
    status: 'processing',
    subtotal: 27998,
    shipping: 599,
    tax: 4480,
    total: 33077,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      country: 'Kenya',
      phone: '+254712345678',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Nairobi',
      state: 'Nairobi County',
      zipCode: '00100',
      country: 'Kenya',
      phone: '+254712345678',
    },
    paymentMethod: 'mpesa',
    shippingInfo: {
      method: 'Standard Shipping',
      carrier: 'Kenya Post',
      estimatedDelivery: '2023-04-15',
      cost: 599,
    },
    createdAt: '2023-04-10T15:45:00Z',
    updatedAt: '2023-04-11T09:30:00Z',
  },
];

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Await the params since they're now a Promise
  const { id } = await context.params;
  
  // Find the order by ID
  const order = mockOrders.find(o => o.id === id);
  
  if (!order) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    );
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(order);
}