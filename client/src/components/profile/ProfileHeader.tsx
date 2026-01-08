import { useState } from "react";
import { useUser } from "../../context/UserContext";
import EditProfileModal from "./EditProfileModal";

export default function ProfileHeader() {
  const { user } = useUser();
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <div className="relative bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-3xl p-6">
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />

          {/* USER INFO */}
          <div>
            <h2 className="text-xl font-bold text-white">
              {user.name}
            </h2>
            <p className="text-white/80">
              {user.role}
            </p>
          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => setOpenEdit(true)}
            className="
              ml-auto px-5 py-2 rounded-xl text-sm font-medium
              bg-white text-slate-800
              hover:bg-slate-100
              dark:bg-slate-900 dark:text-slate-100
              dark:hover:bg-slate-800
              transition
            "
          >
            Edit Profile
          </button>
        </div>
      </div>

      <EditProfileModal open={openEdit} setOpen={setOpenEdit} />
    </>
  );
}
