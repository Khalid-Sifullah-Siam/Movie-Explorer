import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

export default function MovieGrid({ shows, loading, onSelect, onReset }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!shows || shows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="text-4xl mb-3">🎬</div>
        <h3 className="text-lg font-bold text-white mb-1">No Movies Found</h3>
        <p className="text-slate-400 text-sm max-w-sm mb-4">
          No results match your search or filter. Try a different keyword or reset filters.
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {shows.map((show) => (
        <MovieCard key={show.id} show={show} onSelect={onSelect} />
      ))}
    </div>
  );
}
