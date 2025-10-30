"use client";

import { useMemo, useState } from "react";

const roles = [
  { key: "nursing", label: "Clinical Nursing Educator", body: "You are a clinical nursing educator." },
  { key: "pharmacy", label: "Clinical Pharmacist Educator", body: "You are a clinical pharmacist educator." },
  { key: "publichealth", label: "Public Health Educator", body: "You are a public health educator." },
  { key: "slp", label: "SLP Educator", body: "You are a speech-language pathology educator." },
  { key: "healthsci", label: "Health Science Educator", body: "You are a health science educator." },
  { key: "pharmsci", label: "PharmSci Educator", body: "You are a pharmaceutical sciences educator." },
];

const structures = [
  { key: "sections", label: "Sectioned Output" },
  { key: "bullets", label: "Bulleted" },
  { key: "table", label: "Table" },
];

const tones = [
  { key: "academic", label: "Academic" },
  { key: "supportive", label: "Supportive" },
  { key: "concise", label: "Concise" },
];

type TunerState = {
  role: string;
  topic: string;
  audience: string;
  structure: string[];
  tone: string[];
  clarification: boolean;
};

export default function PromptTuner() {
  const [state, setState] = useState<TunerState>({
    role: roles[0].key,
    topic: "[Insert Topic]",
    audience: "[Insert Student Level] in [Insert Course]",
    structure: ["sections"],
    tone: ["academic", "supportive"],
    clarification: true,
  });

  const roleText = useMemo(() => roles.find((r) => r.key === state.role)?.body ?? "You are an educator.", [state.role]);

  const structureText = useMemo(() => {
    if (state.structure.includes("table")) return "Present as a compact table.";
    if (state.structure.includes("bullets")) return "Use concise bullets.";
    return "Present your response in clearly labeled sections.";
  }, [state.structure]);

  const toneText = useMemo(() => {
    const map: Record<string, string> = {
      academic: "Academic",
      supportive: "supportive",
      concise: "concise",
    };
    const picked = state.tone.map((t) => map[t]).filter(Boolean);
    return picked.length ? `Tone: ${picked.join(", ")}.` : "";
  }, [state.tone]);

  const clarifier = state.clarification
    ? "Before producing the final version, ask me three clarification questions. Then summarize my answers in 3 bullets and present the final output."
    : "";

  const preview = `${roleText}\n\nTask: Create a short output on ${state.topic} for ${state.audience}. ${structureText} ${toneText} ${clarifier}`.trim();

  const toggle = (key: keyof TunerState, value: string) => {
    setState((s) => {
      const arr = new Set(s[key] as string[]);
      if (arr.has(value)) arr.delete(value);
      else arr.add(value);
      return { ...s, [key]: Array.from(arr) } as TunerState;
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(preview);
    } catch {}
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-1">
          <div>
            <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Role</div>
            <select
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              value={state.role}
              onChange={(e) => setState((s) => ({ ...s, role: e.target.value }))}
            >
              {roles.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Topic</div>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={state.topic}
              onChange={(e) => setState((s) => ({ ...s, topic: e.target.value }))}
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Audience</div>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={state.audience}
              onChange={(e) => setState((s) => ({ ...s, audience: e.target.value }))}
            />
          </div>
        </div>
        <div className="space-y-4 md:col-span-1">
          <div>
            <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Structure</div>
            <div className="flex flex-wrap gap-2 text-xs">
              {structures.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => toggle("structure", s.key)}
                  className={`rounded-full border px-3 py-1 ${state.structure.includes(s.key) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Tone</div>
            <div className="flex flex-wrap gap-2 text-xs">
              {tones.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => toggle("tone", t.key)}
                  className={`rounded-full border px-3 py-1 ${state.tone.includes(t.key) ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 border-gray-300"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={state.clarification}
              onChange={(e) => setState((s) => ({ ...s, clarification: e.target.checked }))}
            />
            Include clarification step
          </label>
        </div>
        <div className="md:col-span-1">
          <div className="text-xs font-semibold text-gray-700 uppercase mb-1">Preview</div>
          <pre className="min-h-[180px] whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800">{preview}</pre>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={copy}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-white text-sm hover:bg-indigo-700"
            >
              Copy prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
