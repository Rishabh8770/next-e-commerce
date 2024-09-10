"use client";

import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from "@/actions/WishListAction";
import { useUserContext } from "@/context/UserContext";
import { WishListItems } from "@/types/ProductTypes";
import {
  notifyWishlistError,
  notifyWishlistSuccess,
  notifyWishlistWarn,
} from "@/utils/NotificationUtils";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

type WishlistProp = WishListItems & {
  isProductCard?: boolean;
};

const WishList = ({ productId, isProductCard }: WishlistProp) => {
  const { userId, refreshUser } = useUserContext();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfInWishlist = async () => {
      if (!userId) return;
      const wishList: WishListItems[] = await getWishlistItems();
      const isInWishlist = wishList.some(
        (item) => item.productId === productId
      );
      setIsLiked(isInWishlist);
    };

    checkIfInWishlist();
  }, [userId, productId]);

  const toggleWishList = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
        // throw new Error("Testing error")  //For Error toast testing purpose
      if (isLiked) {
        await removeFromWishlist(productId);
        notifyWishlistWarn();
        setIsLiked(false);
      } else {
        await addToWishlist(productId);
        notifyWishlistSuccess();
        setIsLiked(true);
      }
    } catch (error) {
      notifyWishlistError();
      console.error("Error adding the product to Wishlist", error);
    }
    refreshUser();
  };

  return (
    <div
      className={`flex justify-center items-center ${
        isProductCard ? "border-none" : "border rounded mx-5"
      }`}
    >
      <button
        className="p-2 flex justify-center items-center space-x-2"
        onClick={toggleWishList}
      >
        <Heart
          color="#000000"
          strokeWidth={0.75}
          className={`${isLiked ? "fill-red-400" : "fill-white text-black"}`}
        />
        <h1 className="px-1">
          {isLiked
            ? `${isProductCard ? "" : "Remove from wishlist"}`
            : `${isProductCard ? "" : "Add to wishlist"}`}
        </h1>
      </button>
    </div>
  );
};

export default WishList;
