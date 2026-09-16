import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import { fetchAllShows, searchShows } from '../api/tvmaze';

export default function MovieListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') ?? searchParams.get('search') ?? '';

  const showsRef = useRef([]);
  const [currentShows, setCurrentShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Load data based on URL queryParam
  useEffect(() => {
    let isCurrent = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const cleanQuery = queryParam.trim();

        if (!cleanQuery) {
          if (showsRef.current.length > 0) {
            setCurrentShows(showsRef.current);
            setLoading(false);
          } else {
            const data = await fetchAllShows();
            if (!isCurrent) return;
            showsRef.current = data;
            setCurrentShows(data);
            setLoading(false);
          }
        } else {
          const results = await searchShows(cleanQuery);
          if (!isCurrent) return;
          setCurrentShows(results);
          setLoading(false);

          // Preload complete catalogue in background if not already cached
          if (showsRef.current.length === 0) {
            fetchAllShows()
              .then((data) => {
                if (isCurrent) showsRef.current = data;
              })
              .catch((err) => console.error(err));
          }
        }
      } catch (err) {
        if (!isCurrent) return;
        setError(
          queryParam.trim()
            ? 'Error while searching. Please try again.'
            : 'Failed to fetch movies. Please check your internet connection.'
        );
        console.error(err);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isCurrent = false;
    };
  }, [queryParam]);

  // Update URL search params when user types
  const handleSearch = useCallback(
    (query) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (query) {
            newParams.set('q', query);
            newParams.delete('search');
          } else {
            newParams.delete('q');
            newParams.delete('search');
          }
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Filter and sort items
  const filteredShows = useMemo(() => {
    let list = [...currentShows];

    if (selectedGenre !== 'All') {
      list = list.filter((item) =>
        item.genres && item.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'year') {
      list.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'title') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return list;
  }, [currentShows, selectedGenre, sortBy]);

  const handleReset = () => {
    setSelectedGenre('All');
    setSortBy('default');
    setSearchParams({}, { replace: true });
    if (showsRef.current.length > 0) {
      setCurrentShows(showsRef.current);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Browse <span className="text-amber-400">Movies & Shows</span>
          </h1>
          <p className="text-sm text-slate-400">
            Search titles or filter by genre to explore your next watch
          </p>
        </div>

        {/* Search input and genres */}
        <SearchBar
          initialQuery={queryParam}
          onSearch={handleSearch}
          selectedGenre={selectedGenre}
          onSelectGenre={(genre) => setSelectedGenre(genre)}
        />

        {/* Status bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800 text-xs sm:text-sm">
          <div className="text-slate-400">
            Showing <span className="text-white font-semibold">{filteredShows.length}</span> titles
            {queryParam.trim() && <span> for "{queryParam.trim()}"</span>}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
            >
              <option value="default">Default</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="year">Release Year (Newest)</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* Grid */}
        <MovieGrid
          shows={filteredShows}
          loading={loading}
          onSelect={(show) => setSelectedShow(show)}
          onReset={handleReset}
        />
      </main>

      <Footer />

      {/* Details modal */}
      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}
