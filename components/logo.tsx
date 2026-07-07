export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-bush-600 to-bay-600 text-white shadow-md shadow-bush-900/20 ${className}`}
    >
      <svg
        width="60%"
        height="60%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 16V8a2 2 0 0 1 2-2h11.5a5.5 5.5 0 0 1 5.5 5.5V16h-2.1" />
        <path d="M2.5 16h2.6" />
        <path d="M9 16h6" />
        <path d="M2.5 11.5h19" />
        <circle cx="7" cy="16.4" r="1.9" />
        <circle cx="17" cy="16.4" r="1.9" />
      </svg>
    </span>
  );
}
