import React from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

const OrderButton = () => {
  const router = useRouter();
  const { userId } = useUserContext();
  const handleOrderPage = () => {
    if (!userId) {
      return <h1>User not found</h1>;
    } else {
      router.push(`/my-orders/${userId}`);
    }
  };
  return (
    <div className="w-max -mr-4">
      <button className="p-2 hover:bg-gray-600 text-white rounded" onClick={handleOrderPage}>
        My orders
      </button>
    </div>
  );
};

export default OrderButton;
