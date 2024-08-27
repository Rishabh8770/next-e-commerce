"use client";

import React, { useState } from "react";
import AddressForm from "./AddressForm";
import ExistingAddress from "./ExistingAddress";
import BillingInfo from "./BillingInfo";
import { AddressType } from "@/types/AddressType";

const CheckoutPage = () => {
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<AddressType | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<AddressType | null>(null);
  // const [isSameAsShipping, setIsSameAsShipping] = useState(false);

  /* const handleAddressCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSameAsShipping(e.target.checked);
  }; */

  

  return (
    <div className="flex justify-center my-8 w-5/6 space-x-4">
      <div className="border w-5/6 p-16 rounded-lg space-y-4">
        <div className="border-dashed border-b-1">
          <h1 className="lg:text-3xl text-xl font-semibold mb-8">Checkout</h1>
        </div>
        <div className="flex">
          <div className="w-2/3">
            <div>
              <h1 className="text-xl border-dashed border-b-1 w-5/6 font-semibold">
                Shipping Address
              </h1>
              <AddressForm type={"shipping"} />
            </div>
            <div>
              <h1 className="text-xl">Select Shipping Address</h1>
              <ExistingAddress
                type="shipping"
                onSelectAddress={setSelectedShippingAddress}
                // isSameAsShipping={false}
              />
            </div>
            <div>
              <h1 className="text-xl border-dashed border-b-1 w-5/6 mb-4 mt-8 font-semibold">
                Billing Address
              </h1>
              <AddressForm type={"billing"} />
            </div>
            {/* <label>
              <input
                type="checkbox"
                checked={isSameAsShipping}
                onChange={handleAddressCheck}
                className="mr-2"
              />
              Same as shipping address
            </label> */}
            <div>
              <h1 className="text-xl">Select Billing Address</h1>
              <ExistingAddress
                type="billing"
                onSelectAddress={setSelectedBillingAddress}
                // isSameAsShipping={isSameAsShipping}
              />
            </div>
          </div>
          <div className="w-1/3">
            <div>
              <BillingInfo
                selectedBillingAddress={selectedBillingAddress}
                selectedShippingAddress={selectedShippingAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
