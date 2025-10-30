"use client";

import { useState } from "react";

export type FlipCardProps = {
  frontTitle: string;
  frontBody: string;
  backTitle: string;
  backBody: string;
};

export default function FlipCard({ frontTitle, frontBody, backTitle, backBody }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className="relative w-full text-left rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="min-h-[180px]">
        {flipped ? (
          <div>
            <div className="text-xs uppercase tracking-wide text-green-700">Strong</div>
            <div className="mt-1 font-semibold text-gray-900">{backTitle}</div>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-800">{backBody}</pre>
            <div className="mt-3 text-[12px] text-gray-600">Click to flip back</div>
          </div>
        ) : (
          <div>
            <div className="text-xs uppercase tracking-wide text-rose-700">Weak</div>
            <div className="mt-1 font-semibold text-gray-900">{frontTitle}</div>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{frontBody}</pre>
            <div className="mt-3 text-[12px] text-gray-600">Click to see a stronger version</div>
          </div>
        )}
      </div>
    </button>
  );
}
