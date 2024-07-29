"use client"

import { ProductTypes } from "@/types/ProductTypes";
import ProductCard from "./ProductCard";

interface ProductCategoryProps {
  categoryProducts: ProductTypes[];
  category: string;
}

const ProductCategory = ({ categoryProducts, category }: ProductCategoryProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products in <span className="text-black">{category}</span></h1>
      <div className="flex flex-wrap">
        {categoryProducts?.map((prod) => (
          <ProductCard
          id={prod.id}
          title={prod.title}
          price={prod.price}
          description={prod.description}
          category={prod.category}
          image={prod.image}
          brand={prod.brand}
          rating={prod.rating}
        />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;