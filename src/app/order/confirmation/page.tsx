'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

// Separate component that uses useSearchParams
function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');
  
  // If no order ID is provided, redirect to home
  useEffect(() => {
    if (!orderId) {
      router.push('/');
    }
  }, [orderId, router]);
  
  if (!orderId) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-6 flex justify-center">
        <div className="bg-green-100 p-4 rounded-full">
          <CheckCircle size={64} className="text-green-600" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-xl mb-2">Your order has been received.</p>
      <p className="text-gray-600 mb-8">Order Number: <span className="font-medium">{orderId}</span></p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-medium mb-4">What Happens Next?</h2>
        <div className="space-y-4 text-left">
          <div className="flex">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Order Confirmation</h3>
              <p className="text-gray-600">
                We&apos;ve sent a confirmation email to your inbox with all your order details.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Order Processing</h3>
              <p className="text-gray-600">
                We&apos;re preparing your order for shipment. This usually takes 1-2 business days.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Shipping</h3>
              <p className="text-gray-600">
                Once your order ships, we&apos;ll send you a tracking number via email so you can follow its journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <Link href="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
        <Link href="/account/orders">
          <Button>View My Orders</Button>
        </Link>
      </div>
    </div>
  );
}

// Loading fallback component
function OrderConfirmationLoading() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="animate-pulse">
        <div className="mb-6 flex justify-center">
          <div className="bg-gray-200 p-4 rounded-full">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0 mt-0.5"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}