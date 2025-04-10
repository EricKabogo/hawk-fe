'use client';

import { useCheckout, shippingMethods } from '@/context/checkout-context';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function CheckoutShipping() {
  const { formData, updateFormData, setCurrentStep } = useCheckout();

  const handleContinue = () => {
    setCurrentStep('payment');
  };

  const handleBack = () => {
    setCurrentStep('information');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
      
      <div className="space-y-4">
        {shippingMethods.map((method) => (
          <div 
            key={method.id}
            className={`border rounded-md p-4 flex items-start cursor-pointer transition-colors ${
              formData.shippingMethod === method.id 
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'hover:border-gray-400'
            }`}
            onClick={() => updateFormData({ shippingMethod: method.id as 'standard' | 'express' })}
          >
            <input
              type="radio"
              id={method.id}
              name="shippingMethod"
              value={method.id}
              checked={formData.shippingMethod === method.id}
              onChange={() => {}}
              className="mt-1"
            />
            <label htmlFor={method.id} className="ml-3 flex-grow cursor-pointer">
              <span className="block font-medium">{method.name}</span>
              <span className="block text-sm text-gray-500">
                {method.description} - {method.estimatedDelivery}
              </span>
            </label>
            <span className="font-medium">{formatPrice(method.price)}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-4 sm:space-y-0 sm:flex sm:justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back to Information
        </Button>
        <Button onClick={handleContinue}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}