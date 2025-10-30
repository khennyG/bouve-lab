import CoachIllustration from "./CoachIllustration";

export default function EthicsCallout() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-amber-50 p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-5 items-center">
        <div className="md:col-span-1 flex items-center justify-center">
          <CoachIllustration className="w-24 h-24" />
        </div>
        <div className="md:col-span-4">
          <div className="text-lg font-semibold text-amber-900 mb-1">Prompt Ethics & Copyright</div>
          <p className="text-sm text-amber-900/90">
            AI systems don’t hold copyright — people do. Prompts are creative tools too. Share responsibly, cite sources,
            and include bias/fairness checks in prompts, especially in clinical and policy contexts.
          </p>
          <div className="mt-2 text-sm">
            <a className="text-amber-900 underline hover:text-amber-800" href="#learn">
              Read more about copyright and AI →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
