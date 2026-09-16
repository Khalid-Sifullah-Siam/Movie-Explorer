import { useEffect } from 'react';

export default function MovieModal({ show, onClose }) {
  const fallbackSvg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450' fill='%230f121a'%3E%3Crect width='800' height='450' fill='%230f121a'/%3E%3Ccircle cx='400' cy='200' r='55' fill='%231f2432'/%3E%3Cpolygon points='390,175 425,200 390,225' fill='%23f59e0b'/%3E%3Ctext x='400' y='295' fill='%2364748b' font-family='sans-serif' font-size='16' font-weight='600' text-anchor='middle'%3ECinematic Backdrop Unavailable%3C/text%3E%3C/svg%3E";

  // Prevent background scroll when modal is active
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Keyboard shortcut listener (Escape key to dismiss)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Click outside listener
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Clean overview summary text
  const cleanSummary = (html) => {
    if (!html) return 'No detailed summary provided for this title.';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || 'No detailed summary provided for this title.';
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-modal-backdrop overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-movie-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0d1017] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-modal-content my-auto">
        {/* Wireframe [ ✕ ] Close Button in Top-Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:rotate-90 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Backdrop Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#141824]">
          <img
            src={show.image || show.imageMedium || fallbackSvg}
            alt={show.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = fallbackSvg;
            }}
          />
          {/* Layered Vignette Over Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1017] via-[#0d1017]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-7 -mt-10 relative z-10 space-y-6">
          {/* Header Title & Ratings */}
          <div>
            <h2
              id="modal-movie-title"
              className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3 drop-shadow-md"
            >
              {show.name}
            </h2>

            {/* Wireframe Format: ⭐ Rating: 8.5 | 📅 Release: 2024 */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <span>⭐</span>
                <span>Rating: {show.rating || 'N/A'}</span>
              </span>

              <span className="text-zinc-500 font-bold hidden sm:inline">|</span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                <span>📅</span>
                <span>Release: {show.premiered || show.year || 'Unknown'}</span>
              </span>

              {show.status && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{show.status}</span>
                </span>
              )}
            </div>
          </div>

          {/* Genre Badges */}
          {show.genres && show.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {show.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 font-medium text-xs tracking-wide"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Wireframe: Overview: section */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span>Overview:</span>
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {cleanSummary(show.summary)}
            </p>
          </div>

          {/* Additional Relevant Info Grid (Network, Language, Runtime) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                Network
              </span>
              <span className="text-sm font-bold text-white truncate block">
                {show.network || 'Online / Global'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                Language
              </span>
              <span className="text-sm font-bold text-white truncate block">
                {show.language || 'English'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                Runtime
              </span>
              <span className="text-sm font-bold text-white truncate block">
                {show.runtime ? `${show.runtime} minutes` : 'Standard Duration'}
              </span>
            </div>
          </div>

          {/* Wireframe [ ❌ Close ] Action Button at Bottom */}
          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>❌</span>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
