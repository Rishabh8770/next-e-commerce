import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="w-64 h-[26rem] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
