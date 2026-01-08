import { api } from "../../services/api";
import type { User } from "./userTypes";

const LIMIT = 3;

export const fetchUsers = (page: number, role?: string, search?: string) =>
 api.get(`/api/users?page=${page}&limit=${LIMIT}&role=${role}&search=${search}`);

export const updateUser = (id: number, data: Partial<User>) =>
 api.put(`/api/users/${id}`, data);
export const deleteUser = (id: number) =>
  api.delete(`/api/users/${id}`);

export const createUser = (data: Omit<User, "id">) =>
  api.post("/api/users", data);
