"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { ValidateUser } from "@/actions/LoginAndSignUpAction";

interface UserContextProps {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(null);

  const fetchUserId = async () => {
    const foundUserId = await ValidateUser();
    setUserId(foundUserId ? Number(foundUserId) : null);
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, refreshUser: fetchUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
