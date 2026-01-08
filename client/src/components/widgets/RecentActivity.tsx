const activities = [
  { id: 1, text: "New user registered", time: "2 min ago", type: "success" },
  { id: 2, text: "Payment failed", time: "10 min ago", type: "error" },
  { id: 3, text: "User upgraded to Pro", time: "1 hour ago", type: "info" },
];

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

      <ul className="space-y-3 text-sm">
        {activities.map((a) => (
          <li key={a.id} className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              • {a.text}
            </span>
            <span className="text-xs text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
