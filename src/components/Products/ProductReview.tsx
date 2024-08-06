"use client"

import React from "react";
import { ReviewType } from "@/types/ProductTypes";
import { generateStarRating } from "@/utils/starRatingsUtils";

type ProductReviewProps = {
  reviews: ReviewType[];
}

const ProductReview = ({ reviews }: ProductReviewProps ) => {
  return (
    <div className="container py-4 flex justify-center flex-col items-center">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="flex space-x-4 border p-8 lg:w-3/5 w-5/6 mb-6 rounded-lg shadow-xl">
            <div>
              <img
                src={review.userImage}
                alt="user"
                className="lg:w-12 w-40 rounded-full"
              />
            </div>
            <div>
              <div className="font-semibold">{review.username}</div>
              <div className="text-yellow-500">
                {generateStarRating(review.ratings)}
              </div>
              <div>{review.comment}</div>
            </div>
          </div>
        ))
      ) : (
        <div>No reviews yet.</div>
      )}
    </div>
  );
};

export default ProductReview;
