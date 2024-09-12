"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserContext } from "@/context/UserContext";
import { fetchUserById, UpdateUser } from "@/actions/LoginAndSignUpAction";
import { NotificationContainer } from "../user/admin/UserFeedback";
import {
  notifyUserUpdatedError,
  notifyUserUpdatedSuccess,
} from "@/utils/NotificationUtils";
import { useRouter } from "next/navigation";
import ProfileItemsHeader from "./ProfileItemsHeader";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const UpdateUserForm = () => {
  const { userId, refreshUser } = useUserContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDetails = await fetchUserById(userId);
          if (userDetails) {
            setValue("name", userDetails.name);
            setValue("email", userDetails.email);
            setValue("password", userDetails.password);
          }
        } catch (error) {
          console.error("Error fetching the User Details");
        }
      }
    };
    fetchUserData();
  }, [userId]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await UpdateUser(
        userId!,
        data.name,
        data.email,
        data.password
      );
      if (result.success) {
        notifyUserUpdatedSuccess();
        refreshUser();
        setTimeout(() => {
          router.push(`/my-profile/dashboard/${userId}`);
        }, 2000);
      } else {
        notifyUserUpdatedError();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating user data.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ProfileItemsHeader title="Edit Profile" />
      <div className="w-2/3 flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border rounded-lg lg:w-5/6 w-full p-3 h-auto shadow-md"
        >
          <div className="flex justify-center items-center">
            <label htmlFor="signup" className="md:text-3xl text-xl">
              Update User
            </label>
          </div>

          <div className="flex flex-col mt-6 space-y-2">
            <label htmlFor="name" className="md:text-xl text-md">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`border rounded-md p-2 ${
                errors.name && "ring-2 ring-red-500"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                * {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col my-6 space-y-2">
            <label htmlFor="email" className="md:text-xl text-md">
              Email-id
            </label>
            <input
              type="email"
              placeholder="Email"
              className={`border rounded-md p-2 ${
                errors.email && "ring-2 ring-red-500"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                * {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col mb-6 space-y-2">
            <label htmlFor="password" className="md:text-xl text-md">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className={`border rounded-md p-2 ${
                errors.password && "ring-2 ring-red-500"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                * {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex justify-center items-center">
            <button
              className="md:text-xl text-md border rounded-md bg-blue-500 text-white py-2 px-4"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
        <NotificationContainer />
      </div>
    </div>
  );
};

export default UpdateUserForm;
