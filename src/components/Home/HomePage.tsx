"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { useSearchContext } from "@/context/SearchContext";
import LoadingPage from "@/app/loading";
import { Option } from "../common/MultiSelectDropdown";
// import Filter from '../common/FilterProducts';
import { ProductSort, SortOptions } from "../common/productSort";
import Filter from "../common/Filter";
import { getCategories, getBrands, getRatings } from "@/utils/actionUtils";

const HomePage = () => {
  const { products } = useProductContext();
  const { searchQuery } = useSearchContext();
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortOption, setSortOption] =
    useState<SortOptions>("--please select--");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);

  const filterProducts = () => {
    if (sortOption === "Show All") {
      return products;
    }

    return products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const ratingMatch =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => product.rating >= rating);
      return (
        categoryMatch &&
        brandMatch &&
        ratingMatch &&
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    const fetchBrands = async () => {
      try {
        const brandsfetch = await getBrands();
        setBrands(brandsfetch);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    const fetchRatings = async () => {
      try {
        const ratingFetch = await getRatings();
        setRatings(ratingFetch);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
    fetchBrands();
    fetchRatings();
  }, []);

  const sortProducts = (productsToSort: typeof products) => {
    switch (sortOption) {
      case "Price : low to high":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "Price : high to low":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "name":
        return [...productsToSort].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      case "Show All":
        return productsToSort;
      default:
        return productsToSort;
    }
  };

  const filteredAndSortedProducts = sortProducts(filterProducts());

  const handleFilterChange = (
    type: "category" | "brand" | "rating",
    selectedOptions: string[]
  ) => {
    switch (type) {
      case "category":
        setSelectedCategories(selectedOptions);
        break;
      case "brand":
        setSelectedBrands(selectedOptions);
        break;
      case "rating":
        setSelectedRatings(selectedOptions.map((option) => parseFloat(option))); // Convert strings to numbers
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
      <div className="w-full lg:w-1/6 border-y-1 items-center lg:min-h-screen flex flex-col pt-4 bg-gray-800 fixed lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto lg:z-10">
        <div className="text-white">
          <ProductSort onProductSort={handleProductSort} />
        </div>
      <div className="border-t border-gray-300 mb-4 w-3/4 mt-5"></div>
        <div className="self-center mt-5">
          <Filter
            categories={categories}
            brands={brands}
            ratings={ratings}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="w-full lg:w-5/6 lg:pl-1/6 p-4 flex flex-wrap justify-center overflow-y-scroll lg:h-screen">
        {loading ? (
          <LoadingPage />
        ) : (
          filteredAndSortedProducts.map((product) => (
            <div className="m-5" key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
                category={product.category}
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
