"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProductTypes } from "@/types/ProductTypes";
import {
  getProducts,
  addProduct as serverAddProducts,
  updateProduct as serverUpdateProducts,
  deleteProduct as serverDeleteProducts,
} from "@/actions/ProductActions";

type ProductContextType = {
  products: ProductTypes[];
  addProduct: (newProduct: ProductTypes) => Promise<void>;
  updateProduct: (updatedProduct: ProductTypes) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
  setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>>;

};

type ProductContextProviderProps = {
  children: React.ReactNode;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Context must be used within a ProductProvider");
  }
  return context;
};

export function ProductProvider({ children }: ProductContextProviderProps) {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct: ProductTypes) => {
    try {
      const addedProduct = await serverAddProducts(newProduct);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch (error) {
      console.error("Error adding the product", error);
    }
  };

  const updateProduct = async (updatedProduct: ProductTypes) => {
    try {
      const productUpdate = await serverUpdateProducts(updatedProduct);
      setProducts((prevProduct) =>
        prevProduct.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, ...productUpdate }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating the product", error);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      await serverDeleteProducts(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting a product", error);
    }
  };
  

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        setProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
