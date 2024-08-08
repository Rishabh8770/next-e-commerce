// "use client";

// import React, { useState } from "react";
// import { useProductContext } from "@/context/ProductContext";

// interface CategoryFilterProps {
//   categories: string[];
//   brands: string[];
//   ratings: number[];
//   onFilterChange: (
//     type: "category" | "brand" | "rating",
//     selectedOptions: string[]
//   ) => void;
// }

// const CategoryFilter: React.FC<CategoryFilterProps> = ({
//   categories,
//   brands,
//   ratings,
//   onFilterChange,
// }) => {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
//   const [filterType, setFilterType] = useState<"category" | "brand" | "rating">(
//     "category"
//   );
//   const { products } = useProductContext();

//   const handleCheckboxChange = (value: string | number) => {
//     if (filterType === "category") {
//       setSelectedCategories((prev) => {
//         const newSelection = prev.includes(value as string)
//           ? prev.filter((cat) => cat !== value)
//           : [...prev, value as string];
//         onFilterChange("category", newSelection);
//         return newSelection;
//       });
//     } else if (filterType === "brand") {
//       setSelectedBrands((prev) => {
//         const newSelection = prev.includes(value as string)
//           ? prev.filter((brand) => brand !== value)
//           : [...prev, value as string];
//         onFilterChange("brand", newSelection);
//         return newSelection;
//       });
//     } else if (filterType === "rating") {
//       setSelectedRatings((prev) => {
//         const newSelection = prev.includes(value as number)
//           ? prev.filter((rating) => rating !== value)
//           : [...prev, value as number];
//         onFilterChange("rating", newSelection.map(String));
//         return newSelection;
//       });
//     }
//   };

//   const handleClearFilters = () => {
//     setSelectedCategories([]);
//     setSelectedBrands([]);
//     setSelectedRatings([]);
//     onFilterChange("category", []);
//     onFilterChange("brand", []);
//     onFilterChange("rating", []);
//   };

//   const ratingOptions = [2, 3, 4];

//   const isAnyFilterSelected =
//     selectedCategories.length > 0 ||
//     selectedBrands.length > 0 ||
//     selectedRatings.length > 0;

//   return (
//     <div className="flex flex-col items-center space-y-2">
//       <h2 className="text-white mb-4 md:block hidden">
//         Filter by {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
//       </h2>
//       <div className="mb-4 space-x-2 my-2">
//         <button
//           onClick={() => setFilterType("category")}
//           className={`p-2 rounded-md ${
//             filterType === "category" ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           Categories
//         </button>
//         <button
//           onClick={() => setFilterType("brand")}
//           className={`p-2 rounded-md ${
//             filterType === "brand" ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           Brands
//         </button>
//         <button
//           onClick={() => setFilterType("rating")}
//           className={`p-2 rounded-md ${
//             filterType === "rating" ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           Ratings
//         </button>
//         {isAnyFilterSelected && (
//           <button
//             className="bg-red-500 p-2 rounded-md"
//             onClick={handleClearFilters}
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>
//       <div className="flex flex-col flex-wrap mt-10 w-full h-[30rem] content-center">
//         {filterType === "category" &&
//           categories.map((category) => (
//             <div key={category} className="flex items-center text-white">
//               <input
//                 type="checkbox"
//                 id={category}
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleCheckboxChange(category)}
//                 className="mr-2"
//               />
//               <label htmlFor={category}>{category}</label>
//             </div>
//           ))}
//         {filterType === "brand" &&
//           brands.map((brand) => (
//             <div key={brand} className="flex items-center text-white">
//               <input
//                 type="checkbox"
//                 id={brand}
//                 checked={selectedBrands.includes(brand)}
//                 onChange={() => handleCheckboxChange(brand)}
//                 className="mr-2"
//               />
//               <label htmlFor={brand}>{brand}</label>
//             </div>
//           ))}
//         {filterType === "rating" &&
//           ratingOptions.map((rating) => (
//             <div key={rating} className="flex items-center text-white">
//               <input
//                 type="checkbox"
//                 id={`rating-${rating}`}
//                 checked={selectedRatings.includes(rating)}
//                 onChange={() => handleCheckboxChange(rating)}
//                 className="mr-2"
//               />
//               <label htmlFor={`rating-${rating}`}>{`${rating} & above`}</label>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryFilter;
