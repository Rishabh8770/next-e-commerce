import { useSearchContext } from "@/context/SearchContext";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

import React from "react";

const SearchProduct = () => {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const pathName = usePathname();
  return (
    <div
      className={`flex justify-center mx-3 items-center relative ${
        pathName === "/" && "hidden"
      }`}
    >
      <Search
        color="#a29a9a"
        size={20}
        strokeWidth={1.5}
        className="absolute left-2"
      />
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-lg pl-8 py-2 bg-side-sidebar-bg border border-gray-500 text-white w-full"
      />
    </div>
  );
};

export default SearchProduct;
