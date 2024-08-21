"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import productData from "@/data/products.json";
import userData from "@/data/users.json";
import Carousel from "@/components/common/ImageCarousel";
import AddToCart from "@/components/cart/AddToCart";
import { ArrowLeft } from "lucide-react";
import ProductReview from "./ProductReview";
import { generateStarRating } from "@/utils/starRatingsUtils";
import ProductReviewForm from "./ProductReviewForm";
import { SaveProductReview } from "@/actions/ProductActions";
import { ValidateUser } from "@/actions/LoginAndSignUpAction";
import { ProductTypes, User } from "@/types/ProductTypes";

function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null >(null);
  const router = useRouter();

  useEffect(() => {
    // Find the product based on params.id
    const foundProduct = productData.find(
      (product) => product.id.toString() === params.id
    );
    setProduct(foundProduct || null);

    // Validate user on client-side
    const findUser = async () => {
      const userId = await ValidateUser();
      const user = userId
        ? userData.find((user) => user.id.toString() === userId)
        : null;
      setLoggedInUser(user || null);
    };
    findUser();
  }, [params.id]);

  const handleArrowClick = useCallback(() => {
    router.push("/product-listing");
  }, [router]);

  const handleSubmit = async (rating: number, review: string) => {
    if (!loggedInUser) {
      console.error("User is not logged in");
      const currentUrl = encodeURIComponent(window.location.href);
      router.push(`/login?redirect=${currentUrl}`);
      return;
    }

    if (product) {
      const newReview = {
        userImage: "/no-image.png",
        username: loggedInUser.name,
        ratings: rating,
        comment: review,
      };

      const updatedProduct = {
        ...product,
        reviews: [...(product.reviews || []), newReview],
      };

      await SaveProductReview(product.id.toString(), updatedProduct);
      setProduct(updatedProduct); // Update state with new review
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const bulletPoints = product.description
    .split(/[|.,@]\s*/)
    .map((point: string, index: number) => (
      <li key={index} className="mb-2">
        {point}
      </li>
    ));

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
              ₹{product.price}
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
              ).toFixed(2)}
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
          {product.reviews && product.reviews.length > 0
            ? "People who also reviewed this product"
            : "No reviews yet."}
        </h1>
      </div>
      <div className="flex justify-center">
        <ProductReviewForm handleSubmit={handleSubmit} />
      </div>
      <div className="flex justify-center">
        {product.reviews && <ProductReview reviews={product.reviews} />}
      </div>
    </div>
  );
}

export default ProductDetails;
