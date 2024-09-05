"use client";

import { useUserContext } from "@/context/UserContext";

export const routePathNames = () => {
  const { userId } = useUserContext();

  return [
    "/admin",
    "/admin/dashboard/products",
    "/admin/dashboard",
    "/admin/addProduct",
    "/admin/editProduct",
    "/admin/users",
    `/my-profile/dashboard/${userId}`,
    "/my-profile/addresses",
    "/my-profile/editProfile",
    "/my-profile/myReviews",
    "/my-profile/myOrders"
  ];
};
