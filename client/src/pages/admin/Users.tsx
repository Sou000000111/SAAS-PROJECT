import { useEffect, useState, useCallback } from "react";
import type { User, UserForm } from "../../features/users/userTypes";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../../features/users/usersAPI";

const LIMIT = 3;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<UserForm>({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const refreshUsers = useCallback(async () => {
    const res = await fetchUsers(page, role, search);
    setUsers(res.data.data);
    setTotal(res.data.total);
  }, [page, role, search]);

     useEffect(() => {
      const loadUsers = async () => {
      const res = await fetchUsers(page, role, search);
      setUsers(res.data.data);
      setTotal(res.data.total);
      };

      loadUsers();
    }, [page, role, search]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage system users and permissions
          </p>
        </div>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search users..."
            className="px-4 py-2 rounded-xl border
              bg-white dark:bg-slate-800
              text-slate-800 dark:text-slate-100
              border-slate-300 dark:border-slate-700
              focus:ring-2 focus:ring-indigo-500
              outline-none text-sm"
          />

          <select
            value={role}
            onChange={(e) => {
              setPage(1);
              setRole(e.target.value);
            }}
            className="px-4 py-2 rounded-xl border
              bg-white dark:bg-slate-800
              text-slate-800 dark:text-slate-100
              border-slate-300 dark:border-slate-700
              text-sm"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>

          <button
            onClick={() => {
              setSelectedUser(null);
              setFormData({
                name: "",
                email: "",
                role: "User",
                status: "Active",
              });
              setIsModalOpen(true);
            }}
            className="px-5 py-2 rounded-xl
              bg-indigo-600 hover:bg-indigo-700
              text-white text-sm transition"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900 shadow overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-slate-200 dark:border-slate-800
                  hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                {/* USER */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-600
                      flex items-center justify-center text-white font-semibold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>

                {/* ROLE */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      u.role === "Admin"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      u.status === "Active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4 text-right space-x-4">
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setFormData({
                        name: u.name,
                        email: u.email,
                        role: u.role,
                        status: u.status,
                      });
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await deleteUser(u.id);
                      refreshUsers();
                    }}
                    className="text-rose-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 px-6 py-4
          bg-slate-50 dark:bg-slate-900">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-800 border dark:border-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900
            text-slate-800 dark:text-slate-100
            rounded-2xl p-6 w-96 shadow-xl">

            <h3 className="text-lg font-semibold mb-4">
              {selectedUser ? "Edit User" : "Add User"}
            </h3>

            <input
              className="border w-full mb-3 p-2 rounded-lg
                bg-white dark:bg-slate-800
                border-slate-300 dark:border-slate-700"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              className="border w-full mb-3 p-2 rounded-lg
                bg-white dark:bg-slate-800
                border-slate-300 dark:border-slate-700"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (selectedUser) {
                    await updateUser(selectedUser.id, formData);
                  } else {
                    await createUser(formData);
                  }
                  setIsModalOpen(false);
                  refreshUsers();
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
