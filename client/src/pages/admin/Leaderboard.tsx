type LeaderboardUser = {
  name: string;
  score: number;
  rank: number;
};

const users: LeaderboardUser[] = [
  { name: "Soumyajit Sinha", score: 980, rank: 1 },
  { name: "Sougata Bag", score: 868, rank: 2 },
  { name: "Rahul Das", score: 860, rank: 3 },
  { name: "Ankit Roy", score: 820, rank: 4 },
];

export default function Leaderboard() {
  // ===== EXPORT CSV =====
  const exportCSV = () => {
    const rows = [
      ["Rank", "Name", "Score"],
      ...users.map((u) => [u.rank, u.name, u.score]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leaderboard.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 bg-transparent text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Top performing users this month
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          Export CSV
        </button>
      </div>

      {/* ===== LIST ===== */}
      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-5 rounded-2xl border 
            bg-white dark:bg-slate-800 
            border-slate-200 dark:border-slate-700
            shadow-sm transition`}
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white
                ${index === 0 ? "bg-yellow-400" : ""}
                ${index === 1 ? "bg-slate-400" : ""}
                ${index === 2 ? "bg-orange-400" : ""}
                ${index > 2 ? "bg-indigo-500" : ""}`}
              >
                {index + 1}
              </div>

              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Score: {user.score}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-40">
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-indigo-500"
                  style={{ width: `${(user.score / 1000) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
