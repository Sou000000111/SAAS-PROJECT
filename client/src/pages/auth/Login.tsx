import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthCard from "../../features/auth/AuthCard";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔐 MOCK AUTH (replace with real API)
    if (email === "sinhasoumya2018@gmail.com" && password === "admin123") {
      localStorage.setItem("token", "secure-token");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-black via-slate-900 to-black
        relative overflow-hidden
      "
    >
      {/* 🔵 Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"
      />

      {/* 🔐 LOGIN CARD */}
      <AuthCard title="Welcome Back 👋">
        <div className="space-y-4">
          {/* EMAIL */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-2.5
              rounded-lg
              bg-slate-800
              text-white
              border border-slate-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          {/* PASSWORD */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-2.5
              rounded-lg
              bg-slate-800
              text-white
              border border-slate-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          {/* LOGIN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            className="
              w-full py-2.5 mt-2
              rounded-lg
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white font-medium
              shadow-lg shadow-blue-600/30
            "
          >
            Login
          </motion.button>

          {/* FORGOT PASSWORD */}
          <p
  onClick={() => navigate("/forgot-password")}
  className="text-sm text-blue-400 cursor-pointer hover:text-blue-300"
>
  Forgot Password?
</p>

        </div>
      </AuthCard>
    </div>
  );
}
