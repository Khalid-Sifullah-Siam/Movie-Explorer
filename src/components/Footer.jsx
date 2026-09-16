import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <span className="font-bold text-white text-base">MovieExplorer</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-500">
            © 2026 MovieExplorer. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <Link to="/movies" className="hover:text-amber-400 transition-colors">
              Movies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
