'use client'
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import ProductSearch from '@/components/product/ProductSearch';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-primary">
            Hawk Life Solutions
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="hover:text-primary transition-colors">
              All Products
            </Link>
            <Link href="/products/category/electronics" className="hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link href="/products/category/clothing" className="hover:text-primary transition-colors">
              Clothing
            </Link>
            <Link href="/products/category/home" className="hover:text-primary transition-colors">
              Home
            </Link>
          </nav>

          {/* Search, Cart and Account */}
          <div className="hidden md:flex items-center space-x-6">
            <ProductSearch />
            <Link href="/cart" className="hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link href="/account" className="hover:text-primary transition-colors">
              <User size={20} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="hover:text-primary transition-colors">
                All Products
              </Link>
              <Link href="/products/category/electronics" className="hover:text-primary transition-colors">
                Electronics
              </Link>
              <Link href="/products/category/clothing" className="hover:text-primary transition-colors">
                Clothing
              </Link>
              <Link href="/products/category/home" className="hover:text-primary transition-colors">
                Home
              </Link>
              <div className="flex space-x-6 pt-4 border-t">
                <Link href="/cart" className="hover:text-primary transition-colors relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
                <Link href="/account" className="hover:text-primary transition-colors">
                  <User size={20} />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;