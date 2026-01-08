import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Lock,
  Palette,
  ShieldCheck,
  X,
} from "lucide-react";
import { useTheme } from "../../context/useTheme";
import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  value: string;
};

type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

type InputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
};

type CardProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

type CardHeaderProps = {
  icon: ReactNode;
  title: string;
};


export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const [openPassword, setOpenPassword] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Manage your account preferences & system configuration
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PROFILE */}
        <Card delay={0}>
          <CardHeader icon={<User />} title="Profile" />
          <Field label="Name" value="Admin" />
          <Field label="Email" value="admin@saasboard.com" />
        </Card>

        {/* APPEARANCE */}
        <Card delay={0.05}>
          <CardHeader icon={<Palette />} title="Appearance" />
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </Card>

        {/* NOTIFICATIONS */}
        <Card delay={0.1}>
          <CardHeader icon={<Bell />} title="Notifications" />
          <Toggle label="Email Notifications" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
          <Toggle label="Push Notifications" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
        </Card>

        {/* SECURITY */}
        <Card delay={0.15}>
          <CardHeader icon={<ShieldCheck />} title="Security" />
          <Toggle label="Two-Factor Authentication" checked={twoFA} onChange={() => setTwoFA(!twoFA)} />

          <button
            onClick={() => setOpenPassword(true)}
            className="mt-3 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition text-sm"
          >
            Change Password
          </button>
        </Card>

        {/* SYSTEM */}
        <Card delay={0.2} className="md:col-span-2">
          <CardHeader icon={<Lock />} title="System" />
          <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
            Sign out from all devices
          </button>
        </Card>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {openPassword && (
          <ChangePasswordModal onClose={() => setOpenPassword(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= CHANGE PASSWORD MODAL ================= */

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!oldPass || !newPass || !confirmPass) {
      setError("All fields are required");
      return;
    }
    if (newPass.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    // 🔥 BACKEND CALL YAHAN LAGEGA
    // await api.post("/change-password", {...})

    alert("✅ Password changed successfully (demo)");
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-3">
          <Input label="Current Password" value={oldPass} onChange={setOldPass} />
          <Input label="New Password" value={newPass} onChange={setNewPass} />
          <Input label="Confirm Password" value={confirmPass} onChange={setConfirmPass} />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Update Password
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================= UI HELPERS ================= */

function Card({
  children,
  delay = 0,
  className = "",
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl border bg-white dark:bg-slate-900 
      border-slate-200 dark:border-slate-800 
      p-6 shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}


function CardHeader({ icon, title }: CardHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 
      flex items-center justify-center text-indigo-600">
        {icon}
      </div>
      <h2 className="font-semibold text-lg">{title}</h2>
    </div>
  );
}


function Field({ label, value }: FieldProps) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input
        value={value}
        disabled
        className="w-full mt-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border"
      />
    </div>
  );
}


function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between text-sm mb-3">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-indigo-600"
      />
    </label>
  );
}

function Input({ label, value, onChange }: InputProps) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 rounded-lg border bg-slate-50 dark:bg-slate-800"
      />
    </div>
  );
}

