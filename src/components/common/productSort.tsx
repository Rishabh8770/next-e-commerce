"use client"

import React, { useState } from 'react';

export type SortOptions = "Price : low to high" | "Price : high to low" | "name" | "Show All";

type ProductSortProps = {
  onProductSort: (filter: SortOptions) => void;
}

export const ProductSort = ({ onProductSort }: ProductSortProps) => {
  const [selectedSort, setSelectedSort] = useState<SortOptions>("Show All");

  const sortOptions: SortOptions[] = ["Show All", "name", "Price : low to high", "Price : high to low"];

  const handleSortChange = (option: SortOptions) => {
    setSelectedSort(option);
    onProductSort(option);
  };

  return (
    <div className='flex flex-col items-center space-y-2 mb-4'>
      <h2 className="text-white mb-1">Sort By</h2>
      <div className='border-t w-1/2 pb-2'></div>
      <div className="flex flex-col mt-10">
        {sortOptions.map((option) => (
          <div key={option} className="flex items-center text-white">
            <input
              type="checkbox"
              id={option}
              checked={selectedSort === option}
              onChange={() => handleSortChange(option)}
              className="mr-2"
            />
            <label htmlFor={option} className="text-white">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

