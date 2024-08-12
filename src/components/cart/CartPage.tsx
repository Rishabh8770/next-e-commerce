"use client";

import {
  removeFromCart,
  updateCartItem,
  deleteCart,
} from "@/actions/CartAction";
import { useCartContext } from "@/context/CartContext";
import { useProductContext } from "@/context/ProductContext";
import { Trash2 } from "lucide-react";
import { useCartSummary } from "@/hooks/useCartSummary";

const CartPage = () => {
  const { cartItems, refreshCart } = useCartContext();
  const { products } = useProductContext();
  const { totalDiscount, totalPrice, tax, totalQuantity, priceAfterTax } =
    useCartSummary();

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
    <div className="lg:w-2/3 w-5/6">
      <div className="flex lg:flex-row flex-col lg:space-x-8 space-x-0 lg:space-y-0 space-y-6 lg:mb-0 mb-5">
        <div className="lg:w-5/6 w-full bg-white p-6 rounded-lg shadow-lg">
          {cartItems.length === 0 ? (
            <p className="lg:text-5xl md:text-3xl text-2xl">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              <div className="border-b mb-10">
                <h1 className="text-2xl font-semibold mb-2">
                  {cartItems.length > 1 ? "Cart Items:" : "Cart item:"}{" "}
                  <span>{cartItems.length}</span>
                </h1>
              </div>

              {cartItems.map(({ id, quantity }) => {
                const item = products.find((i) => i.id === id);
                if (!item) return null;

                return (
                  <div
                    key={id}
                    className="flex lg:flex-row flex-col justify-between items-center border-b pb-4 lg:space-y-0 space-y-5"
                  >
                    <div className="flex items-center space-x-4 lg:w-7/12 w-5/6 lg:flex-row flex-col lg:text-start text-center lg:space-y-0 space-y-4">
                      <img
                        src={item.image[0]}
                        alt={item.title}
                        className="lg:w-28 w-64  object-cover rounded"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {item.title}{" "}
                          <span className="text-xs text-gray-400">
                            x {quantity}
                          </span>
                        </h2>
                        <p className="text-gray-500 lg:w-2/3 w-full">
                          {item.description.split(" ").slice(0, 10).join(" ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        className="border border-red-500 text-red-500 rounded-md px-2 hover:bg-red-500 hover:text-white"
                        onClick={() => handleDecrement(id, quantity)}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="border border-yellow-500 text-yellow-500 rounded-md px-2 hover:bg-yellow-500 hover:text-white"
                        onClick={() => handleIncrement(id, quantity)}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-center">
                      <div>
                        <span
                          className={`font-semibold text-green-500 ${
                            (item.discount === 0 || item.discount === null) &&
                            "hidden"
                          }`}
                        >
                          {item.discount}% off{" "}
                        </span>{" "}
                        <span
                          className={`${
                            item.discount === 0 || item.discount === null
                              ? "text-md text-black"
                              : "line-through text-gray-400 text-sm"
                          }`}
                        >
                          ₹{(item.price * quantity).toFixed(2)}{" "}
                        </span>
                        <div
                          className={`text-black text-md ${
                            (item.discount === 0 || item.discount === null) &&
                            "hidden"
                          }`}
                        >
                          ₹
                          {(
                            item.price * quantity -
                            (item.price * quantity * (item.discount || 0)) / 100
                          ).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400 font-normal">
                          (
                          {item.discount !== 0 || item.discount !== null
                            ? (
                                item.price -
                                (item.price * (item.discount || 0)) / 100
                              ).toFixed(2)
                            : item.price.toFixed(2)}{" "}
                          / item)
                        </div>
                      </div>
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

        <div className="lg:w-1/3 w-full h-auto bg-gray-100 p-6 rounded-lg shadow-lg lg:self-start self-center ">
          <h2 className="text-xl font-bold mb-6">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>
                Price: ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
              </span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="text-green-500">
                - ₹{totalDiscount !== 0 ? totalDiscount.toFixed(2) : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Order Total:</span>
              <span className="font-semibold text-red-700">
                ₹{priceAfterTax.toFixed(2)}
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
