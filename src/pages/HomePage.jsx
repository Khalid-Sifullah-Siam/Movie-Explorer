import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import SkeletonCard from '../components/SkeletonCard';
import { fetchAllShows } from '../api/tvmaze';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const getFeaturedShows = async () => {
      try {
        setLoading(true);
        const data = await fetchAllShows();
        // Get high rated shows with posters
        const topShows = data
          .filter((item) => item.rating && item.image)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
        setFeatured(topShows);
      } catch (err) {
        console.error('Error fetching featured shows:', err);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedShows();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1">
        <HeroBanner />

        {/* Featured shows section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Featured <span className="text-amber-400">Shows</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Top rated series from our database
              </p>
            </div>

            <Link
              to="/movies"
              className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              See all movies →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((show) => (
                <MovieCard key={show.id} show={show} onSelect={(s) => setSelectedShow(s)} />
              ))}
            </div>
          )}
        </section>

        {/* Simple feature highlight cards */}
        <section className="border-t border-slate-800/80 bg-slate-900/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-white mb-2">Live TVMaze Data</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Instant access to verified show ratings, premiere dates, and episode overviews.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-bold text-white mb-2">Quick Search</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Search by show title or filter by genres effortlessly with debounced input.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold text-white mb-2">Responsive Design</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Optimized for mobile phones, tablets, and desktop displays.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}
