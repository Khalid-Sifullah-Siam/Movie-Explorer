export default function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-md">
      {/* Poster placeholder */}
      <div className="aspect-[2/3] w-full bg-slate-800 animate-pulse" />

      {/* Info placeholder */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-slate-800 rounded w-1/2 animate-pulse" />
        <div className="h-9 bg-slate-800 rounded-xl w-full mt-auto animate-pulse" />
      </div>
    </div>
  );
}
