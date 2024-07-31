"use server"

import fs from 'fs';
import path from 'path';
import { CartItem } from '@/types/ProductTypes';

const cartFilePath = path.join(process.cwd(), 'src/data/cart.json');

export const getCartItems = async (): Promise<CartItem[]> => {
  const data = fs.readFileSync(cartFilePath, 'utf-8');
  return JSON.parse(data) as CartItem[];
};

export const saveCartItems = async (cartItems: CartItem[]): Promise<void> => {
  fs.writeFileSync(cartFilePath, JSON.stringify(cartItems, null, 2), 'utf-8');
};

export const addToCart = async (id: number): Promise<CartItem[]> => {
  const cartItems = await getCartItems();
  const itemIndex = cartItems.findIndex((item: CartItem) => item.id === id);
  if (itemIndex === -1) {
    cartItems.push({ id, quantity: 1 });
  } else {
    cartItems[itemIndex].quantity += 1;
  }
  await saveCartItems(cartItems);
  return cartItems;
};

export const removeFromCart = async (id: number): Promise<CartItem[]> => {
  let cartItems = await getCartItems();
  cartItems = cartItems.filter((item: CartItem) => item.id !== id);
  await saveCartItems(cartItems);
  return cartItems;
};

export const updateCartItem = async (id: number, quantity: number): Promise<CartItem[]> => {
  const cartItems = await getCartItems();
  const itemIndex = cartItems.findIndex((item: CartItem) => item.id === id);
  if (itemIndex !== -1) {
    if (quantity === 0) {
      cartItems.splice(itemIndex, 1);
    } else {
      cartItems[itemIndex].quantity = quantity;
    }
  }
  await saveCartItems(cartItems);
  return cartItems;
};

export const deleteCart = async (): Promise<CartItem[]> => {
  const cartItems: CartItem[] = [];
  await saveCartItems(cartItems);
  return cartItems;
};
