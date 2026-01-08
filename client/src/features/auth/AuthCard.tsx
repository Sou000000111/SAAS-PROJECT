import { motion } from "framer-motion";
import React from "react";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        w-[380px]
        rounded-2xl
        p-6
        bg-slate-900/80
        backdrop-blur-xl
        border border-slate-700/40
        shadow-[0_20px_60px_rgba(0,0,0,0.7)]
      "
    >
      <h2 className="text-2xl font-semibold text-center text-white mb-6">
        {title}
      </h2>

      {children}
    </motion.div>
  );
}
