import { api } from "../../services/api";

export const loginAPI = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
