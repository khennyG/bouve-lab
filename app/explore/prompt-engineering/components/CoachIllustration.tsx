export default function CoachIllustration(
  { className = "w-28 h-28" }: { className?: string }
) {
  // Simple inline SVG of a coach at a whiteboard. Kept minimal and friendly.
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="200" height="200" rx="16" fill="#F8FAFC" />
      <rect x="18" y="24" width="120" height="80" rx="8" fill="#EEF2FF" stroke="#C7D2FE" />
      <line x1="28" y1="58" x2="128" y2="58" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="76" x2="108" y2="76" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />

      <circle cx="150" cy="70" r="16" fill="#FDE68A" stroke="#F59E0B" />
      <rect x="140" y="90" width="20" height="28" rx="6" fill="#93C5FD" />
      <rect x="134" y="118" width="32" height="8" rx="4" fill="#93C5FD" />

      <path d="M160 96 L176 84" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
      <circle cx="176" cy="84" r="3" fill="#111827" />

      <rect x="42" y="120" width="40" height="20" rx="8" fill="#DCFCE7" stroke="#86EFAC" />
      <rect x="88" y="120" width="40" height="20" rx="8" fill="#E0E7FF" stroke="#C7D2FE" />
      <rect x="134" y="132" width="40" height="20" rx="8" fill="#FFE4E6" stroke="#FDA4AF" />
    </svg>
  );
}
