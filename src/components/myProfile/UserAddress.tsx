"use client";

import { useAddressContext } from "@/context/AddressContext";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import React, { useEffect } from "react";

type UserAddressProp = {
  maxShippingAddressToShow? : number | null;
  maxBillingAddressToShow? : number | null;
  isProfilePage: boolean
}

const UserAddress = ({maxShippingAddressToShow = null, maxBillingAddressToShow = null, isProfilePage=false}: UserAddressProp) => {
  const { userId } = useUserContext();
  const { addresses, fetchAddresses } = useAddressContext();

  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  const shippingAddressToDisplay = maxShippingAddressToShow ? addresses.shippingAddresses.slice(0, maxShippingAddressToShow): addresses.shippingAddresses;
  const billingAddressToDisplay = maxBillingAddressToShow ? addresses.billingAddresses.slice(0, maxBillingAddressToShow): addresses.billingAddresses;

  return (
    <div className="md:p-8 p-0 m-10 flex flex-col md:space-x-10 w-5/6 bg-gray-200 border border-gray-300 rounded-lg">
      <div className="md:ml-[2.375rem] mb-9">
        <h1 className="text-3xl">My Addresses</h1>
        <div className="border-b-gray-600 border-dashed border-b-1 mt-4"></div>
      </div>
      <div className="flex md:flex-row flex-col md:space-x-10">
        <div className="md:w-1/2 w-full border rounded-lg p-5 bg-white md:mb-0 mb-5">
          <div className="font-semibold text-2xl space-y-4 mb-8">
            <h1>Shipping Addresses:</h1>
            <div className="border-b-gray-600 border-dashed border-b-1"></div>
          </div>
          {shippingAddressToDisplay.length > 0 ? (
            shippingAddressToDisplay.map((shipAdd) => (
              <div
                key={shipAdd.id}
                className="border rounded-lg p-3 my-4 bg-white"
              >
                <h1>
                  {shipAdd.firstName} {shipAdd.lastName}
                </h1>
                <h1>
                  {shipAdd.address}, {shipAdd.subAddress}
                </h1>
                <h1>{shipAdd.city},</h1>
                <h1>{shipAdd.state},</h1>
                <h1>{shipAdd.postalCode},</h1>
                <h1>{shipAdd.country},</h1>
                <h1>{shipAdd.phone}</h1>
              </div>
            ))
          ) : (
            <p className="mt-4">No shipping addresses available.</p>
          )}
        </div>
        <div className="md:w-1/2 w-full border rounded-lg p-5 bg-white">
          <div className="font-semibold text-2xl space-y-4 mb-8">
            <h1>Billing Addresses:</h1>
            <div className="border-b-gray-600 border-dashed border-b-1"></div>
          </div>
          {billingAddressToDisplay.length > 0 ? (
            billingAddressToDisplay.map((billAdd) => (
              <div
                key={billAdd.id}
                className="border rounded-lg p-3 my-4 bg-white"
              >
                <h1>
                  {billAdd.firstName} {billAdd.lastName}
                </h1>
                <h1>
                  {billAdd.address}, {billAdd.subAddress}
                </h1>
                <h1>{billAdd.city},</h1>
                <h1>{billAdd.state},</h1>
                <h1>{billAdd.postalCode},</h1>
                <h1>{billAdd.country},</h1>
                <h1>{billAdd.phone}</h1>
              </div>
            ))
          ) : (
            <p>No Billing addresses available.</p>
          )}
        </div>
      </div>
      <div
        className={`flex justify-end items-center mt-5 text-blue-500 hover:underline ${
          !isProfilePage ? "hidden" : "block"
        }`}
      >
        <Link href="/my-profile/addresses">View more...</Link>
      </div>
    </div>
  );
};

export default UserAddress;
