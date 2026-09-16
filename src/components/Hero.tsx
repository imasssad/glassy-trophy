"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CategoryIcon } from "./icons";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 120, damping: 14 });
  const springY = useSpring(mvY, { stiffness: 120, damping: 14 });

  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);
  const rotateX = useTransform(springY, [-1, 1], [10, -10]);
  const translateX = useTransform(springX, [-1, 1], [-10, 10]);
  const translateY = useTransform(springY, [-1, 1], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mvX.set(dx);
    mvY.set(dy);
  }

  function handleMouseLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
      className="relative z-[1] grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-[6vw] pt-16 pb-[90px] max-w-[1360px] mx-auto text-center md:text-left"
    >
      <div className="max-w-[560px] mx-auto md:mx-0">
        <p className="text-ink-2 text-[0.98rem] mb-[18px]">Trophies, medals and shields, in one place</p>
        <h1 className="text-[clamp(2.4rem,4.2vw,3.6rem)] leading-[1.08] text-ink-1">
          Awards worth the wait on the shelf.
        </h1>
        <p className="mt-5 text-ink-2 text-[1.08rem] max-w-[46ch] mx-auto md:mx-0">
          Browse the full catalogue, see clear pricing for every piece, and put together an
          order in minutes. Every item can be personalised once your order is confirmed.
        </p>
        <a
          href="#catalogue"
          className="inline-block mt-[34px] bg-gradient-to-br from-ink-solid to-[var(--ink-solid-hover)] text-white font-extrabold px-[30px] py-[15px] rounded-full no-underline shadow-[0_16px_34px_-14px_rgba(25,26,44,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_rgba(25,26,44,0.5),inset_0_1px_0_rgba(255,255,255,0.24)] active:translate-y-0 active:scale-[0.97]"
        >
          Browse the catalogue
        </a>
      </div>

      <div className="justify-self-center animate-floaty">
        <motion.div
          style={{ rotateX, rotateY, x: translateX, y: translateY, transformStyle: "preserve-3d" }}
          className="relative w-[240px] h-[240px] md:w-[340px] md:h-[340px]"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.75),rgba(255,255,255,0.25)_60%)] border border-white/80 backdrop-blur-[8px] backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-12px_30px_rgba(25,26,44,0.06),0_30px_70px_-20px_var(--glow-indigo)]" />
          <CategoryIcon
            category="trophy"
            className="relative z-[1] w-full h-full drop-shadow-[0_18px_26px_rgba(25,26,44,0.25)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
