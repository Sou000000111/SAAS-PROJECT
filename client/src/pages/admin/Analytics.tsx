import { useEffect, useState } from "react";
import api from "../../services/api";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* ================= TYPES ================= */
type Stats = {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
  newSignups: number;
  churnRate: number;
  avgSession: string;
  bounceRate: number;
  activePercent: number;
  inactivePercent: number;
};

type ChartData = {
  name: string;
  users: number;
};

type Range = "today" | "week" | "month";


/* ================= RANGE DELTA (UI LOGIC) ================= */
const RANGE_DELTA = {
  today: {
    totalUsers: -1,
    activeUsers: +2,
    revenue: -4,
  },
  week: {
    totalUsers: +6,
    activeUsers: +4,
    revenue: +8,
  },
  month: {
    totalUsers: +12,
    activeUsers: +9,
    revenue: +18,
  },
};

/* ================= COMPONENT ================= */
export default function Analytics() {
   const [range, setRange] = useState<Range>("month");
  const [stats, setStats] = useState<Stats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/analytics?range=${range}`);
        setStats(res.data.stats);
        setChartData(res.data.chart);
      } catch (err) {
        console.error("Analytics API error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [range]);

  const delta = RANGE_DELTA[range];

  const pieData = stats
    ? [
        { name: "Active", value: stats.activePercent },
        { name: "Inactive", value: stats.inactivePercent },
      ]
    : [];

  return (
    <div className="p-6 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-sm text-slate-500">
            Real-time insights into platform performance
          </p>
        </div>

        <select
          value={range}
         onChange={(e) => setRange(e.target.value as Range)}
          className="px-4 py-2 rounded-xl text-sm
                     bg-white dark:bg-slate-900
                     border dark:border-slate-700"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* KPI CARDS */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <KpiCard
                title="Total Users"
                 value={stats.totalUsers}
                  change={delta.totalUsers}
               />

              <KpiCard
                title="Active Users"
                 value={stats.activeUsers}
                   change={delta.activeUsers}
              />

              <KpiCard
                title="Revenue"
                value={stats.revenue}
                change={delta.revenue}
                prefix="₹"
              />

              <KpiCard
                title="Growth Rate"
                value={stats.growth}
                change={stats.growth >= 0 ? 5 : -5}
                suffix="%"
              />

        </div>
      )}

      {/* MINI STATS */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MiniStat title="New Signups" value={`+${stats.newSignups}`} />
          <MiniStat title="Churn Rate" value={`${stats.churnRate}%`} />
          <MiniStat title="Avg Session" value={stats.avgSession} />
          <MiniStat title="Bounce Rate" value={`${stats.bounceRate}%`} />
        </div>
      )}

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <GlassCard title="User Growth">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366F1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard title="Revenue Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#6366F1" radius={[12, 12, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* PIE + INSIGHTS */}
      {stats && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <GlassCard title="User Status">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={110}
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard title="Insights">
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li>📈 User activity changed with selected range</li>
              <li>💰 Revenue trend adapts dynamically</li>
              <li>👥 Active users ratio updated</li>
              <li>⚠️ Bounce rate monitored</li>
            </ul>
          </GlassCard>
        </div>
      )}

      {!loading && (
        <p className="text-xs text-slate-400">
          Data updates automatically based on selected range
        </p>
      )}
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-2xl
                 bg-white dark:bg-slate-900
                 border dark:border-slate-800
                 p-6 shadow-md hover:shadow-xl transition"
    >
      <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}


  function KpiCard({
  title,
  value,
  change,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: number;
  change: number;   // 👈 yahi prop hai
  prefix?: string;
  suffix?: string;
}) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl
                 bg-white dark:bg-slate-900
                 border dark:border-slate-800
                 p-5 shadow-sm hover:shadow-xl transition"
    >
      {/* glow line */}
      <div
        className={`absolute top-0 left-0 h-1 w-full ${
          isPositive
            ? "bg-gradient-to-r from-emerald-400 to-green-500"
            : "bg-gradient-to-r from-rose-400 to-red-500"
        }`}
      />

      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-slate-500">{title}</p>

        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {Math.abs(change)}%
        </span>
      </div>

      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
        {prefix}
        <CountUp end={value} duration={1.2} />
        {suffix}
      </h3>
    </motion.div>
  );
}

function MiniStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.04 }}
      className="relative overflow-hidden rounded-xl
                 bg-white dark:bg-slate-900
                 border dark:border-slate-800
                 p-4 shadow-sm hover:shadow-lg transition"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

      <p className="text-xs text-slate-500 uppercase tracking-wide">
        {title}
      </p>
      <p className="text-xl font-bold mt-1 text-slate-900 dark:text-white">
        {value}
      </p>
    </motion.div>
  );
}

