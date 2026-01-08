import CountUp from "react-countup";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Range } from "../../data/dashboardStats";
import { dashboardStats } from "../../data/dashboardStats";

type Props = {
  range: Range;
};

export default function StatsCards({ range }: Props) {
  const stats = dashboardStats[range];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(stats).map(([key, item]) => {
        const positive = item.change >= 0;

        return (
          <div
            key={key}
            className={`
              relative group
              rounded-2xl p-6
              bg-white dark:bg-slate-900/80
              border border-slate-200 dark:border-slate-800
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-1
              ${
                positive
                  ? "hover:shadow-[0_0_30px_rgba(34,197,94,0.35)]"
                  : "hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]"
              }
            `}
          >
            {/* 🔥 NEON TOP BORDER */}
            <span
              className={`
                absolute top-0 left-0 h-[2px] w-full
                scale-x-0 group-hover:scale-x-100
                transition-transform duration-300 origin-left
                ${
                  positive
                    ? "bg-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.9)]"
                    : "bg-red-400 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                }
              `}
            />

            {/* LABEL */}
            <p className="text-xs uppercase tracking-widest text-slate-500">
              {key}
            </p>

            {/* VALUE */}
            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              <CountUp end={item.value} duration={1.4} separator="," />
            </h3>

            {/* CHANGE */}
            <div
              className={`mt-3 inline-flex items-center gap-1 text-sm font-medium ${
                positive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {positive ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              {Math.abs(item.change)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
