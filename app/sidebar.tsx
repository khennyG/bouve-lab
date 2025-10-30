"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const links: { label: string; href: string; icon: React.ReactNode; badge?: string }[] = [
    { label: "Welcome", href: "/", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2 4 4 10-10 2 2-12 12z" /></svg> },
    { label: "Getting Started with AI", href: "/explore/getting-started", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 4v6c0 5-7 8-7 8s-7-3-7-8V7l7-4z" /></svg> },
    { label: "Prompt Engineering", href: "/explore/prompt-engineering", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l4 4-4 4-4-4 4-4z" /><path d="M6 12l-4 4 4 4 4-4-4-4z" /><path d="M18 12l-4 4 4 4 4-4-4-4z" /></svg> },
    { label: "Prompt Library", href: "/explore/prompts", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V5a2 2 0 0 0-2-2H7l-4 4v8a2 2 0 0 0 2 2h5" /><path d="M17 17v5l2-2 2 2v-5" /><path d="M17 17h4" /></svg> },
    { label: "Prompt Library (Alt)", href: "/explore/prompt-library-alt", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 7h8M8 12h8M8 17h5" /></svg> },
    { label: "Analytics and Insights", href: "/explore/analytics", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><rect x="7" y="13" width="3" height="5" /><rect x="12" y="9" width="3" height="9" /><rect x="17" y="5" width="3" height="13" /></svg> },
    { label: "Faculty Highlight", href: "/explore/highlights", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17.75L6.5 21l1-6L3 9.75l6.25-.5L12 3l2.75 6.25 6.25.5L16.5 15l1 6z" /></svg> }
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open && panelRef.current) {
      const first = panelRef.current.querySelector<HTMLElement>('a');
      first?.focus();
    }
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        ref={panelRef}
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white p-6 z-50 shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm tracking-wide">NU</div>
            <div className="leading-tight">
              <p className="text-red-500 font-semibold text-[13px] leading-snug whitespace-nowrap">Northeastern University</p>
              <p className="text-gray-400 text-[11px] tracking-wide">Bouvé College of Health Sciences</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white p-2 rounded hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-teal-600" aria-label="Close menu">
            <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
          </button>
        </div>
        <nav aria-label="Primary">
          <ul className="space-y-1 mt-2">
            {links.map(l => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={onClose}
                    className={[
                      'group flex items-center justify-start gap-1.5 pl-3 pr-3 py-2 border-l-4 rounded-sm text-[13px] font-medium tracking-tight transition outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-0 text-left',
                      active ? 'bg-gray-800/70 border-teal-600 text-white' : 'border-transparent text-gray-300 hover:text-white hover:border-teal-600 hover:bg-gray-800/50'
                    ].join(' ')}
                  >
                    <span className={['text-gray-400 group-hover:text-red-400', active ? '!text-red-400' : ''].join(' ')}>{l.icon}</span>
                    <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis" title={l.label}>{l.label}</span>
                    {l.badge && l.badge !== '' && (
                      <span className="text-[10px] uppercase tracking-wide bg-teal-600/20 text-red-400 px-1.5 py-0.5 rounded group-hover:bg-teal-600/30">{l.badge}</span>
                    )}
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500 shadow shadow-teal-500/40" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
