"use client";

import { getWishlistItems, removeFromWishlist } from "@/actions/WishListAction";
import { useProductContext } from "@/context/ProductContext";
import { useUserContext } from "@/context/UserContext";
import { WishListItems } from "@/types/ProductTypes";
import { generateStarRating } from "@/utils/starRatingsUtils";
import React, { useEffect, useState } from "react";
import ProfileItemsHeader from "./ProfileItemsHeader";

const UserWishlist = () => {
  const { userId, refreshUser } = useUserContext();
  const { products } = useProductContext();
  const [wishlist, setWishlist] = useState<WishListItems[] | null>(null);

  useEffect(() => {
    const checkWishlistItems = async () => {
      if (!userId) return;
      const getWishlist = await getWishlistItems();
      if (getWishlist) {
        setWishlist(getWishlist);
      }
    };
    checkWishlistItems();
  }, [userId]);

  const handleRemove = async (productId: number) => {
    try {
      const findProduct = products.find((product) => product.id === productId);
      if (findProduct) {
        await removeFromWishlist(productId);
        setWishlist(
          (prevWishlist) =>
            prevWishlist?.filter((item) => item.productId !== productId) || []
        );
      }
    } catch (error) {
      console.error("unable to remove the product from wishlist", error);
    }
    refreshUser();
  };

  return (
    <>
      <ProfileItemsHeader title="WishList"/>
      <div className="flex flex-col justify-center items-center">
        {wishlist?.map((list) => {
          const productMatch = products.find(
            (product) => product.id === list.productId
          );
          return (
            <div
              key={productMatch?.id}
              className="my-5 flex md:flex-row flex-col justify-between items-center border rounded-lg p-5 md:space-x-8 md:space-y-0 space-y-4 w-5/6  bg-white"
            >
              <div className="flex justify-center items-center md:flex-row flex-col space-x-4 md:space-y-0 space-y-4">
                <img
                  src={productMatch?.image[0]}
                  alt="Product Image"
                  className="w-36 bg-cover"
                />
                <div>
                  <h1 className="font-bold">
                    Name:{" "}
                    <span className="font-normal">{productMatch?.title}</span>
                  </h1>
                  <h1 className="font-bold">
                    Description:{" "}
                    <span className="font-normal">
                      {productMatch?.description}
                    </span>
                  </h1>
                  <h1 className="font-bold">
                    productMatch:{" "}
                    <span className="font-normal">{productMatch?.brand}</span>
                  </h1>
                  <h1 className="flex items-center font-bold">
                    Ratings:{" "}
                    <span>{generateStarRating(productMatch?.rating ?? 0)}</span>
                  </h1>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  className="p-2 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleRemove(productMatch?.id!)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserWishlist;
