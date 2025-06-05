'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { useCheckout, shippingMethods } from '@/context/checkout-context';
import { useToast } from '@/context/toast-context';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function CheckoutReview() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { formData, setCurrentStep, calculateSummary, placeOrder } = useCheckout();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const summary = calculateSummary(cart.items);
  const selectedShippingMethod = shippingMethods.find(
    method => method.id === formData.shippingMethod
  );

  const handleBack = () => {
    setCurrentStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    
    try {
      const orderId = await placeOrder();
      
      // Clear the cart
      clearCart();
      
      // Show success toast
      showToast('Order placed successfully!', 'success');
      
      // Redirect to order confirmation page
      router.push(`/order/confirmation?id=${orderId}`);
    } catch (error) {
      showToast('Failed to place order. Please try again.', 'error');
      console.error('Failed to place order:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
      
      {/* Order Items */}
      <div className="border rounded-md overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-medium">Order Items ({cart.items.length})</h3>
        </div>
        
        <div className="divide-y">
          {cart.items.map((item) => (
            <div key={item.id} className="p-4 flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 mr-4 flex items-center justify-center">
                <span className="text-xs text-gray-500">Image</span>
              </div>
              
              <div className="flex-grow">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              
              <div className="text-right">
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact and Shipping */}
        <div className="space-y-6">
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Contact Information</h3>
              <button 
                className="text-sm text-primary hover:underline"
                onClick={() => setCurrentStep('information')}
              >
                Edit
              </button>
            </div>
            <div className="p-4">
              <p>{formData.email}</p>
              <p>{formData.phone}</p>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Shipping Address</h3>
              <button 
                className="text-sm text-primary hover:underline"
                onClick={() => setCurrentStep('information')}
              >
                Edit
              </button>
            </div>
            <div className="p-4">
              <p>{formData.firstName} {formData.lastName}</p>
              <p>{formData.address}{formData.apartment ? `, ${formData.apartment}` : ''}</p>
              <p>{formData.city}, {formData.state} {formData.zipCode}</p>
              <p>{formData.country}</p>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Shipping Method</h3>
              <button 
                className="text-sm text-primary hover:underline"
                onClick={() => setCurrentStep('shipping')}
              >
                Edit
              </button>
            </div>
            <div className="p-4">
              <p>{selectedShippingMethod?.name} - {formatPrice(selectedShippingMethod?.price || 0)}</p>
              <p className="text-sm text-gray-500">{selectedShippingMethod?.estimatedDelivery}</p>
            </div>
          </div>
        </div>
        
        {/* Payment and Billing */}
        <div className="space-y-6">
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Payment Method</h3>
              <button 
                className="text-sm text-primary hover:underline"
                onClick={() => setCurrentStep('payment')}
              >
                Edit
              </button>
            </div>
            <div className="p-4">
              {formData.paymentMethod === 'credit_card' && (
                <div>
                  <p>Credit Card</p>
                  <p className="text-sm text-gray-500">
                    **** **** **** {formData.cardNumber?.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires: {formData.cardExpiry}
                  </p>
                </div>
              )}
              
              {formData.paymentMethod === 'mpesa' && (
                <div>
                  <p>M-Pesa</p>
                  <p className="text-sm text-gray-500">{formData.mpesaPhone}</p>
                </div>
              )}
              
              {formData.paymentMethod === 'paypal' && (
                <div>
                  <p>PayPal</p>
                  <p className="text-sm text-gray-500">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {!formData.sameAsShipping && (
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <h3 className="font-medium">Billing Address</h3>
                <button 
                  className="text-sm text-primary hover:underline"
                  onClick={() => setCurrentStep('payment')}
                >
                  Edit
                </button>
              </div>
              <div className="p-4">
                <p>{formData.billingFirstName} {formData.billingLastName}</p>
                <p>{formData.billingAddress}{formData.billingApartment ? `, ${formData.billingApartment}` : ''}</p>
                <p>{formData.billingCity}, {formData.billingState} {formData.billingZipCode}</p>
                <p>{formData.billingCountry}</p>
              </div>
            </div>
          )}
          
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-medium">Order Summary</h3>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{formatPrice(summary.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (16% VAT)</span>
                <span>{formatPrice(summary.tax)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(summary.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 space-y-4 sm:space-y-0 sm:flex sm:justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back to Payment
        </Button>
        <Button 
          onClick={handlePlaceOrder}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}