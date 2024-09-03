"use client";

import React, { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import ExistingAddress from "./ExistingAddress";
import BillingInfo from "./BillingInfo";
import { AddressType } from "@/types/AddressType";
import { useAddressContext } from "@/context/AddressContext";
import { useUserContext } from "@/context/UserContext";
import { v4 as uuidv4 } from "uuid";

const CheckoutPage = () => {
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<AddressType | null>(null);
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<AddressType | null>(null);
  const [copyShippingToBilling, setCopyShippingToBilling] = useState(false);
  const { addresses, fetchAddresses, addNewAddress } = useAddressContext();
  const { userId } = useUserContext();

  useEffect(() => {
    fetchAddresses(userId);
  }, [userId]);

  const handleCheckboxChange = () => {
    if (selectedShippingAddress) {
      setCopyShippingToBilling(!copyShippingToBilling);

      if (addresses.billingAddresses.length === 0) {
        const newBillingAddress = {
          ...selectedShippingAddress,
          id: selectedShippingAddress.id,
        };
        addNewAddress(userId, newBillingAddress, "billing");
        setSelectedBillingAddress(newBillingAddress);
      } else {
        const existingBillingAddress = addresses.billingAddresses.find(
          (address) =>
            address.firstName === selectedShippingAddress.firstName &&
            address.lastName === selectedShippingAddress.lastName &&
            address.address === selectedShippingAddress.address &&
            address.subAddress === selectedShippingAddress.subAddress &&
            address.city === selectedShippingAddress.city &&
            address.state === selectedShippingAddress.state &&
            address.country === selectedShippingAddress.country &&
            address.postalCode === selectedShippingAddress.postalCode &&
            address.phone === selectedShippingAddress.phone
        );

        if (!existingBillingAddress) {
          const newBillingAddress = {
            ...selectedShippingAddress,
            id: selectedShippingAddress.id,
          };
          addNewAddress(userId, newBillingAddress, "billing");
          setSelectedBillingAddress(newBillingAddress);
        } else {
          setSelectedBillingAddress(existingBillingAddress);
        }
      }
    }
  };

  useEffect(() => {
    if (copyShippingToBilling && selectedShippingAddress) {
      const existingBillingAddress = addresses.billingAddresses.find(
        (address) => address.id === selectedShippingAddress.id
      );
      if (existingBillingAddress) {
        setSelectedBillingAddress(existingBillingAddress);
      }
    }
  }, [
    addresses.billingAddresses,
    copyShippingToBilling,
    selectedShippingAddress,
  ]);

  return (
    <div className="flex justify-center my-8 w-5/6 space-x-4">
      <div className="border w-5/6 lg:p-16 p-2 rounded-lg space-y-4">
        <div className="border-dashed border-b-1">
          <h1 className="lg:text-3xl text-2xl font-semibold mb-8">Checkout</h1>
        </div>
        <div className="flex lg:flex-row flex-col">
          <div className="lg:w-2/3">
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
              />
            </div>
            <div className="mt-4">
              <input
                type="checkbox"
                id="copyShippingToBilling"
                checked={copyShippingToBilling}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="copyShippingToBilling" className="ml-2">
                Copy Shipping Address to Billing Address
              </label>
            </div>
            <div>
              <h1 className="text-xl border-dashed border-b-1 w-5/6 mb-4 mt-8 font-semibold">
                Billing Address
              </h1>
              <AddressForm type={"billing"} />
            </div>
            <div>
              <h1 className="text-xl">Select Billing Address</h1>
              <ExistingAddress
                type="billing"
                onSelectAddress={setSelectedBillingAddress}
              />
            </div>
          </div>
          <div className="lg:w-1/3 lg:mt-0 mt-2">
            <div className="border-dashed border-b-black border-b-1 px-3 my-2 lg:hidden"></div>
            <div className="lg:mt-0 mt-6">
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
