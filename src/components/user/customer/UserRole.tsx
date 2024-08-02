"use client"

import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export type UserOptions = "User" | "Admin";

const UserRole = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserOptions>("User");

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/admin")) {
      setUser("Admin");
    } else {
      setUser("User");
    }
  }, []);

  const handleUser = (option: UserOptions) => {
    setUser(option);
    if (option === "User") {
      router.push("/product-listing");
    } else if (option === "Admin") {
      router.push("/admin/dashboard");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="text-white">
          {user}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => handleUser(key as UserOptions)}
      >
        <DropdownItem key="User" className="text-black">
          User
        </DropdownItem>
        <DropdownItem key="Admin" className="text-black">
          Admin
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserRole;
