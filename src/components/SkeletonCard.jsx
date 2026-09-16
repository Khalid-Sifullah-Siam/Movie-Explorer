export default function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-[#0f131d] border border-white/5 shadow-lg">
      {/* Poster Skeleton with Shimmer */}
      <div className="relative aspect-[2/3] bg-zinc-800/50 animate-shimmer">
        {/* Rating Pill Placeholder */}
        <div className="absolute top-3 right-3 w-14 h-6 rounded-lg bg-zinc-700/60" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title line */}
        <div className="h-5 w-3/4 bg-zinc-800 rounded-md animate-shimmer" />

        {/* Rating and Year line */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-zinc-800/80 rounded animate-shimmer" />
          <div className="w-1 h-1 rounded-full bg-zinc-700" />
          <div className="h-4 w-16 bg-zinc-800/80 rounded animate-shimmer" />
        </div>

        {/* Button placeholder */}
        <div className="mt-auto pt-2">
          <div className="h-10 w-full rounded-xl bg-zinc-800/60 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
