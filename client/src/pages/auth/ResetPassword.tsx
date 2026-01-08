import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../features/auth/AuthCard";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // 🔐 MOCK SAVE
    localStorage.removeItem("otp");
    alert("Password changed successfully");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <AuthCard title="Set New Password">
        <input
          type="password"
          placeholder="New Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="auth-input mt-3"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="auth-btn mt-4" onClick={handleReset}>
          Save Password
        </button>
      </AuthCard>
    </div>
  );
}
