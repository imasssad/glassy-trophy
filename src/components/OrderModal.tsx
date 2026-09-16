"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  stage: "confirm" | "done";
  itemCount: number;
  subtotalLabel: string;
  onCancel: () => void;
  onSend: () => void;
  onDone: () => void;
};

export function OrderModal({ open, stage, itemCount, subtotalLabel, onCancel, onSend, onDone }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(25,26,44,0.3)] p-5"
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px] bg-white/50 border border-white/85 backdrop-blur-[30px] backdrop-saturate-[190%] rounded-[26px] p-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_30px_70px_-20px_rgba(25,26,44,0.35)]"
          >
            {stage === "confirm" ? (
              <>
                <h3 className="text-[1.3rem] mb-3 text-ink-1">Order request ready</h3>
                <p className="text-ink-2 text-[0.94rem] mb-[22px]">
                  {itemCount} item{itemCount === 1 ? "" : "s"} for {subtotalLabel}. Sending this
                  confirms your order details, our team will follow up to confirm personalisation
                  and delivery.
                </p>
                <div className="flex gap-2.5">
                  <button
                    onClick={onCancel}
                    className="flex-1 py-3 rounded-full font-bold text-[0.9rem] border border-white/85 bg-transparent text-ink-1"
                  >
                    Keep editing
                  </button>
                  <button
                    onClick={onSend}
                    className="flex-1 py-3 rounded-full font-bold text-[0.9rem] border-none text-white bg-gradient-to-br from-ink-solid to-[var(--ink-solid-hover)]"
                  >
                    Send order request
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-[1.3rem] mb-3 text-ink-1">Request received</h3>
                <p className="text-ink-2 text-[0.94rem] mb-[22px]">
                  Thank you. We have your order request and will confirm pricing, personalisation
                  and delivery within one business day.
                </p>
                <div className="flex gap-2.5">
                  <button
                    onClick={onDone}
                    className="flex-1 py-3 rounded-full font-bold text-[0.9rem] border-none text-white bg-gradient-to-br from-ink-solid to-[var(--ink-solid-hover)]"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
