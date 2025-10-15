'use client'

import { useEffect, useMemo, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'

const DISCIPLINES = [
  'Nursing',
  'Pharmacy',
  'Public Health',
  'Speech-Language Pathology',
  'Health Science',
  'Pharmaceutical Sciences',
] as const

type Discipline = typeof DISCIPLINES[number]

type Submission = {
  id?: string
  title: string
  professorName: string
  course: string
  discipline: Discipline
  oldAssignment: string
  newAssignment: string
  // Firestore serverTimestamp resolves to a Timestamp in reads; type as unknown to avoid strict coupling
  timestamp?: unknown
}

export default function FacultySubmissionFormBouve({ selectedDiscipline }: { selectedDiscipline: Discipline }) {
  const [form, setForm] = useState<Submission>({
    title: '',
    professorName: '',
    course: '',
    discipline: (selectedDiscipline || 'Nursing') as Discipline,
    oldAssignment: '',
    newAssignment: '',
  })

  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openSubmissionIds, setOpenSubmissionIds] = useState<Set<string>>(new Set())
  const [streamError, setStreamError] = useState<string>('')
  const [expandLatest, setExpandLatest] = useState<boolean>(false)
  const [showThanks, setShowThanks] = useState<boolean>(false)
  const [openSubmissions, setOpenSubmissions] = useState<boolean>(true)

  // Safely derive milliseconds from a Firestore Timestamp-like object without using 'any'
  function getMillis(ts: unknown): number {
    if (!ts) return 0
    const maybeToMillis = ts as { toMillis?: () => number }
    if (typeof maybeToMillis.toMillis === 'function') {
      try {
        return maybeToMillis.toMillis()
      } catch {
        // fall through
      }
    }
    const maybeSeconds = ts as { seconds?: number; nanoseconds?: number }
    if (typeof maybeSeconds.seconds === 'number') {
      const base = maybeSeconds.seconds * 1000
      const extra = typeof maybeSeconds.nanoseconds === 'number' ? Math.floor(maybeSeconds.nanoseconds / 1e6) : 0
      return base + extra
    }
    return 0
  }

  // Keep discipline in sync with filter
  useEffect(() => {
    setForm(prev => ({ ...prev, discipline: selectedDiscipline }))
  }, [selectedDiscipline, expandLatest])

  // Live stream: only current discipline
  useEffect(() => {
    setLoading(true)
    setStreamError('')
    let unsub = () => {}
    try {
      const q = query(
        collection(db, 'redesignAssignmentsBouve'),
        where('discipline', '==', selectedDiscipline)
      )
      unsub = onSnapshot(
        q,
        snap => {
          const items: Submission[] = snap.docs
            .map(d => ({ id: d.id, ...(d.data() as Submission) }))
            .sort((a, b) => getMillis(b.timestamp) - getMillis(a.timestamp))
          setSubmissions(items)
          setLoading(false)
          if (expandLatest && items.length > 0) {
            const latestKey = items[0]?.id || `${selectedDiscipline}-0`
            setOpenSubmissionIds(prev => {
              const next = new Set(prev)
              next.add(latestKey)
              return next
            })
            setExpandLatest(false)
          }
        },
        err => {
          console.error(err)
          setStreamError(err instanceof Error ? err.message : 'Live updates failed. Check Firestore indexes and rules.')
          setLoading(false)
        }
      )
    } catch (e) {
      console.error(e)
      setStreamError('Failed to connect to Firestore. Check environment variables and Firebase config.')
      setLoading(false)
    }
    return () => unsub()
  }, [selectedDiscipline, expandLatest])

  const grouped = useMemo(() => {
    // Group by discipline (single group in filtered view, but keeps parity with COS behavior)
    const map = new Map<Discipline, Submission[]>()
    submissions.forEach(s => {
      const existing = map.get(s.discipline as Discipline) || []
      existing.push(s)
      map.set(s.discipline as Discipline, existing)
    })
    return Array.from(map.entries())
  }, [submissions])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const payload = {
        title: form.title.trim(),
        professorName: form.professorName.trim(),
        course: form.course.trim(),
        discipline: form.discipline,
        oldAssignment: form.oldAssignment.trim(),
        newAssignment: form.newAssignment.trim(),
        timestamp: serverTimestamp(),
      }
      if (!payload.title || !payload.professorName || !payload.course || !payload.oldAssignment || !payload.newAssignment) {
        throw new Error('Please complete all fields before submitting.')
      }
      await addDoc(collection(db, 'redesignAssignmentsBouve'), payload)
      setForm({ title: '', professorName: '', course: '', discipline: selectedDiscipline, oldAssignment: '', newAssignment: '' })
      // After a successful submit, auto-expand the newest item when stream updates
      setExpandLatest(true)
      // Close modal and show a small thanks message
      setOpenModal(false)
      setShowThanks(true)
      setTimeout(() => setShowThanks(false), 3500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Submit button row + Thanks message */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setError(''); setOpenModal(true); }}
          className="inline-flex items-center gap-2 rounded-md bg-[#e85c4a] text-white px-3 py-2 text-[13px] font-medium shadow-sm hover:shadow focus:outline-none"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          <span>Submit a redesign</span>
        </button>
      </div>

      {showThanks && (
        <div className="fixed bottom-4 right-4 z-[70] rounded-md bg-gray-900 text-white text-[12px] px-3 py-2 shadow-lg">Thanks! Your submission was posted.</div>
      )}

      {/* Surface live stream errors outside modal (helps diagnose production issues) */}
      {streamError && (
        <div role="alert" className="text-[12px] text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          Live updates failed: {streamError}
          <span className="ml-1 text-red-600/80">(Check Firebase env vars and Firestore rules for this collection.)</span>
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="submit-redesign-title">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpenModal(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg max-h-[85vh] rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <h3 id="submit-redesign-title" className="text-sm font-semibold tracking-tight text-[#503a34]">Submit a Redesign</h3>
                <button onClick={() => setOpenModal(false)} className="p-1 rounded-md hover:bg-gray-100" aria-label="Close">
                  <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="px-5 py-4 overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a] md:col-span-2">
                      <label className="block text-[12px] font-medium text-gray-700 mb-1">Assignment Title</label>
                      <input
                        type="text"
                        className="w-full bg-transparent text-[13px] focus:outline-none"
                        value={form.title}
                        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Medication Error Analysis Redesign"
                      />
                    </div>
                    <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                      <label className="block text-[12px] font-medium text-gray-700 mb-1">Professor Name</label>
                      <input
                        type="text"
                        className="w-full bg-transparent text-[13px] focus:outline-none"
                        value={form.professorName}
                        onChange={e => setForm(prev => ({ ...prev, professorName: e.target.value }))}
                        placeholder="e.g., Dr. Kim"
                      />
                    </div>
                    <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                      <label className="block text-[12px] font-medium text-gray-700 mb-1">Course</label>
                      <input
                        type="text"
                        className="w-full bg-transparent text-[13px] focus:outline-none"
                        value={form.course}
                        onChange={e => setForm(prev => ({ ...prev, course: e.target.value }))}
                        placeholder="e.g., NURS 2100"
                      />
                    </div>
                    <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                      <label className="block text-[12px] font-medium text-gray-700 mb-1">Discipline</label>
                      <select
                        className="w-full bg-transparent text-[13px] focus:outline-none"
                        value={form.discipline}
                        onChange={e => setForm(prev => ({ ...prev, discipline: e.target.value as Discipline }))}
                      >
                        {DISCIPLINES.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                      <label className="block text-[12px] font-medium text-gray-700 mb-1">Old Assignment</label>
                      <textarea
                        className="w-full bg-transparent text-[13px] focus:outline-none min-h-[120px]"
                        value={form.oldAssignment}
                        onChange={e => setForm(prev => ({ ...prev, oldAssignment: e.target.value }))}
                        placeholder="Describe the original prompt or task..."
                      />
                    </div>
                    <div className="rounded-md border border-gray-300 bg-white p-3 focus-within:ring-2 focus-within:ring-[#e85c4a]">
                      <label className="block text-[12px] font-medium text-gray-700 mb-1">Redesigned Assignment</label>
                      <textarea
                        className="w-full bg-transparent text-[13px] focus:outline-none min-h-[120px]"
                        value={form.newAssignment}
                        onChange={e => setForm(prev => ({ ...prev, newAssignment: e.target.value }))}
                        placeholder="Describe the redesigned prompt or task..."
                      />
                    </div>
                  </div>
                  {error && <div className="text-[12px] text-red-600">{error}</div>}
                  <div className="mt-auto flex items-center justify-end">
                    <button type="submit" disabled={submitting} className="inline-flex items-center rounded-md bg-[#e85c4a] text-white px-3 py-2 text-[13px] font-medium shadow-sm hover:shadow disabled:opacity-60 focus:outline-none">
                      {submitting ? 'Posting…' : 'Post submission'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Submissions (collapsible card) */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenSubmissions(v => !v)}
          aria-expanded={openSubmissions}
          className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60 border-l-4 transition-colors group"
        >
          <span className="flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${openSubmissions ? 'bg-[#e85c4a]' : 'bg-[#f3a396]'} shadow ${openSubmissions ? 'shadow-[#e85c4a]/40' : 'shadow-[#f3a396]/40'}`} />
            <span className="font-semibold text-sm md:text-[15px] tracking-tight text-[#503a34]">Faculty Submissions</span>
          </span>
          <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${openSubmissions ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
        <div className={`transition-all duration-500 ease-out ${openSubmissions ? 'max-h-[4000px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!openSubmissions}>
          <div className="px-5 pb-5 pt-0">
            {loading ? (
              <div className="text-sm text-gray-500 italic">Loading submissions…</div>
            ) : grouped.length === 0 ? (
              <div className="text-sm text-gray-500 italic">No submissions yet for {selectedDiscipline}.</div>
            ) : (
              grouped.map(([discipline, items]) => (
                <div key={discipline} className="space-y-3 mt-4">
                  <h4 className="text-sm font-semibold tracking-tight text-[#e85c4a]">Faculty Submissions <span className="text-gray-400 font-normal">({discipline})</span></h4>
                  <ul className="space-y-4">
                    {items.map((s, idx) => {
                      const key = s.id ?? `${discipline}-${idx}`
                      const open = openSubmissionIds.has(key)
                      return (
                        <li key={key} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setOpenSubmissionIds(prev => {
                              const next = new Set(prev)
                              if (next.has(key)) { next.delete(key) } else { next.add(key) }
                              return next
                            })}
                            aria-expanded={open}
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e85c4a]/60"
                          >
                            <span className="flex items-center gap-3">
                              <span className="h-2 w-2 rounded-full bg-[#e85c4a] shadow shadow-[#e85c4a]/40" />
                              <span className="flex flex-col">
                                <span className="font-medium text-[13px] md:text-sm text-[#5a3d37] tracking-tight">{s.title || 'Faculty Submission'}</span>
                                <span className="text-[11px] text-gray-500">{s.professorName} • {s.course}</span>
                              </span>
                            </span>
                            <svg className={`w-5 h-5 text-[#e85c4a] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                          </button>
                          <div className={`transition-all duration-500 ease-out ${open ? 'max-h-[900px]' : 'max-h-0'} overflow-hidden`} aria-hidden={!open}>
                            {open && (
                              <div className="px-5 pb-5 pt-0 space-y-5">
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">🔴 <span>Old Assignment</span></p>
                                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800 whitespace-pre-wrap">
                                    {s.oldAssignment}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-wider text-green-600 mb-2 flex items-center gap-2">🟢 <span>Redesigned Assignment</span></p>
                                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-[13px] leading-relaxed text-green-800 whitespace-pre-wrap">
                                    {s.newAssignment}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
