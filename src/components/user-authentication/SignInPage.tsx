"use client";

import React from "react";
import Authentication from "./Authentication";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/actions/LoginAndSignUpAction";

const SignInPage = () => {
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await LoginUser(email, password);

    if (result.success) {
      alert("Login successful");
      setTimeout(() => {
        router.push("/product-listing");
      }, 3000);
    } else {
      alert(result.message);
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
    </div>
  );
};

export default SignInPage;
