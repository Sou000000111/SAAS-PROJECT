import { useState } from "react";
import {
  Download,
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";

type DateFilter = "7d" | "30d" | "90d";

const analyticsData: Record<
  DateFilter,
  { revenue: number; users: number; reports: number }
> = {
  "7d": { revenue: 45600, users: 420, reports: 12 },
  "30d": { revenue: 245600, users: 1284, reports: 86 },
  "90d": { revenue: 684300, users: 3920, reports: 241 },
};

export default function Reports() {
  const [filter, setFilter] = useState<DateFilter>("30d");
  const [tempFilter, setTempFilter] = useState<DateFilter>(filter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const currentData = analyticsData[filter];

  const downloadMockReport = (name: string) => {
    const blob = new Blob(
      [
        `Report Name: ${name}
Date Range: ${filter}

(This is a demo report file)`,
      ],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(" ", "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Download analytics, revenue & performance reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
              border border-slate-300 dark:border-slate-700
              bg-white dark:bg-slate-800
              hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>

          <button
            onClick={() => downloadMockReport("Full_Report")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700"
          >
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* ================= FILTER MODAL ================= */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[320px] rounded-2xl p-6 space-y-4
            bg-white dark:bg-slate-800
            text-slate-800 dark:text-slate-100
            border border-slate-200 dark:border-slate-700
          ">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-sm text-slate-500 dark:text-slate-400">
                Date Range
              </label>
              <select
                value={tempFilter}
                onChange={(e) =>
                  setTempFilter(e.target.value as DateFilter)
                }
                className="mt-1 w-full px-3 py-2 rounded-lg text-sm
                  bg-white dark:bg-slate-900
                  border border-slate-300 dark:border-slate-600"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>

            <button
              onClick={() => {
                setFilter(tempFilter);
                setIsFilterOpen(false);
              }}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Revenue",
            value: `₹${currentData.revenue.toLocaleString("en-IN")}`,
            icon: TrendingUp,
          },
          {
            title: "Active Users",
            value: currentData.users.toLocaleString(),
            icon: BarChart3,
          },
          {
            title: "Reports Generated",
            value: currentData.reports.toString(),
            icon: FileText,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-xl
                bg-indigo-50 dark:bg-indigo-900
                text-indigo-600 dark:text-indigo-300">
                <item.icon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= REPORT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Revenue Report",
            desc: "Monthly & yearly revenue breakdown",
          },
          {
            title: "User Analytics",
            desc: "User growth & engagement stats",
          },
          {
            title: "Sales Performance",
            desc: "Plan-wise sales & conversion data",
          },
          {
            title: "System Activity",
            desc: "Logins, actions & usage timeline",
          },
        ].map((report, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between rounded-2xl p-6
              bg-white dark:bg-slate-800
              border border-slate-200 dark:border-slate-700
              shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-lg">{report.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {report.desc}
              </p>
            </div>

            <button
              onClick={() => downloadMockReport(report.title)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" /> Download
            </button>
          </motion.div>
        ))}
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Reports are generated in real-time and may take a few seconds to download
      </div>
    </div>
  );
}
