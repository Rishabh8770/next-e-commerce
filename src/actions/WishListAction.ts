"use server";

import { CartItem, WishListItems } from "@/types/ProductTypes";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import productData from "@/data/products.json";

const FILE_PATH = path.join(process.cwd(), "src/data", "users.json");

export const getWishlistItems = async (): Promise<WishListItems[]> => {
  const userId = cookies().get("userId")?.value;
  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));

      const user = users.find(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (user) {
        return user.wishList || [];
      }
    }

    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error getting wishlist items:", error);
    return [];
  }
};

export const saveWishList = async (
  wishList: WishListItems[]
): Promise<void> => {
  const userId = cookies().get("userId")?.value;

  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
      const userIndex = users.findIndex(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (userIndex !== -1) {
        users[userIndex].wishList = wishList;
        await fs.writeFileSync(
          FILE_PATH,
          JSON.stringify(users, null, 2),
          "utf-8"
        );
      }
    }
  } catch (error) {
    console.error("Error saving wishlist items:", error);
  }
};

export const addToWishlist = async (
  productId: number
): Promise<WishListItems[]> => {
  const userId = cookies().get("userId")?.value;

  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
      const user = users.find(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (user) {
        user.wishList = user.wishList || [];

        const itemIndex = user.wishList.findIndex(
          (item: WishListItems) => item.productId === productId
        );
        if (itemIndex === -1) {
          const item = productData.find((i) => i.id === productId);
          if (item) {
            user.wishList.push({
              productId,
            });
          }
        }

        fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
      }
    } else {
      let wishListItems = await getWishlistItems();
      const itemIndex = wishListItems.findIndex(
        (item: WishListItems) => item.productId === productId
      );
      const item = productData.find((i) => i.id === productId);

      if (itemIndex === -1 && item) {
        wishListItems.push({
          productId,
        });
      }
      await saveWishList(wishListItems);
    }

    return await getWishlistItems();
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return [];
  }
};

export const removeFromWishlist = async (
  id: number
): Promise<WishListItems[]> => {
  const userId = cookies().get("userId")?.value;
  try {
    if (userId) {
      const users = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
      const user = users.find(
        (user: { id: number }) => user.id.toString() === userId
      );

      if (user) {
        user.wishList = user.wishList || [];
        user.wishList = user.wishList.filter(
          (item: WishListItems) => item.productId !== id
        );
        fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
      }
    }
    return await getWishlistItems();
  } catch (error) {
    console.error("Error removing from cart:", error);
    return [];
  }
};
