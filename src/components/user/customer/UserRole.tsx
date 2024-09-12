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
import { usePathname } from "next/navigation";

const UserRole = () => {
  const router = useRouter();
  const { userId } = useUserContext();
  const [userDisplayName, setUserDisplayName] = useState<string>("");
  const pathName = usePathname();

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
      router.push(`/my-profile/dashboard/${userId}`);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="flex justify-center items-center text-white border rounded-lg text-md px-2"
        >
          {pathName.startsWith("/admin") ? "Admin" : "Switch user"}
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
