'use client';

import { useState } from 'react';
import { useCheckout } from '@/context/checkout-context';
import Button from '@/components/ui/Button';
import { CreditCard, Phone } from 'lucide-react';

export default function CheckoutPayment() {
  const { formData, updateFormData, setCurrentStep } = useCheckout();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiration date is required';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
      if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    } else if (formData.paymentMethod === 'mpesa') {
      if (!formData.mpesaPhone) newErrors.mpesaPhone = 'M-Pesa phone number is required';
    }
    
    // Validate billing address if not same as shipping
    if (!formData.sameAsShipping) {
      if (!formData.billingFirstName) newErrors.billingFirstName = 'First name is required';
      if (!formData.billingLastName) newErrors.billingLastName = 'Last name is required';
      if (!formData.billingAddress) newErrors.billingAddress = 'Address is required';
      if (!formData.billingCity) newErrors.billingCity = 'City is required';
      if (!formData.billingState) newErrors.billingState = 'County/State is required';
      if (!formData.billingZipCode) newErrors.billingZipCode = 'Postal/Zip code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setCurrentStep('review');
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleBack = () => {
    setCurrentStep('shipping');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>

        <div className="space-y-4">
          <div
            className={`border rounded-md p-4 cursor-pointer transition-colors ${
              formData.paymentMethod === 'credit_card'
                ? 'border-primary bg-primary bg-opacity-5'
                : 'hover:border-gray-400'
            }`}
            onClick={() => updateFormData({ paymentMethod: 'credit_card' })}
          >
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                checked={formData.paymentMethod === 'credit_card'}
                onChange={() => {}}
                className="mr-3"
              />
              <label htmlFor="creditCard" className="font-medium flex items-center cursor-pointer">
                <CreditCard size={18} className="mr-2" />
                Credit Card
              </label>
            </div>

            {formData.paymentMethod === 'credit_card' && (
              <div className="space-y-4 pl-7">
                <div data-error={!!errors.cardNumber}>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => updateFormData({ cardNumber: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div data-error={!!errors.cardExpiry}>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">
                      Expiration Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={(e) => updateFormData({ cardExpiry: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                  </div>

                  <div data-error={!!errors.cardCvv}>
                    <label htmlFor="cardCvv" className="block text-sm font-medium mb-1">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardCvv"
                      value={formData.cardCvv}
                      onChange={(e) => updateFormData({ cardCvv: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.cardCvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123"
                    />
                    {errors.cardCvv && <p className="mt-1 text-sm text-red-500">{errors.cardCvv}</p>}
                  </div>
                </div>

                <div data-error={!!errors.nameOnCard}>
                  <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">
                    Name on Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={(e) => updateFormData({ nameOnCard: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nameOnCard && <p className="mt-1 text-sm text-red-500">{errors.nameOnCard}</p>}
                </div>
              </div>
            )}
          </div>

          <div
            className={`border rounded-md p-4 cursor-pointer transition-colors ${
              formData.paymentMethod === 'mpesa'
                ? 'border-primary bg-primary bg-opacity-5'
                : 'hover:border-gray-400'
            }`}
            onClick={() => updateFormData({ paymentMethod: 'mpesa' })}
          >
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="mpesa"
                name="paymentMethod"
                checked={formData.paymentMethod === 'mpesa'}
                onChange={() => {}}
                className="mr-3"
              />
              <label htmlFor="mpesa" className="font-medium flex items-center cursor-pointer">
                <Phone size={18} className="mr-2" />
                M-Pesa
              </label>
            </div>

            {formData.paymentMethod === 'mpesa' && (
              <div className="space-y-4 pl-7">
                <div data-error={!!errors.mpesaPhone}>
                  <label htmlFor="mpesaPhone" className="block text-sm font-medium mb-1">
                    M-Pesa Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mpesaPhone"
                    value={formData.mpesaPhone}
                    onChange={(e) => updateFormData({ mpesaPhone: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.mpesaPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+254..."
                  />
                  {errors.mpesaPhone && <p className="mt-1 text-sm text-red-500">{errors.mpesaPhone}</p>}
                  <p className="mt-2 text-sm text-gray-500">
                    You will receive a prompt on your phone to complete the payment.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className={`border rounded-md p-4 cursor-pointer transition-colors ${
              formData.paymentMethod === 'paypal'
                ? 'border-primary bg-primary bg-opacity-5'
                : 'hover:border-gray-400'
            }`}
            onClick={() => updateFormData({ paymentMethod: 'paypal' })}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                checked={formData.paymentMethod === 'paypal'}
                onChange={() => {}}
                className="mr-3"
              />
              <label htmlFor="paypal" className="font-medium cursor-pointer">
                PayPal
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Billing Address</h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sameAsShipping"
            checked={formData.sameAsShipping}
            onChange={(e) => updateFormData({ sameAsShipping: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor="sameAsShipping" className="cursor-pointer">
            Same as shipping address
          </label>
        </div>

        {!formData.sameAsShipping && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div data-error={!!errors.billingFirstName}>
                <label htmlFor="billingFirstName" className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="billingFirstName"
                  value={formData.billingFirstName}
                  onChange={(e) => updateFormData({ billingFirstName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.billingFirstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.billingFirstName && <p className="mt-1 text-sm text-red-500">{errors.billingFirstName}</p>}
              </div>

              <div data-error={!!errors.billingLastName}>
                <label htmlFor="billingLastName" className="block text-sm font-medium mb-1">
                    Last Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="billingLastName"
                    value={formData.billingLastName}
                    onChange={(e) => updateFormData({ billingLastName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.billingLastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.billingLastName && <p className="mt-1 text-sm text-red-500">{errors.billingLastName}</p>}
                </div>
                </div>

                <div data-error={!!errors.billingAddress}>
                <label htmlFor="billingAddress" className="block text-sm font-medium mb-1">
                    Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="billingAddress"
                    value={formData.billingAddress}
                    onChange={(e) => updateFormData({ billingAddress: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.billingAddress && <p className="mt-1 text-sm text-red-500">{errors.billingAddress}</p>}
                </div>

                <div>
                <label htmlFor="billingApartment" className="block text-sm font-medium mb-1">
                    Apartment, suite, etc. (optional)
                </label>
                <input
                    type="text"
                    id="billingApartment"
                    value={formData.billingApartment}
                    onChange={(e) => updateFormData({ billingApartment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div data-error={!!errors.billingCity}>
                        <label htmlFor="billingCity" className="block text-sm font-medium mb-1">
                        City <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        id="billingCity"
                        value={formData.billingCity}
                        onChange={(e) => updateFormData({ billingCity: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.billingCity ? 'border-red-500' : 'border-gray-300'
                        }`}
                        />
                        {errors.billingCity && <p className="mt-1 text-sm text-red-500">{errors.billingCity}</p>}
                    </div>

                    <div data-error={!!errors.billingState}>
                        <label htmlFor="billingState" className="block text-sm font-medium mb-1">
                        County/State <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        id="billingState"
                        value={formData.billingState}
                        onChange={(e) => updateFormData({ billingState: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.billingState ? 'border-red-500' : 'border-gray-300'
                        }`}
                        />
                        {errors.billingState && <p className="mt-1 text-sm text-red-500">{errors.billingState}</p>}
                    </div>

                    <div data-error={!!errors.billingZipCode}>
                        <label htmlFor="billingZipCode" className="block text-sm font-medium mb-1">
                        Postal/Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        id="billingZipCode"
                        value={formData.billingZipCode}
                        onChange={(e) => updateFormData({ billingZipCode: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.billingZipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        />
                        {errors.billingZipCode && <p className="mt-1 text-sm text-red-500">{errors.billingZipCode}</p>}
                    </div>
                </div>
            </div>
        )}
       </div>

        <div className="pt-4 space-y-4 sm:space-y-0 sm:flex sm:justify-between">
            <Button type="button" variant="outline" onClick={handleBack}>
                Back to Shipping
            </Button>
            <Button type="submit">
                Review Order
            </Button>
        </div>
    </form>
  );
}