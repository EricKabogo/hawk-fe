// src/context/cart-context.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './cart-context';

// Mock component to test the cart context
const TestComponent = () => {
  const { cart, addItem, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <div data-testid="cart-total-items">{cart.totalItems}</div>
      <div data-testid="cart-total-price">{cart.totalPrice}</div>
      <button 
        data-testid="add-item" 
        onClick={() => addItem({ id: '1', name: 'Test Product', price: 100, quantity: 1, image: '/test.jpg' })}>
        Add Item
      </button>
      <button data-testid="remove-item" onClick={() => removeItem('1')}>Remove Item</button>
      <button data-testid="update-quantity" onClick={() => updateQuantity('1', 3)}>Update Quantity</button>
      <button data-testid="clear-cart" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  test('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Initial state
    expect(screen.getByTestId('cart-total-items').textContent).toBe('0');
    expect(screen.getByTestId('cart-total-price').textContent).toBe('0');

    // Add item
    fireEvent.click(screen.getByTestId('add-item'));
    expect(screen.getByTestId('cart-total-items').textContent).toBe('1');
    expect(screen.getByTestId('cart-total-price').textContent).toBe('100');
  });

  test('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add item then remove it
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('remove-item'));
    expect(screen.getByTestId('cart-total-items').textContent).toBe('0');
    expect(screen.getByTestId('cart-total-price').textContent).toBe('0');
  });

  test('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add item then update quantity
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('update-quantity'));
    expect(screen.getByTestId('cart-total-items').textContent).toBe('3');
    expect(screen.getByTestId('cart-total-price').textContent).toBe('300');
  });

  test('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add item then clear cart
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('clear-cart'));
    expect(screen.getByTestId('cart-total-items').textContent).toBe('0');
    expect(screen.getByTestId('cart-total-price').textContent).toBe('0');
  });
});