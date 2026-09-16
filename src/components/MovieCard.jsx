export default function MovieCard({ show, onSelect }) {
  const placeholderImage =
    'https://via.placeholder.com/300x450/1a1a2e/e5e5e5?text=No+Image';

  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={show.imageMedium || show.image || placeholderImage}
          alt={show.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
        {/* Rating badge */}
        {show.rating && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-sm font-semibold text-amber-400">
            ⭐ {show.rating}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-base mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {show.name}
        </h3>

        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
          {show.rating ? (
            <span className="flex items-center gap-1">
              ⭐ {show.rating}
            </span>
          ) : (
            <span className="text-gray-500">No rating</span>
          )}
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1">
            📅 {show.year || 'N/A'}
          </span>
        </div>

        {/* See Details Button */}
        <button
          onClick={() => onSelect(show)}
          className="mt-auto w-full py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl text-sm font-medium hover:bg-amber-500 hover:text-black transition-all duration-300 cursor-pointer"
        >
          See Details
        </button>
      </div>
    </div>
  );
}

