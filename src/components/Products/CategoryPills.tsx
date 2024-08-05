import React from "react";

type CategoryProps = {
  categories: string[];
};

export const CategoryPills = ({ categories }: CategoryProps) => {
  return (
    <div className="flex flex-wrap justify-center -mx-2 mb-6">
      {categories.map((category, index) => (
        <div className="text-center" key={index}>
          <div
            key={index}
            className="flex items-center justify-center bg-gray-800 text-white rounded shadow-md m-2 p-2 hover:bg-gray-300 hover:text-black hover:cursor-pointer"
          >{category}</div>
          {/* <p>{category.split(' ').slice(0,1)}</p>
          <p>{category.split(' ').slice(1)}</p> */}
        </div>
      ))}
    </div>
  );
};
