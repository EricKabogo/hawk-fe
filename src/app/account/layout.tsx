'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, CreditCard, MapPin, Settings, LogOut } from 'lucide-react';

interface AccountLayoutProps {
  children: ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <nav className="space-y-1">
              <Link
                href="/account"
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  isActive('/account') && pathname !== '/account/orders' && 
                  pathname !== '/account/addresses' && pathname !== '/account/payment'
                    ? 'bg-[#0f766e] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </Link>
              <Link
                href="/account/orders"
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  isActive('/account/orders')
                    ? 'bg-[#0f766e] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Package size={18} className="mr-3" />
                Orders
              </Link>
              <Link
                href="/account/addresses"
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  isActive('/account/addresses')
                    ? 'bg-[#0f766e] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin size={18} className="mr-3" />
                Addresses
              </Link>
              <Link
                href="/account/payment"
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  isActive('/account/payment')
                    ? 'bg-[#0f766e] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                Payment Methods
              </Link>
              <Link
                href="/account/settings"
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  isActive('/account/settings')
                    ? 'bg-[#0f766e] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings size={18} className="mr-3" />
                    Settings
              </Link>
                <button 
                   className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                <LogOut size={18} className="mr-3" />
                    Logout
                </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
            {children}
        </div>
      </div>
    </div>
  );
}