import { useState } from "react";

import StatsCards from "../../components/dashboard/StatsCards";
import AnalyticsOverview from "../../components/dashboard/AnalyticsOverview";
import SecondaryWidgets from "../../components/dashboard/SecondaryWidgets";
import UsersSection from "../../components/dashboard/UsersSection";

import type { Range } from "../../data/dashboardStats";

export default function Dashboard() {
  // CENTRAL RANGE STATE
  const [range, setRange] = useState<Range>("month");

  return (
    <div
      id="dashboard-root"
      className="
        min-h-screen
        p-6
        bg-slate-50
        dark:bg-slate-950
        text-slate-800
        dark:text-slate-100
        transition-colors
      "
    >
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Dashboard
        </h2>

        {/* RANGE SWITCHER */}
        <div className="flex gap-2">
          {(["week", "month", "year"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                range === r
                  ? "px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white"
                  : "px-4 py-1.5 rounded-lg text-sm font-medium bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="space-y-8">
        <StatsCards range={range} />

        <AnalyticsOverview
          range={range}
          // onRangeChange={setRange}
        />

        <SecondaryWidgets />

        <UsersSection />
      </div>
    </div>
  );
}
