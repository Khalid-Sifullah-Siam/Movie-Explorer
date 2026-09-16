import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

export default function MovieGrid({ shows, loading, onSelect, onReset }) {
  // Loading State with Shimmer Skeletons
  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (!shows || shows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl mb-5 shadow-inner">
          🎬
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
          No Movies Found
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          We couldn't find any titles matching your search or active filters. Try searching for another title or clear filters.
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  // Active Grid of Movie Cards (1 col mobile, 2 col sm, 3 col md, 4 col lg, 5 col xl)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {shows.map((show) => (
        <MovieCard key={show.id} show={show} onSelect={onSelect} />
      ))}
    </div>
  );
}
