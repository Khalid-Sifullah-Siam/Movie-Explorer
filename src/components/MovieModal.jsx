import { useEffect } from 'react';

export default function MovieModal({ show, onClose }) {
  // Fallback image
  const fallback = 'https://placehold.co/800x450/1e293b/94a3b8?text=No+Backdrop';

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!show) return null;

  // Helper to remove HTML tags from summary string
  const stripHtml = (html) => {
    if (!html) return 'No description available.';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || 'No description available.';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Top-right close button [ ✕ ] */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/70 hover:bg-black text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Movie Backdrop Image */}
        <div className="relative aspect-video w-full bg-slate-800">
          <img
            src={show.image || show.imageMedium || fallback}
            alt={show.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = fallback;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            {show.name}
          </h2>

          {/* Rating and Release Date: ⭐ Rating: 8.5 | 📅 Release: 2024 */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
              ⭐ Rating: {show.rating || 'N/A'}
            </span>
            <span className="text-slate-600 font-bold">|</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              📅 Release: {show.premiered || show.year || 'Unknown'}
            </span>
            {show.status && (
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs">
                {show.status}
              </span>
            )}
          </div>

          {/* Genres */}
          {show.genres && show.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {show.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-0.5 rounded-md text-xs bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Overview: */}
          <div>
            <h3 className="text-base font-semibold text-white mb-1.5">Overview:</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {stripHtml(show.summary)}
            </p>
          </div>

          {/* Extra metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Network</span>
              <span className="text-white font-medium truncate block">{show.network || 'N/A'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Language</span>
              <span className="text-white font-medium truncate block">{show.language || 'English'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block mb-0.5">Runtime</span>
              <span className="text-white font-medium truncate block">
                {show.runtime ? `${show.runtime} mins` : 'N/A'}
              </span>
            </div>
          </div>

          {/* Action button: [ ❌ Close ] */}
          <button
            onClick={onClose}
            className="w-full mt-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
}
