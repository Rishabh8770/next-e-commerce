"use client";

import { useUserContext } from "@/context/UserContext";
import users from "@/data/users.json";
import React from "react";
import OrderCard from "../myOrders/OrderCard";
import UserAddress from "./UserAddress";
import RecentlyViewed from "./RecentlyViewed";

const ProfileHomePage = () => {
  const { userId } = useUserContext();
  if (!userId) {
    return <h1>User not found</h1>;
  }
  const userDetails = users.find((user) => user.id === userId);
  if (!userDetails) {
    return <h1>User not found</h1>;
  }
  return (
    <div
      key={userDetails.id}
      className="flex flex-col justify-center items-center mb-10"
    >
      <div className="w-full">
        <div className="p-8 w-full bg-side-sidebar-bg border-l border-white">
          <h1 className="text-2xl font-semibold text-white">
            Hi {userDetails.name.split(" ").slice(0, 1).join(" ")}, Welcome to
            your Dashboard
          </h1>
          <div className="border-b-1 border-dashed border-white mt-4"></div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <OrderCard maxOrdersToShow={2} maxItemsToShow={2} isProfilePage />
        <UserAddress
          maxBillingAddressToShow={1}
          maxShippingAddressToShow={1}
          isProfilePage
        />
        <div className="w-5/6 border border-gray-300 p-8 rounded-lg bg-gray-200 my-10">
          <div className="px-4">
            <h1 className="text-3xl">Recently Viewed</h1>
            <div className="border-b-gray-600 border-dashed border-b-1 mt-4"></div>
          </div>
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
};

export default ProfileHomePage;
