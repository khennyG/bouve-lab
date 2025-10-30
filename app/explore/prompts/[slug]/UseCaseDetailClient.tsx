"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
// Using local types here to avoid any module resolution/type drift; shape mirrors ../_data
type PromptItem = { id: string; title: string; approach: string; promptText: string };
type UseCase = {
  id: string;
  title: string;
  category: string;
  description: string;
  generalPrompts: PromptItem[];
  disciplinePrompts: Partial<Record<string, PromptItem[]>>;
};
type COSDiscipline =
  | 'Nursing'
  | 'Pharmacy'
  | 'Public Health'
  | 'Speech-Language Pathology'
  | 'Health Science'
  | 'Pharmaceutical Sciences';

export default function UseCaseDetailClient({ caseData }: { caseData: UseCase }) {
  const [copyId, setCopyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'discipline'>('general');
  const [discipline, setDiscipline] = useState<COSDiscipline>('Nursing');

  const currentList = useMemo(() => {
    if (activeTab === 'general') return caseData.generalPrompts ?? [];
    const byDisc = caseData.disciplinePrompts?.[discipline] ?? [];
    return byDisc;
  }, [activeTab, caseData, discipline]);

  // Split prompt into main prompt text and optional instructor notes appended after a delimiter
  const splitPrompt = (text: string) => {
    const marker = '\n\nAdoption notes (for instructors):';
    const idx = text.indexOf(marker);
    if (idx === -1) {
      return { main: text, notes: '' };
    }
    // Temporarily remove instructor notes and rubric from the UI by discarding everything after the marker
    return {
      main: text.slice(0, idx).trimEnd(),
      notes: '',
    };
  };

  // Standard tail we want to consistently append to all prompts
  const CLARIFY_TAIL = `\n\n---\n\nBefore producing the final version, ask me three concise clarification questions to confirm understanding. Wait for my answers. Then:\n1) Summarize my answers back to me in 3 bullets.\n2) Present the final output in clearly labeled sections aligned to the requested deliverable.\n3) Include brief rationale bullets for key decisions and cite any sources if applicable.`;

  // Ensure the tail is appended once, not duplicated
  const ensureTail = (text: string) => {
    const trimmed = text.trimEnd();
    if (trimmed.includes('Before producing the final version, ask me three clarification questions')) return trimmed;
    return `${trimmed}${CLARIFY_TAIL}`;
  };

  const [openNotesIds, setOpenNotesIds] = useState<Set<string>>(new Set());
  const toggleNotes = (id: string) => {
    setOpenNotesIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const copyText = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyId(id);
      setTimeout(() => setCopyId(null), 1800);
    } catch {
      // ignore
    }
  };

  const copyAll = async () => {
    const bundle = currentList
      .map(p => {
        const { main } = splitPrompt(p.promptText);
        return `${p.title} — ${p.approach}\n\n${ensureTail(main)}`;
      })
      .join("\n\n------------------------------\n\n");
    await copyText(bundle, 'ALL');
  };

  const disciplines: COSDiscipline[] = [
    'Nursing',
    'Pharmacy',
    'Public Health',
    'Speech-Language Pathology',
    'Health Science',
    'Pharmaceutical Sciences',
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 md:py-14 px-5">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/explore/prompts" className="text-sm text-red-700 hover:text-red-800">← Prompt Library</Link>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-md">{caseData.category}</span>
        </div>
        <button
          onClick={copyAll}
          className={`inline-flex items-center rounded-md px-3 py-2 text-xs font-medium shadow-sm transition-colors ${copyId === 'ALL' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-600 text-white hover:bg-red-700'}`}
        >
          {copyId === 'ALL' ? 'Copied all' : 'Copy all prompts'}
        </button>
      </div>

      <header className="mb-5">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">{caseData.title}</h1>
        <p className="text-gray-700 md:text-lg">{caseData.description}</p>
      </header>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'general' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            General prompts
          </button>
          <button
            onClick={() => setActiveTab('discipline')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'discipline' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Discipline-specific
          </button>
        </div>
        {activeTab === 'discipline' && (
          <div className="rounded-md border border-gray-300 bg-white p-2 focus-within:ring-2 focus-within:ring-red-500">
            <label className="sr-only">Discipline</label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value as COSDiscipline)}
              className="min-w-[260px] text-sm focus:outline-none bg-white"
            >
              {disciplines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {(activeTab === 'discipline' || activeTab === 'general') && currentList.length === 0 && (
        <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 text-amber-900 text-sm px-4 py-3">
          {activeTab === 'discipline'
            ? 'No discipline-specific prompts for this use case yet. Try switching disciplines or use the General prompts.'
            : 'No general prompts available yet for this use case.'}
        </div>
      )}

      <section className="space-y-6">
        {currentList.map((p, idx) => (
          <article key={p.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold">{idx + 1}</span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-xs text-gray-600">{p.approach}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const { main } = splitPrompt(p.promptText);
                  copyText(ensureTail(main), p.id);
                }}
                className={`inline-flex items-center rounded-md px-3 py-2 text-xs font-medium transition-colors ${copyId === p.id ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                {copyId === p.id ? 'Copied' : 'Copy prompt'}
              </button>
            </div>
            <div className="p-5 bg-gray-50">
              {(() => {
                const { main, notes } = splitPrompt(p.promptText);
                const open = p.id ? openNotesIds.has(p.id) : false;
                return (
                  <div className="space-y-4">
                    <pre className="text-[13px] text-gray-900 whitespace-pre-wrap font-mono leading-relaxed">{ensureTail(main)}</pre>
                    {notes && (
                      <div className="border-t border-gray-200 pt-3">
                        <button
                          type="button"
                          onClick={() => p.id && toggleNotes(p.id)}
                          className="text-xs font-medium text-red-700 hover:text-red-800 inline-flex items-center gap-1"
                        >
                          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                          {open ? 'Hide instructor notes + rubric' : 'Show instructor notes + rubric (optional)'}
                        </button>
                        <div className={`mt-2 transition-all duration-300 ease-out ${open ? 'max-h-[800px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                          <div className="bg-white border border-gray-200 rounded-lg p-3">
                            <pre className="text-[12px] text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">{notes}</pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
