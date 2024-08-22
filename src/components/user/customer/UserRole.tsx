"use client";

import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import userData from "@/data/users.json";
import { usePathname } from "next/navigation";

const UserRole = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { userId } = useUserContext();
  const [userDisplayName, setUserDisplayName] = useState<string>("");

  useEffect(() => {
    if (userId !== null) {
      const loggedInUser = userData.find((user) => user.id === userId);
      if (loggedInUser) {
        setUserDisplayName(loggedInUser.name);
      }
    }
  }, [userId]);

  const handleNavigation = (option: string) => {
    if (option === "Admin") {
      router.push("/admin");
    } else if (option === userDisplayName) {
      router.push("/product-listing");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="flex justify-start text-white border-none text-md px-2"
        >
          {pathName.startsWith("/admin")
            ? "Admin"
            : `Hi, ${userDisplayName.charAt(0).toUpperCase() + userDisplayName.slice(1)}`}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User Options"
        onAction={(key) => handleNavigation(key as string)}
      >
        <DropdownItem key={userDisplayName} className="text-black">
          {userDisplayName}
        </DropdownItem>
        <DropdownItem key="Admin" className="text-black">
          Admin
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserRole;
