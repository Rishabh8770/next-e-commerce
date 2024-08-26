"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { CartItem } from "@/types/ProductTypes";

const filePath = path.join(process.cwd(), "src/data", "users.json");
const cartFilePath = path.join(process.cwd(), "src/data/cart.json");

export async function LoginUser(email: string, password: string) {
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const cartItems = JSON.parse(fs.readFileSync(cartFilePath, "utf-8"));

  const user = users.find(
    (user: { email: string; password: string }) =>
      user.email === email && user.password === password
  );

  if (user) {
    cookies().set({
      name: "userId",
      value: user.id.toString(),
      httpOnly: false,
      maxAge: 3 * 60 * 60,
      path: "/",
    });

    console.log("User logged in, userId cookie set:", user.id);

    if (cartItems.length > 0) {
      const userCart = user.cart || [];
      cartItems.forEach((item: CartItem) => {
        const existingItem = userCart.find((i: CartItem) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          userCart.push(item);
        }
      });
      user.cart = userCart;

      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      fs.writeFileSync(cartFilePath, JSON.stringify([], null, 2));
    }

    return { success: true, userId: user.id };
  } else {
    return { success: false, message: "Invalid email or password" };
  }
}

export async function SignupUser(
  name: string,
  email: string,
  password: string
) {
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const existingUser = users.find(
    (user: { name: string; email: string }) =>
      user.email === email || user.name === name
  );

  if (existingUser) {
    return { success: false, message: "Username or Email already exists" };
  } else {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
    };
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    console.log("New user signed up, userId cookie set:", newUser.id);

    return { success: true, userId: newUser.id };
  }
}

export const Logout = async () => {
  cookies().set({
    name: "userId",
    value: "",
    httpOnly: true,
    maxAge: -1,
    path: "/",
  });
  console.log("User logged out, userId cookie cleared");
  
};

export async function ValidateUser() {
  const userId = cookies().get("userId")?.value;
  console.log("this is the id in server::", userId)

  if (!userId) {
    console.warn("No userId cookie found");
  } else {
    console.log("userId cookie found:", userId);
  }

  return userId;
}
