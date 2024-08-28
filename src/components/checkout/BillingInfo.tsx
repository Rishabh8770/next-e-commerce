"use client";

import { deleteCart } from "@/actions/CartAction";
import { useCartContext } from "@/context/CartContext";
import { useCartSummary } from "@/hooks/useCartSummary";
import { AddressType } from "@/types/AddressType";
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "../common/LoadingButton";

type SelectedAddressProps = {
  selectedShippingAddress: AddressType | null;
  selectedBillingAddress: AddressType | null;
};

const BillingInfo = ({
  selectedShippingAddress,
  selectedBillingAddress,
}: SelectedAddressProps) => {
  const { totalDiscount, totalPrice, tax, totalQuantity, priceAfterTax } =
    useCartSummary();
  const { refreshCart } = useCartContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    if (selectedBillingAddress && selectedShippingAddress) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setPaymentSuccess(true);
        setTimeout(() => setPaymentSuccess(false), 4000);
      }, 2000);
      await deleteCart();
      refreshCart();
      setTimeout(() => {
        router.push("/product-listing");
      }, 3000);
    } else {
      alert("Please select the address");
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="border h-auto rounded-lg bg-gray-100">
      <div>
        <div className="px-6 pt-6">
          <label
            htmlFor="cart"
            className="text-2xl font-semibold flex items-center"
          >
            Cart Info{" "}
            <span className="mx-2">
              <ShoppingCart />
            </span>
          </label>
          <div className="border-dashed border-b-black border-b-1 px-3 my-2"></div>
        </div>
        <div>
          <div className="h-auto bg-gray-100 p-6 lg:self-start self-center ">
            <h2 className="text-xl font-bold mb-6">Cart Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>
                  Price: ({totalQuantity} {totalQuantity > 1 ? "items" : "item"}
                  )
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
            </div>
            <div className="border-dashed border-b-black border-b-1 px-3 my-2"></div>
          </div>
        </div>
      </div>
      <div className="px-6 py-3">
        <label htmlFor="shipping" className="font-semibold text-xl">
          Shipping Address:
        </label>
        <div className="border-dashed border-b-black border-b-1 px-3 my-2"></div>
        {selectedShippingAddress ? (
          <div className="slide-down">
            <p>
              {selectedShippingAddress.firstName}{" "}
              {selectedShippingAddress.lastName}
            </p>
            <p>{selectedShippingAddress.address}</p>
            <p>{selectedShippingAddress.subAddress}</p>
            <p>{selectedShippingAddress.city}</p>
            <p>{selectedShippingAddress.state}</p>
            <p>{selectedShippingAddress.postalCode}</p>
            <p>{selectedShippingAddress.country}</p>
            <p>{selectedShippingAddress.phone}</p>
          </div>
        ) : (
          <p>No shipping address selected.</p>
        )}
      </div>
      <div className="px-6 py-3">
        <label htmlFor="billing" className="font-semibold text-xl">
          Billing Address:
        </label>
        <div className="border-dashed border-b-black border-b-1 px-3 my-2"></div>
        {selectedBillingAddress ? (
          <div className="slide-down">
            <p>
              {selectedBillingAddress.firstName}{" "}
              {selectedBillingAddress.lastName}
            </p>
            <p>{selectedBillingAddress.address}</p>
            <p>{selectedBillingAddress.subAddress}</p>
            <p>{selectedBillingAddress.city}</p>
            <p>{selectedBillingAddress.state}</p>
            <p>{selectedBillingAddress.postalCode}</p>
            <p>{selectedBillingAddress.country}</p>
            <p>{selectedBillingAddress.phone}</p>
          </div>
        ) : (
          <p>No billing address selected.</p>
        )}
      </div>
      <div className="px-6 my-4">
        <LoadingButton onClick={handlePayment} isLoading={loading}>
          PAYMENT
        </LoadingButton>
      </div>
      {paymentSuccess && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg ">
          <img src="/check.png" alt="success" className="size-28" />
          <div className="text-white text-2xl font-bold">
            Payment Successful
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingInfo;