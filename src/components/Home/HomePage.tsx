"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { useSearchContext } from "@/context/SearchContext";
import LoadingPage from "@/app/loading";
import { ProductSort, SortOptions } from "@/components/common/productSort";
import Filter from "@/components/common/FilterProducts";
import { getCategories, getBrands, getRatings } from "@/utils/actionUtils";
import { CategoryPills } from "../products/CategoryPills";
import SearchProduct from "../common/SearchProduct";
import { ListFilter, Menu, SlidersHorizontal } from "lucide-react";
import { Option } from "@/components/common/MultiSelectDropdown";

type ViewState = {
  isMobileViewMenu: boolean;
  showCategoryPills: boolean;
};

type ViewType = "isMobileViewMenu" | "showCategoryPills";

const HomePage = () => {
  const { products } = useProductContext();
  const { searchQuery } = useSearchContext();
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<Option[] | null>(
    null
  );
  const [selectedBrands, setSelectedBrands] = useState<Option[] | null>(null);
  const [selectedRatings, setSelectedRatings] = useState<Option[] | null>(null);
  const [sortOption, setSortOption] = useState<SortOptions>("Show All");
  const [categories, setCategories] = useState<string[]>([]);

  const [view, setView] = useState<ViewState>({
    isMobileViewMenu: false,
    showCategoryPills: false,
  });

  const filterProducts = () => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    /* const fetchBrands = async () => {
      try {
        const brandsfetch = await getBrands();
        setBrands(brandsfetch);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    const fetchRatings = async () => {
      try {
        const ratingFetch = await getRatings();
        setRatings(ratingFetch);
      } catch (error) {
        console.error("Failed to fetch ratings:", error);
      }
    }; */

    fetchCategories();
    // fetchBrands();
    // fetchRatings();
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

  const toggleView = (viewType: ViewType) => {
    setView((prevView) => ({
      ...prevView,
      [viewType]: !prevView[viewType],
    }));
  };

  const isFiltersSelected =
    (selectedBrands && selectedBrands.length > 0) ||
    (selectedCategories && selectedCategories.length > 0) ||
    (selectedRatings && selectedRatings.length > 0) ||
    false;

  const handleFilterClear = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedRatings([]);
  };
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="w-full lg:w-1/6 border-y-1 items-center lg:min-h-screen flex flex-col pt-4 bg-gray-800  lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto lg:z-10 no-scrollbar">
        <div className="flex flex-col justify-center items-center">
          <div className="md:hidden block mb-4">
            <SearchProduct />
          </div>
          <div className="flex space-x-4 lg:hidden">
            <div className="mb-4">
              <button
                onClick={() => toggleView("isMobileViewMenu")}
                className="text-white bg-gray-900 p-2 rounded flex space-x-2 border border-gray-500"
              >
                <SlidersHorizontal color="#f7f2f2" />
                <h1>Filters</h1>
              </button>
            </div>
            <div className="text-white">
              <button
                onClick={() => toggleView("showCategoryPills")}
                className="bg-gray-900 p-2 rounded flex space-x-2 border border-gray-500"
              >
                <ListFilter color="#f7f2f2" />
                <h1>Categories</h1>
              </button>
            </div>
          </div>
        </div>

        {view.isMobileViewMenu && (
          <div className="flex flex-col items-center lg:hidden w-full p-4 bg-gray-700 slide-down">
            <div className="text-white">
              <ProductSort onProductSort={handleProductSort} />
            </div>
            <div className="border-t border-gray-300 mb-4 w-3/4 mt-5"></div>
            <div className="self-center">
              <Filter
                products={products}
                selectedCategories={selectedCategories}
                onCategoryChange={(options) =>
                  handleFilterChange("category", options)
                }
                selectedBrands={selectedBrands}
                onBrandChange={(options) =>
                  handleFilterChange("brand", options)
                }
                selectedRatings={selectedRatings}
                onRatingChange={(options) =>
                  handleFilterChange("rating", options)
                }
                handleClearFilters={handleFilterClear}
                isFiltersSelected={isFiltersSelected}
              />
            </div>
          </div>
        )}
        <div className="lg:flex justify-center items-center flex-col hidden">
          <div className="text-white">
            <ProductSort onProductSort={handleProductSort} />
          </div>
          <div className="border-t border-gray-300 mb-4 w-3/4 mt-5"></div>
          <div className="self-center">
            <Filter
              products={products}
              selectedCategories={selectedCategories}
              onCategoryChange={(options) =>
                handleFilterChange("category", options)
              }
              selectedBrands={selectedBrands}
              onBrandChange={(options) => handleFilterChange("brand", options)}
              selectedRatings={selectedRatings}
              onRatingChange={(options) =>
                handleFilterChange("rating", options)
              }
              handleClearFilters={handleFilterClear}
              isFiltersSelected={isFiltersSelected}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden block">
        {view.showCategoryPills && (
          <div className="flex flex-col items-center">
            <div className="slide">
              <CategoryPills categories={categories} />
            </div>
            <div className="border-t border-gray-300 mb-4 w-3/4 mt-2"></div>
          </div>
        )}
      </div>
      <div className="w-full lg:w-5/6 lg:pl-1/6 p-4">
        <div className="lg:block hidden">
          <CategoryPills categories={categories} />
        </div>
        <div className="flex flex-wrap justify-center overflow-y-scroll lg:h-screen no-scrollbar">
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
    </div>
  );
};

export default HomePage;
