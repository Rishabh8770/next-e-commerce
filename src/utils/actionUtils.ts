"use server"

import { ProductTypes } from "@/types/ProductTypes";
import fs from "fs";
import path from "path";

const getFilePath = () => path.join(process.cwd(), "src/data", "products.json");

export const readData = (): ProductTypes[] => {
  const filePath = getFilePath();
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

export const writeData = (data: ProductTypes[]) => {
  const filePath = getFilePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const getCategories = (): string[] => {
    // Read JSON data
    const filePath = getFilePath();
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const products: ProductTypes[] = JSON.parse(jsonData);
  
    // Extract unique categories
    const categoriesSet = new Set(products.map(product => product.category));
    return Array.from(categoriesSet);
  };
