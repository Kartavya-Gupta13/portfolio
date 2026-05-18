export function SectionMark({ label }: { label: string }) {
  return (
    <div className="section-mark">
      <svg viewBox="0 0 100 18" className="crane">
        <line
          x1="0"
          y1="9"
          x2="36"
          y2="9"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />
        <path
          d="M 50,2 C 52,7 56,8 64,9 C 56,10 52,11 50,16 C 48,11 44,10 36,9 C 44,8 48,7 50,2 Z"
          fill="currentColor"
        />
        <line
          x1="64"
          y1="9"
          x2="100"
          y2="9"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />
      </svg>
      <div className="label">{label}</div>
    </div>
  );
}
