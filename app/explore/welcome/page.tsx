export default function WelcomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to StartLab</h1>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        This space helps faculty explore practical, ethical, and incremental ways to integrate AI into teaching.
        Use the navigation menu to jump into foundations, prompt patterns, analytics vision, and real faculty stories.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="p-4 rounded-lg border bg-white/70 backdrop-blur-sm shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1 text-sm">Where to Begin</h2>
          <p className="text-xs text-gray-600">Start with "Getting Started with AI" for low-risk adoption steps.</p>
        </div>
        <div className="p-4 rounded-lg border bg-white/70 backdrop-blur-sm shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1 text-sm">Explore Prompts</h2>
          <p className="text-xs text-gray-600">Browse structured prompt patterns you can safely adapt.</p>
        </div>
        <div className="p-4 rounded-lg border bg-white/70 backdrop-blur-sm shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1 text-sm">Learn Technique</h2>
          <p className="text-xs text-gray-600">Visit Prompt Engineering to refine reliability and clarity.</p>
        </div>
        <div className="p-4 rounded-lg border bg-white/70 backdrop-blur-sm shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1 text-sm">See Highlights</h2>
          <p className="text-xs text-gray-600">Discover how peers are experimenting with purpose.</p>
        </div>
      </div>
    </div>
  );
}
