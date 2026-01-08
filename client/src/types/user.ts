export type UserRole = "Admin" | "User";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  phone: string;
  location: string;
  avatar: string;
  createdAt: string;

  // ✅ ADD THIS
  profileCompletion: number; // 0 - 100
};

