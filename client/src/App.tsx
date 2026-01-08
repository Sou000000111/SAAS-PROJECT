import { Routes, Route, Navigate } from "react-router-dom";
import CommandLayout from "./components/layout/CommandLayout";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
import Leaderboard from "./pages/admin/Leaderboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Reports from "./pages/admin/Reports";
import Messages from "./pages/admin/Messages";
import Settings from "./pages/admin/Settings";
import Profile from "./pages/admin/Profile";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";

const isLoggedIn = () => !!localStorage.getItem("token");

export default function App() {
  return (
    <Routes>

      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ===== PROTECTED ROUTES ===== */}
      <Route
        element={
          isLoggedIn() ? <CommandLayout /> : <Navigate to="/login" />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ===== FALLBACK ===== */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn() ? "/dashboard" : "/login"} />}
      />

    </Routes>
  );
}
