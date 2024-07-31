// components/ProductDetails.tsx
"use client";

import { ProductTypes } from "@/types/ProductTypes";
import productData from "@/data/products.json";
import Carousel from "@/components/common/ImageCarousel";
import AddToCart from "@/components/cart/AddToCart";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image: string[];
  brand: string;
}

interface ProductDetailsProps {
  product: Product;
}

function ProductDetails({ params }: { params: { id: string } }) {
  let product: ProductTypes | undefined = productData.find(
    (product) => product.id.toString() === params.id
  );
  if (!product) {
    return <div>Product not found</div>;
  }

  const bulletPoints = product.description.split(/[|.,@]\s*/).map((point, index) => (
    <li key={index} className="mb-2">
      {point}
    </li>
  ));

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container p-8 flex lg:flex-row flex-col justify-center items-center lg:items-start space-x-5 shadow-xl rounded-md">
        <div className="w-full lg:w-1/2 flex flex-col rounded p-2">
          <Carousel images={product.image} />
        </div>
        <div className="lg:w-1/2 pl-4">
          <h1 className="lg:text-3xl text-sm font-bold mb-4">{product.title}</h1>
          <h2 className="text-xl mb-4">{`$${product.price}`}</h2>
          <div className="mb-4">
            <div className="flex items-center mt-2">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
                </svg>
              ))}
              {[...Array(5 - Math.floor(product.rating))].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049.684a.5.5 0 0 1 .902 0l2.107 4.796 5.156.386a.5.5 0 0 1 .282.88L13.342 9.75l1.476 4.85a.5.5 0 0 1-.759.553L10 12.34 6.942 15.153a.5.5 0 0 1-.758-.553l1.476-4.85-3.153-2.904a.5.5 0 0 1 .282-.88l5.156-.386L9.049.684z"></path>
                </svg>
              ))}
            </div>
          </div>
          <ul className="list-disc pl-5">{bulletPoints}</ul>
          <AddToCart productId={product.id} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
