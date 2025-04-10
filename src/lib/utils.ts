import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine class names with Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price with currency (Kenya Shillings)
export function formatPrice(price: number, currency = 'KES') {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
  }).format(price);
}

// Generate a unique ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Truncate text with ellipsis
export function truncateText(text: string, length: number) {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
}