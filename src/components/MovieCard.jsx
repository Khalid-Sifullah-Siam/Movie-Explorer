import { useState } from 'react';

export default function MovieCard({ show, onSelect }) {
  const [imgError, setImgError] = useState(false);

  // High quality SVG data-uri fallback for missing or broken images
  const fallbackSvg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450' fill='%230f121a'%3E%3Crect width='300' height='450' fill='%230f121a'/%3E%3Ccircle cx='150' cy='200' r='45' fill='%231f2432'/%3E%3Cpolygon points='140,180 170,200 140,220' fill='%23f59e0b'/%3E%3Ctext x='150' y='275' fill='%2364748b' font-family='sans-serif' font-size='14' font-weight='600' text-anchor='middle'%3ENo Poster Available%3C/text%3E%3C/svg%3E";

  const posterSrc =
    !imgError && (show.imageMedium || show.image)
      ? show.imageMedium || show.image
      : fallbackSvg;

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0f131d] border border-white/[0.08] hover:border-amber-500/40 shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300 hover:-translate-y-1.5 flex-1">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#141824]">
        <img
          src={posterSrc}
          alt={show.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient on Poster Base */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f131d] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Rating Badge (Top Right) */}
        {show.rating ? (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-amber-400/20 text-amber-400 font-bold text-xs shadow-md">
            <span>⭐</span>
            <span>{show.rating}</span>
          </div>
        ) : (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-zinc-400 font-medium text-[11px]">
            NR
          </div>
        )}

        {/* Primary Genre Tag (Top Left) */}
        {show.genres && show.genres.length > 0 && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 font-medium text-[11px] shadow-sm max-w-[120px] truncate">
            {show.genres[0]}
          </div>
        )}
      </div>

      {/* Card Body Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Movie Title */}
          <h3
            className="text-white font-bold text-base leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors duration-200"
            title={show.name}
          >
            {show.name}
          </h3>

          {/* Wireframe Format: ⭐ 8.5 • 📅 2024 */}
          <div className="flex items-center gap-2 mt-1.5 text-xs text-zinc-400 font-medium">
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              ⭐ {show.rating || 'N/A'}
            </span>
            <span className="text-zinc-600 font-bold">•</span>
            <span className="flex items-center gap-1 text-zinc-300">
              📅 {show.year || 'TBA'}
            </span>
          </div>
        </div>

        {/* Action Button matching Wireframe: [ See Details ] */}
        <button
          onClick={() => onSelect(show)}
          className="w-full mt-1 py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 border border-amber-500/25 hover:border-transparent text-amber-400 hover:text-black font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>See Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
