import React, { useState } from "react";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "../products/ProductCard";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import { ERROR_MESSAGE } from "@/utils/errorMessage";

type RecentProductProps = {
  maxProductToShow?: number | null;
};

const RecentlyViewed = ({ maxProductToShow = 10 }: RecentProductProps) => {
  const { products } = useProductContext();
  const [startIndex, setStartIndex] = useState(0);

  const limitedProducts = products.slice(0, maxProductToShow || 10);
  const maxVisibleProducts = 5;

  const endIndex = Math.min(startIndex + maxVisibleProducts, limitedProducts.length);
  const productToDisplay = limitedProducts.slice(startIndex, startIndex + maxVisibleProducts);

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (endIndex < limitedProducts.length) {
      setStartIndex(startIndex + 1);
    }
  };


  return (
    <div className="relative flex items-center">
      {startIndex > 0 && (
        <button onClick={handlePrevClick} className="absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full">
          <MoveLeft color="#ffffff" />
        </button>
      )}
      
      <div className="flex overflow-hidden space-x-4 transition-transform duration-1000 ease-in-out transform">
        {productToDisplay.length > 0 ? (
          productToDisplay.map((product) => (
            <div className="my-5 mx-4 min-w-[200px]" key={product.id}>
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
          ))
        ) : (
          <div className="flex h-screen justify-center items-center text-2xl">
           {ERROR_MESSAGE.productNotFound}
          </div>
        )}
      </div>

      {startIndex + maxVisibleProducts < limitedProducts.length && (
        <button onClick={handleNextClick} className="absolute right-0 z-10 p-2 mx-4 bg-gray-800 text-white rounded-full">
          <MoveRight color="#ffffff" />
        </button>
      )}
      
      {startIndex + maxVisibleProducts >= limitedProducts.length && (
        <Link href="/product-listing" className="ml-4 text-blue-500 hover:underline">
          View More
        </Link>
      )}
    </div>
  );
};

export default RecentlyViewed;
