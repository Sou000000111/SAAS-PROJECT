import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function DarkGlassCard({ title, children }: Props) {
  return (
    <div
      className="
        group relative
        rounded-2xl p-6
        bg-white
        dark:bg-slate-900/90
        border border-slate-200 dark:border-slate-800
        backdrop-blur-xl
        transition-all duration-500
        shadow-sm
        dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)]
        hover:-translate-y-1
      "
    >
      {/* NEON GLOW */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-indigo-500/40
          blur-xl
        "
      />

      {/* TITLE */}
      <h3 className="relative z-10 mb-4 text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-100">
        {title}
      </h3>

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
