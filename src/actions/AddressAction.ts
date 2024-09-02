"use server";

import { AddressType } from "@/types/AddressType";
import { User } from "@/types/ProductTypes";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const addressFilePath = path.join(
  process.cwd(),
  "src/data",
  "userAddress.json"
);

export async function getAddresses(userId: number | null) {
  const data = fs.readFileSync(addressFilePath, "utf-8");
  const usersAddress = JSON.parse(data);

  let userEntry = usersAddress.find((user: User) => user.id === userId);

  if (!userEntry) {
    userEntry = {
      id: userId,
      shippingAddresses: [],
      billingAddresses: [],
    };
    usersAddress.push(userEntry);
  }

  return {
    shippingAddresses: userEntry.shippingAddresses || [],
    billingAddresses: userEntry.billingAddresses || [],
  };
}

export async function addAddress(
  userId: number | null,
  address: AddressType,
  type: "shipping" | "billing"
) {
  console.time("Add Address Function Duration");
  try {
    const data = fs.readFileSync(addressFilePath, "utf-8");
    const usersAddress = JSON.parse(data);

    let userEntry = usersAddress.find((user: User) => user.id === userId);

    if (!userEntry) {
      userEntry = {
        id: userId,
        shippingAddresses: [],
        billingAddresses: [],
      };
      usersAddress.push(userEntry);
    }

    if (type === "shipping") {
      if (!userEntry.shippingAddresses) {
        userEntry.shippingAddresses = [];
      }
      userEntry.shippingAddresses.push({ ...address, id: uuidv4() });
    } else if (type === "billing") {
      if (!userEntry.billingAddresses) {
        userEntry.billingAddresses = [];
      }
      userEntry.billingAddresses.push({ ...address, id: uuidv4() });
    }

    await fs.writeFileSync(
      addressFilePath,
      JSON.stringify(usersAddress, null, 2)
    );
  } catch (error) {
    console.error("Error adding address:", error);
    throw new Error("Failed to add address");
  }
  console.timeEnd("Add Address Function Duration");
}
