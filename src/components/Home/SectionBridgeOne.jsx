import React from "react";
import { motion } from "framer-motion";

const defaultLogos = [
  { name: "Eternity Solutions" },
  { name: "trmeric" },
  { name: "Macy's" },
  { name: "Levi's" },
  { name: "Prescience" },
  { name: "Lifetouch" },
  { name: "Independent artists" },
];

const CompaniesBanner = ({ logos = defaultLogos }) => {
  return (
    <section className="relative w-full bg-transparent">
      {/* Subtle dotted texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.18]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.45)_1px,transparent_0)] bg-[size:18px_18px]" />
      </div>

      <div className="relative overflow-hidden border-y border-teal-900/60 bg-gradient-to-b from-slate-950 via-black to-slate-950 py-10 md:py-12">
        {/* Top & bottom dashed lines */}
        <div className="absolute inset-x-0 top-8 border-t border-dashed border-slate-700/40" />
        <div className="absolute inset-x-0 bottom-8 border-t border-dashed border-slate-700/40" />

        {/* Label */}
        <div className="relative flex flex-col items-center mb-6">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-slate-400 font-heading">
            WHO WE WORKED WITH
          </p>
        </div>

        {/* Marquee wrapper */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-14 md:gap-20 marquee-row">
            {/* first pass */}
            {logos.map((logo, i) => (
              <div
                key={`row1-${i}-${logo.name}`}
                className="flex items-center justify-center min-w-[130px] md:min-w-[170px] opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-7 md:h-9 object-contain grayscale hover:grayscale-0 transition"
                  />
                ) : (
                  <span className="font-heading text-sm md:text-base tracking-[0.25em] text-slate-200 whitespace-nowrap">
                    {logo.name.toUpperCase()}
                  </span>
                )}
              </div>
            ))}

            {/* second pass for seamless loop */}
            {logos.map((logo, i) => (
              <div
                key={`row2-${i}-${logo.name}`}
                className="flex items-center justify-center min-w-[130px] md:min-w-[170px] opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-7 md:h-9 object-contain grayscale hover:grayscale-0 transition"
                  />
                ) : (
                  <span className="font-heading text-sm md:text-base tracking-[0.25em] text-slate-200 whitespace-nowrap">
                    {logo.name.toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* marquee animation */}
      <style>{`
        @keyframes marquee-slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-row {
          width: max-content;
          animation: marquee-slide 32s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CompaniesBanner;
