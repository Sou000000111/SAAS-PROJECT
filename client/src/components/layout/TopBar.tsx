import { useState } from "react";
import { Moon, Sun, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/useTheme";
import { exportPDF } from "../../utils/exportDashboard";
import { useNotifications } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { messages, unreadCount, markAllAsRead, markAsRead } =
    useNotifications();
  const { user } = useUser();

  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleBellClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenNotifications((prev) => !prev);
    setOpenProfile(false);

    if (unreadCount > 0) {
      markAllAsRead();
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenProfile((prev) => !prev);
    setOpenNotifications(false);
  };

  return (
    <header className=" h-16 px-6 border-b bg-white dark:bg-slate-900 flex items-center justify-between">
      {/* LEFT */}
      <h1 className="font-bold text-lg">SaaSBoard</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-5 relative">
        {/* EXPORT */}
        <button 
          onClick={exportPDF}
          className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Export PDF
        </button>

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-100"
        >
          {theme === "light" ? <Moon /> : <Sun className="text-yellow-400" />}
        </button>

        {/* 🔔 NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={handleBellClick}
            className="bg-slate-100 dark:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {openNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg z-50">
              <div className="p-3 border-b font-semibold">
                Notifications
              </div>

              {messages.length === 0 && (
                <p className="p-4 text-sm text-gray-500">
                  No notifications
                </p>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => markAsRead(msg.id)}
                  className={`p-3 text-sm cursor-pointer hover:bg-slate-50 ${
                    msg.unread ? "bg-indigo-50" : ""
                  }`}
                >
                  <p className="font-medium">{msg.sender}</p>
                  <p className="text-gray-600">{msg.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {msg.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      {/* 👤 PROFILE */}
<div className="relative">
  <button
    onClick={handleProfileClick}
    className="
      flex items-center gap-2 px-3 py-2 rounded-lg
      text-slate-700 dark:text-slate-200
      hover:bg-slate-200 dark:hover:bg-slate-800
      transition
    "
  >
    {/* Avatar */}
    {user.avatar ? (
      <img
        src={user.avatar}
        className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-slate-600"
      />
    ) : (
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
        {user.name?.[0]}
      </div>
    )}

    {/* Name */}
    <span
      className="
        px-2 py-1 text-xs rounded-full font-medium
        bg-slate-200 text-slate-800
        dark:bg-slate-700 dark:text-slate-100
      "
    >
      {user.name}
    </span>

    <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
  </button>

  {/* 🔽 DROPDOWN */}
  {openProfile && (
    <div
      className="
        absolute right-0 mt-3 w-48
        rounded-xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        shadow-xl
        z-50
        overflow-hidden
      "
    >
      <button
        onClick={() => {
          navigate("/profile");
          setOpenProfile(false);
        }}
        className="
          block w-full text-left px-4 py-2 text-sm
          text-slate-700 dark:text-slate-200
          hover:bg-slate-100 dark:hover:bg-slate-800
          transition
        "
      >
        👤 Profile
      </button>

      {/* <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="
          block w-full text-left px-4 py-2 text-sm
          text-red-600
          hover:bg-red-50 dark:hover:bg-red-900/30
          transition
        "
      >
        🚪 Sign Out
      </button> */}
    </div>
  )}
</div>

      </div>
    </header>
  );
}
