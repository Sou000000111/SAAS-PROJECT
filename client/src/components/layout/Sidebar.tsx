import {
  LayoutDashboard,
  Users,
  BarChart3,
  Trophy,
  ShoppingCart,
  Package,
  FileText,
  MessageSquare,
  Settings,
 // LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Users", icon: Users, path: "/users" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
];

const extras = [
  { name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "Messages", icon: MessageSquare, path: "/messages" },
];



export default function Sidebar() {

   const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // optional: clear sessionStorage
    sessionStorage.clear();

    // 🔁 redirect to login
    navigate("/login");
  };
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 dark:bg-[#0E1627] flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <h1 className="text-xl font-bold text-white mb-8 tracking-wide px-4">
          SaaSBoard
        </h1>

        {/* MAIN MENU */}
        <nav className="space-y-1 px-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-700 hover:text-white"
                }
              `
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* DIVIDER */}
        <div className="my-6 border-t border-slate-700" />

        {/* EXTRA MENU */}
        <nav className="space-y-1 px-2">
          {extras.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-slate-800 dark:bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-700 hover:text-white"
                }
              `
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      <div className="space-y-2 px-2 pb-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `
            flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
            ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-700 hover:text-white"
            }
          `
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

             <button
               onClick={handleLogout}
                className="
                       w-full
    flex items-center gap-2
    px-4 py-3
    rounded-lg
    text-red-500
    hover:bg-red-500/10
    transition
                  "
              >
                    Sign Out
             </button>
      </div>
    </aside>
  );
}
