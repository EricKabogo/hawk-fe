import { NextResponse } from 'next/server';
import { Address } from '@/types/address';

// Mock user addresses
const mockAddresses: Address[] = [
  {
    id: 'addr-1',
    userId: '1',
    isDefault: true,
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '123 Main Street',
    city: 'Nairobi',
    state: 'Nairobi County',
    postalCode: '00100',
    country: 'Kenya',
    phoneNumber: '+254712345678',
    label: 'home',
  },
  {
    id: 'addr-2',
    userId: '1',
    isDefault: false,
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '456 Work Avenue',
    addressLine2: 'Floor 5',
    city: 'Nairobi',
    state: 'Nairobi County',
    postalCode: '00200',
    country: 'Kenya',
    phoneNumber: '+254787654321',
    label: 'work',
  },
];

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return NextResponse.json(mockAddresses);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate required fields
  const requiredFields = ['firstName', 'lastName', 'addressLine1', 'city', 'state', 'postalCode', 'country', 'phoneNumber'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }
  
  // Create new address
  const newAddress: Address = {
    id: `addr-${Date.now()}`,
    userId: '1', // Hardcoded for now
    isDefault: body.isDefault || false,
    firstName: body.firstName,
    lastName: body.lastName,
    addressLine1: body.addressLine1,
    addressLine2: body.addressLine2,
    city: body.city,
    state: body.state,
    postalCode: body.postalCode,
    country: body.country,
    phoneNumber: body.phoneNumber,
    label: body.label,
  };
  
  // If this is set as default, update other addresses
  if (newAddress.isDefault) {
    for (const address of mockAddresses) {
      if (address.isDefault) {
        address.isDefault = false;
      }
    }
  }
  
  // Add to mock database
  mockAddresses.push(newAddress);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(newAddress);
}