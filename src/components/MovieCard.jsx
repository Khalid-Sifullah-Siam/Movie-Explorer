import { useState } from 'react';

export default function MovieCard({ show, onSelect }) {
  const [hasError, setHasError] = useState(false);

  // Fallback placeholder image URL
  const placeholder = 'https://placehold.co/300x450/1e293b/94a3b8?text=No+Poster';
  const posterUrl = !hasError && (show.imageMedium || show.image) ? (show.imageMedium || show.image) : placeholder;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Poster image */}
      <div className="relative aspect-[2/3] w-full bg-slate-800 overflow-hidden">
        <img
          src={posterUrl}
          alt={show.name}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Rating badge */}
        {show.rating && (
          <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-amber-400 text-xs font-bold flex items-center gap-1">
            <span>⭐</span>
            <span>{show.rating}</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-white font-bold text-base line-clamp-1" title={show.name}>
            {show.name}
          </h3>

          {/* Wireframe metadata: ⭐ 8.5 • 📅 2024 */}
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">
              ⭐ {show.rating || 'N/A'}
            </span>
            <span className="text-slate-600">•</span>
            <span>
              📅 {show.year || 'TBA'}
            </span>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => onSelect(show)}
          className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/30 transition-colors cursor-pointer"
        >
          See Details
        </button>
      </div>
    </div>
  );
}
