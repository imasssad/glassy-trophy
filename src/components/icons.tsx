import type { Category } from "@/lib/products";

export function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C6CDFC" />
          <stop offset="45%" stopColor="#5B6EF5" />
          <stop offset="100%" stopColor="#3235A3" />
        </linearGradient>
        <linearGradient id="gradTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A9F0E4" />
          <stop offset="45%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0A6D62" />
        </linearGradient>
        <linearGradient id="gradCoral" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD3DE" />
          <stop offset="45%" stopColor="#FB6F92" />
          <stop offset="100%" stopColor="#A9304F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M35 14 L65 14 L62 34 Q62 48 50 51 Q38 48 38 34 Z" fill="url(#gradIndigo)" />
      <path d="M35 19 Q19 19 21 34 Q23 45 38 42" fill="none" stroke="url(#gradIndigo)" strokeWidth="4" strokeLinecap="round" />
      <path d="M65 19 Q81 19 79 34 Q77 45 62 42" fill="none" stroke="url(#gradIndigo)" strokeWidth="4" strokeLinecap="round" />
      <rect x="47" y="51" width="6" height="14" fill="url(#gradIndigo)" />
      <rect x="34" y="65" width="32" height="7" rx="2" fill="url(#gradIndigo)" />
      <rect x="28" y="72" width="44" height="9" rx="2" fill="url(#gradIndigo)" />
    </svg>
  );
}

function MedalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M34 4 L50 30 L28 42 Z" fill="url(#gradTeal)" />
      <path d="M66 4 L50 30 L72 42 Z" fill="url(#gradTeal)" />
      <circle cx="50" cy="63" r="26" fill="url(#gradTeal)" />
      <circle cx="50" cy="63" r="17" fill="none" stroke="rgba(25,26,44,0.3)" strokeWidth="2" />
      <path
        d="M50 53 L53 60 L61 61 L55 66 L57 74 L50 70 L43 74 L45 66 L39 61 L47 60 Z"
        fill="rgba(25,26,44,0.3)"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M50 8 L80 20 L80 48 Q80 74 50 92 Q20 74 20 48 L20 20 Z" fill="url(#gradCoral)" />
      <path d="M50 30 L64 50 L50 70 L36 50 Z" fill="none" stroke="rgba(25,26,44,0.32)" strokeWidth="3" />
    </svg>
  );
}

export function CategoryIcon({ category, className }: { category: Category; className?: string }) {
  if (category === "trophy") return <TrophyIcon className={className} />;
  if (category === "medal") return <MedalIcon className={className} />;
  return <ShieldIcon className={className} />;
}
