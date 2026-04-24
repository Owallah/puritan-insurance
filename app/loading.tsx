export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true" aria-label="Loading page content">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo mark */}
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center shadow-gold-glow animate-pulse">
            <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9" aria-hidden="true">
              <path
                d="M16 2L4 8v8c0 7.73 5.12 14.93 12 16.93C22.88 30.93 28 23.73 28 16V8L16 2z"
                fill="#0a1849"
              />
              <path
                d="M11 16l3 3 7-7"
                stroke="#0a1849"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-navy-300 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    </div>
  );
}
