import { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import { fetchAllShows, searchShows } from '../api/tvmaze';

export default function MovieListingPage() {
  const [allShows, setAllShows] = useState([]);
  const [displayedShows, setDisplayedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Load: Fetch All Shows
  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllShows();
        setAllShows(data);
        setDisplayedShows(data);
      } catch (err) {
        setError('Failed to fetch movies catalog. Please verify your connection.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadShows();
  }, []);

  // Handle Search Input Callback
  const handleSearch = useCallback(
    async (query) => {
      setSearchQuery(query);
      setError(null);
      try {
        setLoading(true);
        if (!query) {
          setDisplayedShows(allShows);
        } else {
          const results = await searchShows(query);
          setDisplayedShows(results);
        }
      } catch (err) {
        setError('Search operation encountered an issue. Please retry.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [allShows]
  );

  // Filter and Sort Processing
  const filteredAndSortedShows = useMemo(() => {
    let result = [...displayedShows];

    // Filter by Genre
    if (selectedGenre !== 'All') {
      result = result.filter((show) =>
        show.genres && show.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'year') {
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'alpha') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return result;
  }, [displayedShows, selectedGenre, sortBy]);

  // Reset Filters handler
  const handleResetFilters = () => {
    setSelectedGenre('All');
    setSortBy('default');
    setSearchQuery('');
    setDisplayedShows(allShows);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header Title Section */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            🎬 Full Catalog & Search
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Browse <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Movies & Series</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Search our extensive database or filter by your favorite genre and ratings.
          </p>
        </div>

        {/* Search Bar & Genre Filters */}
        <SearchBar
          onSearch={handleSearch}
          selectedGenre={selectedGenre}
          onSelectGenre={(genre) => setSelectedGenre(genre)}
        />

        {/* Toolbar: Results Count and Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400">
            <span>Showing:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white font-bold">
              {filteredAndSortedShows.length} titles
            </span>
            {searchQuery && (
              <span className="text-amber-400">for "{searchQuery}"</span>
            )}
            {selectedGenre !== 'All' && (
              <span className="text-zinc-500">• {selectedGenre}</span>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label htmlFor="sort-select" className="text-xs font-medium text-zinc-400 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0f131d] border border-white/10 text-white text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400/50 cursor-pointer"
            >
              <option value="default">Default Catalog</option>
              <option value="rating">Top Rated ⭐</option>
              <option value="year">Newest Release 📅</option>
              <option value="alpha">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-2xl px-5 py-3 text-sm font-semibold">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Responsive Movie Cards Grid */}
        <MovieGrid
          shows={filteredAndSortedShows}
          loading={loading}
          onSelect={(show) => setSelectedShow(show)}
          onReset={handleResetFilters}
        />
      </main>

      <Footer />

      {/* Movie Details Modal Overlay */}
      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}
