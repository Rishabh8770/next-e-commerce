import { ProductTypes } from "@/types/ProductTypes";
import { readData, writeData } from "@/utils/actionUtils";

export const getProducts = async (): Promise<ProductTypes[]> => {
  const data = readData();
  return data;
};

export const addProduct = async (
  newProduct: ProductTypes
): Promise<ProductTypes> => {
  const data = await readData();
  const newId = Date.now();
  newProduct.id = newId;
  data.push(newProduct);
  writeData(data);
  return newProduct;
};

export const updateProduct = async (
  updatedProduct: ProductTypes
): Promise<ProductTypes> => {
  const products = await readData();
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
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    writeData(updatedProducts);
  } catch (error) {
    console.error("Error deleting the product", error);
  }
};

export async function formAction(
  formData: FormData,
  isEditMode: boolean,
  productId: number | null,
  setProducts: React.Dispatch<React.SetStateAction<ProductTypes[]>>
) {
  const newProductName = formData.get("name") as string;
  const description = formData.get("description") as string;
  const selectCategory = formData.getAll("category") as string[];
  const selectBrand = formData.getAll("brand") as string[];
  const price = parseFloat(formData.get("price") as string);
  const images = [
    formData.get("image1") as string,
    formData.get("image2") as string,
    formData.get("image3") as string,
  ].filter(Boolean);

  if (
    (isEditMode && productId) ||
    (newProductName && selectCategory.length > 0 && selectBrand.length > 0)
  ) {
    const products = await readData();
    let productData: ProductTypes;

    if (isEditMode && productId) {
      const productToEdit = products.find(
        (product) => product.id === productId
      );

      if (!productToEdit) {
        throw new Error("Product not found for editing");
      }

      productData = {
        ...productToEdit,
        title: newProductName,
        price,
        description,
        category: selectCategory.join(", "),
        brand: selectBrand.join(", "),
        image: images,
      };

      await updateProduct(productData);
    } else {
      const newId = Date.now();

      productData = {
        id: newId,
        title: newProductName,
        price,
        description,
        category: selectCategory.join(", "),
        brand: selectBrand.join(", "),
        image: images,
        rating: parseFloat((Math.random() * 5).toFixed(1)),
      };

      await addProduct(productData);
    }

    const updatedProducts = await getProducts();
    setProducts(updatedProducts);

    return productData;
  } else {
    throw new Error("Invalid product data");
  }
}
