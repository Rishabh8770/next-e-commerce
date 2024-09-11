"use client";

import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from "@/actions/WishListAction";
import { useUserContext } from "@/context/UserContext";
import { WishListItems } from "@/types/ProductTypes";
import {
  notifyLoginWarn,
  notifyWishlistError,
  notifyWishlistSuccess,
  notifyWishlistWarn,
} from "@/utils/NotificationUtils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type WishlistProp = WishListItems & {
  isProductCard?: boolean;
};

const WishList = ({ productId, isProductCard }: WishlistProp) => {
  const { userId, refreshUser } = useUserContext();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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
    setIsDisabled(true);

    try {
      // throw new Error("Testing error")  //For Error toast testing purpose
      if (userId) {
        if (isLiked) {
          await removeFromWishlist(productId);
          notifyWishlistWarn();

          setIsLiked(false);
        } else {
          await addToWishlist(productId);
          notifyWishlistSuccess();
          setIsLiked(true);
        }
      } else {
        notifyLoginWarn("wishlist")
        const currentUrl = encodeURIComponent(window.location.href);
        setTimeout(() => {
          router.push(`/login?redirect=${currentUrl}`);
        }, 2000);
      }
    } catch (error) {
      notifyWishlistError();
      console.error("Error adding the product to Wishlist", error);
    }
    refreshUser();

    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return (
    <div
      className={`flex justify-center items-center ${
        isProductCard ? "border-none" : "border rounded mx-5"
      }`}
    >
      <button
        className={`p-2 flex justify-center items-center space-x-2 ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={toggleWishList}
        disabled={isDisabled}
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
