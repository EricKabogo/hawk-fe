// src/components/product/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/context/toast-context';
import { Product } from '@/types/product';
import Button from '@/components/ui/Button';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

const AddToCartButton = ({ product, quantity = 1, className = '' }: AddToCartButtonProps) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    setIsLoading(true);
    
    // Simulate API call or processing delay
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.thumbnail,
      });
      
      setIsLoading(false);
      showToast(`${product.name} has been added to your cart.`, 'success');
    }, 500);
  };

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={handleAddToCart}
      disabled={!product.inStock || isLoading}
      isLoading={isLoading}
      className={className}
    >
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );
};

export default AddToCartButton;