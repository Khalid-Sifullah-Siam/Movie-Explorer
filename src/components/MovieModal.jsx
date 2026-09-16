import { useEffect } from 'react';

export default function MovieModal({ show, onClose }) {
  const placeholderImage =
    'https://via.placeholder.com/600x900/1a1a2e/e5e5e5?text=No+Image';

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Strip HTML tags from summary for cleaner display
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 hover:text-amber-400 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Backdrop Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={show.image || placeholderImage}
              alt={show.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = placeholderImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{show.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {show.rating && (
                  <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-semibold">
                    ⭐ Rating: {show.rating}
                  </span>
                )}
                {show.premiered && (
                  <span className="flex items-center gap-1 bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                    📅 Release: {show.premiered}
                  </span>
                )}
                {show.status && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    show.status === 'Running'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {show.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            {/* Genres */}
            {show.genres && show.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Overview:</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                {stripHtml(show.summary)}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Language</p>
                <p className="text-sm text-white font-medium">{show.language}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">Network</p>
                <p className="text-sm text-white font-medium">{show.network}</p>
              </div>
              {show.runtime && (
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">Runtime</p>
                  <p className="text-sm text-white font-medium">{show.runtime} min</p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              ❌ Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

