"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { readyUseCases, type UseCase } from './_data';

type COSDiscipline = 
  | 'Nursing'
  | 'Pharmacy'
  | 'Public Health'
  | 'Speech-Language Pathology'
  | 'Health Science'
  | 'Pharmaceutical Sciences';

type FacultyPrompt = {
  id?: string;
  title: string;
  discipline: COSDiscipline;
  professorName: string;
  promptText: string;
  createdAt?: unknown;
};

export default function PromptLibraryPage() {
  const [activeTab, setActiveTab] = useState<'ready' | 'faculty'>('ready');
  const [facultyPrompts, setFacultyPrompts] = useState<FacultyPrompt[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [openFacultyIds, setOpenFacultyIds] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    title: '',
    discipline: 'Nursing' as COSDiscipline,
    professorName: '',
    promptText: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Fetch faculty-contributed prompts from Firebase
  useEffect(() => {
    const q = query(collection(db, 'prompts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const prompts: FacultyPrompt[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<FacultyPrompt, 'id'>),
      }));
      setFacultyPrompts(prompts);
    });
    return () => unsub();
  }, []);

  const copyToClipboard = async (text: string, promptTitle: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(promptTitle);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const toggleFaculty = (id: string) => {
    setOpenFacultyIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.professorName.trim() || !form.promptText.trim()) {
      setToast('Please fill in all required fields');
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'prompts'), {
        title: form.title.trim(),
        discipline: form.discipline,
        professorName: form.professorName.trim(),
        promptText: form.promptText.trim(),
        createdAt: serverTimestamp(),
      });
      setForm({ title: '', discipline: 'Nursing', professorName: '', promptText: '' });
      setShowForm(false);
      setToast('Thanks! Your prompt has been added to the library.');
      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast('Error submitting prompt. Please try again.');
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSubmitting(false);
    }
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
    <div className="max-w-6xl mx-auto py-12 md:py-16 px-5">
      {/* Header Section */}
      <header className="text-center mb-10 md:mb-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Prompt Library</h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
          Find ready-to-use AI prompts for all your teaching needs—from redesigning assignments to creating case studies and feedback rubrics.
          Plus, share your own successful prompts with colleagues. Each prompt is designed to help you integrate AI thoughtfully into your pedagogy while maintaining academic rigor.
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('ready')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'ready' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Ready-Made Prompts
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'faculty' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Faculty-Contributed Prompts
          </button>
        </div>
      </div>

      {/* Ready-Made Prompts Section */}
      {activeTab === 'ready' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready-Made Prompts</h2>
            <p className="text-gray-600 text-sm">Ready-made prompts you can use as-is or adapt in minutes—structured, clear, and aligned to your learning goals.</p>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5">
            <ul className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {readyUseCases.map((uc: UseCase) => (
                <li key={uc.id} className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="px-6 py-6 space-y-5 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-red-700 tracking-tight">{uc.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-5">{uc.description}</p>
                    </div>
                    <div className="pt-2">
                      <Link href={`/explore/prompts/${uc.id}`} className="inline-flex items-center rounded-md bg-red-600 text-white px-3 py-2 text-xs font-medium shadow-sm hover:bg-red-700 transition-colors">Open details</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Faculty-Contributed Prompts Section */}
      {activeTab === 'faculty' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Faculty-Contributed Prompts</h2>
              <p className="text-gray-600 text-sm">Prompts shared by your colleagues that have worked well in their teaching practice.</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center rounded-md bg-red-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-red-700 transition-colors">Share Your Prompt</button>
          </div>

          {/* Submission Form */}
          {showForm && (
            <div className="mb-8 rounded-xl border border-rose-200 bg-rose-50/70 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share a Prompt That Works</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-500">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prompt Title</label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Peer Review Guidelines" className="w-full text-sm focus:outline-none" required />
                  </div>
                  <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-500">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" value={form.professorName} onChange={(e) => setForm({ ...form, professorName: e.target.value })} placeholder="e.g., Dr. Smith" className="w-full text-sm focus:outline-none" required />
                  </div>
                </div>
                <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-500">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discipline</label>
                  <select value={form.discipline} onChange={(e) => setForm({ ...form, discipline: e.target.value as COSDiscipline })} className="w-full text-sm focus:outline-none bg-white">
                    {disciplines.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-red-500">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prompt Text</label>
                  <textarea value={form.promptText} onChange={(e) => setForm({ ...form, promptText: e.target.value })} placeholder="Share your successful AI prompt here. Include any placeholders like [Insert topic] to make it reusable..." className="w-full min-h-[120px] text-sm focus:outline-none resize-y" required />
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Cancel</button>
                  <button type="submit" disabled={submitting} className="inline-flex items-center rounded-md bg-red-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-red-700 disabled:opacity-60 transition-colors">{submitting ? 'Sharing...' : 'Share Prompt'}</button>
                </div>
              </form>
            </div>
          )}

          {/* Faculty Prompts Grid */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facultyPrompts.length === 0 ? (
                <li className="col-span-full text-center py-12"><p className="text-gray-500">No faculty prompts yet. Be the first to share!</p></li>
              ) : (
                facultyPrompts.map((prompt) => {
                  const open = prompt.id ? openFacultyIds.has(prompt.id) : false;
                  return (
                    <li key={prompt.id} className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <button type="button" onClick={() => prompt.id && toggleFaculty(prompt.id)} className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left focus:outline-none">
                        <span className="flex items-center gap-3">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md">{prompt.discipline}</span>
                          <span className="text-[14px] md:text-sm font-semibold text-gray-900 tracking-tight">{prompt.title}</span>
                        </span>
                        <svg className={`w-5 h-5 text-red-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                      </button>
                      <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[600px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                        {open && (
                          <div className="px-5 pb-5 pt-0 space-y-4">
                            <p className="text-sm text-gray-600">Shared by {prompt.professorName}</p>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono leading-relaxed max-h-72 overflow-y-auto">{prompt.promptText}</pre>
                            </div>
                            <button onClick={() => copyToClipboard(prompt.promptText, prompt.title)} className={`w-full py-2 px-3 text-sm font-medium rounded-md transition-colors ${copySuccess === prompt.title ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-600 text-white hover:bg-red-700'}`}>{copySuccess === prompt.title ? 'Copied!' : 'Copy Prompt'}</button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-md bg-gray-900 text-white text-sm px-4 py-3 shadow-lg max-w-sm">{toast}</div>
      )}
    </div>
  );
}
