import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 82 },
  { month: "May", score: 88 },
];

export default function CustomerSatisfaction() {
  return (
    <div className="text-sm font-medium mb-2
  text-slate-700
  dark:text-slate-100 space-y-4">
      <h4 className="font-semibold mb-4">Customer Satisfaction</h4>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#22c55e"
              fill="#bbf7d0"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
