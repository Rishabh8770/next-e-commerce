"use client";

import React, { useState } from "react";
import Pagination from "@/components/common/Pagination";
import { useProductContext } from "@/context/ProductContext";
import { convertUsdToCurrency } from "@/utils/CurrencyFormatter";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
};

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { products } = useProductContext();
  const router = useRouter();
  const { deleteProduct } = useProductContext();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleEdit = (id: number) => {
    router.push(`/admin/editProduct?id=${id}`);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  if (!currentProducts) {
    return <LoadingPage />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white">
        <thead>
          <tr className="text-justify">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-2 border-b">Category</th>
            <th className="py-2 px-2 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product: Product) => (
            <tr key={product.id}>
              <td className="py-6 px-4 border-b">{product.id}</td>
              <td className="py-6 px-4 border-b">
                {product.title.split(" ").slice(0, 6).join(" ")}
              </td>
              <td className="py-6 px-4 border-b">
                {product.description.split(" ").slice(0, 10).join(" ")}...
              </td>
              <td className="py-6 px-4 border-b">{product.category}</td>
              <td className="py-6 px-4 border-b">{product.brand}</td>
              <td className="py-6 px-2 border-b">
                {convertUsdToCurrency(product.price)}
              </td>
              <td className="py-6 px-4 border-b">
                <div className="flex space-x-2">
                  <button className="px-2 py-1 bg-slate-400 rounded-md" onClick={() => handleEdit(product.id)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 rounded-md" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
