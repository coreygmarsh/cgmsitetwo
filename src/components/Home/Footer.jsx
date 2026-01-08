import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-slate-300 px-6 py-10 sm:py-12">
      {/* Lava / glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/25 blur-[120px]"
          animate={{
            x: ["0%", "40%", "10%", "50%", "0%"],
            y: ["0%", "30%", "60%", "20%", "0%"],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-teal-500/20 blur-[110px]"
          animate={{
            x: ["70%", "30%", "80%", "40%", "70%"],
            y: ["60%", "20%", "70%", "30%", "60%"],
            scale: [1.1, 0.9, 1.2, 1, 1.1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{ right: 0, bottom: 0 }}
        />
      </div>

      {/* Faint grid overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.25)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top mini divider (echo of SectionFive decoration) */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-teal-400 to-teal-400" />
          <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,1)] animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-teal-400 to-teal-400" />
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand / tagline */}
          <div className="max-w-sm">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              <span className="bg-clip-text font-heading text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-[0_0_30px_rgba(20,184,166,0.7)]">
                Cinematic Global Minds
              </span>
            </h3>
            <p className="text-sm sm:text-base text-slate-400 font-coolvetica leading-relaxed">
              Crafting immersive visuals, stories, and experiences that feel
              like they live <span className="text-teal-300">between worlds</span> — underwater, in
              the clouds, and through your vision.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:items-end gap-4 text-sm sm:text-base">
            <div className="flex flex-wrap justify-center font-wave sm:justify-end gap-4 sm:gap-6">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </div>

            {/* Social row */}
            <div className="flex font-coolvetica items-center justify-center sm:justify-end gap-3 mt-2">
              <FooterPill>@cgmcreative</FooterPill>
              <FooterDot color="from-cyan-400 via-teal-400 to-emerald-400" />
              <FooterDot color="from-emerald-400 via-teal-300 to-cyan-400" />
              <FooterDot color="from-teal-400 via-cyan-300 to-sky-400" />
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-4 border-t font-heading border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Cinematic Global Minds. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span className="text-teal-300">●</span>
            Designed in motion & light.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="relative text-slate-300 hover:text-teal-300 transition-colors"
    whileHover={{ y: -2 }}
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-0 h-px bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 group-hover:w-full transition-all duration-300" />
  </motion.a>
);

const FooterPill = ({ children }) => (
  <div className="px-3 py-1 rounded-full bg-slate-900/70 border border-teal-500/40 text-xs sm:text-sm text-teal-200 shadow-[0_0_20px_rgba(20,184,166,0.4)]">
    {children}
  </div>
);

const FooterDot = ({ color }) => (
  <div
    className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${color} shadow-[0_0_18px_rgba(20,184,166,0.9)]`}
  />
);

export default Footer;
