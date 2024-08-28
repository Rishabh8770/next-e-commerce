"use client";

import { addAddress } from "@/actions/AddressAction";
import { useUserContext } from "@/context/UserContext";
import { useAddressContext } from "@/context/AddressContext";
import React, { useState } from "react";
import LoadingButton from "../common/LoadingButton";

type AddressTypeProp = {
  type: "shipping" | "billing";
};

const AddressForm = ({ type }: AddressTypeProp) => {
  const [loading, setLoading] = useState(false);
  const { userId } = useUserContext();
  const { addNewAddress } = useAddressContext();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    subAddress: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    phone: "",
  });

  const toggleAddressForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFormOpen(!isFormOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearAddressForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      subAddress: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      phone: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.time("Add Address Duration");
    try {
      await addNewAddress(userId, formData, type);
      setIsFormOpen(false);
      alert("Address added successfully");
    } catch (error) {
      alert("Failed to add address");
    } finally {
      setLoading(false);
    }
    console.timeEnd("Add Address Duration");
    clearAddressForm();
  };

  return (
    <div className="my-4">
      <div>
        <button
          className="border rounded-lg p-2 bg-gray-700 text-white transition-transform transform hover:scale-105"
          type="button"
          onClick={toggleAddressForm}
        >
          + Add new address
        </button>
      </div>
      {isFormOpen && (
        <form
          className="space-y-4 border rounded-md p-4 lg:w-5/6 mt-2 slide-down"
          onSubmit={handleSubmit}
        >
          <div className="flex md:flex-row flex-col md:space-x-4">
            <div className="flex flex-col space-y-2 md:w-1/2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="border rounded-md p-2"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div className="flex flex-col space-y-2 md:w-1/2 md:mt-0 mt-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="border rounded-md p-2"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="border rounded-md p-2"
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
          </div>
          <div className="flex flex-col space-y-2 ">
            <label htmlFor="subAddress">Appartment, Flat no., etc</label>
            <input
              type="text"
              className="border rounded-md p-2"
              name="subAddress"
              onChange={handleChange}
              value={formData.subAddress}
            />
          </div>
          <div className="flex md:flex-row flex-col md:space-x-4">
            <div className="flex flex-col space-y-2 md:w-1/2">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="border rounded-md p-2"
                name="city"
                onChange={handleChange}
                value={formData.city}
              />
            </div>
            <div className="flex flex-col space-y-2 md:w-1/2 md:mt-0 mt-2">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                className="border rounded-md p-2"
                name="country"
                onChange={handleChange}
                value={formData.country}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col md:space-x-4">
            <div className="flex flex-col space-y-2 lg:w-1/2">
              <label htmlFor="state">State / Province</label>
              <input
                type="text"
                className="border rounded-md p-2"
                name="state"
                onChange={handleChange}
                value={formData.state}
              />
            </div>
            <div className="flex flex-col space-y-2 md:w-1/2 md:mt-0 mt-2">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                className="border rounded-md p-2"
                name="postalCode"
                onChange={handleChange}
                value={formData.postalCode}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="border rounded-md p-2"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>
          <div className="">
            <LoadingButton isLoading={loading}>Add Address</LoadingButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressForm;