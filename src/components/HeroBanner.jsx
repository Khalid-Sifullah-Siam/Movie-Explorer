import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Cinematic Layered Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Dark Vignette Base */}
        <div className="absolute inset-0 bg-[#07090e]" />

        {/* Ambient Radial Spotlight Mesh */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/15 via-rose-600/10 to-transparent blur-[140px] opacity-70" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px]" />

        {/* Subtle Cinematic Grid & Film Grain Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Bottom Fade to blend seamlessly with the rest of the page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Curated Streaming Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-8 shadow-inner animate-modal-content">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase text-zinc-300">
            Powered by TVMaze Live Database
          </span>
        </div>

        {/* Application Title/Heading matching Wireframe: DISCOVER MOVIES */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[1.08] mb-6">
          Discover{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
            Movies
          </span>
        </h1>

        {/* Engaging Description matching Wireframe */}
        <p className="text-base sm:text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10 text-balance">
          Explore and discover your favorite movies from around the world.
        </p>

        {/* Action Buttons Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {/* Primary CTA Button matching Wireframe: [ Explore Now ] */}
          <button
            onClick={() => navigate('/movies')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-extrabold text-base sm:text-lg shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span>Explore Now</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Secondary Quick Search CTA */}
          <button
            onClick={() => navigate('/movies')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 hover:text-white font-semibold text-base border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Instant Search</span>
          </button>
        </div>

        {/* Verified Stats Bar across all devices */}
        <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-8 w-full max-w-2xl pt-8 border-t border-white/10">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-black text-white tracking-tight">10,000+</span>
            <span className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-medium">TV Shows & Films</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/10 px-2 sm:px-4">
            <span className="text-xl sm:text-3xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tight">
              ⭐ 9.8
            </span>
            <span className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-medium">Top Rated Titles</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-black text-white tracking-tight">100% Free</span>
            <span className="text-xs sm:text-sm text-zinc-400 mt-0.5 font-medium">No Subscription</span>
          </div>
        </div>
      </div>
    </section>
  );
}
