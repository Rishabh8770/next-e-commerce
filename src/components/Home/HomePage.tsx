"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { useSearchContext } from "@/context/SearchContext";
// import LoadingPage from "@/app/loading";
import { ProductSort, SortOptions } from "@/components/common/productSort";
import Filter from "@/components/common/FilterProducts";
import { getCategories, getBrands, getRatings } from "@/utils/actionUtils";
import { CategoryPills } from "../products/CategoryPills";
import SearchProduct from "../common/SearchProduct";
import { ListFilter, Menu, SlidersHorizontal } from "lucide-react";
import { Option } from "@/components/common/MultiSelectDropdown";
import { Skeleton } from "@nextui-org/react";
import Sidebar from "./HomeSideBar";
import Pagination from "../common/Pagination";
import { NotificationContainer } from "../user/admin/UserFeedback";
import { ERROR_MESSAGE } from "@/utils/errorMessage";

type ViewState = {
  isMobileViewMenu: boolean;
  showCategoryPills: boolean;
};

type ViewType = "isMobileViewMenu" | "showCategoryPills";

const HomePage = () => {
  const { products } = useProductContext();
  const { searchQuery } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const filterProducts = () => {
    return products.filter((product) => {
      const categoryMatch =
        !selectedCategories ||
        selectedCategories.length === 0 ||
        selectedCategories.some((option) =>
          product.category.includes(option.value)
        );
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
      case "Name":
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
  const currentProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
      <div className="lg:w-1/6">
        <Sidebar
          products={products}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          selectedRatings={selectedRatings}
          onFilterChange={handleFilterChange}
          onProductSort={handleProductSort}
          onFilterClear={handleFilterClear}
          isFiltersSelected={isFiltersSelected}
          toggleView={toggleView}
          view={view}
        />
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
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
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
                  discount={product.discount}
                />
              </div>
            ))
          ) : (
            <div className="flex h-screen justify-center items-center text-2xl">
              {ERROR_MESSAGE.productNotFound}
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <NotificationContainer />
    </div>
  );
};

export default HomePage;
