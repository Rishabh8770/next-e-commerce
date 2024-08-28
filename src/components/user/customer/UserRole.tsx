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
import { fetchUserById } from "@/actions/LoginAndSignUpAction";

const UserRole = () => {
  const router = useRouter();
  const { userId } = useUserContext();
  const [userDisplayName, setUserDisplayName] = useState<string>("");

  useEffect(() => {
    const fetchUserDisplayName = async () => {
      if (userId) {
        try {
          const user = await fetchUserById(userId);
          if (user) {
            setUserDisplayName(user.name.split(" ").slice(0, 1).join(" "));
          } else {
            setUserDisplayName("");
          }
        } catch (error) {
          console.error("Error fetching user display name:", error);
        }
      }
    };

    fetchUserDisplayName();
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
          className="flex justify-start text-white border-none text-md md:px-2 px-0"
        >
          {`Hi, ${
            userDisplayName.charAt(0).toUpperCase() + userDisplayName.slice(1)
          }`}
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
