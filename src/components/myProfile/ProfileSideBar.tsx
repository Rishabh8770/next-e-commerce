"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import users from "@/data/users.json";
import { useUserContext } from "@/context/UserContext";
import ProfileMenuItems from "./ProfileMenuItems";
import { ArrowLeft, Menu } from "lucide-react";
import UserRole from "../user/customer/UserRole";

const ProfileSideBar = () => {
  const router = useRouter();
  const { userId } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!userId) {
    return <h1>No user found</h1>;
  }

  const fetchUser = users.find((user) => user.id === userId);

  if (!fetchUser) {
    return <h1>No user profile found</h1>;
  }

  const handleProfilePage = () => {
    router.push(`/my-profile/dashboard/${userId}`);
  };
  const handleNavigateBack = () => {
    router.push("/product-listing");
  };

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <div
          onClick={handleNavigateBack}
          className="flex space-x-2 cursor-pointer"
        >
          <ArrowLeft color="#ffffff" />
          <span className="text-white hover:underline">Back to products</span>
        </div>
        <div>
          <UserRole />
        </div>
      </div>
      <div className=" flex md:flex-col flex-row items-center md:justify-center justify-between space-x-4 p-4 mt-4">
        <div
          className="flex md:flex-col justify-center items-center md:space-y-4 cursor-pointer"
          onClick={handleProfilePage}
        >
          <div>
            <img
              src="/no-image.png"
              alt="name"
              className="rounded-full md:size-36 size-12"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="lg:text-2xl text-lg font-semibold text-white">
              {fetchUser.name}
            </p>
            <p className="lg:text-lg text-sm text-white">{fetchUser.email}</p>
          </div>
        </div>
        <div className="border-b-white border-b-1 border-dashed w-2/3 mt-6 md:block hidden"></div>
        <div className="lg:block hidden">
          <ProfileMenuItems />
        </div>

        <div className="lg:hidden my-4">
          <button
            type="button"
            className="inline-flex items-center justify-center space-x-2 p-2 rounded-md text-white bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <Menu />
            <span>Menu</span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="lg:hidden absolute md:top-[26rem] top-48 left-0 right-0 z-10 bg-side-sidebar-bg slide-down"
          ref={dropdownRef}
        >
          <ProfileMenuItems />
        </div>
      )}
    </>
  );
};

export default ProfileSideBar;
