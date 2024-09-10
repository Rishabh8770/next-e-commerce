"use client";

import React from "react";
import { ProductTypes } from "@/types/ProductTypes";
import Link from "next/link";
import { generateStarRating } from "@/utils/starRatingsUtils";
import { capitalizeFirstLetter } from "@/utils/helpers";
import WishList from "./WishList";

interface ProductCardProps extends ProductTypes {
  loading?: boolean;
}

const ProductCard = ({
  id,
  brand,
  category,
  price,
  title,
  description,
  rating,
  image,
  loading = false,
  discount,
}: ProductCardProps) => {
  const capitalizedCategoryArray = category.map(capitalizeFirstLetter);
  const capitalizeTitle = title
    .split(" ")
    .map(capitalizeFirstLetter)
    .slice(0, 6)
    .join(" ");

  return (
    <Link href={`/products/${id}`}>
      <div className="flex flex-wrap justify-center gap-6">
        <div
          key={id}
          className="w-64 h-[31rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <WishList productId={id} isProductCard />
            </div>
            <div
              className={`flex justify-end m-2 text-center ${
                (discount === 0 || discount === null) && "hidden"
              }`}
            >
              <p className="text-black p-1 text-xs mb-1 font-semibold border rounded bg-yellow-300">
                {discount}% off
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <img
              src={image[0]}
              alt={title}
              className="h-40 w-40 object-contain p-4 bg-slate-200"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{capitalizeTitle}</h3>
            <p className="text-gray-700 text-sm mb-2">
              {description.split(" ").slice(0, 6).join(" ")}...
            </p>
            <p className="text-gray-500 text-xs mb-1">
              Category: {capitalizedCategoryArray.join(", ")}
            </p>
            <p className="text-gray-500 text-xs mb-1">Brand: {brand}</p>

            <p
              className={`text-gray-400 text-sm mt-2 line-through ${
                (discount === 0 || discount === null) && "hidden"
              }`}
            >
              ₹{price}
            </p>
            <p className="text-black font-semibold text-lg mt-1 ">
              ₹{(price - (price * (discount ?? 0)) / 100).toFixed(2)}{" "}
              <span
                className={`text-sm text-green-500 ${
                  (discount === 0 || discount === null) && "hidden"
                }`}
              >
                ({discount}% off)
              </span>
            </p>
            <div className="flex items-center mt-2">
              {generateStarRating(rating)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
