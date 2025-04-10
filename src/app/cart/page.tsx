'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  
  // If cart is empty, show empty state
  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Header row - only visible on desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b">
            <div className="col-span-6">
              <span className="font-medium">Product</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="font-medium">Price</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="font-medium">Quantity</span>
            </div>
            <div className="col-span-2 text-right">
              <span className="font-medium">Total</span>
            </div>
          </div>
          
          {/* Cart items */}
          <div className="divide-y">
            {cart.items.map((item) => (
              <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Product info */}
                <div className="col-span-1 md:col-span-6 flex">
                  {/* Product image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Image</span>
                    {/* When we have real images:
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    /> */}
                  </div>
                  
                  {/* Product name and remove button */}
                  <div>
                    <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                    <button
                      className="text-red-600 text-sm flex items-center"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                  <span className="md:hidden font-medium mr-2">Price:</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
                
                {/* Quantity */}
                <div className="col-span-1 md:col-span-2 flex items-center md:justify-center">
                  <span className="md:hidden font-medium mr-2">Quantity:</span>
                  <div className="flex border rounded-md">
                    <button 
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center border-x"
                      value={item.quantity}
                      min="1"
                      readOnly
                    />
                    <button 
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Total */}
                <div className="col-span-1 md:col-span-2 flex items-center md:justify-end">
                  <span className="md:hidden font-medium mr-2">Total:</span>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart actions */}
          <div className="flex flex-wrap justify-between items-center border-t pt-6 mt-6">
            <button
              className="text-red-600 flex items-center"
              onClick={clearCart}
            >
              <Trash2 size={16} className="mr-1" />
              Clear Cart
            </button>
            
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(cart.totalPrice)}</span>
                </div>
              </div>
            </div>
            
            <Link href="/checkout">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}