import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  range: "week" | "month" | "year";
};

const dataMap = {
  week: [
    { name: "Mon", users: 320 },
    { name: "Tue", users: 420 },
    { name: "Wed", users: 380 },
    { name: "Thu", users: 510 },
    { name: "Fri", users: 600 },
    { name: "Sat", users: 540 },
    { name: "Sun", users: 720 },
  ],
  month: [
    { name: "Jan", users: 3500 },
    { name: "Feb", users: 4200 },
    { name: "Mar", users: 4800 },
    { name: "Apr", users: 5300 },
    { name: "May", users: 2800 },
    { name: "Jun", users: 3200 },
    { name: "July", users: 3600 },
    { name: "Aug", users: 3300 },
    { name: "Sep", users: 3900 },
    { name: "Oct", users: 2700 },
    { name: "Nov", users: 1700 },
    { name: "Dec", users: 2100 },
  ],
  year: [
    { name: "2022", users: 42000 },
    { name: "2023", users: 51000 },
    { name: "2024", users: 65000 },
    { name: "2025", users: 72000 },
  ],
};

export default function UsersBarChart({ range }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={dataMap[range]}>
        <defs>
          <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#22C55E" stopOpacity={0.4} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="name" tick={{ fill: "#64748B" }} />
        <YAxis tick={{ fill: "#64748B" }} />

        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
          formatter={(value) => [`₹${value}`, "Users"]}
        />

        <Bar
          dataKey="users"
          fill="url(#usersGradient)"
          radius={[8, 8, 0, 0]}
          animationDuration={1200}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
