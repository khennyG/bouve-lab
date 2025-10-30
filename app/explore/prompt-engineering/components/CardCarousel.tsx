"use client";

import { useEffect, useState } from "react";
import FlipCard, { type FlipCardProps } from "./FlipCard";

export type CardCarouselProps = {
  items: FlipCardProps[];
  autoAdvanceMs?: number;
  title?: string;
};

export default function CardCarousel({ items, autoAdvanceMs = 6500, title }: CardCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [items.length, autoAdvanceMs]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5">
      {title ? <div className="mb-3 text-sm font-semibold text-gray-800">{title}</div> : null}
      <div className="relative">
        <FlipCard {...items[index]} />
        <div className="mt-3 flex items-center justify-between text-[12px] text-gray-600">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="rounded-full border border-gray-300 bg-white px-2 py-1 hover:bg-gray-100"
              aria-label="Previous card"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="rounded-full border border-gray-300 bg-white px-2 py-1 hover:bg-gray-100"
              aria-label="Next card"
            >
              Next →
            </button>
          </div>
          <div>
            {index + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
}
