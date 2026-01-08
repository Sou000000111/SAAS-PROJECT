import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", target: 400, actual: 380 },
  { month: "Feb", target: 500, actual: 520 },
  { month: "Mar", target: 450, actual: 410 },
  { month: "Apr", target: 600, actual: 580 },
];

export default function TargetVsReality() {
  return (
    <div className="text-sm font-medium mb-2
  text-slate-700
  dark:text-slate-100 space-y-4">
      <h4 className="font-semibold mb-4">Target vs Reality</h4>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="target" fill="#93c5fd" radius={[6, 6, 0, 0]} />
            <Bar dataKey="actual" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
