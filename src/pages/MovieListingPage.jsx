import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import MovieModal from '../components/MovieModal';
import { fetchAllShows, searchShows } from '../api/tvmaze';

export default function MovieListingPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const [error, setError] = useState(null);

  // Load all shows on mount
  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllShows();
        // Limit to first 50 shows for performance
        setShows(data.slice(0, 50));
      } catch (err) {
        setError('Failed to load shows. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadShows();
  }, []);

  // Handle search
  const handleSearch = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);

      if (!query) {
        // If search is cleared, reload all shows
        const data = await fetchAllShows();
        setShows(data.slice(0, 50));
      } else {
        const results = await searchShows(query);
        setShows(results);
      }
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Browse <span className="text-amber-400">Movies</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Discover thousands of shows and movies
          </p>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 inline-block">
              {error}
            </p>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && shows.length > 0 && (
          <p className="text-gray-500 text-sm mb-6">
            Showing {shows.length} result{shows.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Movie Grid */}
        <MovieGrid
          shows={shows}
          loading={loading}
          onSelect={(show) => setSelectedShow(show)}
        />
      </main>

      <Footer />

      {/* Modal */}
      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}

