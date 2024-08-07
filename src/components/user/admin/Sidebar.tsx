"use client";

import React from "react";
import UserRole from "../customer/UserRole";
import MenuItems from "./MenuItems";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();

  const handleAdminPage = () => {
    router.push("/admin");
  };
  return (
    <>
      <div className=" flex items-center justify-between space-x-4 p-4 mt-4">
        <div
          className="flex justify-center items-center space-x-4 cursor-pointer"
          onClick={handleAdminPage}
        >
          <div>
            <img
              src="/no-image.png"
              alt="name"
              className="rounded-full size-12"
            />
          </div>
          <div>
            <p className="text-xl font-semibold">Rishabh</p>
            <p className="text-sm">Administration</p>
          </div>
        </div>

        <div>
          <UserRole />
        </div>
      </div>
      <div className="mt-4 p-4">
        <MenuItems />
      </div>
    </>
  );
};

export default SideBar;
