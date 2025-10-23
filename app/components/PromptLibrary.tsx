"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";

const DISCIPLINES = [
  "Nursing",
  "Pharmacy",
  "Public Health",
  "Speech-Language Pathology",
  "Health Science",
  "Pharmaceutical Sciences",
] as const;

type Discipline = typeof DISCIPLINES[number];

type FacultyPrompt = {
  id?: string;
  title: string;
  discipline: Discipline;
  professorName?: string;
  promptText: string;
  createdAt?: unknown;
};

const ACCENT = "#e85c4a"; // Using existing site accent for consistency

const readyPrompts: Array<{
  title: string;
  description: string;
  prompt: string;
}> = [
  {
    title: "Redesign an Assignment",
    description: "Transform a traditional assignment into a more authentic, higher-order learning task.",
    prompt:
      "You are an instructional design assistant. Redesign the following assignment to emphasize real-world relevance, critical thinking, and academic integrity. Include clear criteria and deliverables.\n\nCourse/Topic: [Insert Course Topic]\nCurrent Assignment: [Paste current prompt]\nConstraints: [e.g., time, resources]\n\nProvide: 1) Revised prompt, 2) Learning outcomes, 3) Evaluation criteria, 4) Optional scaffolding steps.",
  },
  {
    title: "Create Lecture Notes",
    description: "Generate structured, student-friendly lecture notes with examples.",
    prompt:
      "Create lecture notes for the topic below. Use clear headings, concise explanations, illustrative examples, and 3 formative questions.\n\nTopic: [Insert Topic]\nLevel: [Introductory/Advanced]\nContext: [Course context]\n\nReturn in Markdown with sections: Overview, Key Concepts, Examples, Misconceptions, Practice Questions.",
  },
  {
    title: "Develop a Case Study",
    description: "Build a realistic case with guiding questions and decision points.",
    prompt:
      "Develop a realistic case study for the following topic. Include background, scenario details, data (tables or vitals if relevant), and 4–6 guiding questions that progress in complexity.\n\nTopic: [Insert Topic]\nLearners: [e.g., undergraduate juniors]\nDiscipline Context: [e.g., Nursing/Pharmacy]\n\nReturn the case in sections and list learning outcomes at the end.",
  },
  {
    title: "Generate Feedback Rubric",
    description: "Draft a rubric with criteria and performance levels tied to outcomes.",
    prompt:
      "Create a rubric for assessing the following student task. Provide 4–6 criteria with 3–4 performance levels and concise descriptors.\n\nTask: [Describe task]\nLearning Outcomes: [List outcomes]\nWeighting: [If any]\n\nReturn as a Markdown table with criteria by rows and performance levels by columns.",
  },
  {
    title: "Design an In-Class Activity",
    description: "Create a 15–20 minute active learning activity with clear deliverables.",
    prompt:
      "Design an in-class activity to reinforce the topic below. Include: objective, materials, steps (timed), and a quick-check for understanding.\n\nTopic: [Insert Topic]\nClass Size: [e.g., 25]\nSetting: [In-person/Online]\n\nReturn as a short facilitator guide with bullet points.",
  },
  {
    title: "Create Study Questions",
    description: "Produce scaffolded study questions and answers.",
    prompt:
      "Create a set of 8 study questions on the topic below: 3 recall, 3 application, 2 synthesis/evaluation. Provide concise answer keys.\n\nTopic: [Insert Topic]\nLevel: [Intro/Advanced]\n\nReturn as Q&A pairs.",
  },
];

export default function PromptLibrary() {
  const [activeTab, setActiveTab] = useState<"ready" | "faculty">("ready");
  const [showToast, setShowToast] = useState<string>("");
  const [streamError, setStreamError] = useState<string>("");

  const [form, setForm] = useState<FacultyPrompt>({
    title: "",
    discipline: DISCIPLINES[0],
    professorName: "",
    promptText: "",
  });

  const [prompts, setPrompts] = useState<FacultyPrompt[]>([]);

  useEffect(() => {
    if (activeTab !== "faculty") return; // only stream when needed
    setStreamError("");
    let unsub = () => {};
    try {
      const col = collection(db, "prompts");
      unsub = onSnapshot(
        col,
        (snap) => {
          const items: FacultyPrompt[] = snap.docs
            .map((d) => ({ id: d.id, ...(d.data() as FacultyPrompt) }))
            .sort((a, b) => getMillis(b.createdAt) - getMillis(a.createdAt));
          setPrompts(items);
        },
        (err) => {
          console.error(err);
          setStreamError(
            err instanceof Error
              ? err.message
              : "Live updates failed. Check Firestore rules."
          );
        }
      );
    } catch (e) {
      console.error(e);
      setStreamError("Failed to connect to Firestore. Check environment variables.");
    }
    return () => unsub();
  }, [activeTab]);

  function getMillis(ts: unknown): number {
    if (!ts) return 0;
    const maybeToMillis = ts as { toMillis?: () => number };
    if (typeof maybeToMillis.toMillis === "function") {
      try { return maybeToMillis.toMillis(); } catch {}
    }
    const maybeSeconds = ts as { seconds?: number; nanoseconds?: number };
    if (typeof maybeSeconds.seconds === "number") {
      const base = maybeSeconds.seconds * 1000;
      const extra = typeof maybeSeconds.nanoseconds === "number" ? Math.floor(maybeSeconds.nanoseconds / 1e6) : 0;
      return base + extra;
    }
    return 0;
  }

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast("Prompt copied to clipboard");
      setTimeout(() => setShowToast(""), 1800);
    } catch {
      setShowToast("Copy failed");
      setTimeout(() => setShowToast(""), 1800);
    }
  }

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
      setForm({ title: "", discipline: DISCIPLINES[0], professorName: "", promptText: "" });
      setShowToast("Thanks! Your prompt was added.");
      // Ensure faculty tab shows new prompt list
      setActiveTab("faculty");
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
          Welcome, faculty. This library gives you ready-to-use AI prompts for your teaching use cases—assignment redesign, lecture notes, case studies, feedback & rubrics, in-class activities, and more. You can also contribute your own tried-and-tested prompts to help colleagues across Bouvé.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("ready")}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition shadow-sm ${
            activeTab === "ready"
              ? "bg-[#e85c4a] text-white border-transparent"
              : "bg-white text-gray-700 border-gray-300 hover:shadow"
          }`}
        >
          Ready-Made Prompts
        </button>
        <button
          onClick={() => setActiveTab("faculty")}
          className={`px-3 py-2 rounded-md text-sm font-medium border transition shadow-sm ${
            activeTab === "faculty"
              ? "bg-[#e85c4a] text-white border-transparent"
              : "bg-white text-gray-700 border-gray-300 hover:shadow"
          }`}
        >
          Faculty-Contributed Prompts
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-[70] rounded-md bg-gray-900 text-white text-[12px] px-3 py-2 shadow-lg">{showToast}</div>
      )}

      {/* Stream error banner */}
      {activeTab === "faculty" && streamError && (
        <div className="mb-4 text-[12px] text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          Live updates failed: {streamError} <span className="text-red-600/80">(Check Firebase config and Firestore rules.)</span>
        </div>
      )}

      {/* Content */}
      {activeTab === "ready" ? (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {readyPrompts.map((p) => (
              <article key={p.title} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="p-4">
                  <h3 className="text-[15px] md:text-base font-semibold text-gray-900 tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-[13px] text-gray-600 leading-relaxed">{p.description}</p>
                </div>
                <div className="px-4 pb-4">
                  <pre className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-[12px] leading-relaxed whitespace-pre-wrap">
{p.prompt}
                  </pre>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleCopy(p.prompt)}
                      className="inline-flex items-center rounded-md bg-white text-gray-800 px-3 py-1.5 text-[12px] font-medium border border-gray-300 hover:shadow focus:outline-none"
                    >
                      Copy Prompt
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          {/* Faculty prompts list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {prompts.length === 0 ? (
              <div className="text-sm text-gray-500 italic md:col-span-2 lg:col-span-3">No prompts yet. Be the first to share.</div>
            ) : (
              prompts.map((fp) => (
                <article key={fp.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-[15px] md:text-base font-semibold text-gray-900 tracking-tight">{fp.title}</h3>
                    <p className="mt-1 text-[12px] text-gray-500">{fp.discipline}{fp.professorName ? ` • ${fp.professorName}` : ""}</p>
                  </div>
                  <div className="px-4 pb-4">
                    <pre className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-[12px] leading-relaxed whitespace-pre-wrap">
{fp.promptText}
                    </pre>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleCopy(fp.promptText)}
                        className="inline-flex items-center rounded-md bg-white text-gray-800 px-3 py-1.5 text-[12px] font-medium border border-gray-300 hover:shadow focus:outline-none"
                      >
                        Copy Prompt
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Share form */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold tracking-tight text-[#503a34]">Share Your Prompt</h3>
            </div>
            <div className="px-5 py-4">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Prompt Title</label>
                  <input
                    type="text"
                    className="w-full bg-transparent text-[13px] focus:outline-none"
                    value={form.title}
                    onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                    placeholder="e.g., Introduce Pharmacokinetics via Case Scenario"
                  />
                </div>
                <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Discipline</label>
                  <select
                    className="w-full bg-transparent text-[13px] focus:outline-none"
                    value={form.discipline}
                    onChange={(e) => setForm((s) => ({ ...s, discipline: e.target.value as Discipline }))}
                  >
                    {DISCIPLINES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Professor Name (optional)</label>
                  <input
                    type="text"
                    className="w-full bg-transparent text-[13px] focus:outline-none"
                    value={form.professorName || ""}
                    onChange={(e) => setForm((s) => ({ ...s, professorName: e.target.value }))}
                    placeholder="e.g., Dr. Kim"
                  />
                </div>
                <div className="md:col-span-2 rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Prompt Text</label>
                  <textarea
                    className="w-full bg-transparent text-[13px] focus:outline-none min-h-[140px]"
                    value={form.promptText}
                    onChange={(e) => setForm((s) => ({ ...s, promptText: e.target.value }))}
                    placeholder="Paste or write your prompt here. Include placeholders in [brackets] where others should customize."
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="inline-flex items-center rounded-md bg-[#e85c4a] text-white px-3 py-2 text-[13px] font-medium shadow-sm hover:shadow focus:outline-none">
                    Post Prompt
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
