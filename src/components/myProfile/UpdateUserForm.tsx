"use client";

import { useUserContext } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { fetchUserById, UpdateUser } from "@/actions/LoginAndSignUpAction";
import { NotificationContainer } from "../user/admin/UserFeedback";
import {
  notifyUserUpdatedError,
  notifyUserUpdatedSuccess,
} from "@/utils/NotificationUtils";
import { useRouter } from "next/navigation";

const UpdateUserForm = () => {
  const { userId, refreshUser } = useUserContext();
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formValues, setFormValues] = useState(initialValues);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDetails = await fetchUserById(userId);
          if (userDetails) {
            setInitialValues({
              name: userDetails.name,
              email: userDetails.email,
              password: userDetails.password,
            });
            setFormValues({
              name: userDetails.name,
              email: userDetails.email,
              password: userDetails.password,
            });
          }
        } catch (error) {
          console.error("Error fetching the User Details");
        }
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const isModified =
    JSON.stringify(initialValues) !== JSON.stringify(formValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await UpdateUser(
        userId!,
        formValues.name,
        formValues.email,
        formValues.password
      );
      if (result.success) {
        notifyUserUpdatedSuccess();
        refreshUser();
      } else {
        notifyUserUpdatedError();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating user data.");
    }
    setTimeout(() => {
      router.push(`/my-profile/dashboard/${userId}`);
    }, 2000);
  };

  return (
    <div className="w-2/3">
      <form
        onSubmit={handleSubmit}
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
            name="name"
            placeholder="Enter your name"
            required
            className="border rounded-md p-2"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col my-6 space-y-2">
          <label htmlFor="email" className="md:text-xl text-md">
            Email-id
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border rounded-md p-2"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-6 space-y-2">
          <label htmlFor="password" className="md:text-xl text-md">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border rounded-md p-2"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            className="md:text-xl text-md border rounded-md bg-blue-500 text-white py-2 px-4"
            type="submit"
            disabled={!isModified}
          >
            Update
          </button>
        </div>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default UpdateUserForm;
