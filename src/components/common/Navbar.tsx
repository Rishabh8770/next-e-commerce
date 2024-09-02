"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCartContext } from "@/context/CartContext";
import { Menu, ShoppingCart } from "lucide-react";
import UserRole from "@/components/user/customer/UserRole";
import { routePathNames } from "@/utils/pathUtils";
import SearchProduct from "./SearchProduct";
import AuthButton from "../user-authentication/AuthButton";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { getCartItems } from "@/actions/CartAction";
import OrderButton from "../myOrders/OrderButton";

const Navbar = () => {
  const router = useRouter();
  const { cartCount, refreshCart } = useCartContext();
  const pathName = usePathname();
  const { userId } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localCartCount, setLocalCartCount] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCartCount = async () => {
      console.log("userId in navbar::", userId);
      if (userId) {
        const cartItems = await getCartItems();
        setLocalCartCount(
          cartItems.reduce((count, item) => count + item.quantity, 0)
        );
      } else {
        setLocalCartCount(cartCount);
      }
    };

    fetchCartCount();
  }, [userId, cartCount, refreshCart]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartNavigation = () => {
    router.push(`/user-cart/`);
    refreshCart();
  };

  const handleProducts = () => {
    router.push("/product-listing");
  };

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`sticky top-0 z-50 ${
        routePathNames.includes(pathName) && "hidden"
      }`}
    >
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden" ref={dropdownRef}>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
              >
                <Menu />
              </button>
            </div>

            <div className="flex justify-center items-center sm:items-stretch sm:justify-start space-x-8 w-5/6 cursor-pointer">
              <div
                className="flex flex-shrink-0 items-center md:ml-0 ml-14"
                onClick={() => router.push("/")}
              >
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <span className="text-white mx-2">Shop-a-holic</span>
              </div>
              <div
                className="md:flex hidden justify-center items-center cursor-pointer rounded hover:bg-gray-600 px-2"
                onClick={handleProducts}
              >
                <h1 className="text-white">Products</h1>
              </div>
              <div className="md:block hidden w-full">
                <SearchProduct />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleCartNavigation}
                className="relative lg:w-12 lg:h-12 w-12 h-12 rounded-full flex justify-center items-center bg-gray-900 hover:border"
              >
                <ShoppingCart color="#ffffff" strokeWidth={2} />
                {localCartCount > 0 && (
                  <div
                    className="rounded-full border bg-red-600 flex justify-center items-center"
                    style={{
                      color: "white",
                      width: "1.5rem",
                      height: "1.5rem",
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      transform: "translate(25%, -25%)",
                    }}
                  >
                    <span>{localCartCount}</span>
                  </div>
                )}
              </button>
              <div className="hidden md:block">
                <AuthButton />
              </div>
              {userId && (
                <div className="md:block hidden">
                  <UserRole />
                </div>
              )}
              {userId && (
                <div className="md:block hidden">
                  <OrderButton />
                </div>
              )}
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="sm:hidden absolute top-16 left-0 right-0 z-10 opacity-90"
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pt-2 pb-3 bg-gray-700">
              {userId && (
                <div className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  <UserRole />
                </div>
              )}
              <button
                onClick={handleProducts}
                className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Products
              </button>
              <div className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
