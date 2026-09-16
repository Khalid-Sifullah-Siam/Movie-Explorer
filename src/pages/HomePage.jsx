import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import SkeletonCard from '../components/SkeletonCard';
import { fetchAllShows } from '../api/tvmaze';

export default function HomePage() {
  const [featuredShows, setFeaturedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const data = await fetchAllShows();
        // Pick top-rated shows for home page spotlight
        const sorted = [...data]
          .filter((show) => show.rating && show.image)
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 5);
        setFeaturedShows(sorted);
      } catch (err) {
        console.error('Failed to load featured shows:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1">
        {/* Wireframe Compliant Hero Banner */}
        <HeroBanner />

        {/* Home Page Featured Spotlight Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                🔥 Top Rated Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Trending on <span className="text-amber-400">MovieExplorer</span>
              </h2>
            </div>

            <button
              onClick={() => navigate('/movies')}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer"
            >
              <span>View All Movies</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Featured Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {featuredShows.map((show) => (
                <MovieCard key={show.id} show={show} onSelect={(s) => setSelectedShow(s)} />
              ))}
            </div>
          )}
        </section>

        {/* Feature Highlights Showcase */}
        <section className="border-t border-white/5 bg-black/40 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                Engineered for Movie Lovers
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base">
                Discover why MovieExplorer is your go-to hub for television series and cinematic entertainment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl mb-4">
                  ⚡
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Live TVMaze Data</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Real-time synchronization with thousands of verified TV shows, accurate cast records, official summaries, and episode air dates.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center text-2xl mb-4">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Instant Dynamic Search</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Debounced lightning-fast search by title or explore by genres to instantly find the movies and shows you're passionate about.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-2xl mb-4">
                  📱
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Seamless Multi-Device UX</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Carefully tailored layout for smartphones, tablets, laptops, and ultra-wide desktop screens with fluid responsive grid systems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Details Modal */}
      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}
