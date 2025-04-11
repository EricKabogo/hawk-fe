// src/app/account/payment/page.tsx
'use client';

import { useState } from 'react';
import { PlusCircle, CreditCard, Smartphone, Trash, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

// Mock payment methods for demo
const mockPaymentMethods = [
  {
    id: 'pm-1',
    type: 'credit_card',
    isDefault: true,
    cardBrand: 'Visa',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '25',
    cardholderName: 'John Doe',
  },
  {
    id: 'pm-2',
    type: 'mpesa',
    isDefault: false,
    phoneNumber: '+254712345678',
    name: 'John Doe',
  }
];

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'credit_card' | 'mpesa'>('credit_card');
  
  // Mock form state - in a real app you'd use proper form state and validation
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    isDefault: false,
  });
  
  const [mpesaForm, setMpesaForm] = useState({
    phoneNumber: '',
    name: '',
    isDefault: false,
  });
  
  const handleDeleteMethod = (id: string) => {
    // In a real app, you would call an API to delete the payment method
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };
  
  const handleSetDefault = (id: string) => {
    // In a real app, you would call an API to update the default status
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
  };
  
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate and save the card via a payment processor API
    
    // Mock adding a new card
    const newCard = {
      id: `pm-${Date.now()}`,
      type: 'credit_card' as const,
      isDefault: cardForm.isDefault,
      cardBrand: 'Visa', // This would come from the payment processor
      last4: cardForm.cardNumber.slice(-4),
      expiryMonth: cardForm.expiryDate.split('/')[0],
      expiryYear: cardForm.expiryDate.split('/')[1],
      cardholderName: cardForm.cardholderName,
    };
    
    // If this is set as default, update other methods
    if (newCard.isDefault) {
      setPaymentMethods(paymentMethods.map(method => ({
        ...method,
        isDefault: false,
      })));
    }
    
    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddForm(false);
    setCardForm({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      isDefault: false,
    });
  };
  
  const handleMpesaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate and save the M-Pesa details via an API
    
    // Mock adding a new M-Pesa payment method
    const newMpesa = {
      id: `pm-${Date.now()}`,
      type: 'mpesa' as const,
      isDefault: mpesaForm.isDefault,
      phoneNumber: mpesaForm.phoneNumber,
      name: mpesaForm.name,
    };
    
    // If this is set as default, update other methods
    if (newMpesa.isDefault) {
      setPaymentMethods(paymentMethods.map(method => ({
        ...method,
        isDefault: false,
      })));
    }
    
    setPaymentMethods([...paymentMethods, newMpesa]);
    setShowAddForm(false);
    setMpesaForm({
      phoneNumber: '',
      name: '',
      isDefault: false,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center"
          >
            <PlusCircle size={16} className="mr-2" />
            Add Payment Method
          </Button>
        )}
      </div>
      
      {showAddForm && (
        <div className="mb-8 border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Add Payment Method</h2>
          
          <div className="mb-6">
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setFormType('credit_card')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  formType === 'credit_card' 
                    ? 'bg-[#0f766e] text-white' 
                    : 'bg-white border'
                }`}
              >
                <CreditCard size={16} className="mr-2" />
                Credit Card
              </button>
              
              <button
                type="button"
                onClick={() => setFormType('mpesa')}
                className={`flex items-center px-4 py-2 rounded-md ${
                  formType === 'mpesa' 
                    ? 'bg-[#0f766e] text-white' 
                    : 'bg-white border'
                }`}
              >
                <Smartphone size={16} className="mr-2" />
                M-Pesa
              </button>
            </div>
            
            {formType === 'credit_card' && (
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardForm.cardNumber}
                    onChange={(e) => setCardForm({...cardForm, cardNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={cardForm.expiryDate}
                      onChange={(e) => setCardForm({...cardForm, expiryDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({...cardForm, cvv: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cardholderName" className="block text-sm font-medium mb-1">
                    Cardholder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={cardForm.cardholderName}
                    onChange={(e) => setCardForm({...cardForm, cardholderName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefaultCard"
                    checked={cardForm.isDefault}
                    onChange={(e) => setCardForm({...cardForm, isDefault: e.target.checked})}
                    className="h-4 w-4 text-[#0f766e] focus:ring-[#0f766e]"
                  />
                  <label htmlFor="isDefaultCard" className="ml-2 text-sm">
                    Set as default payment method
                  </label>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <Button type="submit">
                    Add Card
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
            
            {formType === 'mpesa' && (
              <form onSubmit={handleMpesaSubmit} className="space-y-4">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                    M-Pesa Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={mpesaForm.phoneNumber}
                    onChange={(e) => setMpesaForm({...mpesaForm, phoneNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                    placeholder="+254..."
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mpesaName" className="block text-sm font-medium mb-1">
                    Registered Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mpesaName"
                    value={mpesaForm.name}
                    onChange={(e) => setMpesaForm({...mpesaForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f766e]"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefaultMpesa"
                    checked={mpesaForm.isDefault}
                    onChange={(e) => setMpesaForm({...mpesaForm, isDefault: e.target.checked})}
                    className="h-4 w-4 text-[#0f766e] focus:ring-[#0f766e]"
                  />
                  <label htmlFor="isDefaultMpesa" className="ml-2 text-sm">
                    Set as default payment method
                  </label>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <Button type="submit">
                    Add M-Pesa
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      
      {paymentMethods.length === 0 && !showAddForm ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">No Payment Methods</h2>
          <p className="text-gray-600 mb-6">Add a payment method to make checkout faster.</p>
          <Button onClick={() => setShowAddForm(true)}>
            Add Payment Method
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id} 
              className={`border rounded-lg overflow-hidden ${
                method.isDefault ? 'border-[#0f766e] ring-1 ring-[#0f766e]' : ''
              }`}
            >
              <div className={`p-4 flex justify-between items-center ${
                method.isDefault ? 'bg-[#0f766e] bg-opacity-5' : 'bg-gray-50'
              }`}>
                <div className="flex items-center">
                  {method.type === 'credit_card' ? (
                    <CreditCard size={18} className="mr-2" />
                  ) : (
                    <Smartphone size={18} className="mr-2" />
                  )}
                  <span className="font-medium">
                    {method.type === 'credit_card' ? 'Credit Card' : 'M-Pesa'}
                  </span>
                </div>
                
                {!method.isDefault && (
                  <button 
                    onClick={() => handleDeleteMethod(method.id)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>
              
              <div className="p-4">
                {method.type === 'credit_card' && (
                  <div>
                    <p className="font-medium">
                      {method.cardBrand} •••• {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                    <p className="text-sm text-gray-500">
                      {method.cardholderName}
                    </p>
                  </div>
                )}
                
                {method.type === 'mpesa' && (
                  <div>
                    <p className="font-medium">{method.phoneNumber}</p>
                    <p className="text-sm text-gray-500">{method.name}</p>
                  </div>
                )}
                
                {method.isDefault ? (
                  <div className="flex items-center text-[#0f766e] mt-2">
                    <Check size={16} className="mr-1" />
                    Default Payment Method
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                    className="mt-2"
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}