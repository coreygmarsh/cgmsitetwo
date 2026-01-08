import React from "react";
import { motion } from "framer-motion";

const values = [
  { label: "Story-First", tag: "Narrative at the center" },
  { label: "Precision", tag: "Frame-by-frame intention" },
  { label: "Worldbuilding", tag: "Cohesive visual universes" },
  { label: "Collaboration", tag: "Built with your team" },
  { label: "Experimentation", tag: "Safe space to explore" },
  { label: "Consistency", tag: "Systems, not one-offs" },
  { label: "Emotional Impact", tag: "Feel it, remember it" },
  { label: "Clarity", tag: "Complex ideas, clean visuals" },
];

const ValuesBanner = () => {
  // duplicate array so we can loop seamlessly
  const row = [...values, ...values];

  return (
    <section className="relative w-full overflow-hidden bg-black ">
      {/* subtle texture / glow */}
      <div className="absolute inset-0  pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(45,212,191,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.3)_1px,transparent_1px)] bg-[size:120px_120px]" />
      </div>

      {/* dashed separators like reference */}
      <div className="absolute top-5 left-0 w-full border-t border-dashed border-teal-700/40" />
      <div className="absolute bottom-5 left-0 w-full border-b border-dashed border-teal-700/40" />

      <div className="relative max-w-screen mx-auto py-7 px-4 flex items-center gap-10">
        {/* Left label */}
        <div className="shrink-0 hidden sm:flex flex-col gap-1">
          <span className="text-[10px] tracking-[0.3em] uppercase text-teal-400/70 font-heading">
            Core Principles
          </span>
          <span className="text-xs text-slate-400 font-coolvetica">
            How CGM approaches every project
          </span>
        </div>

        {/* Marquee */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            className="flex items-center gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
          >
            {row.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="flex items-center gap-3 pr-8"
              >
                {/* glowing dot */}
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(16,185,129,1)]" />
                {/* value pill */}
                <div className="px-5 py-2 backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-xs sm:text-sm font-heading tracking-[0.18em] uppercase text-teal-100">
                      {item.label}
                    </span>
                    <span className="hidden sm:inline-block text-[11px] text-slate-400 font-coolvetica">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuesBanner;
