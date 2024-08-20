import React, { useState } from "react";

type ReviewProps = {
  handleSubmit: (rating: number, review: string) => void;
};

const ProductReviewForm = ({ handleSubmit }: ReviewProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(rating, review);
    setRating(0);
    setReview("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="container py-4 flex justify-center flex-col items-center"
    >
      <div className="flex flex-col border p-8 lg:w-3/5 w-5/6 mb-6 rounded-lg shadow-xl">
        <div className="flex items-center">
          <h3>Rating :</h3>
          <input
            type="number"
            max={5}
            min={0}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-lg mx-4 px-2 py-1"
          />
          <span className="text-gray-500">Out of 5</span>
        </div>
        <label htmlFor="review">Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
        ></textarea>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ProductReviewForm;
