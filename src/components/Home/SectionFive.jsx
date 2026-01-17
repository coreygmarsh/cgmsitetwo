import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CGMShaderBackground from "../CGMShaderBackground.jsx";

const MotionLink = motion(Link);

const SectionFive = () => {
  const [fxOn, setFxOn] = useState(false);
  const [email, setEmail] = useState("");

  // Defer heavy visuals until after first paint
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => setFxOn(true), 150);
      return () => clearTimeout(t);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <section className="relative min-h-screen bg-black py-32 px-6 overflow-hidden flex items-center justify-center">
      {/* Shader: defer (big win) */}
      {fxOn && <CGMShaderBackground className="opacity-30" />}

      {/* Lava lamp background (defer + cheaper blur + willChange) */}
      {fxOn && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-cyan-600/26 blur-[140px]"
            style={{ willChange: "transform" }}
            animate={{
              x: ["0%", "60%", "30%", "70%", "0%"],
              y: ["0%", "50%", "70%", "20%", "0%"],
              scale: [1, 1.35, 0.95, 1.2, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full bg-teal-600/22 blur-[130px]"
            style={{ right: 0, willChange: "transform" }}
            animate={{
              x: ["70%", "10%", "80%", "20%", "70%"],
              y: ["20%", "70%", "30%", "60%", "20%"],
              scale: [1.15, 0.88, 1.25, 1, 1.15],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-green-600/18 blur-[120px]"
            style={{ left: "20%", bottom: 0, willChange: "transform" }}
            animate={{
              x: ["50%", "20%", "60%", "40%", "50%"],
              y: ["60%", "20%", "80%", "30%", "60%"],
              scale: [0.95, 1.25, 1, 1.15, 0.95],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 8,
            }}
          />
        </div>
      )}

      {/* Static ambient glow (NO mouse-follow, no fixed positioning) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(20,184,166,0.45) 0%, rgba(20,184,166,0.12) 35%, transparent 70%)",
        }}
      />

      {/* Animated grid (static; cheap) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.3)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

     

      {/* Content */}
       <div className="bg-black h-full w-full">
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Top decoration */}
        <div className="bg-gradient-to-r from-transparent via-black/30 to-black/80 border-2 shadow-2xl shadow-emerald-900 border-teal-600 h-full w-full py-8 px-6 rounded-lg">
        <motion.div
          className="flex items-center justify-center gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-400 to-teal-400" />
          <div className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,1)] animate-pulse" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent via-teal-400 to-teal-400" />
        </motion.div>
            
        {/* Main heading */}
        <motion.h2
          className="text-6xl sm:text-7xl font-wave md:text-8xl lg:text-9xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 drop-shadow-[0_0_60px_rgba(20,184,166,0.6)]">
            CGM Creatives
          </span>
          <span className="block text-white font-coolvetica text-4xl italic tracking-wide drop-shadow-[0_0_80px_rgba(255,255,255,0.2)] mt-4">
            Backed by metrics
          </span>
          {/* <span className="block relative inline-block mt-4">
            <span className="text-emerald-300 drop-shadow-[0_0_80px_rgba(16,185,129,1)]">
              brand?
            </span>
            <div className="absolute -inset-4 bg-emerald-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
          </span> */}
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-slate-300 text-xl font-coolvetica sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Let&apos;s create something extraordinary together.
          <span className="text-teal-300">
            {" "}
            Get started with a free consultation.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MotionLink
            to="/contact"
            className="group relative inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 rounded-full font-bold text-2xl text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(20,184,166,1)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 text-2xl font-coolvetica tracking-wide flex items-center gap-3">
              <span>Let&apos;s Talk</span>
            </span>
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ scale: [1, 1.2, 1.2], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </MotionLink>

          <MotionLink
            to="https://www.coreygmarsh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-6 py-4 backdrop-blur-xl bg-white/5 border-2 border-teal-500/50 rounded-full font-bold text-2xl text-white overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-teal-400 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 font-coolvetica flex items-center gap-3">
              <span className="text-teal-300 group-hover:text-teal-200 transition-colors">
                View Portfolio
              </span>
              <svg
                className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </MotionLink>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,1)] animate-pulse" />
          <div
            className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,1)] animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"
            style={{ animationDelay: "0.6s" }}
          />
        </motion.div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default SectionFive;
