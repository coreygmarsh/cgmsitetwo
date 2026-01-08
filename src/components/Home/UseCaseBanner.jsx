import React from "react";
import { motion } from "framer-motion";

const useCases = [
  {
    title: "Launch Campaign Pipelines",
    subtitle: "Product drops • Feature releases • Go-to-market motion",
  },
  {
    title: "Visual Albums & Tour Visuals",
    subtitle: "Story-driven worlds for music & live shows",
  },
  {
    title: "SaaS Product Storytelling",
    subtitle: "Explainers • Onboarding flows • Feature narratives",
  },
  {
    title: "IP Worldbuilding & Lore",
    subtitle: "Cinematic universes for games, books, and brands",
  },
  {
    title: "Pitch Decks & Investor Narratives",
    subtitle: "Motion-first decks that feel like trailers",
  },
  {
    title: "Content Engines for Creators",
    subtitle: "Reusable templates • Series formats • Social systems",
  },
  {
    title: "Live Event Screens & Interactives",
    subtitle: "LED walls • Installations • Reactive motion",
  },
  {
    title: "Internal Comms & Culture Films",
    subtitle: "Brand films • Culture stories • Training visuals",
  },
];

// duplicate so the marquee loops seamlessly
const looped = [...useCases, ...useCases];

const UseCaseBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black ">
      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-transparent pointer-events-none " />

      {/* Ambient glow behind strip */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-full opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-full  opacity-60" />
      </div>

      {/* Very subtle grain */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="relative max-w-screen mx-auto py-5 px-4 lg:px-8 flex items-center gap-6">
        {/* Left label pill */}
        <motion.div
          className="flex items-center gap-3 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full px-4 rounded-full  backdrop-blur-xl flex items-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.5)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,1)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-teal-100 font-heading">
              Use&nbsp;Cases
            </span>
          </div>
        </motion.div>

        {/* Moving strip */}
        <div className="relative flex-1 overflow-hidden group h-full">
          {/* subtle top/bottom fade so edges feel soft */}
          <div className="pointer-events-none absolute inset-0">
             <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-black via-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>

          {/* glowing band behind text */}
          <div className="absolute inset-y-0 left-0 right-0 bg-transparent blur-xl pointer-events-none" />

          {/* animated track */}
          <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
            {looped.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="shrink-0 flex items-center gap-3"
              >
                {/* separator dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)] flex-shrink-0 " />

                {/* text block */}
                <div className="flex flex-col md:flex-row md:items-baseline gap-1">
                  <span className="text-xs md:text-sm font-heading text-teal-100 tracking-[0.18em] uppercase">
                    {item.title}
                  </span>
                  <span className="text-[11px] md:text-xs font-coolvetica text-slate-300/85 md:ml-3">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* scanline overlay */}
          {/* <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
            <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(15,23,42,0.2)_0,rgba(15,23,42,0.2)_50%,rgba(15,23,42,0.7)_50%,rgba(15,23,42,0.7)_100%)] bg-[length:100%_4px]" />
          </div> */}
        </div>
      </div>
      

      {/* Marquee animation */}
      <style>{`
        .marquee-track {
          animation: cgm-usecase-marquee 26s linear infinite;
        }
        .group:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes cgm-usecase-marquee {
          0% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default UseCaseBanner;
