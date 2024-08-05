"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSearchContext } from "@/context/SearchContext";
import { useCartContext } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import UserRole from "@/components/user/customer/UserRole";

const Navbar = () => {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearchContext();
  const { cartCount } = useCartContext();
  const pathName = usePathname();
  const searchInputHidden = "hidden";

  const handleCartNavigation = () => {
    router.push(`/user-cart/`);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <span className="text-white mx-2">Shop-a-holic</span>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="/product-listing"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                </div>
              </div>
              <div className={`flex justify-center mx-3 ${pathName === "/" && searchInputHidden}`}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-full p-2"
                />
              </div>
            </div>

            <div className="absolute rounded-full inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 bg-gray-900">
              <button
                onClick={handleCartNavigation}
                className="size-12 relative  rounded-full flex justify-center items-center"
              >
                <ShoppingCart color="#ffffff" strokeWidth={2} />
                {cartCount > 0 && (
                  <div
                    className="rounded-full border bg-red-600 flex justify-center items-center"
                    style={{
                      color: "white",
                      width: "1.5rem",
                      height: "1.5rem",
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                      transform: "translate(25%, 25%)",
                    }}
                  >
                    {cartCount}
                  </div>
                )}
              </button>
            </div>
            <div className="mx-8">
              <UserRole />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
