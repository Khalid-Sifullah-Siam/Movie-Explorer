import { useState, useEffect, useRef } from 'react';

const GENRES = [
  'All',
  'Drama',
  'Action',
  'Comedy',
  'Science-Fiction',
  'Thriller',
  'Crime',
  'Adventure',
  'Romance',
  'Horror',
];

export default function SearchBar({ onSearch, selectedGenre, onSelectGenre }) {
  const [query, setQuery] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(query.trim());
    }, 350);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 flex flex-col items-center">
      {/* Search Input Bar matching Wireframe: 🔍 Search for a movie... */}
      <div className="relative w-full group">
        {/* Glowing Focus Ring Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-orange-500/20 to-rose-500/30 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative flex items-center bg-[#0f131d]/90 backdrop-blur-xl border border-white/10 group-focus-within:border-amber-400/50 rounded-2xl shadow-xl transition-all duration-300">
          {/* Search Icon */}
          <div className="pl-5 pr-3 text-zinc-400 group-focus-within:text-amber-400 transition-colors pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full py-4 pr-12 bg-transparent text-white placeholder-zinc-500 text-base sm:text-lg font-medium focus:outline-none"
          />

          {/* Clear Button */}
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Clear search input"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Genre Filter Pills Row for Streamlined Browsing */}
      {onSelectGenre && (
        <div className="flex items-center gap-2 mt-4 overflow-x-auto w-full max-w-full pb-2 px-1 scrollbar-none justify-start sm:justify-center">
          {GENRES.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => onSelectGenre(genre)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)] font-bold'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
