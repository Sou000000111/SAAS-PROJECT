type GlassCardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function GlassCard({ title, children }: GlassCardProps) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      {title && (
        <h4 className="text-lg font-semibold mb-4 text-gray-200">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}
