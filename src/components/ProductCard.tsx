"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { categoryLabel, formatPrice } from "@/lib/products";
import { CategoryIcon } from "./icons";

const CATEGORY_STYLES = {
  trophy: {
    cardBg: "linear-gradient(160deg, rgba(91,110,245,0.24), rgba(255,255,255,0.18))",
    cardShadow:
      "inset 0 1px 0 rgba(255,255,255,0.75), 0 24px 50px -28px var(--glow-indigo), 0 10px 26px -20px rgba(25,26,44,0.14)",
    tagBg: "rgba(91,110,245,0.14)",
    tagColor: "var(--indigo-deep)",
    addHoverBorder: "var(--indigo)",
    addHoverColor: "var(--indigo-deep)",
    addHoverShadow:
      "inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 16px -8px var(--glow-indigo)",
  },
  medal: {
    cardBg: "linear-gradient(160deg, rgba(20,184,166,0.22), rgba(255,255,255,0.18))",
    cardShadow:
      "inset 0 1px 0 rgba(255,255,255,0.75), 0 24px 50px -28px var(--glow-teal), 0 10px 26px -20px rgba(25,26,44,0.14)",
    tagBg: "rgba(20,184,166,0.14)",
    tagColor: "var(--teal-deep)",
    addHoverBorder: "var(--teal)",
    addHoverColor: "var(--teal-deep)",
    addHoverShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 16px -8px var(--glow-teal)",
  },
  shield: {
    cardBg: "linear-gradient(160deg, rgba(251,111,146,0.22), rgba(255,255,255,0.18))",
    cardShadow:
      "inset 0 1px 0 rgba(255,255,255,0.75), 0 24px 50px -28px var(--glow-coral), 0 10px 26px -20px rgba(25,26,44,0.14)",
    tagBg: "rgba(251,111,146,0.15)",
    tagColor: "var(--coral-deep)",
    addHoverBorder: "var(--coral)",
    addHoverColor: "var(--coral-deep)",
    addHoverShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 16px -8px var(--glow-coral)",
  },
} as const;

type Props = {
  product: Product;
  onAdd: (id: string, qty: number) => void;
};

export function ProductCard({ product, onAdd }: Props) {
  const styles = CATEGORY_STYLES[product.category];
  const cardRef = useRef<HTMLDivElement>(null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(springY, [-1, 1], [6, -6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mvX.set((x / rect.width - 0.5) * 2);
    mvY.set((y / rect.height - 0.5) * 2);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }

  function handleMouseLeave() {
    mvX.set(0);
    mvY.set(0);
    setHovering(false);
  }

  function handleAdd() {
    onAdd(product.id, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 700);
  }

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, background: styles.cardBg, boxShadow: styles.cardShadow }}
      className="relative flex flex-col p-6 rounded-[26px] border border-white/85 backdrop-blur-[30px] backdrop-saturate-[200%] overflow-hidden transition-[border-color] duration-300 hover:border-white"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(155deg,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.15)_30%,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.65), transparent 55%)`,
        }}
      />

      <div className="relative w-full h-[140px] rounded-[18px] flex items-center justify-center mb-[18px] bg-white/30 border border-white/80 backdrop-blur-[6px] backdrop-saturate-[180%] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(25,26,44,0.05)]">
        <CategoryIcon
          category={product.category}
          className="w-[78px] h-[78px] drop-shadow-[0_10px_14px_rgba(25,26,44,0.18)]"
        />
      </div>

      <span
        className="self-start text-[0.72rem] font-bold tracking-[0.02em] px-[11px] py-[5px] rounded-full mb-2.5"
        style={{ background: styles.tagBg, color: styles.tagColor }}
      >
        {categoryLabel(product.category)}
      </span>

      <h3 className="text-[1.16rem] mb-1.5 text-ink-1">{product.name}</h3>
      <p className="text-ink-3 text-[0.84rem] mb-2.5">{product.material}</p>
      <p className="text-ink-2 text-[0.9rem] grow mb-[18px]">{product.blurb}</p>

      <div className="flex items-center justify-between gap-2.5">
        <span className="font-[family-name:var(--font-display)] text-[1.3rem] text-ink-1">
          {formatPrice(product.price)}
        </span>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/50 border border-white/85 rounded-full">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-[26px] h-[26px] rounded-full text-ink-1 hover:bg-black/[0.08]"
            >
              &minus;
            </button>
            <span className="min-w-5 text-center text-[0.88rem] text-ink-1">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(50, q + 1))}
              className="w-[26px] h-[26px] rounded-full text-ink-1 hover:bg-black/[0.08]"
            >
              +
            </button>
          </div>

          <button
            type="button"
            aria-label="Add to order"
            onClick={handleAdd}
            style={
              justAdded
                ? { background: "var(--ink-solid)", color: "#fff", borderColor: "var(--ink-solid)" }
                : undefined
            }
            onMouseEnter={(e) => {
              if (justAdded) return;
              e.currentTarget.style.borderColor = styles.addHoverBorder;
              e.currentTarget.style.color = styles.addHoverColor;
              e.currentTarget.style.boxShadow = styles.addHoverShadow;
            }}
            onMouseLeave={(e) => {
              if (justAdded) return;
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.color = "";
              e.currentTarget.style.boxShadow = "";
            }}
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[1.1rem] bg-white/42 border border-white/85 text-ink-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-transform duration-300 hover:scale-[1.06] active:scale-[0.94]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  &#10003;
                </motion.span>
              ) : (
                <motion.span
                  key="plus"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  +
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
