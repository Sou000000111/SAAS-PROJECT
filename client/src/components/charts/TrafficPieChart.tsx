import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Direct", value: 45 },
  { name: "Referral", value: 30 },
  { name: "Social", value: 15 },
  { name: "Email", value: 10 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

export default function TrafficPieChart() {
  return (
    <div className="text-sm font-medium mb-2
  text-slate-700
  dark:text-slate-100 space-y-4">
      <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>

      <div className="h-56 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Gradient Glow */}
            <defs>
              <filter id="pieGlow">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="10"
                  floodColor="#6366f1"
                  floodOpacity="0.25"
                />
              </filter>
            </defs>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={4}
              animationDuration={1200}
              filter="url(#pieGlow)"
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i]}
                  className="hover:opacity-90 transition"
                />
              ))}
            </Pie>

            {/* Polished Tooltip */}
           <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{
            borderRadius: 12,
            border: "none",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
           />

          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-400">Total Traffic</p>
          <p className="text-2xl font-bold">100%</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 text-sm mt-5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[i] }}
            />
            <span className="text-sm font-medium mb-2
  text-slate-700
  dark:text-slate-100">
              {d.name} ({d.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
