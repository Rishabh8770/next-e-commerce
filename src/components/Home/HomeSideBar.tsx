import React from "react";
import { ProductSort, SortOptions } from "@/components/common/productSort";
import Filter from "@/components/common/FilterProducts";
import SearchProduct from "../common/SearchProduct";
import { ListFilter, SlidersHorizontal } from "lucide-react";
import { Option } from "@/components/common/MultiSelectDropdown";
import { ProductTypes } from "@/types/ProductTypes";

type ViewState = {
  isMobileViewMenu: boolean;
  showCategoryPills: boolean;
};

type ViewType = "isMobileViewMenu" | "showCategoryPills";

interface SidebarProps {
  products: ProductTypes[];
  selectedCategories: Option[] | null;
  selectedBrands: Option[] | null;
  selectedRatings: Option[] | null;
  onFilterChange: (
    type: "category" | "brand" | "rating",
    selectedOptions: Option[] | null
  ) => void;
  onProductSort: (sortProduct: SortOptions) => void;
  onFilterClear: () => void;
  isFiltersSelected: boolean;
  toggleView: (viewType: ViewType) => void;
  view: ViewState;
}

const Sidebar = ({
  products,
  selectedCategories,
  selectedBrands,
  selectedRatings,
  onFilterChange,
  onProductSort,
  onFilterClear,
  isFiltersSelected,
  toggleView,
  view,
}: SidebarProps) => {
  return (
    <div className="w-full border-y-1 items-center lg:min-h-screen flex flex-col pt-4 bg-gray-800  lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto lg:z-10 no-scrollbar">
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
            <ProductSort onProductSort={onProductSort} />
          </div>
          <div className="border-t border-gray-300 mb-4 w-3/4 mt-5"></div>
          <div className="self-center">
            <Filter
              products={products}
              selectedCategories={selectedCategories}
              onCategoryChange={(options) =>
                onFilterChange("category", options)
              }
              selectedBrands={selectedBrands}
              onBrandChange={(options) => onFilterChange("brand", options)}
              selectedRatings={selectedRatings}
              onRatingChange={(options) => onFilterChange("rating", options)}
              handleClearFilters={onFilterClear}
              isFiltersSelected={isFiltersSelected}
            />
          </div>
        </div>
      )}
      <div className="lg:flex justify-center items-center flex-col hidden">
        <div className="text-white">
          <ProductSort onProductSort={onProductSort} />
        </div>
        <div className="border-t border-gray-300 mb-4 w-3/4 mt-5"></div>
        <div className="self-center">
          <Filter
            products={products}
            selectedCategories={selectedCategories}
            onCategoryChange={(options) =>
              onFilterChange("category", options)
            }
            selectedBrands={selectedBrands}
            onBrandChange={(options) => onFilterChange("brand", options)}
            selectedRatings={selectedRatings}
            onRatingChange={(options) => onFilterChange("rating", options)}
            handleClearFilters={onFilterClear}
            isFiltersSelected={isFiltersSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
