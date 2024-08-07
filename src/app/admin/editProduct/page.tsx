"use client"

import AddOrEditForm from "@/components/user/admin/AddOrEditForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const EditProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  return (
    <div className="lg:m-20 m-8 bg-side-sidebar-bg rounded-xl">
      <AddOrEditForm productId={Number(productId)} isEditMode/>
    </div>
  );
};

export default EditProduct;
