"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderDetails } from "@/actions/OrderCreationAction";
import { Order } from "@/types/OrderTypes";
import OrderCard from "@/components/myOrders/OrderCard";
import { useUserContext } from "@/context/UserContext";
import LoadingPage from "@/app/loading";
import { ERROR_MESSAGE } from "@/utils/errorMessage";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { userId } = useUserContext();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && orderId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await getOrderDetails(Number(userId));
          if (response && response.orders.length > 0) {
            const specificOrder = response.orders.find(
              (o) => o.orderId === Number(orderId)
            );
            if (specificOrder) {
              setOrder(specificOrder);
            } else {
              setError("Order not found");
            }
          } else {
            setError("No orders found");
          }
        } catch (error) {
          setError("Failed to fetch order details");
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();
    }
  }, [userId, orderId]);

  if (loading) {
    return (
      <p>
        <LoadingPage />
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>{ERROR_MESSAGE.noOrderDetails}</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="p-8 w-full bg-side-sidebar-bg border-l border-white">
        <h1 className="text-2xl font-semibold text-white">
          Details : OrderID - #{orderId}
        </h1>
      </div>
      <OrderCard
        maxOrdersToShow={null}
        isProfilePage={false}
        maxItemsToShow={null}
        specificOrder={order}
        showAllItems
      />
    </div>
  );
};

export default OrderDetailsPage;
