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
import { notifyLoginWarn } from "@/utils/NotificationUtils";
import { NotificationContainer } from "../user/admin/UserFeedback";
import WishList from "./WishList";

function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const foundProduct = productData.find(
      (product) => product.id.toString() === params.id
    );
    setProduct(foundProduct || null);

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
      notifyLoginWarn();
      const currentUrl = encodeURIComponent(window.location.href);
      setTimeout(() => {
        router.push(`/login?redirect=${currentUrl}`);
      }, 2000);
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
      setProduct(updatedProduct);
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
          <div className="lg:w-1/2 md:pl-6 pl-0 lg:border-l-1">
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
            <div className="my-10 -bottom-4 flex md:flex-row flex-col md:space-y-0 space-y-2 lg:justify-start justify-center items-center">
              <AddToCart productId={product.id} />
              <WishList productId={product.id} isProductCard={false} />
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
      <NotificationContainer />
    </div>
  );
}

export default ProductDetails;
