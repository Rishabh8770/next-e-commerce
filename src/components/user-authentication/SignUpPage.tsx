"use client";

import React from "react";
import Authentication from "./Authentication";
import { useRouter } from "next/navigation";
import { SignupUser } from "@/actions/LoginAndSignUpAction";
import { notifyRegisterationSuccess } from "@/utils/NotificationUtils";
import { NotificationContainer } from "../user/admin/UserFeedback";

const SignUpPage = () => {
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await SignupUser(name, email, password);

    if (result.success) {
      notifyRegisterationSuccess();
      router.push("/login");
    } else {
      alert(result.message);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <Authentication
        title="New Registration"
        isNewUser
        buttonTitle="Sign Up"
        handleSubmit={handleSignUp}
      />
      <NotificationContainer />
    </div>
  );
};

export default SignUpPage;
