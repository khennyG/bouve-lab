"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Sidebar from './sidebar';

export default function Home(){
  const [open,setOpen]=useState(false);
  useEffect(()=>{ if(open){ const o=document.body.style.overflow; document.body.style.overflow='hidden'; return ()=>{document.body.style.overflow=o}; }},[open]);
  return (
  <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex flex-col items-center justify-center px-6 overflow-hidden text-center">
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent)]">
  <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-4rem] right-[-4rem] w-96 h-96 bg-rose-100/40 rounded-full blur-3xl" />
      </div>
      <Sidebar open={open} onClose={()=>setOpen(false)} />
      <Image
        src="/northeastern-logo2.png"
        alt="Northeastern University Logo"
        width={140}
        height={140}
        priority
        className="h-14 w-auto object-contain absolute top-0 left-0 m-0"
      />
  <section className="relative max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-5 leading-tight">
          Welcome to {" "}
          <span
            className="startlab-animated startlab-loop italic font-bold drop-shadow-sm"
          >
            StartLab
          </span>
        </h1>
        <p className="text-gray-700 text-[1.02rem] italic leading-[1.85] tracking-[0.02em] md:tracking-[0.035em] mb-10 max-w-3xl md:max-w-4xl mx-auto text-left">
          AI is already transforming healthcare education — from clinical simulations to personalized learning experiences. The question is not if our students will use AI, but how we as faculty can guide its use thoughtfully in preparing future clinicians, researchers, and health leaders. StartLab: Bouvé is a space to begin that conversation. Explore practical ways AI can enrich your teaching, enhance patient-based learning, and strengthen critical thinking across the health sciences.
        </p>
        <div className="flex justify-center">
          <button
            onClick={()=>setOpen(true)}
            className="bg-teal-600 text-white px-7 py-3 rounded-md font-medium tracking-wide shadow-sm hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
          >Start Exploring</button>
        </div>
      </section>
    </main>
  );
}
