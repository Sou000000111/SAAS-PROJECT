import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../features/auth/AuthCard";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    // 🔥 MOCK API
    localStorage.setItem("resetEmail", email);
    localStorage.setItem("otp", "123456"); // demo OTP

    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <AuthCard title="Forgot Password">
        <input
          placeholder="Enter registered email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="auth-btn mt-4" onClick={handleSendOTP}>
          Send OTP
        </button>
      </AuthCard>
    </div>
  );
}
