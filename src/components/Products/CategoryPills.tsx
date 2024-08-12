"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helpers";

type CategoryProps = {
  categories: string[];
};

export const CategoryPills = ({ categories }: CategoryProps) => {
  const router = useRouter();
  const uniqueCategories = Array.from(new Set(categories.flat()));
  const capitalizeCategory = uniqueCategories.map(capitalizeFirstLetter)

  return (
    <div className="flex flex-wrap justify-center -mx-2 mb-6">
      {capitalizeCategory.map((category, index) => (
        <div className="text-center" key={index}>
          <div
            onClick={() =>
              router.push(
                `/category/${encodeURIComponent(
                  category.charAt(0).toLowerCase() + category.slice(1)
                )}`
              )
            }
            className="flex items-center justify-center bg-gray-800 text-white rounded shadow-md m-2 p-2 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
          >
            {category}
          </div>
        </div>
      ))}
    </div>
  );
};
