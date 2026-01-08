const products = [
  { name: "Home Decor Range", percent: 75 },
  { name: "Disney Princess Bag", percent: 60 },
  { name: "Bathroom Essentials", percent: 45 },
  { name: "Apple Smartwatch", percent: 30 },
];

export default function TopProducts() {
  return (
    <div className="text-sm font-medium mb-2
  text-slate-700
  dark:text-slate-100 space-y-4">
      <h4 className="font-semibold mb-4">Top Products</h4>

      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{p.name}</span>
              <span>{p.percent}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${p.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
