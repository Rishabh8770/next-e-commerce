"use client";

import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { Order, OrderType } from "@/types/OrderTypes";
import { getOrderDetails } from "@/actions/OrderCreationAction";
import { useProductContext } from "@/context/ProductContext";
import Link from "next/link";
import { ERROR_MESSAGE } from "@/utils/errorMessage";
import ProfileItemsHeader from "../myProfile/ProfileItemsHeader";
import { useParams, usePathname } from "next/navigation";

type OrderCardProps = {
  maxOrdersToShow?: number | null;
  isProfilePage: boolean;
  maxItemsToShow?: number | null;
  specificOrder?: Order | null;
  showAllItems?: boolean;
};

const OrderCard = ({
  maxOrdersToShow = null,
  isProfilePage = false,
  maxItemsToShow = null,
  specificOrder = null,
  showAllItems = false,
}: OrderCardProps) => {
  const { userId } = useUserContext();
  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);
  const { products } = useProductContext();
  const [currentItems, setCurrentItems] = useState(1);
  const pathName = usePathname();
  const { orderId } = useParams();
  const itemsShow = 4;

  useEffect(() => {
    if (userId && !specificOrder) {
      const fetchOrderDetails = async () => {
        const response = await getOrderDetails(userId);
        setOrderDetails(response);
      };

      fetchOrderDetails();
    }
  }, [userId, specificOrder]);

  const ordersToDisplay = specificOrder
    ? [specificOrder]
    : (orderDetails?.orders || [])
        .slice(0, maxOrdersToShow ?? undefined)
        .sort(
          (a, b) =>
            new Date(b.orderCreated).getTime() -
            new Date(a.orderCreated).getTime()
        );

  if (!userId && !specificOrder) {
    return <p className="mt-4 text-xl">{ERROR_MESSAGE.loginMessage}</p>;
  }

  if (ordersToDisplay.length === 0) {
    return (
      <p className="mt-4 text-xl border border-dashed border-gray-700 rounded-lg p-5">
        {ERROR_MESSAGE.noOrders}
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {!isProfilePage && (
        <div
          className={`${
            pathName.includes(`/my-profile/myOrders/${orderId}`)
              ? "hidden"
              : "block w-full"
          }`}
        >
          <ProfileItemsHeader title="Orders" />
        </div>
      )}
      <div className="border border-gray-300 rounded-lg md:w-5/6 w-full lg:p-10 p-2 lg:m-10 m-4 bg-gray-200">
        <div className={`${showAllItems && "hidden"}`}>
          <h1 className="font-semibold text-3xl">
            My{" "}
            {orderDetails?.orders && orderDetails?.orders.length > 1
              ? "Orders"
              : "Order"}
          </h1>
          <div className="border-b-1 border-dashed border-black mt-4"></div>
        </div>
        {ordersToDisplay.map((order) => {
          const startIndex = 0;
          const endIndex = showAllItems
            ? order.items.length
            : currentItems * itemsShow;
          const visibleItems = maxItemsToShow
            ? order.items.slice(startIndex, maxItemsToShow)
            : order.items.slice(startIndex, endIndex);
          const hasMoreItems = !showAllItems && endIndex < order.items.length;
          const hasLessItems = !showAllItems && currentItems > 1;

          return (
            <div
              className="border rounded-lg p-4 space-y-4 my-8 bg-white overflow-x-auto"
              key={order.orderId}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 items-center">
                    <Link href={`/my-profile/myOrders/${order.orderId}`}>
                      <h1 className="text-2xl font-semibold">
                        Order Id :{" "}
                        <span className="text-blue-700">#{order.orderId}</span>
                      </h1>
                    </Link>
                    <h1>Total Items: {order.items.length}</h1>
                  </div>
                  <h1>
                    Order created:{" "}
                    {new Date(order.orderCreated).toLocaleDateString("en-GB")}
                    {" | "}
                    {new Date(order.orderCreated).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </h1>
                </div>
                <div className="border-b border-gray-300"></div>
              </div>
              <div>
                <table className="min-w-full">
                  <thead>
                    <tr className="text-justify">
                      <th className="py-2 px-4 border-b">Product Id</th>
                      <th className="py-2 px-4 border-b">Description</th>
                      <th className="py-2 px-2 border-b">
                        Quantity <span className="font-normal">(Qty.)</span>
                      </th>
                      <th className="py-2 px-4 border-b">
                        Price <span className="font-normal">(per Qty.)</span>
                      </th>
                      <th className="py-2 px-2 border-b">Discount</th>
                      <th className="py-2 px-4 border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleItems.map((item) => {
                      const product = products.find(
                        (prod) => prod.id === item.id
                      );
                      return (
                        <tr key={item.id}>
                          <td className="py-2 px-4 border-b text-blue-500 hover:underline">
                            <Link href={`/products/${item.id}`}>{item.id}</Link>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {product?.description
                              .split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </td>
                          <td className="py-2 px-2 border-b">
                            {item.quantity}
                          </td>
                          <td className="py-2 px-4 border-b">
                            ₹{item.pricePerQuantity}
                          </td>
                          <td className="py-2 px-2 border-b">
                            {item.discount}%
                          </td>
                          <td className="py-2 px-4 border-b">
                            ₹{item.productTotal?.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!showAllItems && (
                  <div className="mt-2">
                    {hasMoreItems && !isProfilePage && (
                      <button
                        onClick={() => setCurrentItems((prev) => prev + 1)}
                        className="hover:bg-gray-200 mr-4 border rounded-md p-2"
                      >
                        View More
                      </button>
                    )}
                    {hasLessItems && !isProfilePage && (
                      <button
                        onClick={() => setCurrentItems(1)}
                        className="hover:bg-gray-200 border rounded-md p-2"
                      >
                        View Less
                      </button>
                    )}
                  </div>
                )}
                <div className="flex justify-end">
                  <div className="pt-4 lg:w-1/3 w-full">
                    <div className={`${isProfilePage && "hidden"}`}>
                      <div className="flex justify-between pt-2">
                        <h1 className="font-semibold">Total</h1>
                        <h1>₹{order.totalAmount.toFixed(2)}</h1>
                      </div>
                      <div className="flex justify-between border-t border-gray-300 pt-2">
                        <h1 className="font-semibold">Discount</h1>
                        <h1>₹{order.totalDiscount.toFixed(2)}</h1>
                      </div>
                      <div className="flex justify-between border-t border-gray-300 pt-2">
                        <h1 className="font-semibold">Tax (5%)</h1>
                        <h1>₹{order.tax.toFixed(2)}</h1>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-2">
                      <h1 className="font-semibold">
                        Total After Discount and Tax
                      </h1>
                      <h1 className="font-semibold">
                        ₹{order.totalOrderAmount.toFixed(2)}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-300 mt-2"></div>
              </div>
              <div
                className={`flex space-x-8 ${
                  isProfilePage ? "hidden" : "block"
                }`}
              >
                <div className="pt-4">
                  <div>
                    <h1 className="text-xl font-semibold">Shipping Info.</h1>
                    <div className="border-b-1 border-gray-300 mt-2"></div>
                  </div>
                  <h1 className="font-semibold">
                    Name: {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </h1>
                  <h1 className="font-semibold">
                    Address: {order.shippingAddress.address},{" "}
                    {order.shippingAddress.subAddress}
                  </h1>
                  <h1 className="font-semibold">
                    City: {order.shippingAddress.city}
                  </h1>
                  <h1 className="font-semibold">
                    State: {order.shippingAddress.state}
                  </h1>
                  <h1 className="font-semibold">
                    Pincode: {order.shippingAddress.postalCode}
                  </h1>
                  <h1 className="font-semibold">
                    Country: {order.shippingAddress.country}
                  </h1>
                  <h1 className="font-semibold">
                    Phone: {order.shippingAddress.phone}
                  </h1>
                </div>
                <div className="pt-4">
                  <div>
                    <h1 className="text-xl font-semibold">Billing Info.</h1>
                    <div className="border-b-1 border-gray-300 mt-2"></div>
                  </div>
                  <h1 className="font-semibold">
                    Name: {order.billingAddress.firstName}{" "}
                    {order.billingAddress.lastName}
                  </h1>
                  <h1 className="font-semibold">
                    Address: {order.billingAddress.address},{" "}
                    {order.billingAddress.subAddress}
                  </h1>
                  <h1 className="font-semibold">
                    City: {order.billingAddress.city}
                  </h1>
                  <h1 className="font-semibold">
                    State: {order.billingAddress.state}
                  </h1>
                  <h1 className="font-semibold">
                    Pincode: {order.billingAddress.postalCode}
                  </h1>
                  <h1 className="font-semibold">
                    Country: {order.billingAddress.country}
                  </h1>
                  <h1 className="font-semibold">
                    Phone: {order.billingAddress.phone}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`flex justify-end items-center text-blue-500 hover:underline ${
            !isProfilePage ? "hidden" : "block"
          }`}
        >
          <Link href="/my-profile/myOrders">View more...</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
