import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-[#0b0f19] py-20 sm:py-28 px-4 text-center">
      {/* Background glow circle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center">
        {/* Subtitle tag */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6">
          Free TV & Movie Database
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
          Discover{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Movies
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
          Explore and discover your favorite movies from around the world.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/movies')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base sm:text-lg shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Explore Now</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Quick info row */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 w-full max-w-md text-slate-400 text-xs sm:text-sm">
          <div>
            <p className="text-white font-bold text-lg sm:text-xl">10K+</p>
            <p className="text-slate-400">TV Shows</p>
          </div>
          <div className="border-x border-slate-800">
            <p className="text-amber-400 font-bold text-lg sm:text-xl">⭐ 8.5+</p>
            <p className="text-slate-400">Top Rated</p>
          </div>
          <div>
            <p className="text-white font-bold text-lg sm:text-xl">Free</p>
            <p className="text-slate-400">TVMaze API</p>
          </div>
        </div>
      </div>
    </section>
  );
}
