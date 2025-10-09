"use client";
import { useState, useEffect } from 'react';
import Sidebar from '../sidebar';
import Link from 'next/link';

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(()=>{ if(open){ const o=document.body.style.overflow; document.body.style.overflow='hidden'; return ()=>{document.body.style.overflow=o}; }},[open]);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center gap-4 h-14 pl-4 pr-6 border-b bg-white/70 backdrop-blur-sm sticky top-0 z-30">
        <button
          onClick={()=>setOpen(true)}
          aria-label="Open menu"
          className="inline-flex w-10 h-10 items-center justify-center rounded-md border border-gray-300 hover:border-teal-400 text-gray-600 hover:text-teal-600 transition focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        </button>
  <Link href="/" className="text-sm font-semibold tracking-tight text-gray-700 hover:text-teal-700 transition">StartLab</Link>
      </header>
      <Sidebar open={open} onClose={()=>setOpen(false)} />
      <main className="mx-auto max-w-5xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
