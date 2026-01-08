/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { initialUser } from "./user.constants";

export type UserContextType = {
  user: User;
  updateUser: (data: Partial<User>) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

const STORAGE_KEY = "saas_user";

export function UserProvider({ children }: { children: React.ReactNode }) {
  // 🔥 LOAD FROM LOCALSTORAGE ON FIRST RENDER
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : initialUser;
  });

  // 🔥 SAVE TO LOCALSTORAGE ON EVERY CHANGE
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

/* 🔥 Custom hook */
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
};
