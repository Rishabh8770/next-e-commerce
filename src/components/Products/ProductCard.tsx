"use client"

import React from "react";
import { ProductTypes } from "@/types/ProductTypes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingPage from "@/app/loading";

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
}: ProductCardProps) => {
  const router = useRouter();
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <Link href={`/products/${id}`}>
      <div className="flex flex-wrap justify-center gap-6">
        <div
          key={id}
          className="w-64 h-[26rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="w-full flex justify-center">
            <img
              src={image[0]}
              alt={title}
              className="h-40 w-40 object-contain p-4 bg-slate-200"
              style={{ backgroundColor: "transparent" }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 text-sm mb-2">
              {description.split(" ").slice(0, 6).join(" ")}...
            </p>
            <p className="text-gray-500 text-xs mb-1">Category: {category}</p>
            <p className="text-gray-500 text-xs mb-1">Brand: {brand}</p>
            <p className="text-gray-900 font-bold text-lg mt-2">${price}</p>
            <div className="flex items-center mt-2">
              {[...Array(Math.floor(rating))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
                </svg>
              ))}
              {[...Array(5 - Math.floor(rating))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
