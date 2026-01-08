type Props = {
  showAll?: boolean;
};

const USERS = [
  {
    name: "Soumyajit Sinha",
    email: "soumyajit@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Rahul Das",
    email: "rahul@gmail.com",
    role: "User",
    status: "Inactive",
  },
  {
    name: "Ankit Roy",
    email: "ankit@gmail.com",
    role: "User",
    status: "Active",
  },
  {
    name: "Rohit Sen",
    email: "rohit@gmail.com",
    role: "User",
    status: "Active",
  },
];

export default function UsersTable({ showAll = false }: Props) {
  const visibleUsers = showAll ? USERS : USERS.slice(0, 3);

  return (
    <div className="space-y-3">
      {visibleUsers.map((user) => (
        <div
          key={user.email}
          className="
            flex justify-between items-center py-3 
            border-b border-slate-200 dark:border-slate-700 
            last:border-none
          "
        >
          {/* LEFT */}
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-100">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex gap-4 items-center">
            <span className="text-sm text-slate-700 dark:text-slate-200">
              {user.role}
            </span>

                  <span
                     className={`px-3 py-1 rounded-full text-xs ${
                     user.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                   }`}
                   >
              {user.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
