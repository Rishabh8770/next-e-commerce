import { useCartContext } from "@/context/CartContext";
import { useProductContext } from "@/context/ProductContext";

export const useCartSummary = () => {
  const { cartItems } = useCartContext();
  const { products } = useProductContext();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const tax = totalPrice * 0.05;

  const totalDiscount = cartItems.reduce((sum, item) => {
    const product = products.find((prod) => prod.id === item.id);
    if (product && product.discount) {
      const discountAmount =
        (product.price * item.quantity * product.discount) / 100;
      return sum + discountAmount;
    }
    return sum;
  }, 0);
  const priceAfterTax = totalPrice - totalDiscount + tax;

  return {
    totalDiscount,
    totalQuantity,
    tax,
    totalPrice,
    priceAfterTax,
  };
};
