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
import { useUserContext } from "@/context/UserContext";
import { useCartContext } from "@/context/CartContext";

type FormValues = {
  email: string;
  password: string;
}

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

  const handleSignIn = async (data: FormValues) => {
    const { email, password } = data;
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
        handleSubmitData={handleSignIn}
      />
      <NotificationContainer />
    </div>
  );
};

export default SignInPage;
