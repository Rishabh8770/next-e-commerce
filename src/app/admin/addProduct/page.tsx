import AddOrEditForm from "@/components/user/admin/AddOrEditForm";
import React from "react";

const AddProduct = () => {
  return (
    <div className="lg:m-20 m-8 bg-side-sidebar-bg rounded-xl">
      <AddOrEditForm productId={null} isEditMode={false}/>
    </div>
  );
};

export default AddProduct;
