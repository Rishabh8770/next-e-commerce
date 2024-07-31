'use client';

import { useEffect, useState } from 'react';
import { addToCart, removeFromCart, updateCartItem, getCartItems } from '@/actions/CartAction';
import { useCartContext } from '@/context/CartContext';
import { CartItem } from '@/types/ProductTypes';

interface AddToCartProps {
  productId: number;
}

const AddToCart = ({ productId }: AddToCartProps) => {
  const { refreshCart } = useCartContext();
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems: CartItem[] = await getCartItems();
      const cartItem = cartItems.find((item: CartItem) => item.id === productId);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    };

    fetchCartItems();
  }, [productId]);

  const handleAddToCart = async () => {
    await addToCart(productId);
    setQuantity((prevQuantity) => prevQuantity + 1);
    refreshCart();
  };

  const handleIncrement = async () => {
    await updateCartItem(productId, quantity + 1);
    setQuantity((prevQuantity) => prevQuantity + 1);
    refreshCart();
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      await updateCartItem(productId, quantity - 1);
      setQuantity((prevQuantity) => prevQuantity - 1);
      refreshCart();
    } else {
      await removeFromCart(productId);
      setQuantity(0);
      refreshCart();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {quantity === 0 ? (
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;