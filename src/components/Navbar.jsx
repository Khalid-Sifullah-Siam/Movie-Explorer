import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Track scroll position for dynamic glass navbar blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#07090e]/80 backdrop-blur-lg border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="group flex items-center gap-3 text-xl font-bold tracking-tight text-white transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] transition-all duration-300">
              <span className="text-xl leading-none">🎬</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-lg tracking-tight">Movie</span>
                <span className="font-extrabold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent text-lg tracking-tight">
                  Explorer
                </span>
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 -mt-1 hidden sm:block">
                Cinematic Database
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'text-white bg-white/[0.08] shadow-inner font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>

            {/* Prominent Movies Button as per Wireframe: 🎬 MovieExplorer [ Movies ] */}
            <Link
              to="/movies"
              className={`group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-md ${
                isActive('/movies')
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-white/[0.08] text-white hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 hover:text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 border border-white/10 hover:border-transparent'
              }`}
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <span>Movies</span>
            </Link>
          </nav>

          {/* Mobile Menu Button (Hamburger / Close) */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/movies"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-black shadow-sm"
            >
              Browse
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-2 animate-modal-backdrop">
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/')
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link
              to="/movies"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive('/movies')
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg'
                  : 'bg-white/5 text-white hover:bg-amber-500 hover:text-black'
              }`}
            >
              <span>🎬</span>
              <span>Explore Movies Catalog</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
