"use client";

import React, { useState, useEffect, useRef } from "react";
import { formAction } from "@/actions/ProductActions";
import { getProducts } from "@/actions/ProductActions";
import { ProductTypes } from "@/types/ProductTypes";
import { getBrands, getCategories } from "@/utils/actionUtils";
import { useProductContext } from "@/context/ProductContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  notifyAddProduct,
  notifyEditProduct,
  notifyError,
} from "@/utils/NotificationUtils";
import { NotificationContainer } from "./UserFeedback";
import { useRouter } from "next/navigation";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setProducts } = useProductContext();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory((prevCategories) =>
      prevCategories.includes(selectedCategory)
        ? prevCategories.filter((cat) => cat !== selectedCategory)
        : [...prevCategories, selectedCategory]
    );
  };

  const handleCategoryRemove = (cat: string) => {
    setCategory(category.filter((c) => c !== cat));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    category.forEach((cat) => formData.append("category", cat));
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("discount", discount);
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    try {
      // throw new Error("error here") // to test catch error
      await formAction(formData, isEditMode, productId, setProducts);
      if (!isEditMode) {
        notifyAddProduct();
        clearAddProductForm();
      } else {
        notifyEditProduct();
      }
      setTimeout(() => {
        router.push("/admin/dashboard/products");
      }, 2000);
    } catch (error) {
      console.error("Error submitting the form", error);
      notifyError();
    } finally {
      setLoading(false);
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

            <div className="relative" ref={dropdownRef}>
              <button
                className={`w-full border rounded-lg text-start px-4 py-2 flex justify-between items-center ${
                  isDropdownOpen && "focus:ring-2 focus:ring-blue-500"
                }`}
                onClick={handleDropdownToggle}
              >
                {category.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {category.map((cat) => (
                      <div
                        key={cat}
                        className="flex items-center bg-menu-active-bg text-white px-2 py-1 rounded-md space-x-2"
                      >
                        <span>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </span>
                        <button
                          onClick={() => handleCategoryRemove(cat)}
                          className="border-l-1"
                        >
                          <span className="text-white ml-2">x</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  "Select Category"
                )}
                <span className="-mr-3">
                  {isDropdownOpen ? (
                    <ChevronUp strokeWidth={2.5} size={20} />
                  ) : (
                    <ChevronDown size={20} strokeWidth={2.5} />
                  )}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute border mt-2 rounded-md z-10 w-full bg-side-sidebar-bg">
                  <div className="max-h-60 overflow-y-auto p-2">
                    {uniqueCategories
                      .filter((cat) => !category.includes(cat))
                      .map((cat) => (
                        <div
                          key={cat}
                          onClick={() => handleCategoryChange(cat)}
                          className="flex items-center space-x-2 p-1 rounded-md cursor-pointer hover:bg-blue-500"
                        >
                          <span>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
            <label className="block text-white font-bold mb-2">
              Discount (%)
            </label>
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
            <label className="block text-sm font-medium">Image URL's</label>
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
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-center items-center"
          >
            {loading ? (
              <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-white border-t-transparent"></span>
            ) : isEditMode ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default AddOrEditForm;
