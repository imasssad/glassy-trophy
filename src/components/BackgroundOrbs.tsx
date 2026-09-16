export function BackgroundOrbs() {
  const orbs = [
    { className: "w-[480px] h-[480px] -top-36 -left-28 animate-drift1", color: "var(--glow-indigo)" },
    { className: "w-[440px] h-[440px] top-[15%] -right-40 animate-drift2", color: "var(--glow-coral)" },
    { className: "w-[400px] h-[400px] -bottom-28 left-[30%] [animation-direction:reverse] animate-drift1", color: "var(--glow-teal)" },
    { className: "w-[360px] h-[360px] bottom-[10%] right-[10%] [animation-direction:reverse] animate-drift2", color: "var(--glow-indigo)" },
    { className: "w-[320px] h-[320px] top-[45%] left-[8%] animate-drift1", color: "var(--glow-coral)" },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none" aria-hidden="true">
      {orbs.map((orb, i) => (
        <span
          key={i}
          className={`absolute rounded-full blur-[90px] opacity-70 ${orb.className}`}
          style={{ background: `radial-gradient(circle, ${orb.color}, transparent 70%)` }}
        />
      ))}
    </div>
  );
}
