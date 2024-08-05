"use server";

import { ProductTypes } from "@/types/ProductTypes";
import { readData, writeData } from "@/utils/actionUtils";

export const getProducts = async (): Promise<ProductTypes[]> => {
  const data = readData();
  return data;
};

export const addProduct = async (
  newProduct: ProductTypes
): Promise<ProductTypes> => {
  const data = readData();
  data.push(newProduct);
  writeData(data);
  return newProduct;
};

export const updateProduct = (updatedProduct: ProductTypes): ProductTypes => {
  const products = readData();
  const index = products.findIndex(
    (product) => product.id === updatedProduct.id
  );
  if (index !== -1) {
    products[index] = updatedProduct;
    writeData(products);
  }
  return updatedProduct;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const products = await readData();
    if (!Array.isArray(products)) {
      throw new TypeError("readData() did not return an array");
    }

    const updatedProducts = products.filter((product) => product.id !== productId);
    writeData(updatedProducts);
  } catch (error) {
    console.error("Error deleting the product", error);
  }
};

