"use client";

import { getOrderDetails } from "@/actions/OrderCreationAction";
import { useUserContext } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const routePathNames = () => {
  const { orderId } = useParams();
  const { userId } = useUserContext();

  useEffect(() => {
    if (userId && orderId) {
      const getOrderId = async () => {
        const response = await getOrderDetails(userId);
        if (response && response.orders.length > 0) {
          return response.orders.find(
            (order) => order.orderId === Number(orderId)
          );
        }
      };
      getOrderId();
    }
  }, [userId, orderId]);

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
    "/my-profile/myOrders",
    `/my-profile/myOrders/${orderId}`,
    "/my-profile/myWishlist"
  ];
};
