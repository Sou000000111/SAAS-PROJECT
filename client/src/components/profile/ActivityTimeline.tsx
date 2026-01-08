import { Clock } from "lucide-react";

const activities = [
  "Logged in",
  "Updated revenue report",
  "Exported analytics PDF",
  "Changed profile photo",
];

export default function ActivityTimeline() {
  return (
    <div
      className="
        p-6 rounded-2xl
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        transition-colors
      "
    >
      <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
        Activity
      </h3>

      <ul className="space-y-4">
        {activities.map((activity, i) => (
          <li key={i} className="flex items-start gap-3">
            <Clock className="h-4 w-4 mt-1 text-indigo-500" />

            <span className="text-sm text-slate-600 dark:text-slate-300">
              {activity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
