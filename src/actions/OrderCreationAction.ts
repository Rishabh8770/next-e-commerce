"use server";

import { Order, OrderItem, OrderType } from "@/types/OrderTypes";
import { AddressType } from "@/types/AddressType";
import fs from "fs";
import path from "path";

const ORDERS_FILE_PATH = path.join(process.cwd(), "src/data/myOrders.json");

const generateOrderId = (): number => {
  return Date.now();
};

export async function createOrder(
  userId: number | null,
  shippingAddress: AddressType,
  billingAddress: AddressType,
  items: OrderItem[],
  totalAmount: number,
  totalDiscount: number,
  tax: number,
  totalOrderAmount: number
): Promise<{ success: boolean; orderId?: number; error?: string }> {
  const newOrder: Order = {
    orderId: generateOrderId(),
    shippingAddress,
    billingAddress,
    items,
    totalAmount,
    totalDiscount,
    tax,
    totalOrderAmount,
    orderCreated: new Date().toISOString(),
  };

  try {
    const fileData = await fs.readFileSync(ORDERS_FILE_PATH, "utf-8");
    const ordersData: OrderType[] = JSON.parse(fileData);

    const userIndex = ordersData.findIndex((order) => order.userid === userId);

    if (userIndex !== -1) {
      ordersData[userIndex].orders.push(newOrder);
    } else {
      ordersData.push({
        userid: userId || null,
        orders: [newOrder],
      });
    }

    await fs.writeFileSync(
      ORDERS_FILE_PATH,
      JSON.stringify(ordersData, null, 2),
      "utf-8"
    );

    return { success: true, orderId: newOrder.orderId };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrderDetails(
  userId: number
): Promise<OrderType | null> {
  try {
    const data = fs.readFileSync(ORDERS_FILE_PATH, "utf-8");
    const orders: OrderType[] = JSON.parse(data);
    console.log("this is orders::", orders);

    const userOrder = orders.find((order) => order.userid === userId) || null;
    console.log("this is userOrder", userOrder);
    return userOrder;
  } catch (error) {
    console.error("Error reading or parsing orders file:", error);
    return null;
  }
}
