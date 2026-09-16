"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SortValue } from "@/lib/products";

const OPTIONS: { value: SortValue; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

type Props = {
  value: SortValue;
  onChange: (v: SortValue) => void;
};

export function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  return (
    <div ref={rootRef} className="relative flex items-center gap-2.5 text-ink-2 text-[0.92rem] font-semibold">
      <span>Sort by</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-2 bg-white/42 border border-white/85 text-ink-1 px-[18px] py-2.5 rounded-full cursor-pointer min-w-[190px] justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-indigo"
        >
          <span>{current.label}</span>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-full w-max list-none m-0 p-1.5 rounded-2xl bg-white/70 backdrop-blur-[28px] backdrop-saturate-[190%] border border-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_20px_45px_-18px_rgba(25,26,44,0.35)]"
            >
              {OPTIONS.map((o) => {
                const selected = o.value === value;
                return (
                  <li key={o.value} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.92rem] transition-colors duration-150 ${
                        selected
                          ? "bg-indigo/12 text-indigo-deep font-semibold"
                          : "text-ink-1 hover:bg-black/[0.05]"
                      }`}
                    >
                      {o.label}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
