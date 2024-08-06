"use client"

import React from "react";
import { ReviewType } from "@/types/ProductTypes";

type ProductReviewProps = {
  reviews: ReviewType[];
}

const ProductReview = ({ reviews }: ProductReviewProps ) => {
  return (
    <div className="container py-4 flex justify-center flex-col items-center">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="flex space-x-4 border p-8 w-3/5 mb-6 rounded-lg shadow-xl">
            <div>
              <img
                src={review.userImage}
                alt="user"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <div className="font-semibold">{review.username}</div>
              <div className="text-yellow-500">
                {[...Array(Math.floor(review.ratings))].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
                  </svg>
                ))}
                {[...Array(5 - Math.floor(review.ratings))].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 inline-block text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
                  </svg>
                ))}
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
