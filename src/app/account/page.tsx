'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { User, Package, CreditCard, LogOut } from 'lucide-react';

type AccountTab = 'profile' | 'orders' | 'payment';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  };

  // Mock orders
  const orders = [
    {
      id: 'ORD-1234',
      date: '2023-06-15',
      total: 129.99,
      status: 'Delivered',
      items: 3,
    },
    {
      id: 'ORD-5678',
      date: '2023-05-29',
      total: 79.99,
      status: 'Processing',
      items: 1,
    },
    {
      id: 'ORD-9012',
      date: '2023-04-10',
      total: 249.99,
      status: 'Delivered',
      items: 2,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <nav className="space-y-1">
              <button 
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  activeTab === 'profile' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              <button 
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  activeTab === 'orders' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} className="mr-3" />
                Orders
              </button>
              <button 
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  activeTab === 'payment' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard size={18} className="mr-3" />
                Payment Methods
              </button>
              <button 
                className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                      defaultValue={user.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                      defaultValue={user.email}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    defaultValue={user.phone}
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
                  <Link href="/products">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 flex flex-wrap justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">Order</span>
                          <h3 className="font-medium">{order.id}</h3>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Date</span>
                          <p>{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Total</span>
                          <p className="font-medium">Ksh{order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Status</span>
                          <p className={`font-medium ${
                            order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
                          }`}>{order.status}</p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <Link href={`/account/orders/${order.id}`}>
                            <Button variant="outline" size="sm">View Details</Button>
                          </Link>
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-600">{order.items} item{order.items > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'payment' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
              
              <div className="mb-6">
                <div className="border rounded-lg p-4 mb-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md mr-4">
                      <CreditCard className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 1234</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
              
              <Button>Add Payment Method</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}