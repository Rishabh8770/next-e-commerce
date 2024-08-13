import ProductList from "@/components/user/admin/ProductList";
import { NotificationContainer } from "@/components/user/admin/UserFeedback";

const ProductDisplay = () => {
  return (
    <div className="lg:m-20 m-8 bg-[#182237] rounded p-2">
      <ProductList />
      <NotificationContainer />
    </div>
  );
};

export default ProductDisplay;
