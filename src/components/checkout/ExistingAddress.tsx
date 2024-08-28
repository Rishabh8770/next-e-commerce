"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAddressContext } from "@/context/AddressContext";
import { AddressType } from "@/types/AddressType";

const ExistingAddress = ({
  type,
  onSelectAddress,
}: {
  type: string;
  onSelectAddress: (address: AddressType) => void;
}) => {
  const [currentAddresses, setCurrentAddresses] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
  const addressShow = 2;

  const { userId } = useUserContext();
  const { addresses, fetchAddresses } = useAddressContext();

  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  const addressList = type === "billing" ? addresses.billingAddresses : addresses.shippingAddresses;

  /* useEffect(() => {
    if (addressList.length > 0 && !selectedAddress) {
      setSelectedAddress(addressList[0]);
    }
  }, [addressList, selectedAddress]); */

  if (!addressList || addressList.length === 0) {
    return <p>No addresses found for this user.</p>;
  }

  const startIndex = 0;
  const endIndex = currentAddresses * addressShow;
  const visibleAddresses = addressList.slice(startIndex, endIndex);
  const hasMoreAddresses = endIndex < addressList.length;
  const hasLessAddresses = currentAddresses > 1;

  const handleShowMore = () => {
    setCurrentAddresses((prev) => prev + 1);
  };

  const handleShowLess = () => {
    setCurrentAddresses(1);
  };

  const handleSelectAddress = (address: AddressType) => {
    setSelectedAddress((prev) => (prev === address ? null : address));
    onSelectAddress(address);
  };

  return (
    <div className="lg:w-5/6 mt-2">
      {visibleAddresses.map((address, index) => (
        <div
          key={index}
          className="flex space-x-4 border border-dashed border-green-500 bg-green-100 p-2 rounded-xl my-2"
        >
          <input
            type="checkbox"
            checked={selectedAddress === address}
            onChange={() => handleSelectAddress(address)}
          />
          <div>
            <p>
              {address.firstName} {address.lastName}
            </p>
            <p>{address.address}</p>
            <p>{address.subAddress}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.postalCode}</p>
            <p>{address.country}</p>
            <p>{address.phone}</p>
          </div>
        </div>
      ))}
      <div className="mt-2">
        {hasMoreAddresses && (
          <button
            onClick={handleShowMore}
            className="hover:bg-gray-200 mr-4 border rounded-md p-2"
          >
            View More
          </button>
        )}
        {hasLessAddresses && (
          <button
            onClick={handleShowLess}
            className="hover:bg-gray-200 border rounded-md p-2"
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
};

export default ExistingAddress;
