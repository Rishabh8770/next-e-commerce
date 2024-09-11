import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type AuthenticationProps = {
  title: string;
  isNewUser: boolean;
  buttonTitle: string;
  handleSubmitData: (data: FormValues) => void;
};

export type FormValues = {
  name?: string;
  email: string;
  password: string;
};

const Authentication = ({
  title,
  isNewUser,
  buttonTitle,
  handleSubmitData,
}: AuthenticationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSubmitData(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border rounded-lg lg:w-1/4 w-5/6 p-3 h-auto shadow-md"
    >
      <div className="flex justify-center items-center">
        <label htmlFor="signup" className="md:text-3xl text-xl">
          {title}
        </label>
      </div>
      {isNewUser && (
        <div className="flex flex-col mt-6 space-y-2">
          <label htmlFor="name" className="md:text-xl text-md">
            Name
          </label>
          <input
            {...register("name", {
              required: isNewUser ? "Name is required" : false,
            })}
            placeholder="Enter your name"
            className={`border rounded-md p-2 ${
              errors.name && "ring-2 ring-red-500"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              * {errors.name.message}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col my-6 space-y-2">
        <label htmlFor="email" className="md:text-xl text-md">
          Email-id
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: isNewUser ? "Invalid email format" : "invalid email",
            },
          })}
          placeholder="Email"
          className={`border rounded-md p-2 ${
            errors.email && "ring-2 ring-red-500"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">* {errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col mb-6 space-y-2">
        <label htmlFor="password" className="md:text-xl text-md">
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: isNewUser
                ? "Password must be atleast 8 characters"
                : "Invalid password",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
              message: isNewUser
                ? "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, and one special character."
                : "Invalid password",
            },
          })}
          placeholder="Password"
          type="password"
          className={`border rounded-md p-2 ${
            errors.password && "ring-2 ring-red-500"
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            * {errors.password.message}
          </span>
        )}
      </div>
      {!isNewUser && (
        <div className="mb-4 flex flex-col">
          <span className="md:text-lg text-sm">Don't have an account ? </span>
          <Link
            href="/registration"
            className="text-blue-500 hover:underline md:text-lg text-sm w-1/2"
          >
            Click here to Sign-up
          </Link>
        </div>
      )}

      <div className="flex justify-center items-center">
        <button
          className="md:text-xl text-md border rounded-md bg-blue-500 text-white py-2 px-4"
          type="submit"
        >
          {buttonTitle}
        </button>
      </div>
    </form>
  );
};

export default Authentication;
