import Link from "next/link";
import React from "react";

type AuthenticationProps = {
  title: string;
  isNewUser: boolean;
  buttonTitle: string;
  handleSubmit: (e: React.FormEvent) => void;
};

const Authentication = ({
  title,
  isNewUser,
  buttonTitle,
  handleSubmit,
}: AuthenticationProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col border rounded-lg lg:w-1/4 w-5/6 p-3 h-auto shadow-md">
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
              type="name"
              name="name"
              placeholder="Enter your name"
              required
              className="border rounded-md p-2"
            />
          </div>
        )}

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
          />
        </div>
        {!isNewUser && (
          <div className="mb-4">
            <Link href="/registration" className="text-blue-500 hover:underline">
              New Registration ?
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
