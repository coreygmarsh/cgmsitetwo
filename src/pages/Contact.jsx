import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CGMShaderBackground from "../components/CGMShaderBackground.jsx";
const Contact = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // plug into your backend/email service here
  };

  return (
    <main
      id="contact"
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <CGMShaderBackground className="opacity-70" />
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-[780px] h-[780px] rounded-full bg-emerald-500/30 blur-[150px]"
          animate={{
            x: ["0%", "50%", "20%", "60%", "0%"],
            y: ["0%", "45%", "65%", "25%", "0%"],
            scale: [1, 1.35, 0.95, 1.15, 1],
          }}
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-teal-500/25 blur-[140px]"
          animate={{
            x: ["65%", "15%", "75%", "25%", "65%"],
            y: ["20%", "65%", "35%", "55%", "20%"],
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
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
          style={{ left: "16%", bottom: 0 }}
        />
      </div>

      {/* Grain + grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,118,110,0.4) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
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
        {/* Label + heading */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-emerald-300 text-xs font-coolvetica tracking-[0.35em] uppercase px-5 py-1.5 border border-emerald-400/40 rounded-full backdrop-blur-xl bg-emerald-500/10 shadow-[0_0_28px_rgba(16,185,129,0.35)]">
              Contact
            </span>
            <div className="h-px w-10 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-4">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_40px_rgba(20,184,166,0.7)]">
              Tell us about
            </span>
            <span className="block mt-2 text-white/90">
              the world you&apos;re building.
            </span>
          </h1>

          <p className="text-slate-300 font-coolvetica text-lg md:text-xl max-w-6xl leading-relaxed">
            A launch, a visual universe, a single cinematic sequence — start
            with a few details and we&apos;ll design a path forward.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          {/* Form card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-slate-950/70 border border-slate-800/70 p-7 sm:p-8 md:p-10 shadow-[0_0_55px_rgba(15,23,42,0.8)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-teal-500/8 to-cyan-500/8" />
            <form
              onSubmit={handleSubmit}
              className="relative space-y-6 font-coolvetica text-sm md:text-base"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-slate-400 mb-2 font-coolvetica">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl font-coolvetica bg-slate-950/80 border border-slate-700/70 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-slate-400 mb-2 font-heading">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/70 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60 transition-all"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-slate-400 mb-2 font-heading">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/70 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-500/60 transition-all"
                  >
                    <option value="">Choose one</option>
                    <option value="launch">Launch visuals / campaign</option>
                    <option value="worldbuilding">Worldbuilding / IP</option>
                    <option value="motion">Motion graphics / visual album</option>
                    <option value="product">Product / SaaS storytelling</option>
                    <option value="other">Other / not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-slate-400 mb-2 font-heading">
                    Budget (Approx.)
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/70 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-500/60 transition-all"
                  >
                    <option value="">Select range</option>
                    <option value="under5k">Under $5k</option>
                    <option value="5-15k">$5k – $15k</option>
                    <option value="15-30k">$15k – $30k</option>
                    <option value="30k+">$30k+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-slate-400 mb-2 font-heading">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/70 text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-500/60 transition-all"
                  >
                    <option value="">Rough timing</option>
                    <option value="urgent">ASAP / under 4 weeks</option>
                    <option value="1-3mo">1 – 3 months</option>
                    <option value="3-6mo">3 – 6 months</option>
                    <option value="flexible">Flexible / exploring</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-slate-400 mb-2 font-heading">
                  Project Story
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/70 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/60 transition-all resize-none"
                  placeholder="Tell us about the world, the launch, or the scene you want to create..."
                />
              </div>

              <motion.button
                type="submit"
                className="group relative mt-2 inline-flex items-center justify-center px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 font-heading text-sm md:text-base font-semibold text-white overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.7)]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-xl opacity-40 group-hover:opacity-90 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  <span>Send to CGM</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[130%] transition-transform duration-900 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              </motion.button>

              <p className="text-xs text-slate-500 mt-3">
                We usually respond within 1–2 business days. No spam, ever.
              </p>
            </form>
          </motion.div>

          {/* Studio info / side panel */}
          <motion.aside
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-slate-950/70 border border-emerald-500/40 p-6 md:p-7 shadow-[0_0_45px_rgba(16,185,129,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-cyan-500/12" />
              <div className="relative">
                <p className="text-xs text-emerald-200 uppercase tracking-[0.3em] mb-3 font-heading">
                  Creative Hub Signal
                </p>
                <p className="font-heading text-lg mb-2">
                  Best for concept decks, launch pipelines, and worldbuilding
                  briefs.
                </p>
                <p className="text-sm font-coolvetica text-slate-300">
                  If you&apos;re not sure where your idea lives yet; whether it&apos;s film,
                  interactive, or somewhere in-between—that&apos;s exactly what
                  this form is for.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-slate-950/70 border border-slate-800/70 p-6 md:p-7">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 via-slate-900/70 to-black" />
              <div className="relative space-y-5 text-sm font-coolvetica text-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400 mb-2 font-heading">
                    Typical Collaborations
                  </p>
                  <ul className="space-y-1.5">
                    <li>• Visual identity + motion for new IP or label</li>
                    <li>• Cinematic launch sequences for products</li>
                    <li>• 3D worlds & hero shots for campaigns</li>
                    <li>• Interactive hero sections & experience sites</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-700/60">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400 mb-2 font-heading">
                    Direct Line
                  </p>
                  <p className="text-slate-200">
                    You can also reach us at{" "}
                    <span className="text-emerald-300">
                      hello@cinematicglobalminds.com
                    </span>{" "}
                    with reels, decks, or references.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-slate-950/70 border border-cyan-500/40 p-6 md:p-7">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/14 via-teal-500/10 to-emerald-500/14" />
              <div className="relative flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full bg-black/60 border border-cyan-400/70 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,1)] animate-pulse" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-cyan-200 mb-2 font-heading">
                    Before You Hit Send
                  </p>
                  <p className="text-sm font-coolvetica text-slate-200 mb-2">
                    If you have them, it helps to include:
                  </p>
                  <ul className="text-sm font-coolvetica text-slate-300 space-y-1.5">
                    <li>• Links to any existing visuals or moodboards</li>
                    <li>• Rough launch date or key milestone</li>
                    <li>• A sentence on how you want people to feel</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
};

export default Contact;
