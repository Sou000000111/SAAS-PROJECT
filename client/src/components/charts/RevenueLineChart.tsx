import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";
import type { Formatter } from "recharts/types/component/DefaultTooltipContent";

type Props = {
  range: "week" | "month" | "year";
};

const dataMap: Record<Props["range"], { name: string; value: number }[]> = {
  week: [
    { name: "Mon", value: 1200 },
    { name: "Tue", value: 1700 },
    { name: "Wed", value: 1500 },
    { name: "Thu", value: 2200 },
    { name: "Fri", value: 2600 },
    { name: "Sat", value: 2400 },
    { name: "Sun", value: 3000 },
  ],
  month: [
    { name: "Jan", value: 13000 },
    { name: "Feb", value: 16000 },
    { name: "Mar", value: 20000 },
    { name: "Apr", value: 26000 },
    { name: "May", value: 28000 },
    { name: "Jun", value: 32000 },
    { name: "July", value: 36000 },
    { name: "Aug", value: 33000 },
    { name: "Sep", value: 39000 },
    { name: "Oct", value: 27000 },
    { name: "Nov", value: 17000 },
    { name: "Dec", value: 21000 },
  ],
  year: [
    { name: "2022", value: 120000 },
    { name: "2023", value: 165000 },
    { name: "2024", value: 210000 },
    { name: "2025", value: 290000 },
  ],
};

export default function RevenueLineChart({ range }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dataMap[range]}>
        {/* ===== Gradient ===== */}
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
        </defs>

       <CartesianGrid
            stroke="rgba(148,163,184,0.25)"
             strokeDasharray="3 3"
         />
        <XAxis
           stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
         />
       <YAxis
            stroke="#94a3b8"
             tick={{ fill: "#94a3b8", fontSize: 12 }}
        />


        {/* ===== Tooltip (FIXED) ===== */}
       <Tooltip
         formatter={
           ((value: number | string) => [
           `₹${Number(value).toLocaleString()}`,
            "Revenue",
            ]) as Formatter<number | string, string>
        }
          contentStyle={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid #334155",
            borderRadius: 12,
            color: "#fff",
         }}
        />


        {/* ===== Area for Gradient Fill ===== */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="none"
          fill="url(#revenueGradient)"
        />

        {/* ===== Line on top ===== */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#6366F1"
          strokeWidth={3}
          dot={false}
          animationDuration={1200}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
