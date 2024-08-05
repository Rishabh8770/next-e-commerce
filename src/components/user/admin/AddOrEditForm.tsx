import React from "react";

type FormProp = {
  productId: number | null;
  isEditMode: boolean;
};

const AddOrEditForm = ({ productId, isEditMode }: FormProp) => {
  return (
    <div>
      <div className="p-10 shadow-md min-w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>
        <form>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg "
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg "
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Category</label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg "
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Brand</label>
            <select
              id="brand"
              name="brand"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg "
            >
              <option value="">Select brand</option>
              <option value="brandA">Brand A</option>
              <option value="brandB">Brand B</option>
              <option value="brandC">Brand C</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-input-inputBox-bg "
              placeholder="Enter product price"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Image URL 1</label>
            <input
              type="url"
              id="image1"
              name="image1"
              className="block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-input-inputBox-bg mt-2"
              placeholder="Enter image URL 1"
            />
          </div>
          <div className="mb-4">
            <div className="mb-6">
              <label className="block text-sm font-medium ">Image URL 2</label>
              <input
                type="url"
                id="image2"
                name="image2"
                className="block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-input-inputBox-bg mt-2"
                placeholder="Enter image URL 2"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium ">Image URL 3</label>
              <input
                type="url"
                id="image3"
                name="image3"
                className="block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-input-inputBox-bg mt-2"
                placeholder="Enter image URL 3"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium ">Image URL 4</label>
              <input
                type="url"
                id="image4"
                name="image4"
                className="block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-input-inputBox-bg mt-2"
                placeholder="Enter image URL 4"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isEditMode ? "Update" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditForm;
