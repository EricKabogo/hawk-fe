'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Order } from '@/types/order';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/context/toast-context';
import Button from '@/components/ui/Button';
import { ArrowLeft, Truck, Package, Check, X, Clock } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/account/orders');
            showToast('Order not found', 'error');
            return;
          }
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
        showToast('Failed to load order details', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id, router, showToast]);

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: <Clock size={20} />, color: 'text-yellow-500' };
      case 'processing':
        return { icon: <Package size={20} />, color: 'text-blue-500' };
      case 'shipped':
        return { icon: <Truck size={20} />, color: 'text-purple-500' };
      case 'delivered':
        return { icon: <Check size={20} />, color: 'text-green-500' };
      case 'cancelled':
        return { icon: <X size={20} />, color: 'text-red-500' };
      default:
        return { icon: <Clock size={20} />, color: 'text-gray-500' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f766e]"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div>
        <div className="mb-6">
            <Link href="/account/orders" className="inline-flex items-center text-[#0f766e] hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Orders
            </Link>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
            <h1 className="text-2xl font-bold">Order {order.id}</h1>
            <p className="text-gray-500">Placed on {formatDate(order.createdAt)}</p>
            </div>
            
            <div className="flex items-center">
            <div className={`flex items-center ${statusInfo.color} mr-2`}>
                {statusInfo.icon}
            </div>
            <span className="font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
        </div>
        
        {/* Order Status Progress */}
        {order.status !== 'cancelled' && (
            <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <div className="text-center">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    ['pending', 'processing', 'shipped', 'delivered'].includes(order.status)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}>
                    {['pending', 'processing', 'shipped', 'delivered'].includes(order.status) ? (
                    <Check size={16} />
                    ) : (
                    '1'
                    )}
                </div>
                <p className="text-xs mt-1">Confirmed</p>
                </div>
                
                <div className={`flex-grow h-1 mx-2 ${
                ['processing', 'shipped', 'delivered'].includes(order.status)
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}></div>
                
                <div className="text-center">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    ['processing', 'shipped', 'delivered'].includes(order.status)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}>
                    {['processing', 'shipped', 'delivered'].includes(order.status) ? (
                    <Check size={16} />
                    ) : (
                    '2'
                    )}
                </div>
                <p className="text-xs mt-1">Processing</p>
                </div>
                
                <div className={`flex-grow h-1 mx-2 ${
                ['shipped', 'delivered'].includes(order.status)
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}></div>
                
                <div className="text-center">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    ['shipped', 'delivered'].includes(order.status)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}>
                    {['shipped', 'delivered'].includes(order.status) ? (
                    <Check size={16} />
                    ) : (
                    '3'
                    )}
                </div>
                <p className="text-xs mt-1">Shipped</p>
                </div>
                
                <div className={`flex-grow h-1 mx-2 ${
                order.status === 'delivered'
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}></div>
                
                <div className="text-center">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                    order.status === 'delivered'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}>
                    {order.status === 'delivered' ? (
                    <Check size={16} />
                    ) : (
                    '4'
                    )}
                </div>
                <p className="text-xs mt-1">Delivered</p>
                </div>
            </div>
            </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
            {/* Order Items */}
            <div className="border rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 p-4 border-b">
                <h2 className="font-semibold">Items</h2>
                </div>
                
                <div className="divide-y">
                {order.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-start">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 mr-4">
                        <span className="text-xs text-gray-500">Image</span>
                    </div>
                    
                    <div className="flex-grow">
                        <Link href={`/products/${item.productId}`} className="font-medium hover:text-[#0f766e]">
                        {item.name}
                        </Link>
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
            
            {/* Shipping and Tracking */}
            <div className="border rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 p-4 border-b">
                <h2 className="font-semibold">Shipping Information</h2>
                </div>
                
                <div className="p-4">
                <div className="mb-4">
                    <p className="font-medium mb-1">Shipping Method</p>
                    <p>{order.shippingInfo.method}</p>
                </div>
                
                {order.shippingInfo.carrier && (
                    <div className="mb-4">
                    <p className="font-medium mb-1">Carrier</p>
                    <p>{order.shippingInfo.carrier}</p>
                    </div>
                )}
                
                {order.shippingInfo.trackingNumber && (
                    <div className="mb-4">
                    <p className="font-medium mb-1">Tracking Number</p>
                    <p>{order.shippingInfo.trackingNumber}</p>
                    </div>
                )}
                
                {order.shippingInfo.estimatedDelivery && (
                    <div>
                    <p className="font-medium mb-1">Estimated Delivery</p>
                    <p>{formatDate(order.shippingInfo.estimatedDelivery)}</p>
                    </div>
                )}
                </div>
            </div>
            
            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                        <h2 className="font-semibold">Shipping Address</h2>
                    </div>
                
                    <div className="p-4">
                        <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                        <p>{order.shippingAddress.address}</p>
                        {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                        <p>{order.shippingAddress.country}</p>
                        <p>{order.shippingAddress.phone}</p>
                    </div>
                </div>

                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b">
                            <h2 className="font-semibold">Billing Address</h2>
                        </div>
                        
                        <div className="p-4">
                            <p>{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                            <p>{order.billingAddress.address}</p>
                            {order.billingAddress.apartment && <p>{order.billingAddress.apartment}</p>}
                            <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}</p>
                            <p>{order.billingAddress.country}</p>
                            <p>{order.billingAddress.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="border rounded-lg overflow-hidden sticky top-24">
                    <div className="bg-gray-50 p-4 border-b">
                        <h2 className="font-semibold">Order Summary</h2>
                    </div>
                        
                    <div className="p-4">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{formatPrice(order.shipping)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>{formatPrice(order.tax)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                                <span>Total</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                            <p className="font-medium mb-1">Payment Method</p>
                            <p>
                            {order.paymentMethod === 'credit_card' && 'Credit Card'}
                            {order.paymentMethod === 'mpesa' && 'M-Pesa'}
                            {order.paymentMethod === 'paypal' && 'PayPal'}
                            </p>
                        </div>
                        
                        {order.status === 'shipped' && order.shippingInfo.trackingNumber && (
                            <div className="mt-6">
                            <Button
                                onClick={() => window.open(`https://example.com/track?number=${order.shippingInfo.trackingNumber}`, '_blank')}
                                className="w-full"
                            >
                                Track Order
                            </Button>
                            </div>
                        )}
                        
                        {order.status === 'delivered' && (
                            <div className="mt-6">
                            <Button variant="outline" className="w-full">
                                Buy Again
                            </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
)}