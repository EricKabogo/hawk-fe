export interface Address {
    id: string;
    userId: string;
    isDefault: boolean;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    label?: 'home' | 'work' | 'other';
  }