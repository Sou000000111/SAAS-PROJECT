import React from "react";
import CountUp from "react-countup";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

type KpiCardProps = {
  title: string;
  value: string | number;
  growth: number;
  icon: React.ReactNode;
  variant?: "blue" | "green" | "purple" | "orange";
};

const variants = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    icon: "bg-blue-600",
    accent: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    icon: "bg-emerald-600",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  purple: {
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
    icon: "bg-indigo-600",
    accent: "text-indigo-600 dark:text-indigo-400",
  },
  orange: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    icon: "bg-amber-600",
    accent: "text-amber-600 dark:text-amber-400",
  },
};

export default function KpiCard({
  title,
  value,
  growth,
  icon,
  variant = "blue",
}: KpiCardProps) {
  const positive = growth >= 0;
  const style = variants[variant];

  const numericValue =
    typeof value === "string"
      ? Number(value.replace(/[^0-9.]/g, ""))
      : value;

  const prefix = typeof value === "string" && value.includes("₹") ? "₹" : "";
  const suffix = typeof value === "string" && value.includes("K") ? "K" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className={`
        relative rounded-2xl p-5 overflow-hidden
        ${style.bg}
        border border-slate-200 dark:border-slate-800
        shadow-sm hover:shadow-xl
        transition-all
      `}
    >
      {/* TOP ACCENT LINE */}
      <div
        className={`absolute top-0 left-0 h-1 w-full ${
          positive ? "bg-emerald-500" : "bg-rose-500"
        }`}
      />

      {/* ICON */}
      <div
        className={`absolute top-4 right-4 h-11 w-11 rounded-xl
        ${style.icon} text-white flex items-center justify-center shadow`}
      >
        {icon}
      </div>

      {/* TITLE */}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      {/* VALUE */}
      <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        <CountUp
          start={0}
          end={numericValue}
          duration={1.4}
          prefix={prefix}
          suffix={suffix}
          decimals={String(numericValue).includes(".") ? 1 : 0}
        />
      </h3>

      {/* GROWTH */}
      <div
        className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-xs font-semibold
        ${
          positive
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
            : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
        }`}
      >
        {positive ? (
          <ArrowUpRight size={14} />
        ) : (
          <ArrowDownRight size={14} />
        )}
        {Math.abs(growth)}%
      </div>
    </motion.div>
  );
}
