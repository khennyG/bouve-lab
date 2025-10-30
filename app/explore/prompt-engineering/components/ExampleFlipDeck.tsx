"use client";

import { useState } from "react";

export default function ExampleFlipDeck() {
  const examples = [
    {
      title: "Climate Policy Brief",
      weakPrompt: "Write about climate change.",
      strongPrompt:
        "You are an environmental policy analyst. Write a 200‑word policy brief explaining the economic implications of climate change for developing nations. Include: 2 short bullet impacts, 1 implementation challenge, 1 equity consideration. Ask 3 clarifying questions first; summarize answers in 3 bullets; then present.",
      weakOutput:
        "Climate change is a big issue affecting the planet. Many countries need to work together to reduce emissions and invest in green technology.",
      strongOutput:
        "Key impacts: (1) Reduced agricultural yields → food price volatility; (2) Infrastructure damage from floods → fiscal strain. Challenge: limited adaptation finance access. Equity: ensure smallholder farmers benefit from funds. Recommendation: scale blended finance with safeguards for local communities.",
    },
    {
      title: "Sepsis Early Recognition (Nursing)",
      weakPrompt: "Explain sepsis.",
      strongPrompt:
        "You are a clinical nursing educator. In 200–250 words for first‑year undergraduates, explain early sepsis recognition. Sections: Key Signs, Why They Matter, First Nurse Actions. Emphasize dignity and safety. Ask 3 clarifying questions; summarize; then present.",
      weakOutput:
        "Sepsis is when an infection spreads in the body. It can be serious and needs treatment at the hospital.",
      strongOutput:
        "Key Signs: new confusion, tachycardia, hypotension, fever/chills. Why: indicates dysregulated response with organ risk. Actions: activate sepsis protocol, obtain cultures, start broad‑spectrum antibiotics per order, begin fluids, escalate if MAP <65.",
    },
  ];

  const [i, setI] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const ex = examples[i];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Good vs. Weak Prompts — {ex.title}</div>
        <div className="flex items-center gap-2 text-[12px]">
          <button
            type="button"
            onClick={() => setI((v) => (v - 1 + examples.length) % examples.length)}
            className="rounded-full border border-gray-300 bg-white px-2 py-1 hover:bg-gray-100"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => setI((v) => (v + 1) % examples.length)}
            className="rounded-full border border-gray-300 bg-white px-2 py-1 hover:bg-gray-100"
          >
            Next →
          </button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
          <div className="text-xs uppercase tracking-wide text-rose-700 mb-1">Weak Prompt</div>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{ex.weakPrompt}</pre>
        </div>
        <div className="rounded-xl border border-gray-200 p-4 bg-indigo-50">
          <div className="text-xs uppercase tracking-wide text-indigo-800 mb-1">Strong Prompt</div>
          <pre className="whitespace-pre-wrap text-sm text-gray-900">{ex.strongPrompt}</pre>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => setShowResults((s) => !s)}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-white text-sm hover:bg-indigo-700"
        >
          {showResults ? "Hide Result" : "See Result"}
        </button>
      </div>

      {showResults && (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="text-xs uppercase tracking-wide text-rose-700 mb-1">Weak Output</div>
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{ex.weakOutput}</pre>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <div className="text-xs uppercase tracking-wide text-indigo-800 mb-1">Strong Output</div>
            <pre className="whitespace-pre-wrap text-sm text-gray-900">{ex.strongOutput}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
