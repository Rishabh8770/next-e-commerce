import React, { useState } from "react";
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
  const [user, setUser] = useState<UserOptions>("User");
  const router = useRouter();

  const handleUser = (option: UserOptions) => {
    setUser(option);
    if (option === "User") {
      router.push("/product-listing");
    } else if (option === "Admin") {
      router.push("/admin");
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
        <DropdownItem key="User">User</DropdownItem>
        <DropdownItem key="Admin">Admin</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserRole;
