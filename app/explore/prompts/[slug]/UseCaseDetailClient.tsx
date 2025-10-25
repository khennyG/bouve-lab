"use client";

import { useMemo, useState } from "react";
import { CHS_DISCIPLINES, UseCase } from "../_data.chs";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className={
        copied
          ? "inline-flex items-center rounded-md bg-green-100 text-green-800 border border-green-200 px-3 py-1.5 text-[12px] font-medium"
          : "inline-flex items-center rounded-md bg-white text-gray-800 px-3 py-1.5 text-[12px] font-medium border border-gray-300 hover:shadow focus:outline-none"
      }
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function UseCaseDetailClient({ useCase }: { useCase: UseCase }) {
  const [activeTab, setActiveTab] = useState<"general" | "discipline">("general");
  const [discipline, setDiscipline] = useState(CHS_DISCIPLINES[0]);

  const disciplineList = CHS_DISCIPLINES;
  const disciplinePrompts = useMemo(() => useCase.disciplinePrompts[discipline] || [], [useCase, discipline]);

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-5">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{useCase.title}</h1>
        <p className="mt-2 text-sm md:text-[15px] text-gray-700 leading-relaxed max-w-3xl">{useCase.description}</p>
      </header>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition shadow-sm ${
            activeTab === "general" ? "bg-red-600 hover:bg-red-700 text-white border-transparent" : "bg-white text-gray-700 border-gray-300 hover:shadow"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("discipline")}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition shadow-sm ${
            activeTab === "discipline" ? "bg-red-600 hover:bg-red-700 text-white border-transparent" : "bg-white text-gray-700 border-gray-300 hover:shadow"
          }`}
        >
          Discipline-specific
        </button>
      </div>

      {activeTab === "discipline" && (
        <div className="mb-5">
          <label className="block text-[12px] font-medium text-gray-700 mb-1">Select discipline</label>
          <select
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value as typeof discipline)}
            className="w-full md:w-80 rounded-md border border-gray-300 bg-white p-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            {disciplineList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {(activeTab === "general" ? useCase.generalPrompts : disciplinePrompts).map((p, idx) => (
          <article key={p.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="p-4 flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-gray-100 text-gray-700 text-[12px] font-medium">{idx + 1}</span>
              <div className="flex-1">
                <h3 className="text-[15px] md:text-base font-semibold tracking-tight text-red-700">{p.title}</h3>
                <p className="mt-1 text-[12px] text-gray-600">{p.approach}</p>
              </div>
              <CopyButton text={p.promptText} />
            </div>
            <div className="px-4 pb-4">
              <pre className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-[12px] leading-relaxed whitespace-pre-wrap">{p.promptText}</pre>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
