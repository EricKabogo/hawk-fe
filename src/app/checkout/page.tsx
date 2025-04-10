'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { CheckoutProvider, useCheckout } from '@/context/checkout-context';
import { formatPrice } from '@/lib/utils';
import CheckoutInformation from '@/components/checkout/CheckoutInformation';
import CheckoutShipping from '@/components/checkout/CheckoutShipping';
import CheckoutPayment from '@/components/checkout/CheckoutPayment';
import CheckoutReview from '@/components/checkout/CheckoutReview';

function CheckoutContent() {
  const { cart } = useCart();
  const { currentStep, calculateSummary } = useCheckout();
  const summary = calculateSummary(cart.items);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      {/* Checkout progress */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className={`flex items-center ${
            currentStep === 'information' ? 'text-primary' : 
            ['shipping', 'payment', 'review'].includes(currentStep) ? 'text-green-600' : 'text-gray-500'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              currentStep === 'information' ? 'bg-primary text-white' : 
              ['shipping', 'payment', 'review'].includes(currentStep) ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}>
              {['shipping', 'payment', 'review'].includes(currentStep) ? '✓' : '1'}
            </div>
            <span className="font-medium">Information</span>
          </div>
          
          <div className={`w-12 h-1 mx-2 ${
            ['shipping', 'payment', 'review'].includes(currentStep) ? 'bg-green-600' : 'bg-gray-200'
          }`}></div>
          
          <div className={`flex items-center ${
            currentStep === 'shipping' ? 'text-primary' : 
            ['payment', 'review'].includes(currentStep) ? 'text-green-600' : 'text-gray-500'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              currentStep === 'shipping' ? 'bg-primary text-white' : 
              ['payment', 'review'].includes(currentStep) ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}>
              {['payment', 'review'].includes(currentStep) ? '✓' : '2'}
            </div>
            <span className="font-medium">Shipping</span>
          </div>
          
          <div className={`w-12 h-1 mx-2 ${
            ['payment', 'review'].includes(currentStep) ? 'bg-green-600' : 'bg-gray-200'
          }`}></div>
          
          <div className={`flex items-center ${
            currentStep === 'payment' ? 'text-primary' : 
            currentStep === 'review' ? 'text-green-600' : 'text-gray-500'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              currentStep === 'payment' ? 'bg-primary text-white' : 
              currentStep === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}>
              {currentStep === 'review' ? '✓' : '3'}
            </div>
            <span className="font-medium">Payment</span>
          </div>
          
          <div className={`w-12 h-1 mx-2 ${currentStep === 'review' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          
          <div className={`flex items-center ${currentStep === 'review' ? 'text-primary' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              currentStep === 'review' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              4
            </div>
            <span className="font-medium">Review</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <div className="lg:col-span-2">
          {currentStep === 'information' && <CheckoutInformation />}
          {currentStep === 'shipping' && <CheckoutShipping />}
          {currentStep === 'payment' && <CheckoutPayment />}
          {currentStep === 'review' && <CheckoutReview />}
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
                <span>{formatPrice(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(summary.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (16% VAT)</span>
                <span>{formatPrice(summary.tax)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(summary.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  
  // If cart is empty, redirect to cart page
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart.items.length, router]);
  
  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">You need to add items to your cart before checking out.</p>
        <Link href="/products">
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
            Browse Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}