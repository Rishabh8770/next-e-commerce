"use client"

import React from "react";
import Authentication from "./Authentication";
import { useRouter } from "next/navigation";
import { SignupUser } from "@/actions/LoginAndSignUpAction";
import { notifyRegisterationSuccess } from "@/utils/NotificationUtils";
import { NotificationContainer } from "../user/admin/UserFeedback";
import { useUserContext } from "@/context/UserContext";
import { FormValues } from "./Authentication"; 

const SignUpPage = () => {
  const router = useRouter();
  const { refreshUser } = useUserContext();

  const handleSignUp = async (data: FormValues) => {
    const { name, email, password } = data;

    if (!name) {
      alert("Name is required for sign-up");
      return;
    }

    const result = await SignupUser(name, email, password);

    if (result.success) {
      notifyRegisterationSuccess();
      refreshUser();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Authentication
        title="New Registration"
        isNewUser={true}
        buttonTitle="Sign Up"
        handleSubmitData={handleSignUp}
      />
      <NotificationContainer />
    </div>
  );
};

export default SignUpPage;
