"use client";

import productData from "@/data/products.json";
import Carousel from "@/components/common/ImageCarousel";
import AddToCart from "@/components/cart/AddToCart";
import { ArrowLeft } from "lucide-react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import ProductReview from "./ProductReview";
import { generateStarRating } from "@/utils/starRatingsUtils";
import { NotificationContainer } from "../user/admin/UserFeedback";

function ProductDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  let product = productData.find(
    (product) => product.id.toString() === params.id
  );
  if (!product) {
    return <div>Product not found</div>;
  }

  const bulletPoints = product.description
    .split(/[|.,@]\s*/)
    .map((point, index) => (
      <li key={index} className="mb-2">
        {point}
      </li>
    ));

  const handleArrowClick = useCallback(() => {
    router.push("/product-listing");
  }, [router]);

  return (
    <div className="overflow-y-scroll">
      <div className="p-5">
        <ArrowLeft
          onClick={handleArrowClick}
          className="cursor-pointer size-10 p-1"
        />
      </div>
      <div className="py-18 h-auto flex items-center justify-center">
        <div className="container p-8 m-4 flex lg:flex-row flex-col justify-center items-center lg:items-start space-x-5 shadow-xl rounded-md">
          <div className="w-full lg:w-1/2 flex flex-col rounded p-2">
            <Carousel images={product.image} />
          </div>
          <div className="lg:w-1/2 pl-6 lg:border-l-1">
            <h1 className="lg:text-3xl text-sm font-bold my-4">
              {product.title}
            </h1>
            <span
              className={`mb-4 font-semibold ${
                product.discount !== 0 || product.discount !== null
                  ? "line-through text-md text-gray-400"
                  : "text-lg"
              }`}
            >
              ₹{product.price}{" "}
            </span>
            <span
              className={`mx-2 font-semibold ${
                (product.discount === 0 || product.discount === null) &&
                "hidden"
              }`}
            >
              ₹
              {(
                product.price -
                (product.price * (product.discount ?? 0)) / 100
              ).toFixed(2)}{" "}
            </span>
            <span
              className={`${
                product.discount === 0 || product.discount === null
                  ? "hidden"
                  : "text-green-500 font-semibold"
              }`}
            >
              ({product.discount}% off)
            </span>
            <div className="mb-4">
              <div className="flex items-center mt-2">
                {generateStarRating(product.rating)}
              </div>
            </div>
            <ul className="list-disc pl-5">{bulletPoints}</ul>
            <div className="my-10 -bottom-4 flex lg:justify-start justify-center items-center">
              <AddToCart productId={product.id} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-4 text-center">
        <h1
          className={`text-3xl flex justify-center items-center ${
            product.reviews ? "font-semibold" : "font-normal"
          }`}
        >
          {product.reviews && product.reviews?.length > 0
            ? "People who also reviewed this product"
            : "No reviews yet."}
        </h1>
      </div>
      <div className="flex justify-center">
        {product.reviews && <ProductReview reviews={product.reviews} />}
      </div>
      <NotificationContainer />
    </div>
  );
}

export default ProductDetails;
