"use client";

import type { FilterValue, SortValue } from "@/lib/products";
import { SortDropdown } from "./SortDropdown";

type Props = {
  filter: FilterValue;
  sort: SortValue;
  onFilterChange: (f: FilterValue) => void;
  onSortChange: (s: SortValue) => void;
};

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All pieces" },
  { value: "trophy", label: "Trophies" },
  { value: "medal", label: "Medals" },
  { value: "shield", label: "Shields" },
];

export function CatalogueControls({ filter, sort, onFilterChange, onSortChange }: Props) {
  return (
    <div className="relative z-30 flex flex-wrap items-center justify-between gap-[18px] mb-8 p-3.5 rounded-[18px] bg-white/26 border border-white/85 backdrop-blur-[28px] backdrop-saturate-[190%] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_0_0_1px_rgba(255,255,255,0.15),0_10px_30px_-18px_rgba(25,26,44,0.22)]">
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by type">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onFilterChange(f.value)}
              aria-pressed={active}
              className={`px-[18px] py-2.5 rounded-full text-[0.92rem] font-semibold border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.96] ${
                active
                  ? "bg-gradient-to-br from-ink-solid to-[var(--ink-solid-hover)] border-ink-solid text-white"
                  : "bg-transparent border-white/85 text-ink-2 hover:text-ink-1 hover:border-black/20"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <SortDropdown value={sort} onChange={onSortChange} />
    </div>
  );
}
