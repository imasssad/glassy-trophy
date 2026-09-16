"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { CategoryIcon } from "./icons";

export type CartLine = { product: Product; qty: number };

type Props = {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onSubmit: () => void;
};

export function OrderPanel({ open, lines, subtotal, onClose, onRemove, onSubmit }: Props) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(25,26,44,0.25)] z-50"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!open}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[60] bg-white/40 backdrop-blur-[32px] backdrop-saturate-[190%] border-l border-white/85 shadow-[inset_1px_0_0_rgba(255,255,255,0.7),-30px_0_60px_-30px_rgba(25,26,44,0.25)] flex flex-col"
      >
        <div className="flex flex-col h-full p-[26px]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-ink-1 text-xl">Your order</h2>
            <button
              onClick={onClose}
              aria-label="Close order panel"
              className="w-[34px] h-[34px] rounded-full border border-white/85 text-ink-1 text-lg hover:border-indigo hover:text-indigo-deep"
            >
              &times;
            </button>
          </div>

          <div className="flex-grow overflow-y-auto flex flex-col gap-3.5 pr-1">
            {lines.length === 0 ? (
              <p className="text-ink-3 text-[0.92rem] mt-[30px] text-center">
                Your order is empty. Add trophies, medals or shields from the catalogue.
              </p>
            ) : (
              lines.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex gap-3 items-center p-3 rounded-xl bg-white/50 border border-[var(--hairline)]"
                >
                  <div className="w-[42px] h-[42px] shrink-0 flex items-center justify-center">
                    <CategoryIcon category={product.category} className="w-8 h-8" />
                  </div>
                  <div className="grow min-w-0">
                    <div className="text-[0.9rem] font-semibold text-ink-1">{product.name}</div>
                    <div className="text-[0.78rem] text-ink-3">
                      {qty} &times; {formatPrice(product.price)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[1rem] font-[family-name:var(--font-display)] text-ink-1">
                      {formatPrice(product.price * qty)}
                    </span>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="bg-transparent border-none text-ink-3 text-[0.78rem] hover:text-coral-deep"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-[18px] pt-[18px] border-t border-[var(--hairline)]">
            <div className="flex justify-between text-base mb-4 text-ink-1">
              <span>Subtotal</span>
              <span className="font-[family-name:var(--font-display)] text-[1.2rem]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button
              onClick={onSubmit}
              disabled={lines.length === 0}
              className="w-full py-[15px] rounded-full border-none text-white font-extrabold text-[0.98rem] bg-gradient-to-br from-ink-solid to-[var(--ink-solid-hover)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_14px_30px_-14px_rgba(25,26,44,0.45)] active:translate-y-0 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Submit order request
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
