import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", volume: 400, service: 240 },
  { name: "Tue", volume: 300, service: 220 },
  { name: "Wed", volume: 500, service: 280 },
  { name: "Thu", volume: 450, service: 300 },
];

export default function VolumeVsService() {
  return (
    <div className="text-sm font-medium mb-2
  text-slate-700
  dark:text-slate-100 space-y-4">
      <h4 className="font-semibold mb-4">Volume vs Service</h4>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="volume" fill="#22c55e" />
            <Bar dataKey="service" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
