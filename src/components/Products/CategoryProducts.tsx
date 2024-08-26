"use client";

import ProductCard from "@/components/products/ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const CategoryProducts = () => {
  const { category } = useParams();
  const { products } = useProductContext();
  const router = useRouter();

  const categoryString = Array.isArray(category) ? category[0] : category;
  const decodedCategory = categoryString
    ? decodeURIComponent(categoryString).trim().toLowerCase()
    : "";

  const filterCategoryProducts = products.filter((product) =>
    product.category.some((cat) =>
      cat.trim().toLowerCase().includes(decodedCategory)
    )
  );

  const handleClick = () => {
    router.push("/product-listing");
  };

  return (
    <>
      <div className="p-8 flex items-center space-x-4">
        <ArrowLeft onClick={handleClick} className="cursor-pointer" />
        <div>
          <h1 className="font-semibold text-3xl">
            {decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)}
          </h1>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col my-8">
        <div className="flex flex-wrap justify-center items-center w-5/6">
          {filterCategoryProducts.map((product) => (
            <div key={product.id} className="m-4">
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
                category={product.category}
                brand={product.brand}
                rating={product.rating}
                discount={product.discount}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;
