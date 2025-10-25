"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { CHS_DISCIPLINES, USE_CASES } from "@/app/explore/prompts/_data.chs";

type FacultyPrompt = {
  id?: string;
  title: string;
  discipline: string;
  professorName?: string;
  promptText: string;
  createdAt?: unknown;
};

function getMillis(ts: unknown): number {
  if (!ts) return 0;
  const m = ts as { toMillis?: () => number; seconds?: number; nanoseconds?: number };
  if (typeof m.toMillis === "function") {
    try { return m.toMillis(); } catch {}
  }
  if (typeof m.seconds === "number") {
    return m.seconds * 1000 + (typeof m.nanoseconds === "number" ? Math.floor(m.nanoseconds / 1e6) : 0);
  }
  return 0;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
      }}
      className={copied ? "inline-flex items-center rounded-md bg-green-100 text-green-800 border border-green-200 px-3 py-1.5 text-[12px] font-medium" : "inline-flex items-center rounded-md bg-white text-gray-800 px-3 py-1.5 text-[12px] font-medium border border-gray-300 hover:shadow focus:outline-none"}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function PromptLibraryCHS() {
  const [activeTab, setActiveTab] = useState<"ready" | "faculty">("ready");
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState<string>("");
  const [streamError, setStreamError] = useState<string>("");

  const [form, setForm] = useState<FacultyPrompt>({
    title: "",
    discipline: CHS_DISCIPLINES[0],
    professorName: "",
    promptText: "",
  });

  const [prompts, setPrompts] = useState<FacultyPrompt[]>([]);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (activeTab !== "faculty") return;
    setStreamError("");
    const q = query(collection(db, "prompts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items: FacultyPrompt[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as FacultyPrompt) }));
        setPrompts(items.sort((a, b) => getMillis(b.createdAt) - getMillis(a.createdAt)));
      },
      (err) => {
        console.error(err);
        setStreamError(err instanceof Error ? err.message : "Live updates failed.");
      }
    );
    return () => unsub();
  }, [activeTab]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      discipline: form.discipline,
      promptText: form.promptText.trim(),
      professorName: form.professorName?.toString().trim() || undefined,
      createdAt: serverTimestamp(),
    };
    if (!payload.title || !payload.discipline || !payload.promptText) {
      setShowToast("Please complete all required fields");
      return;
    }
    try {
      await addDoc(collection(db, "prompts"), payload);
      setForm({ title: "", discipline: CHS_DISCIPLINES[0], professorName: "", promptText: "" });
      setShowToast("Thanks! Your prompt was added.");
      setShowForm(false);
      setActiveTab("faculty");
      setTimeout(() => setShowToast(""), 1800);
    } catch (err) {
      console.error(err);
      setShowToast("Submission failed. Try again.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 md:py-14 px-5">
      <header className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Prompt Library</h1>
        <p className="mt-2 text-sm md:text-[15px] text-gray-700 leading-relaxed max-w-3xl">
          Welcome, faculty. Explore ready-made prompts for CHS teaching—assignment redesign, lecture notes, case studies, feedback & rubrics, in-class activities—and share the prompts that work in your courses.
        </p>
      </header>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("ready")}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition shadow-sm ${activeTab === "ready" ? "bg-red-600 hover:bg-red-700 text-white border-transparent" : "bg-white text-gray-700 border-gray-300 hover:shadow"}`}
        >
          Ready-Made Prompts
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition shadow-sm ${activeTab === "faculty" ? "bg-red-600 hover:bg-red-700 text-white border-transparent" : "bg-white text-gray-700 border-gray-300 hover:shadow"}`}
        >
          Faculty-Contributed Prompts
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-[70] rounded-md bg-gray-900 text-white text-[12px] px-3 py-2 shadow-lg">{showToast}</div>
      )}

      {activeTab === "ready" ? (
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {USE_CASES.map((uc) => (
              <article key={uc.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="p-4">
                  <h3 className="text-[15px] md:text-base font-semibold tracking-tight text-red-700">{uc.title}</h3>
                  <p className="mt-1 text-[13px] text-gray-600 leading-relaxed">{uc.description}</p>
                  <div className="mt-3">
                    <Link href={`/explore/prompts/${uc.id}`} className="inline-flex items-center rounded-md bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-[13px] font-medium shadow-sm">
                      Open details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          {streamError && (
            <div className="mb-2 text-[12px] text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">Live updates failed: {streamError}</div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center rounded-md bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-[13px] font-medium shadow-sm"
            >
              {showForm ? "Close form" : "Share Your Prompt"}
            </button>
          </div>

          {showForm && (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold tracking-tight text-[#503a34]">Share Your Prompt</h3>
              </div>
              <div className="px-5 py-4">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-600">
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">Prompt Title</label>
                    <input
                      type="text"
                      className="w-full bg-transparent text-[13px] focus:outline-none"
                      value={form.title}
                      onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                      placeholder="e.g., Introduce Pharmacokinetics via Case Scenario"
                    />
                  </div>
                  <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-600">
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">Discipline</label>
                    <select
                      className="w-full bg-transparent text-[13px] focus:outline-none"
                      value={form.discipline}
                      onChange={(e) => setForm((s) => ({ ...s, discipline: e.target.value }))}
                    >
                      {CHS_DISCIPLINES.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-600">
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">Professor Name (optional)</label>
                    <input
                      type="text"
                      className="w-full bg-transparent text-[13px] focus:outline-none"
                      value={form.professorName || ""}
                      onChange={(e) => setForm((s) => ({ ...s, professorName: e.target.value }))}
                      placeholder="e.g., Dr. Kim"
                    />
                  </div>
                  <div className="md:col-span-2 rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-600">
                    <label className="block text-[12px] font-medium text-gray-700 mb-1">Prompt Text</label>
                    <textarea
                      className="w-full bg-transparent text-[13px] focus:outline-none min-h-[140px]"
                      value={form.promptText}
                      onChange={(e) => setForm((s) => ({ ...s, promptText: e.target.value }))}
                      placeholder="Paste or write your prompt here. Include placeholders in [brackets] where others should customize."
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="inline-flex items-center rounded-md bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-[13px] font-medium shadow-sm">
                      Post Prompt
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Faculty prompts accordion */}
          <ul className="space-y-3">
            {prompts.length === 0 ? (
              <li className="text-sm text-gray-500 italic">No prompts yet. Be the first to share.</li>
            ) : (
              prompts.map((p, idx) => {
                const key = p.id ?? `p-${idx}`;
                const open = openIds.has(key);
                return (
                  <li key={key} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenIds(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; })}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
                      aria-expanded={open}
                    >
                      <span className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-red-600 shadow shadow-red-300" />
                        <span className="flex flex-col">
                          <span className="font-medium text-[13px] md:text-sm text-[#5a3d37] tracking-tight">{p.title}</span>
                          <span className="text-[11px] text-gray-500">{p.discipline}{p.professorName ? ` • ${p.professorName}` : ''}</span>
                        </span>
                      </span>
                      <svg className={`w-5 h-5 text-red-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[900px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                      {open && (
                        <div className="px-5 pb-5 pt-0">
                          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                            <pre className="text-[12px] leading-relaxed whitespace-pre-wrap">{p.promptText}</pre>
                          </div>
                          <div className="mt-3 flex justify-end"><CopyButton text={p.promptText} /></div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
