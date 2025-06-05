'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import EnhancedSearchBar from '@/components/product/EnhancedSearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-[#0f766e]">
            Hawk Life Solutions
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="hover:text-[#0f766e] transition-colors">
              All Products
            </Link>
            <Link href="/products?category=electronics" className="hover:text-[#0f766e] transition-colors">
              Electronics
            </Link>
            <Link href="/products?category=clothing" className="hover:text-[#0f766e] transition-colors">
              Clothing
            </Link>
            <Link href="/products?category=home" className="hover:text-[#0f766e] transition-colors">
              Home
            </Link>
          </nav>

          {/* Search, Cart and Account */}
          <div className="hidden md:flex items-center space-x-6">
            <EnhancedSearchBar />
            
            <Link href="/cart" className="hover:text-[#0f766e] transition-colors relative">
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f97316] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            
            <Link href="/account" className="hover:text-[#0f766e] transition-colors">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <EnhancedSearchBar />
            
            <Link href="/cart" className="hover:text-[#0f766e] transition-colors relative">
              <ShoppingCart size={20} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f97316] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            
            <button 
              className="focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="hover:text-[#0f766e] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                href="/products?category=electronics" 
                className="hover:text-[#0f766e] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link 
                href="/products?category=clothing" 
                className="hover:text-[#0f766e] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link 
                href="/products?category=home" 
                className="hover:text-[#0f766e] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="flex space-x-6 pt-4 border-t">
                <Link 
                  href="/account" 
                  className="hover:text-[#0f766e] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Category Navigation Bar */}
      <div className="hidden lg:block bg-gray-100 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 py-2 text-sm">
            <li>
              <Link 
                href="/products?category=electronics" 
                className="hover:text-[#0f766e] transition-colors"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link 
                href="/products?category=clothing" 
                className="hover:text-[#0f766e] transition-colors"
              >
                Clothing
              </Link>
            </li>
            <li>
              <Link 
                href="/products?category=home" 
                className="hover:text-[#0f766e] transition-colors"
              >
                Home & Kitchen
              </Link>
            </li>
            <li>
              <Link 
                href="/products?category=accessories" 
                className="hover:text-[#0f766e] transition-colors"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link 
                href="/products?sale=true" 
                className="text-[#f97316] font-medium hover:underline"
              >
                Sale
              </Link>
            </li>
            <li>
              <Link 
                href="/products?sort=newest" 
                className="hover:text-[#0f766e] transition-colors"
              >
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;