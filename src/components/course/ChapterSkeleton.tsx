export const ChapterSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-14 rounded-xl bg-slate-200 animate-pulse" />
    ))}
  </div>
);
