const countries = [
  { name: "USA", color: "bg-blue-500" },
  { name: "India", color: "bg-green-500" },
  { name: "Brazil", color: "bg-yellow-500" },
  { name: "UK", color: "bg-purple-500" },
];

export default function SalesByCountry() {
  return (
    <div className="text-sm font-medium mb-2
  text-slate-700
  dark:text-slate-100 space-y-4">
      <h4 className="font-semibold mb-4">Sales by Country</h4>

      <div className="grid grid-cols-2 gap-4">
        {countries.map((c) => (
          <div
            key={c.name}
            className={`rounded-xl p-4 text-white ${c.color}`}
          >
            {c.name}
          </div>
        ))}
      </div>
    </div>
  );
}
