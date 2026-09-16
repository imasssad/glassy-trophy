"use client";

type Props = {
  cartCount: number;
  onOpenCart: () => void;
};

export function Topbar({ cartCount, onOpenCart }: Props) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-[6vw] py-[18px] bg-white/30 backdrop-blur-2xl backdrop-saturate-[180%] border-b border-black/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <div className="font-[family-name:var(--font-display)] text-[1.3rem] tracking-[0.01em] text-ink-1">
        Laurel <span className="text-indigo">&amp;</span> Crest
      </div>
      <button
        onClick={onOpenCart}
        className="flex items-center gap-2.5 bg-white/42 border border-white/85 text-ink-1 px-[18px] py-2.5 rounded-full text-[0.92rem] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-indigo hover:-translate-y-px active:translate-y-0 active:scale-[0.97]"
      >
        View order
        <span className="min-w-5 h-5 rounded-full bg-indigo text-white font-extrabold text-[0.78rem] inline-flex items-center justify-center px-1.5">
          {cartCount}
        </span>
      </button>
    </header>
  );
}
