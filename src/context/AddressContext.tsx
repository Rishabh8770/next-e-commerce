"use client";

import React, { createContext, useContext, useState } from "react";
import { AddressType } from "@/types/AddressType";
import { getAddresses, addAddress as serverAddAddress } from "@/actions/AddressAction";

type AddressContextType = {
  addresses: {
    shippingAddresses: AddressType[];
    billingAddresses: AddressType[];
  };
  fetchAddresses: (userId: number|null) => void;
  addNewAddress: (
    userId: number | null,
    address: AddressType,
    type: "shipping" | "billing"
  ) => void;
};

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const [addresses, setAddresses] = useState<{ shippingAddresses: AddressType[]; billingAddresses: AddressType[] }>({
    shippingAddresses: [],
    billingAddresses: [],
  });

  const fetchAddresses = async (userId: number | null) => {
    try {
      const userAddresses = await getAddresses(userId);
      setAddresses(userAddresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const addNewAddress = async (
    userId: number | null,
    address: AddressType,
    type: "shipping" | "billing"
  ) => {
    try {
      await serverAddAddress(userId, address, type);
      setAddresses((prev) => {
        const updatedAddresses = { ...prev };
        if (type === "shipping") {
          updatedAddresses.shippingAddresses = [...updatedAddresses.shippingAddresses, address];
        } else {
          updatedAddresses.billingAddresses = [...updatedAddresses.billingAddresses, address];
        }
        return updatedAddresses;
      });
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  return (
    <AddressContext.Provider value={{ addresses, fetchAddresses, addNewAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddressContext must be used within an AddressProvider");
  }
  return context;
};
