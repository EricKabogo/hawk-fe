'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CheckoutFormData, CheckoutStep, CheckoutSummary, ShippingMethod } from '@/types/checkout';
import { CartItem } from '@/context/cart-context';

// Mock shipping methods
export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '3-5 business days',
    price: 599,
    estimatedDelivery: '3-5 business days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '1-2 business days',
    price: 1499,
    estimatedDelivery: '1-2 business days',
  },
];

interface CheckoutContextType {
  formData: CheckoutFormData;
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  currentStep: CheckoutStep;
  setCurrentStep: (step: CheckoutStep) => void;
  calculateSummary: (items: CartItem[]) => CheckoutSummary;
  placeOrder: () => Promise<string>;
}

const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'Kenya',
  phone: '',
  shippingMethod: 'standard',
  paymentMethod: 'credit_card',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  nameOnCard: '',
  mpesaPhone: '',
  sameAsShipping: true,
  billingFirstName: '',
  billingLastName: '',
  billingAddress: '',
  billingApartment: '',
  billingCity: '',
  billingState: '',
  billingZipCode: '',
  billingCountry: 'Kenya',
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');

  const updateFormData = (data: Partial<CheckoutFormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const calculateSummary = (items: CartItem[]): CheckoutSummary => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = formData.shippingMethod === 'standard' ? 599 : 1499;
    const tax = subtotal * 0.16; // 16% VAT
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  };

  const placeOrder = async (): Promise<string> => {
    // Simulate API call to place an order
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
        resolve(orderId);
      }, 1500);
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        calculateSummary,
        placeOrder,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}