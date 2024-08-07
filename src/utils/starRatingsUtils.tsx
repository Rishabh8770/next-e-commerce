import React from "react";

export const generateStarRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 "
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ color: "#facc15" }}
        >
          <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
        </svg>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ color: "#d1d5db" }}
        >
          <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
        </svg>
      ))}
    </div>
  );
};
