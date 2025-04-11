export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface OrderAddress {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  }
  
  export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  export interface ShippingInfo {
    method: string;
    carrier?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    cost: number;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: OrderStatus;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
    paymentMethod: string;
    shippingInfo: ShippingInfo;
    createdAt: string;
    updatedAt: string;
  }