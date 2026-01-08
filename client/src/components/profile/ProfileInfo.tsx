import { Mail, Phone, MapPin, Shield } from "lucide-react";
import { useUser } from "../../context/UserContext";

export default function ProfileInfo() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      {/* ===== CONTACT INFORMATION ===== */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
          Contact Information
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-200">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-200">
              {user.phone}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="text-slate-700 dark:text-slate-200">
              {user.location}
            </span>
          </div>
        </div>
      </div>

      {/* ===== ROLE & SECURITY ===== */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
          Role & Security
        </h3>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div>
            <p className="font-medium text-slate-800 dark:text-slate-100">
              {user.role}
            </p>
            <p className="text-xs text-slate-500">
              Full system privileges enabled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
