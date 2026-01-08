import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../features/auth/AuthCard";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    const savedOtp = localStorage.getItem("otp");

    if (otp === savedOtp) {
      navigate("/reset-password");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <AuthCard title="Verify OTP">
        <input
          placeholder="Enter OTP"
          className="auth-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="auth-btn mt-4" onClick={handleVerify}>
          Verify OTP
        </button>
      </AuthCard>
    </div>
  );
}
