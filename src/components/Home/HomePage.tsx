"use client";

import React, { useEffect, useState } from "react";
import products from "@/data/products.json";
import ProductCard from "../Products/ProductCard";
import { useProductContext } from "@/context/ProductContext";
import { useSearchContext } from "@/context/SearchContext";
import LoadingPage from "@/app/loading";

const HomePage = () => {
  const { products } = useProductContext();
  const { searchQuery } = useSearchContext();
  const [loading, setLoading] = useState(true);

  function delay(milliSeconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    async function loadData() {
      await delay(2000);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="flex">
      <div className="border w-1/6 min-h-screen">Hello</div>
      <div className="w-5/6 p-4 flex flex-wrap justify-center">
        {loading ? (
          <LoadingPage />
        ) : (
          filteredProducts.map((product) => (
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
