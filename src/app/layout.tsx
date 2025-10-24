import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import { ToastProvider } from '@/context/toast-context';
import RootLayout from '@/components/layout/RootLayout';
import PerformanceMonitor from '@/components/common/PerformanceMonitor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hawk Life Solutions',
  description: 'Your trusted destination for quality products',
  icons: {
    icon: [
      { url: '/images/logo.jpeg' },
      { url: '/images/logo.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/logo.jpeg', sizes: '16x16', type: 'image/jpeg' },
    ],
    shortcut: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <RootLayout>{children}</RootLayout>
              <PerformanceMonitor />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}