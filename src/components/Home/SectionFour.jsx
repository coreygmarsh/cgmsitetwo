import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CGMlogo from "/images/CGMlogo.png"; // Vite public path

const SectionFour = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Softer scroll effects: keep things visible while in section
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -30]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

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
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black py-32 px-6 overflow-hidden flex items-center justify-center"
    >
      {/* Lava lamp background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-cyan-600/25 blur-[140px]"
          animate={{
            x: ["0%", "50%", "20%", "60%", "0%"],
            y: ["0%", "45%", "65%", "25%", "0%"],
            scale: [1, 1.3, 0.95, 1.15, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[650px] h-[650px] rounded-full bg-cyan-600/20 blur-[130px]"
          animate={{
            x: ["65%", "15%", "75%", "25%", "65%"],
            y: ["20%", "65%", "35%", "55%", "20%"],
            scale: [1.15, 0.9, 1.25, 1.05, 1.15],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          style={{ right: 0 }}
        />
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full bg-cyan-600/18 blur-[120px]"
          animate={{
            x: ["50%", "20%", "60%", "40%", "50%"],
            y: ["60%", "20%", "80%", "30%", "60%"],
            scale: [0.9, 1.25, 1, 1.15, 0.9],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
          style={{ left: "18%", bottom: 0 }}
        />
      </div>

      {/* Cursor follower */}
      <div
        className="pointer-events-none fixed w-[420px] h-[420px] rounded-full blur-3xl opacity-20 transition-all duration-500 ease-out z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.7) 0%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated grid (subtle) */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.35)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

      {/* Central aura + logo (behind text) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ opacity: logoOpacity, scale: logoScale }}
      >
        <div className="relative w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {/* Glow disc */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400/40 via-emerald-400/30 to-cyan-400/40 rounded-full blur-3xl" />

          {/* Soft core glow */}
          <div className="absolute inset-8 rounded-full bg-black/60 border border-teal-500/40 shadow-[0_0_60px_rgba(20,184,166,0.6)]" />

          {/* Orbiting rings */}
          <motion.div
            className="absolute inset-4 rounded-full border border-teal-400/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-10 rounded-full border border-emerald-400/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbiting dot */}
          <motion.div
            className="absolute left-1/2 top-0 w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(16,185,129,1)]"
            style={{ x: "-50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* CGM logo in the center (replaces waves, behind text) */}
          <motion.img
            src={CGMlogo}
            alt="CGM Logo"
            className="absolute inset-0 m-auto w-[90%] h-[90%] object-contain drop-shadow-[0_0_35px_rgba(20,184,166,0.2)]"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-4"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="relative max-w-4xl backdrop-blur-2xl bg-black/55 px-8 sm:px-10 md:px-14 py-8 sm:py-10 rounded-3xl border border-teal-500/25 shadow-[0_0_70px_rgba(20,184,166,0.35)]">
          {/* Soft inner wash */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/10 via-emerald-500/8 to-cyan-500/10 blur-xl" />

          <h1 className="relative text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white">
            <span className="block">
              <span className="text-emerald-300 vision drop-shadow-[0_0_40px_rgba(16,185,129,1)]">
                C
              </span>
              inematic
            </span>
            <span className="block mt-2">
              <span className="text-emerald-300 vision drop-shadow-[0_0_40px_rgba(16,185,129,1)]">
                G
              </span>
              lobal
            </span>
            <span className="block mt-2">
              <span className="text-emerald-300 vision drop-shadow-[0_0_40px_rgba(16,185,129,1)]">
                M
              </span>
              inds
            </span>
          </h1>

          {/* Tagline */}
          <p className="relative mt-6 text-center text-slate-300 font-coolvetica text-base sm:text-lg max-w-2xl mx-auto">
            A hub for{" "}
            <span className="text-teal-300">
              worldbuilding, motion, and story-driven visuals
            </span>{" "}
            — crafted like cinema, built for the digital world.
          </p>

          {/* Small accent line */}
          <div className="relative mt-8 flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-teal-400 to-teal-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
              C G M
            </span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent via-teal-400 to-teal-400" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionFour;
