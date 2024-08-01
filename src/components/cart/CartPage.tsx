"use client";

import {
  removeFromCart,
  updateCartItem,
  deleteCart,
} from "@/actions/CartAction";
import { useCartContext } from "@/context/CartContext";
import { useProductContext } from "@/context/ProductContext";
import { convertUsdToCurrency } from "@/utils/CurrencyFormatter";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const { cartItems, refreshCart } = useCartContext();
  const { products } = useProductContext();

  const handleIncrement = async (productId: number, quantity: number) => {
    await updateCartItem(productId, quantity + 1);
    refreshCart();
  };

  const handleDecrement = async (productId: number, quantity: number) => {
    if (quantity > 1) {
      await updateCartItem(productId, quantity - 1);
      refreshCart();
    } else {
      await removeFromCart(productId);
      refreshCart();
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    await removeFromCart(productId);
    refreshCart();
  };

  const handleClearCart = async () => {
    await deleteCart();
    refreshCart();
  };

  return (
    <div className="w-2/3">
      <div className="flex space-x-8">
        <div className="w-5/6 bg-white p-6 rounded-lg shadow-lg">
          {cartItems.length === 0 ? (
            <p className="text-5xl">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              <div className="border-b mb-10">
                <h1 className="text-2xl font-semibold mb-2">
                  {cartItems.length > 1 ? "Cart Items :" : "Cart item:"}{" "}
                  <span>{cartItems.length}</span>
                </h1>
              </div>

              {cartItems.map(({ id, quantity }) => {
                const item = products.find((i) => i.id === id);
                if (!item) return null;

                return (
                  <div
                    key={id}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <div className="flex items-center space-x-4 w-7/12">
                      <img
                        src={item.image[0]}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                        width={64}
                        height={64}
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {item.title}{" "}
                          <span className="text-xs text-gray-400">
                            x {quantity}
                          </span>
                        </h2>
                        <p className="text-gray-500 w-2/3">
                          {item.description.split(" ").slice(0, 10).join(" ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-gray-500 hover:text-gray-700 border rounded-full px-2"
                        onClick={() => handleDecrement(id, quantity)}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="text-gray-500 hover:text-gray-700 border rounded-full px-2"
                        onClick={() => handleIncrement(id, quantity)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {convertUsdToCurrency(item.price * quantity)}{" "}
                        <span className="text-xs text-gray-400 font-normal">
                          ({item.price}/item)
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFromCart(id)}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <a
            href="/product-listing"
            className="text-gray-500 hover:text-gray-700 mt-10 inline-block"
          >
            ← Back to shop
          </a>
          <div className="mt-10 flex justify-end">
            {cartItems.length > 0 && (
              <button
                className="rounded-md bg-red-500 text-white p-2"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="w-1/3 h-60 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-6">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>
                ITEMS {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span>
                {convertUsdToCurrency(
                  cartItems.reduce((sum, item) => {
                    const product = products.find((p) => p.id === item.id);
                    return sum + (product ? product.price * item.quantity : 0);
                  }, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TOTAL PRICE</span>
              <span>
                {convertUsdToCurrency(
                  cartItems.reduce((sum, item) => {
                    const product = products.find((p) => p.id === item.id);
                    return sum + (product ? product.price * item.quantity : 0);
                  }, 0)
                )}
              </span>
            </div>
            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
