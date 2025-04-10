export interface CheckoutFormData {
    // Customer Information
    email: string;
    
    // Shipping Address
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    
    // Shipping Method
    shippingMethod: 'standard' | 'express';
    
    // Payment Information
    paymentMethod: 'credit_card' | 'paypal' | 'mpesa';
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
    nameOnCard?: string;
    mpesaPhone?: string;
    
    // Billing Address
    sameAsShipping: boolean;
    billingFirstName?: string;
    billingLastName?: string;
    billingAddress?: string;
    billingApartment?: string;
    billingCity?: string;
    billingState?: string;
    billingZipCode?: string;
    billingCountry?: string;
  }
  
  export interface ShippingMethod {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDelivery: string;
  }
  
  export interface CheckoutSummary {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }
  
  export type CheckoutStep = 'information' | 'shipping' | 'payment' | 'review';