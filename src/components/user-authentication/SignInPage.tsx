"use client";

import React, { useEffect, useState } from "react";
import Authentication from "./Authentication";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginUser } from "@/actions/LoginAndSignUpAction";
import { NotificationContainer } from "../user/admin/UserFeedback";
import {
  notifyLoginError,
  notifyLoginSuccess,
} from "@/utils/NotificationUtils";
import { useUserContext } from "@/context/UserContext"; // Import the UserContext
import { useCartContext } from "@/context/CartContext";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const { refreshUser } = useUserContext();
  const { refreshCart } = useCartContext();

  useEffect(() => {
    // Get redirect URL from query parameters
    const redirect = searchParams.get("redirect");
    setRedirectUrl(redirect ? decodeURIComponent(redirect) : "/product-listing");
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await LoginUser(email, password);

    if (result.success) {
      notifyLoginSuccess();
      refreshUser();
      await refreshCart();
      setTimeout(() => {
        router.push(redirectUrl || "/product-listing");
      }, 2000);
    } else {
      notifyLoginError();
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Authentication
        title="Login"
        isNewUser={false}
        buttonTitle="Sign In"
        handleSubmit={handleSignIn}
      />
      <NotificationContainer />
    </div>
  );
};

export default SignInPage;
