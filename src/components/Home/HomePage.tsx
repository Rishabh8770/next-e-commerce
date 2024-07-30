"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { useSearchContext } from "@/context/SearchContext";
import LoadingPage from "@/app/loading";
import { Option } from "../common/MultiSelectDropdown";
import Filter from "../common/FilterProducts";
import { ProductSort, SortOptions } from "../common/productSort";

const HomePage = () => {
  const { products } = useProductContext();
  const { searchQuery } = useSearchContext();
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Option[] | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<Option[] | null>(null);
  const [selectedRatings, setSelectedRatings] = useState<Option[] | null>(null);
  const [sortOption, setSortOption] = useState<SortOptions>("--please select--");

  const filterProducts = () => {
    if (sortOption === "Show All") {
      return products;
    }

    return products.filter((product) => {
      const categoryMatch =
        !selectedCategories ||
        selectedCategories.length === 0 ||
        selectedCategories.some((option) => option.value === product.category);
      const brandMatch =
        !selectedBrands ||
        selectedBrands.length === 0 ||
        selectedBrands.some((option) => option.value === product.brand);
      const ratingMatch =
        !selectedRatings ||
        selectedRatings.length === 0 ||
        selectedRatings.some((option) => {
          const ratingThreshold = parseFloat(option.value.split(" ")[0]);
          return product.rating >= ratingThreshold;
        });
      return (
        categoryMatch &&
        brandMatch &&
        ratingMatch &&
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const sortProducts = (productsToSort: typeof products) => {
    switch (sortOption) {
      case "Price : low to high":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "Price : high to low":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "name":
        return [...productsToSort].sort((a, b) => a.title.localeCompare(b.title));
      case "Show All":
        return productsToSort;
      default:
        return productsToSort;
    }
  };

  const filteredAndSortedProducts = sortProducts(filterProducts());

  const handleFilterChange = (
    type: "category" | "brand" | "rating",
    selectedOptions: Option[] | null
  ) => {
    switch (type) {
      case "category":
        setSelectedCategories(selectedOptions);
        break;
      case "brand":
        setSelectedBrands(selectedOptions);
        break;
      case "rating":
        setSelectedRatings(selectedOptions);
        break;
    }
  };

  const handleProductSort = (sortProduct: SortOptions) => {
    setSortOption(sortProduct);
  };

  function delay(milliSeconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
  }

  useEffect(() => {
    async function loadData() {
      await delay(2000);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="flex">
      <div className="border w-1/6 min-h-screen flex flex-col pt-4">
        <div>
          <ProductSort onProductSort={handleProductSort} />
        </div>
        <div className="border-t border-gray-300 mb-4 w-3/4 self-center"></div>
        <div className="px-4">
          <Filter
            products={products}
            selectedCategories={selectedCategories}
            onCategoryChange={(options) => handleFilterChange("category", options)}
            selectedBrands={selectedBrands}
            onBrandChange={(options) => handleFilterChange("brand", options)}
            selectedRatings={selectedRatings}
            onRatingChange={(options) => handleFilterChange("rating", options)}
          />
        </div>
      </div>
      <div className="w-5/6 p-4 flex flex-wrap justify-center">
        {loading ? (
          <LoadingPage />
        ) : (
          filteredAndSortedProducts.map((product) => (
            <div className="m-5" key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
                brand={product.brand}
                rating={product.rating}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
