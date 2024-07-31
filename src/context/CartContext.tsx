"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems } from '@/actions/CartAction';
import { CartItem } from '@/types/ProductTypes'

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const refreshCart = async () => {
    const items = await getCartItems();
    setCartItems(items);
    setCartCount(items.reduce((count, item) => count + item.quantity, 0));
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};