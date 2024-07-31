"use server"

import { ProductTypes } from "@/types/ProductTypes";
import { readData } from "@/utils/actionUtils";

export const getProducts = async (): Promise<ProductTypes[]> => {
  const data = readData();
  return data;
};