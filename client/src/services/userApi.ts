import type { User } from "../types/user";

export const getProfile = async (): Promise<User> => {
  // later backend se replace karega
  return {
    id: "1",
    name: "Soumyajit Sinha",
    email: "sinha.soumya2018@gmail.com",

    // ✅ FIXED ROLE (must match User type)
    role: "Admin",

    phone: "+91 6294462750",
    location: "Kolkata, India",
    avatar: "/Admin.jpg", // public folder se
    createdAt: "2021",
    profileCompletion: 80,
  };
};
