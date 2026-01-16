import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Minimal, high-converting Hero
 * - Clean hierarchy (headline → proof → CTA)
 * - Subtle premium glow (cheap render)
 * - Reduced-motion friendly
 * - No canvas / grids / heavy loops
 */
const HeroSection = () => {
  const reduce = useReducedMotion();

  const t = useMemo(
    () =>
      reduce
        ? { duration: 0 }
        : { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    [reduce]
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce
        ? { duration: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: t },
  };

  const subtleFloat = reduce
    ? undefined
    : {
        y: [0, -6, 0],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* subtle premium accents (cheap) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-cyan-500/12 blur-[90px]" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
      </div>

      {/* content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-6 text-center"
      >
        {/* micro-tag (positioning) */}
        <motion.div variants={item} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-heading tracking-[0.28em] uppercase text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 opacity-90" />
            CGM Creative Solutions
          </span>
        </motion.div>

        {/* headline (benefit-driven) */}
        <motion.h1
          variants={item}
          className="font-wave text-4xl  text-white sm:text-5xl md:text-6xl"
        >
          Story-first content that{" "}
          <span className="text-green-300">
            looks premium
          </span>{" "}
          and performs.
        </motion.h1>

        {/* subhead (clarity + audience) */}
        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-sm leading-relaxed font-coolvetica text-white/70 sm:text-base"
        >
          Helping brands and creators ship clean video edits, social assets, and
          design that feel cinematic — backed by metrics.
        </motion.p>

        {/* proof chips (trust + scannability) */}
        <motion.div
          variants={item}
          className="mt-6 flex  flex-wrap items-center justify-center gap-2"
        >
          {["Video Editing", "Social Systems", "Brand Design", "Fast Turnarounds"].map(
            (label) => (
              <span
                key={label}
                className="rounded-full border font-coolvetica border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
              >
                {label}
              </span>
            )
          )}
        </motion.div>

        {/* CTA row */}
        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#services"
            className="inline-flex w-full font-coolvetica items-center justify-center rounded-2xl px-5 py-3 text-sm
                       bg-gradient-to-r from-cyan-300/90 via-cyan-200/90 to-sky-200/90 text-black
                       shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_14px_40px_rgba(34,211,238,0.10)]
                       active:scale-[0.99] transition sm:w-auto"
          >
            See Services
          </a>

          <a
            href="corey@cgmcreativesolutions.com"
            className="inline-flex w-full items-center font-coolvetica justify-center rounded-2xl px-5 py-3 text-sm
                       border border-white/15 bg-white/5 text-white/90
                       active:bg-white/8 active:scale-[0.99] transition sm:w-auto"
          >
            Email Me
          </a>
        </motion.div>

        {/* secondary CTA (low friction) */}
        <motion.a
          variants={item}
          href="#work"
          className="mt-6 text-xs font-heading tracking-[0.22em] uppercase text-cyan-100/70 hover:text-cyan-100/90 transition"
        >
          View Featured Work ↓
        </motion.a>

        {/* subtle “signature” mark */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <motion.div
            className="h-px w-40 bg-gradient-to-r from-transparent via-white/12 to-transparent"
            animate={subtleFloat}
          />
          <p className="text-[31px] font-wave tracking-[0.18em] text-white/55">
            Crafting Worlds • Building Stories • Empowering Vision
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
