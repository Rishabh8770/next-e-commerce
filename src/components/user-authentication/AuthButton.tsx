import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Logout } from "@/actions/LoginAndSignUpAction";
import { useUserContext } from "@/context/UserContext";
import { useCartContext } from "@/context/CartContext";

const AuthButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { setUserId } = useUserContext();
  const { refreshCart } = useCartContext();

  const checkLoginStatus = () => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId="));
    setIsLoggedIn(!!userCookie);
  };

  useEffect(() => {
    checkLoginStatus();
    const cookieChangeListener = setInterval(() => {
      checkLoginStatus();
    }, 1000);

    return () => clearInterval(cookieChangeListener);
  }, []);

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      await Logout();
      setUserId(null);
      refreshCart();
      checkLoginStatus();
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="w-24 flex md:justify-center items-center">
      <button
        onClick={handleAuthAction}
        className="text-white md:px-4 py-2 rounded hover:bg-gray-600"
      >
        {isLoggedIn ? "Logout" : "Sign In"}
      </button>
    </div>
  );
};

export default AuthButton;
