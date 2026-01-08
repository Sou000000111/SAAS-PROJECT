import RevenueLineChart from "../charts/RevenueLineChart";
import UsersBarChart from "../charts/UsersBarChart";
import type { Range } from "../../data/dashboardStats";
import DarkGlassCard from "../dashboard/DarkGlassCard";

type Props = {
  range: Range;
};

export default function AnalyticsOverview({ range }: Props) {
  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Analytics Overview
      </h3>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* REVENUE */}
        <DarkGlassCard title="Revenue">
          <div className="h-[260px]">
            <RevenueLineChart range={range} />
          </div>
        </DarkGlassCard>

        {/* ACTIVE USERS */}
        <DarkGlassCard title="Active Users">
          <div className="h-[260px]">
            <UsersBarChart range={range} />
          </div>
        </DarkGlassCard>
      </div>
    </div>
  );
}
