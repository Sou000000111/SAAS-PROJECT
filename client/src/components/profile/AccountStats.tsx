import { LogIn, FileText, Download, Calendar } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
};

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-center hover:shadow transition">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">
        {icon}
      </div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

export default function AccountStats() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">
        Account Statistics
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Logins"
          value={128}
          icon={<LogIn className="w-5 h-5 text-blue-600" />}
        />

        <StatCard
          label="Reports"
          value={54}
          icon={<FileText className="w-5 h-5 text-indigo-600" />}
        />

        <StatCard
          label="Exports"
          value={21}
          icon={<Download className="w-5 h-5 text-green-600" />}
        />

        <StatCard
          label="Active Since"
          value="2023"
          icon={<Calendar className="w-5 h-5 text-orange-600" />}
        />
      </div>
    </div>
  );
}
