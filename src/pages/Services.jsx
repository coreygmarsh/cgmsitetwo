import React from "react";
import { motion } from "framer-motion";
import CGMShaderBackground from "../components/CGMShaderBackground"; // adjust path if needed
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    label: "Multimedia Editing",
    tagline: "Video, photos, and animations that feel lived-in.",
    gradient: "from-blue-500/80 via-cyan-400/80 to-emerald-400/80",
    bullets: [
      "Cinematic product & environment renders",
      "Worldbuilding for IPs, games, & film pitches",
      "Lookdev for underwater, sci-fi, and stylized worlds",
      "Lighting & camera passes tuned for edit-ready delivery",
    ],
  },
  {
    id: 2,
    label: "Motion Graphics",
    tagline: "Rhythm, timing, and design moving in sync.",
    gradient: "from-cyan-500/80 via-sky-500/80 to-blue-500/80",
    bullets: [
      "Title sequences & openers",
      "Social loops, reels, and shorts",
      "Infographics & UI motion systems",
      "Logo reveals & ident packages",
    ],
  },
  {
    id: 3,
    label: "Visual Effects",
    tagline: "Seamless energy, particles, and atmosphere.",
    gradient: "from-emerald-500/80 via-teal-500/80 to-cyan-500/80",
    bullets: [
      "Compositing & digital set extensions",
      "Energy, water, and particle simulations",
      "Screen replacements & logo insertion",
      "Stylized effects for music videos & trailers",
    ],
  },
  {
    id: 4,
    label: "Brand Identity",
    tagline: "Systems that look like your story feels.",
    gradient: "from-teal-500/80 via-emerald-500/80 to-lime-400/80",
    bullets: [
      "Logo & mark design with motion in mind",
      "Color, typography, and layout systems",
      "Launch visuals & social toolkits",
      "Story-driven brand decks & key art",
    ],
  },
  {
    id: 5,
    label: "Digital Experiences",
    tagline: "Interactive spaces that invite exploration.",
    gradient: "from-cyan-500/80 via-blue-500/80 to-slate-900/80",
    bullets: [
      "Hero animations for marketing sites",
      "Scroll-driven storytelling sections",
      "Launch minisites & asset hubs",
      "Interactive visuals for events & installations",
    ],
  },
  {
    id: 6,
    label: "Creative Consulting",
    tagline: "A single visual language from first frame to last.",
    gradient: "from-emerald-500/80 via-teal-500/80 to-cyan-400/80",
    bullets: [
      "Concept development & visual tone workshops",
      "Treatment & deck creation for pitches",
      "On-going direction for multi-episode or multi-campaign IPs",
      "Vendor & team alignment on look, pacing, and story",
    ],
  },
];

const processSteps = [
  {
    label: "01 · Discover",
    title: "Story First",
    body: "We start with the intent: who it’s for, how it feels, and where it lives. References, constraints, and wild ideas all go on the table.",
  },
  {
    label: "02 · Design",
    title: "Build the Visual Language",
    body: "Moodframes, boards, styleframes, and motion tests lock in the look before we scale out production.",
  },
  {
    label: "03 · Build",
    title: "Produce the System",
    body: "We render, animate, simulate, and refine — always keeping assets modular so they’re easy to reuse and expand.",
  },
  {
    label: "04 · Launch",
    title: "Deliver & Adapt",
    body: "We export for your channels, hand off organized source files, and help plan how the visuals evolve over time.",
  },
];

function Services() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Shader background */}
      <CGMShaderBackground className="opacity-85" />

      {/* dark overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b mask-b-from-cyan-600/80 via-black/60 to-black/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        {/* Hero */}
        <section className="mb-20 lg:mb-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-emerald-300 text-xs font-heading tracking-[0.35em] uppercase px-5 py-1.5 border border-emerald-500/40 rounded-full backdrop-blur-xl bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.45)]">
                  Services
                </span>
                <div className="w-10 h-[1px] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
              </div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_40px_rgba(16,185,129,0.8)]">
                  Services built
                </span>
                <span className="block font-wave text-white ">
                  for story-driven brands.
                </span>
              </motion.h1>

              <motion.p
                className="text-slate-200 font-coolvetica text-lg md:text-xl max-w-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                CGM is where{" "}
                <span className="text-emerald-300">3D, motion, and identity</span>{" "}
                work together. Whether you’re launching a product, a season, or a
                whole universe, we design visuals that feel cinematic and live
                comfortably online.
              </motion.p>
            </div>

            {/* Hero stats */}
            <motion.div
              className="grid grid-cols-2 gap-5 text-sm font-coolvetica min-w-[260px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="backdrop-blur-xl bg-slate-900/70 border border-teal-500/40 rounded-2xl px-5 py-4 shadow-[0_0_30px_rgba(20,184,166,0.55)]">
                <p className="text-emerald-200 text-[11px] uppercase tracking-[0.24em]">
                  Core Focus
                </p>
                <p className="text-2xl font-heading text-white mt-1">
                  6
                  <span className="text-emerald-300 text-sm ml-1">
                    disciplines
                  </span>
                </p>
              </div>
              <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-700/70 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-[11px] uppercase tracking-[0.24em]">
                  Built For
                </p>
                <p className="text-base mt-2 leading-snug text-slate-100">
                  Launches, music & film projects, SaaS, and evolving IP.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services grid */}
        <section className="mb-20 lg:mb-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            {services.map((service, idx) => (
              <motion.article
                key={service.id}
                className="relative group rounded-3xl border border-slate-800/80 bg-black/60 backdrop-blur-2xl overflow-hidden p-7 sm:p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                {/* gradient glow */}
                <div
                  className={
                    "pointer-events-none absolute -inset-1 bg-gradient-to-br " +
                    service.gradient +
                    " opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-600"
                  }
                />

                {/* top row */}
                <div className="relative flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[11px] uppercase font-heading tracking-[0.28em] text-emerald-300/80 mb-2">
                      Service 0{service.id}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight">
                      {service.label}
                    </h2>
                  </div>
                  <div
                    className={
                      "flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br " +
                      service.gradient.replace("/80", "") +
                      " flex items-center justify-center text-xs font-heading text-white shadow-[0_0_24px_rgba(16,185,129,0.8)]"
                    }
                  >
                    CGM
                  </div>
                </div>

                {/* tagline */}
                <p className="relative text-sm sm:text-base font-coolvetica text-emerald-100/80 mb-4">
                  {service.tagline}
                </p>

                {/* bullets */}
                <ul className="relative space-y-2.5 text-sm font-coolvetica text-slate-200">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex gap-2 items-start">
                      <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,1)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* footer row */}
                <div className="relative mt-6 flex items-center justify-between text-xs text-slate-400">
                  <span className="uppercase tracking-[0.26em]">
                    CGM /{" "}
                    <span className="text-emerald-300">
                      {service.label.toUpperCase()}
                    </span>
                  </span>
                  <div className="flex items-center gap-2 text-emerald-300/90 group-hover:text-emerald-200 transition-colors">
                    <span className="hidden sm:inline font-semibold">
                      Add to your pipeline
                    </span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                {/* shimmer */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-800">
                  <div className="absolute inset-0 translate-x-[-130%] group-hover:translate-x-[130%] transition-transform duration-[1300ms] bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-12" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* Process / how we work */}
        <section className="mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-[11px] font-heading uppercase tracking-[0.3em] text-emerald-300/80 mb-2">
                  How We Work
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-white">
                  A pipeline you can actually build on.
                </h2>
              </div>
              <p className="max-w-lg font-coolvetica text-sm sm:text-base text-slate-200">
                Every project moves through the same clear stages. You always
                know what we’re designing, what’s being rendered, and what’s
                ready to drop straight into your edit, site, or campaign.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {processSteps.map((step) => (
                <div
                  key={step.label}
                  className="relative rounded-2xl border border-slate-800/80 bg-black/70 backdrop-blur-xl p-5 sm:p-6"
                >
                  <div className="text-[11px] font-heading uppercase tracking-[0.28em] text-emerald-300/80 mb-3">
                    {step.label}
                  </div>
                  <h3 className="text-base sm:text-lg font-heading text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-coolvetica text-slate-300 leading-relaxed">
                    {step.body}
                  </p>
                  <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-emerald-400/80 shadow-[0_0_14px_rgba(16,185,129,1)]" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-60" />
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="pt-6 border-t border-slate-800/70">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-heading uppercase tracking-[0.3em] text-emerald-300/80 mb-3">
              Next Step
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading text-white mb-4">
              Build a visual system, not a one-off asset.
            </h3>
            <p className="max-w-xl mx-auto font-coolvetica text-slate-200 text-sm sm:text-base mb-8">
              Tell us what you’re launching — we’ll help you decide which
              services plug into your pipeline first, and how to scale your
              visuals over time.
            </p>

            {/* ✅ FIXED LINKS (React Router) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group relative px-9 py-3 rounded-full text-sm font-heading font-semibold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.9)] hover:shadow-[0_0_60px_rgba(16,185,129,1)] overflow-hidden transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Plan a project with CGM</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[140%] transition-transform duration-[1100ms] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              </Link>

              <Link
                to="/about"
                className="px-8 py-3 rounded-full text-sm font-heading font-semibold border border-emerald-500/50 text-emerald-200 bg-black/60 hover:bg-emerald-500/10 transition-all"
              >
                Learn more about CGM
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

export default Services;
