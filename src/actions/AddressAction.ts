"use server";

import { AddressType } from "@/types/AddressType";
import { User } from "@/types/ProductTypes";
import fs from "fs";
import path from "path";

const addressFilePath = path.join(
  process.cwd(),
  "src/data",
  "userAddress.json"
);

export async function addAddress(
  userId: number | null,
  address: AddressType,
  type: "shipping" | "billing"
) {
  try {
    const data = fs.readFileSync(addressFilePath, "utf-8");
    const usersAddress = JSON.parse(data);

    const userEntry = usersAddress.find((user: User) => user.id === userId);

    if (!userEntry) {
      throw new Error("User not found");
    }

    if (type === "shipping") {
      if (!userEntry.shippingAddresses) {
        userEntry.shippingAddresses = [];
      }
      userEntry.shippingAddresses.push(address);
    } else if (type === "billing") {
      if (!userEntry.billingAddresses) {
        userEntry.billingAddresses = [];
      }
      userEntry.billingAddresses.push(address);
    }

    fs.writeFileSync(addressFilePath, JSON.stringify(usersAddress, null, 2));
  } catch (error) {
    console.error("Error adding address:", error);
    throw new Error("Failed to add address");
  }
}
