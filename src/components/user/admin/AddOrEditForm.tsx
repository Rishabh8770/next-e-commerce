"use client";

import React, { useState, useEffect } from "react";
import { formAction } from "@/actions/ProductActions";
import { getProducts } from "@/actions/ProductActions";
import { ProductTypes } from "@/types/ProductTypes";
import { getBrands, getCategories } from "@/utils/actionUtils";
import { useProductContext } from "@/context/ProductContext";

type FormProp = {
  productId: number | null;
  isEditMode: boolean;
};

const AddOrEditForm = ({ productId, isEditMode }: FormProp) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>(["", "", ""]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [discount, setDiscount] = useState("");
  const { setProducts } = useProductContext();

  useEffect(() => {
    const fetchData = async () => {
      const fetchCategories = await getCategories();
      const fetchBrands = await getBrands();
      setCategories(fetchCategories);
      setBrands(fetchBrands);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isEditMode && productId !== null) {
      const fetchProductData = async () => {
        const products = await getProducts();
        const productToEdit = products.find(
          (product: ProductTypes) => product.id === productId
        );
        if (productToEdit) {
          setName(productToEdit.title || "");
          setDescription(productToEdit.description || "");
          setCategory(productToEdit.category ? productToEdit.category : []);
          setBrand(productToEdit.brand || "");
          setPrice(productToEdit.price.toString() || "");
          setDiscount(productToEdit.discount?.toString() || "");
          setImages(productToEdit.image || ["", "", ""]);
        }
      };
      fetchProductData();
    }
  }, [isEditMode, productId]);

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory((prevCategories) =>
      prevCategories.includes(selectedCategory)
        ? prevCategories.filter((cat) => cat !== selectedCategory)
        : [...prevCategories, selectedCategory]
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    category.forEach(cat => formData.append("category", cat)); 
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("discount", discount);
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    try {
      await formAction(formData, isEditMode, productId, setProducts);
      alert(
        isEditMode
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
      if (!isEditMode) {
        clearAddProductForm();
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("There was an error submitting the form.");
    }
  };

  const clearAddProductForm = () => {
    setName("");
    setDescription("");
    setCategory([]);
    setBrand("");
    setPrice("");
    setDiscount("");
    setImages(["", "", "", ""]);
  };

  const uniqueCategories = Array.from(new Set(categories.flat()));

  return (
    <div>
      <div className="p-10 shadow-md min-w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg read-only:bg-gray-700 read-only:cursor-not-allowed"
              placeholder="Enter product name"
              readOnly={isEditMode}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg"
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={category.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="form-checkbox"
                    key={cat}
                  />
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Brand</label>
            <select
              id="brand"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg"
            >
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option value={brand} key={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg"
              placeholder="Enter product price in ₹"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Discount (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg"
              placeholder="Enter product discount"
              min="0"
              max="100"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Image URL 1</label>
            <input
              type="url"
              id="image1"
              name="image1"
              value={images[0]}
              onChange={(e) =>
                setImages([e.target.value, images[1], images[2], images[3]])
              }
              className="block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-input-inputBox-bg mt-2"
              placeholder="Enter image URL 1"
            />
          </div>
          <div className="mb-4">
            <div className="mb-6">
              <label className="block text-sm font-medium">Image URL 2</label>
              <input
                type="url"
                id="image2"
                name="image2"
                value={images[1]}
                onChange={(e) =>
                  setImages([images[0], e.target.value, images[2], images[3]])
                }
                className="block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-input-inputBox-bg mt-2"
                placeholder="Enter image URL 2"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Image URL 3</label>
              <input
                type="url"
                id="image3"
                name="image3"
                value={images[2]}
                onChange={(e) =>
                  setImages([images[0], images[1], e.target.value, images[3]])
                }
                className="block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-input-inputBox-bg mt-2"
                placeholder="Enter image URL 3"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isEditMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditForm;
