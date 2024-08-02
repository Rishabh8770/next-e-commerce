"use client";

import ProductDetails from '@/components/products/ProductDetails';
import { useParams } from 'next/navigation';
import React from 'react';

const ProductDetailsPage = () => {
  const params = useParams();
  let id = params.id;

  if (Array.isArray(id)) {
    id = id[0];
  }

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetails params={{ id }} />
    </div>
  );
}

export default ProductDetailsPage;
