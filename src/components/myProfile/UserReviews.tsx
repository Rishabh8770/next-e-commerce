"use client";

import { useProductContext } from "@/context/ProductContext";
import { useUserContext } from "@/context/UserContext";
import React from "react";
import users from "@/data/users.json";
import { generateStarRating } from "@/utils/starRatingsUtils";
import { ERROR_MESSAGE } from "@/utils/errorMessage";
import ProfileItemsHeader from "./ProfileItemsHeader";
import Link from "next/link";

const UserReviews = () => {
  const { userId } = useUserContext();
  const { products } = useProductContext();

  if (!userId) {
    return <h1>{ERROR_MESSAGE.userNotFound}</h1>;
  }

  const findUser = users.find((user) => user.id === userId);
  console.log("user is ::", findUser);
  

  if (!findUser) {
    return <h1>{ERROR_MESSAGE.userNotFound}</h1>;
  }

  const userReviews = products.flatMap(
    (product) =>
      product.reviews
        ?.filter((review) => review.username === findUser.name)
        .map((review) => ({
          comment: review.comment,
          image: product.image[0],
          description: product.description,
          name: product.title,
          rating: product.rating,
          id: product.id
        })) || []
  );


  console.log("these are reviews::", userReviews);

  if (userReviews.length === 0) {
    return <h1 className="mt-4 text-xl">{ERROR_MESSAGE.noReviews}</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ProfileItemsHeader title="Reviews" />
      <div className="p-6 m-8 border rounded-lg bg-gray-100 w-5/6">
        <div>
          <h1 className="text-3xl">My Reviews & Ratings</h1>
          <div className="border-b-gray-600 border-b-1 border-dashed my-4"></div>
        </div>
        {userReviews.map((review, index) => (
          <Link href={`/products/${review.id}`}>
            <div
              key={index}
              className="my-5 flex border rounded-lg p-5 space-x-8 items-center  bg-white"
            >
              <div>
                <img
                  src={review.image}
                  alt="Product Image"
                  className="w-36 bg-cover"
                />
              </div>
              <div>
                <h1 className="font-bold">
                  Name: <span className="font-normal">{review.name}</span>
                </h1>
                <h1 className="font-bold">
                  Description:{" "}
                  <span className="font-normal">{review.description}</span>
                </h1>
                <h1 className="font-bold">
                  Review: <span className="font-normal">{review.comment}</span>
                </h1>
                <h1 className="flex items-center font-bold">
                  Ratings: <span>{generateStarRating(review.rating)}</span>
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
