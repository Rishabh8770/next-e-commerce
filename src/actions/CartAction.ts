"use server";

import fs from "fs";
import path from "path";
import { CartItem } from "@/types/ProductTypes";
import { cookies } from "next/headers";
import productData from '@/data/products.json'

const cartFilePath = path.join(process.cwd(), "src/data/cart.json");
const filePath = path.join(process.cwd(), "src/data/users.json");

export const getCartItems = async (): Promise<CartItem[]> => {
  const userId = cookies().get("userId")?.value;
  const getAllDetails = cookies().getAll();
  console.log("this is the details::", getAllDetails);

  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const user = users.find(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (user) {
        return user.cart || [];
      }
    }

    const data = fs.readFileSync(cartFilePath, "utf-8");
    return JSON.parse(data) as CartItem[];
  } catch (error) {
    console.error("Error getting cart items:", error);
    return [];
  }
};

export const saveCartItems = async (cartItems: CartItem[]): Promise<void> => {
  const userId = cookies().get("userId")?.value;

  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const userIndex = users.findIndex(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (userIndex !== -1) {
        users[userIndex].cart = cartItems;
        await fs.writeFileSync(
          filePath,
          JSON.stringify(users, null, 2),
          "utf-8"
        );
      }
    } else {
      await fs.writeFileSync(
        cartFilePath,
        JSON.stringify(cartItems, null, 2),
        "utf-8"
      );
    }
  } catch (error) {
    console.error("Error saving cart items:", error);
  }
};

export const addToCart = async (id: number): Promise<CartItem[]> => {
  const userId = cookies().get("userId")?.value;

  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const user = users.find(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (user) {
        user.cart = user.cart || [];

        const itemIndex = user.cart.findIndex(
          (item: CartItem) => item.id === id
        );
        if (itemIndex === -1) {
          const item = productData.find((i) => i.id === id);
          if (item) {
            user.cart.push({
              id,
              quantity: 1,
              pricePerQuantity: item.price,
              productTotal: item.price, 
              discount: item.discount || 0,
            });
          }
        } else {
          user.cart[itemIndex].quantity += 1;
          const item = productData.find((i) => i.id === id);
          if (item) {
            user.cart[itemIndex].pricePerQuantity = item.price;
            user.cart[itemIndex].productTotal = user.cart[itemIndex].quantity * item.price;
            user.cart[itemIndex].discount = item.discount || 0;
          }
        }

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      }
    } else {
      let cartItems = await getCartItems();
      const itemIndex = cartItems.findIndex((item: CartItem) => item.id === id);
      const item = productData.find((i) => i.id === id);

      if (itemIndex === -1 && item) {
        cartItems.push({
          id,
          quantity: 1,
          pricePerQuantity: item.price,
          productTotal: item.price,
          discount: item.discount || 0,
        });
      } else if (item) {
        cartItems[itemIndex].quantity += 1;
        cartItems[itemIndex].pricePerQuantity = item.price;
        cartItems[itemIndex].productTotal = cartItems[itemIndex].quantity * item.price;
        cartItems[itemIndex].discount = item.discount || 0;
      }

      await saveCartItems(cartItems);
    }

    return await getCartItems();
  } catch (error) {
    console.error("Error adding to cart:", error);
    return [];
  }
};


export const removeFromCart = async (id: number): Promise<CartItem[]> => {
  const userId = cookies().get("userId")?.value;

  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const user = users.find(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (user) {
        user.cart = user.cart || [];
        user.cart = user.cart.filter((item: CartItem) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      }
    } else {
      let cartItems = await getCartItems();
      cartItems = cartItems.filter((item: CartItem) => item.id !== id);
      await saveCartItems(cartItems);
    }

    return await getCartItems();
  } catch (error) {
    console.error("Error removing from cart:", error);
    return [];
  }
};

export const updateCartItem = async (
  id: number,
  quantity: number
): Promise<CartItem[]> => {
  const userId = cookies().get("userId")?.value;

  try {
    let cartItems = await getCartItems();

    if (userId) {
      const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const user = users.find(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (user) {
        user.cart = user.cart || [];
        const itemIndex = user.cart.findIndex(
          (item: CartItem) => item.id === id
        );
        if (itemIndex !== -1) {
          if (quantity === 0) {
            user.cart.splice(itemIndex, 1);
          } else {
            user.cart[itemIndex].quantity = quantity;
          }
        }
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      }
    } else {
      const itemIndex = cartItems.findIndex((item: CartItem) => item.id === id);
      if (itemIndex !== -1) {
        if (quantity === 0) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity = quantity;
        }
      }
      await saveCartItems(cartItems);
    }

    return await getCartItems();
  } catch (error) {
    console.error("Error updating cart item:", error);
    return [];
  }
};

export const deleteCart = async (): Promise<CartItem[]> => {
  const cartItems: CartItem[] = [];
  await saveCartItems(cartItems);
  return cartItems;
};
