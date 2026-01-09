import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CGMShaderBackground from "../components/CGMShaderBackground.jsx";
const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <CGMShaderBackground className="opacity-70" />
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.46]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.35)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-emerald-500/30 blur-[150px]"
          animate={{
            x: ["0%", "60%", "30%", "70%", "0%"],
            y: ["0%", "50%", "70%", "20%", "0%"],
            scale: [1, 1.35, 0.95, 1.15, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-teal-500/25 blur-[140px]"
          animate={{
            x: ["70%", "10%", "80%", "20%", "70%"],
            y: ["20%", "70%", "30%", "60%", "20%"],
            scale: [1.15, 0.85, 1.25, 1.05, 1.15],
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          style={{ right: 0 }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[130px]"
          animate={{
            x: ["50%", "20%", "60%", "40%", "50%"],
            y: ["60%", "20%", "80%", "30%", "60%"],
            scale: [0.9, 1.25, 1, 1.15, 0.9],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
          style={{ left: "15%", bottom: 0 }}
        />
      </div>

      {/* Grain + grid texture */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,118,110,0.4) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
        
        {/* animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.09]"
          animate={{ backgroundPosition: ["0px 0px", "120px 120px"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,184,166,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.25) 1px, transparent 1px)",
            backgroundSize: "110px 110px",
          }}
        />
      </div>
       {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.35)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

      {/* Mouse glow */}
      <div
        className="pointer-events-none fixed w-[480px] h-[480px] rounded-full blur-3xl opacity-25 transition-all duration-500 ease-out -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.6) 0%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-6xl lg:max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-28 relative z-10">
        {/* Top label */}
        <motion.div
          className="inline-flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-emerald-300 text-xs font-heading tracking-[0.35em] uppercase px-5 py-1.5 border border-emerald-400/40 rounded-full backdrop-blur-xl bg-emerald-500/10 shadow-[0_0_28px_rgba(16,185,129,0.35)]">
           Profile
          </span>
          <div className="h-px w-10 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300" />
        </motion.div>

        {/* Hero row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center mb-20">
          {/* Left: main copy */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_40px_rgba(20,184,166,0.7)]">
                We design
                <br className="hidden sm:block" /> cinematic systems
              </span>
              <span className="block mt-3 text-white/90 tracking-wide font-bold font-wave">
                for stories that <span className="text-green-300">live</span> everywhere.
              </span>
            </h1>

            <p className="text-slate-300 font-coolvetica text-lg md:text-xl max-w-xl leading-relaxed">
              Cinematic Global Minds is a hybrid creative hub focused on{" "}
              <span className="text-teal-300">
                worldbuilding, motion, and story-driven visuals
              </span>
              . We treat every project like a universe: cohesive across frames,
              platforms, and moments.
            </p>
          </motion.div>

          {/* Right: stats panel */}
          <motion.div
            className="w-full lg:w-[320px] xl:w-[360px] space-y-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-emerald-400/40 shadow-[0_0_45px_rgba(16,185,129,0.45)] p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <p className="text-emerald-200 text-xs uppercase tracking-[0.28em] mb-2 font-heading">
                    Core Focus
                  </p>
                  <p className="text-lg font-heading">
                    Visual storytelling for launches, worlds & brands.
                  </p>
                </div>
                {/* <div className="text-right">
                  <p className="text-3xl font-heading text-emerald-300">
                    3
                  </p>
                  <p className="text-xs text-slate-400 uppercase tracking-[0.24em]">
                    Pillars
                  </p>
                </div> */}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-slate-900/50 border border-slate-700/60 p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-900/60" />
              <div className="relative space-y-3">
                <p className="text-slate-400 text-xs uppercase tracking-[0.26em] font-heading">
                  Built For
                </p>
                <ul className="text-sm font-coolvetica text-slate-200 space-y-1.5">
                  <li>• Founders launching IPs & products</li>
                  <li>• Artists shaping visual albums & worlds</li>
                  <li>• Teams needing cohesive motion systems</li>
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-cyan-500/40 p-5">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-emerald-500/10" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs text-cyan-200 uppercase tracking-[0.26em] mb-1 font-heading">
                    Modality
                  </p>
                  <p className="text-sm text-slate-100">
                    Graphic • Motion • Interactive 3D
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,1)] animate-pulse" />
                  <div
                    className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_14px_rgba(20,184,166,1)] animate-pulse"
                    style={{ animationDelay: "0.35s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,1)] animate-pulse"
                    style={{ animationDelay: "0.7s" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle row: Approach + Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-20">
          {/* Our Approach */}
          <motion.div
            className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-slate-950/70 border border-slate-800/70 p-8 md:p-10 shadow-[0_0_55px_rgba(15,23,42,0.8)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-teal-500/8 to-cyan-500/8" />
            <div className="relative">
              <p className="text-emerald-200 text-xs uppercase tracking-[0.3em] mb-4 font-heading">
                Our Approach
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
                Build the world and brand language first,
                <span className="text-emerald-300"> then every frame.</span>
              </h2>

              <div className="space-y-5 text-sm md:text-base font-coolvetica text-slate-200">
                <div className="flex gap-4">
                  <div className="mt-1 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(16,185,129,1)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50">
                      Worldbuilding over one-off visuals
                    </p>
                    <p className="text-slate-300">
                      We look at your project as a universe: rules, tone,
                      motifs, and emotional arcs that stay consistent whether
                      it&apos;s one shot or one hundred.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-7 h-7 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-teal-300 shadow-[0_0_16px_rgba(20,184,166,1)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50">
                      Design like cinema, ship like product
                    </p>
                    <p className="text-slate-300">
                      We combine cinematic language—composition, pacing,
                      lighting—with the clarity of product design: clear
                      outcomes, clear flows, scalable assets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,1)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50">
                      Collaboration as a creative engine
                    </p>
                    <p className="text-slate-300">
                      You bring your vision. We bring structure, motion, and
                      visual language that lets that vision scale into a living
                      ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* How we work */}
          <motion.div
            className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-slate-950/70 border border-slate-800/70 p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 via-slate-900/70 to-black/80" />
            <div className="relative">
              <p className="text-cyan-200 text-xs uppercase tracking-[0.3em] mb-4 font-heading">
                How We Work
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
                A clear pipeline,
                <span className="text-cyan-300"> tuned for creatives.</span>
              </h2>

              <ol className="space-y-6 text-sm md:text-base font-coolvetica text-slate-200">
                <li className="flex gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-cyan-400/70 flex items-center justify-center text-xs font-semibold">
                      01
                    </div>
                    <div className="w-px flex-1 bg-gradient-to-b from-cyan-500/60 to-transparent mt-1" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50 mb-1">
                      Discovery & world scan
                    </p>
                    <p className="text-slate-300">
                      We map your current visuals, references, and goals into a
                      living &quot;world file&quot;—color, motion, voice, and
                      narrative anchors.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-emerald-400/70 flex items-center justify-center text-xs font-semibold">
                      02
                    </div>
                    <div className="w-px flex-1 bg-gradient-to-b from-emerald-500/60 to-transparent mt-1" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50 mb-1">
                      Visual & motion language
                    </p>
                    <p className="text-slate-300">
                      We define how your universe moves—transitions, rhythm,
                      typography motion, 3D vs 2D balance, and interaction
                      cues.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-teal-400/70 flex items-center justify-center text-xs font-semibold">
                      03
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-50 mb-1">
                      Production & handoff
                    </p>
                    <p className="text-slate-300">
                      We build launch-ready assets—animations, renders, design
                      systems, and implementation guides that plug into your
                      existing stack.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          {[
            {
              label: "Clarity",
              desc: "Every frame builds a language.",
            },
            {
              label: "Depth",
              desc: "Surface-level aesthetics are not enough. We build quality with meaning and details consistent with your message.",
            },
            {
              label: "Continuity",
              desc: "Your story feels connected—launch to launch without sufficient gaps.",
            },
          ].map((value, i) => (
            <div
              key={value.label}
              className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800/70 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-950/50" />
              <div className="relative flex items-start gap-4">
                <div className="mt-1 w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-400/60 flex items-center justify-center text-xs font-heading">
                  0{i + 1}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-emerald-200 font-heading mb-2">
                    {value.label}
                  </p>
                  <p className="text-sm font-coolvetica text-slate-300">
                    {value.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default About;
