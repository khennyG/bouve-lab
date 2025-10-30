export default function HeroBubbles() {
  const bubbles = [
    { text: "Generate an assignment idea", color: "bg-rose-50 text-rose-700 border-rose-200" },
    { text: "Explain a concept", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { text: "Create a case study", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { text: "Summarize this topic", color: "bg-amber-50 text-amber-800 border-amber-200" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50">
      <div className="px-6 py-8 md:px-8 md:py-10 grid gap-6 md:grid-cols-5 items-center">
        <div className="md:col-span-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">The Art of Asking</h2>
          <p className="mt-2 text-gray-700 max-w-xl">
            Prompt engineering is how we turn intent into high‑quality outputs. Small changes in wording and structure
            drastically change results. Try the examples and build your own prompt below.
          </p>
        </div>
        <div className="md:col-span-2 relative h-[140px] md:h-[170px]">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className={`absolute inline-flex items-center rounded-full border px-3 py-1 text-[12px] shadow-sm ${b.color} ${
                i % 2 === 0 ? "animate-bounce" : "animate-pulse"
              }`}
              style={{
                top: `${20 + i * 22}px`,
                right: `${(i % 3) * 24}px`,
                animationDuration: i % 2 === 0 ? "3.2s" : "2.4s",
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {b.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
