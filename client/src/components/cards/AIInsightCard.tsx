type Insight = {
  label: string;
  value: string | number;
};

type AllInsightCardProps = {
  title: string;
  insights: Insight[];
};

export default function AllInsightCard({
  title,
  insights,
}: AllInsightCardProps) {
  return (
    <div className="bg-[#12172A] border border-white/10 rounded-xl p-6">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>

      <div className="space-y-3">
        {insights.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-gray-300"
          >
            <span className="text-gray-400">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
