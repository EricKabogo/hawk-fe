'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Home, Briefcase, MapPin, Check, Pencil, Trash } from 'lucide-react';
import { Address } from '@/types/address';
import { useToast } from '@/context/toast-context';
import Button from '@/components/ui/Button';
import AddressForm from '@/components/account/AddressForm';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('/api/addresses');
        if (!response.ok) {
          throw new Error('Failed to fetch addresses');
        }
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        showToast('Failed to load addresses', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [showToast]);

  const handleAddAddress = (newAddress: Address) => {
    setAddresses([...addresses, newAddress]);
    setShowAddForm(false);
    showToast('Address added successfully', 'success');
  };

  const handleUpdateAddress = (updatedAddress: Address) => {
    setAddresses(addresses.map(addr => 
      addr.id === updatedAddress.id ? updatedAddress : addr
    ));
    setEditingAddress(null);
    showToast('Address updated successfully', 'success');
  };

  const handleDeleteAddress = async (id: string) => {
    // In a real app, you would call an API to delete the address
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAddresses(addresses.filter(addr => addr.id !== id));
      showToast('Address deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete address', 'error');
    }
  };

  const handleSetDefault = async (id: string) => {
    // In a real app, you would call an API to update the default status
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAddresses(addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      })));
      showToast('Default address updated', 'success');
    } catch (error) {
      showToast('Failed to update default address', 'error');
    }
  };

  const getLabelIcon = (label?: 'home' | 'work' | 'other') => {
    switch (label) {
      case 'home':
        return <Home size={16} className="mr-1" />;
      case 'work':
        return <Briefcase size={16} className="mr-1" />;
      default:
        return <MapPin size={16} className="mr-1" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Addresses</h1>
        
        {!showAddForm && !editingAddress && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center"
          >
            <PlusCircle size={16} className="mr-2" />
            Add New Address
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f766e]"></div>
        </div>
      ) : (
        <div>
          {showAddForm && (
            <div className="mb-8 border rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
              <AddressForm 
                onSubmit={handleAddAddress} 
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
          
          {editingAddress && (
            <div className="mb-8 border rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
              <AddressForm 
                address={editingAddress}
                onSubmit={handleUpdateAddress} 
                onCancel={() => setEditingAddress(null)}
              />
            </div>
          )}
          
          {addresses.length === 0 && !showAddForm ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">No Addresses Yet</h2>
              <p className="text-gray-600 mb-6">Add your first shipping address to make checkout faster.</p>
              <Button onClick={() => setShowAddForm(true)}>
                Add New Address
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div 
                  key={address.id} 
                  className={`border rounded-lg overflow-hidden ${
                    address.isDefault ? 'border-[#0f766e] ring-1 ring-[#0f766e]' : ''
                  }`}
                >
                  <div className={`p-4 flex justify-between items-center ${
                    address.isDefault ? 'bg-[#0f766e] bg-opacity-5' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center">
                      {getLabelIcon(address.label)}
                      <span className="font-medium capitalize">
                        {address.label || 'Address'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingAddress(address)}
                        className="p-1 text-gray-500 hover:text-[#0f766e] transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete"
                        disabled={address.isDefault}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <p>
                        {address.firstName} {address.lastName}
                      </p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} {address.postalCode}</p>
                      <p>{address.country}</p>
                      <p>{address.phoneNumber}</p>
                    </div>
                    
                    {address.isDefault ? (
                      <div className="flex items-center text-[#0f766e]">
                        <Check size={16} className="mr-1" />
                        Default Address
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
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
      )}
    </div>
  );
}