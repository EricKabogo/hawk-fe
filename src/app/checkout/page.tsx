'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

// Define checkout steps
type CheckoutStep = 'information' | 'shipping' | 'payment';

export default function CheckoutPage() {
  const { cart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');
  
  // If cart is empty, redirect to cart page
  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">You need to add items to your cart before checking out.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      {/* Checkout progress */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className={`flex items-center ${currentStep === 'information' ? 'text-primary' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              currentStep === 'information' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <span className="font-medium">Information</span>
          </div>
          
          <div className="w-12 h-1 mx-2 bg-gray-200"></div>
          
          <div className={`flex items-center ${currentStep === 'shipping' ? 'text-primary' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              currentStep === 'shipping' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
            <span className="font-medium">Shipping</span>
          </div>
          
          <div className="w-12 h-1 mx-2 bg-gray-200"></div>
          
          <div className={`flex items-center ${currentStep === 'payment' ? 'text-primary' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              currentStep === 'payment' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              3
            </div>
            <span className="font-medium">Payment</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <div className="lg:col-span-2">
          {currentStep === 'information' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="apartment" className="block text-sm font-medium mb-1">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipcode" className="block text-sm font-medium mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Link href="/cart">
                  <Button variant="outline">Return to Cart</Button>
                </Link>
                <Button onClick={() => setCurrentStep('shipping')}>
                  Continue to Shipping
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 'shipping' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              
              <div className="space-y-4 mb-6">
                <div className="border rounded-md p-4 flex items-start">
                  <input
                    type="radio"
                    id="standard"
                    name="shipping"
                    className="mt-1"
                    defaultChecked
                  />
                  <label htmlFor="standard" className="ml-3 flex-grow">
                    <span className="block font-medium">Standard Shipping</span>
                    <span className="block text-sm text-gray-500">
                      3-5 business days
                    </span>
                  </label>
                  <span className="font-medium">Ksh599</span>
                </div>
                
                <div className="border rounded-md p-4 flex items-start">
                  <input
                    type="radio"
                    id="express"
                    name="shipping"
                    className="mt-1"
                  />
                  <label htmlFor="express" className="ml-3 flex-grow">
                    <span className="block font-medium">Express Shipping</span>
                    <span className="block text-sm text-gray-500">
                      1-2 business days
                    </span>
                  </label>
                  <span className="font-medium">Ksh1499</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep('information')}>
                  Back to Information
                </Button>
                <Button onClick={() => setCurrentStep('payment')}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 'payment' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="creditCard"
                      name="payment"
                      className="mr-3"
                      defaultChecked
                    />
                    <label htmlFor="creditCard" className="font-medium">
                      Credit Card
                    </label>
                  </div>
                  
                  <div className="space-y-4 pl-7">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    className="mr-3"
                  />
                  <label htmlFor="paypal" className="font-medium">
                    PayPal
                  </label>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-2">Billing Address</h3>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="sameAsShipping">
                    Same as shipping address
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep('shipping')}>
                  Back to Shipping
                </Button>
                <Button>
                  Complete Order
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="divide-y">
              {cart.items.map((item) => (
                <div key={item.id} className="py-3 flex">
                  <div className="relative w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 mr-4 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Image</span>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Ksh5.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(cart.totalPrice * 0.08)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(cart.totalPrice + 5.99 + (cart.totalPrice * 0.08))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}