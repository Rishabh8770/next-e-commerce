import { AddressType } from "./AddressType";

export type OrderItem = {
  id: number;
  quantity: number;
  pricePerQuantity?: number;
  productTotal: number;
  discount: number;
};

export type Order = {
  orderId: number;
  shippingAddress: AddressType;
  billingAddress: AddressType;
  items: OrderItem[];
  totalAmount: number;
  totalDiscount: number;
  tax: number;
  totalOrderAmount: number;
  orderCreated: string;
};

export type OrderType = {
  userid: number | null;
  orders: Order[];
};
