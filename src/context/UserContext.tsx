"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ValidateUser } from "@/actions/LoginAndSignUpAction";

interface UserContextProps {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number | null>(null);

  const fetchUserId = async () => {
    try {
      const foundUserId = await ValidateUser();
      console.log("foundUserId:::", foundUserId)
      console.log("type of foundUserId:::", typeof foundUserId)
      setUserId(foundUserId ? Number(foundUserId) : null);
    } catch (error) {
      console.error("Failed to validate user:", error);
      setUserId(null);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  const contextValue = useMemo(
    () => ({
      userId,
      setUserId,
      refreshUser: fetchUserId,
    }),
    [userId]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
