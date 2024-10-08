"use client";

import React, { useMemo } from "react";
import { MultiSelectDropdown, Option } from "./MultiSelectDropdown"; // Adjust the import path
import { ProductTypes } from "@/types/ProductTypes";

type FilterProps = {
  products: ProductTypes[];
  selectedCategories: Option[] | null;
  onCategoryChange: (selectedOptions: Option[] | null) => void;
  selectedBrands: Option[] | null;
  onBrandChange: (selectedOptions: Option[] | null) => void;
  selectedRatings: Option[] | null;
  onRatingChange: (selectedOptions: Option[] | null) => void;
  handleClearFilters: () => void;
  isFiltersSelected: boolean;
};

const Filter = ({
  products,
  selectedCategories,
  onCategoryChange,
  selectedBrands,
  onBrandChange,
  selectedRatings,
  onRatingChange,
  handleClearFilters,
  isFiltersSelected,
}: FilterProps) => {
  const categories = useMemo(
    () => [...new Set(products.flatMap((product) => product.category))],
    [products]
  );
  const brands = useMemo(
    () => [...new Set(products.map((product) => product.brand))],
    [products]
  );
  const ratings = ["2 & above", "3 & above", "4 & above"];

  const ratingOptions = ratings.map((rating) => ({
    value: rating,
    label: rating,
  }));

  return (
    <div className="p-4 flex flex-col items-center m-2">
      <div className="text-md my-2 text-white">Filter By</div>
      <div className="border-t border-gray-300 mb-4 w-3/4"></div>
      <div className="flex flex-col items-center my-2 md:my-0 lg:space-y-2">
        <span className="mt-2 text-white">Category</span>
        <MultiSelectDropdown
          options={categories}
          placeholder="Select Categories"
          onChange={onCategoryChange}
          value={selectedCategories}
          name="categories"
        />
      </div>
      <div className="flex flex-col items-center my-2 md:my-0 lg:space-y-2">
        <span className="mt-2 text-white">Brands</span>
        <MultiSelectDropdown
          options={brands}
          placeholder="Select Brands"
          onChange={onBrandChange}
          value={selectedBrands}
          name="brands"
        />
      </div>
      <div className="flex flex-col items-center my-2 md:my-0 lg:space-y-2">
        <span className="mt-2 text-white">Ratings</span>
        <MultiSelectDropdown
          options={ratingOptions}
          placeholder="Select Ratings"
          onChange={onRatingChange}
          value={selectedRatings}
          name="ratings"
        />
      </div>

      {isFiltersSelected && (
        <button
          className="bg-red-500 p-2 rounded-md mt-4"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default Filter;
