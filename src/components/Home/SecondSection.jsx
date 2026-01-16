import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const SecondSection = () => {
  const sectionRef = useRef(null);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Parallax for content
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const services = [
    {
      id: 1,
      title: "Multimedia Editing",
      desc: "Editing videos, photos, and animations to fit your vision.",
      gradient: "from-blue-500 to-cyan-500",
      tags: ["Worldbuilding", "Cinematics"],
    },
    {
      id: 2,
      title: "Motion Graphics",
      desc: "Dynamic animations that captivate and guide the eye.",
      gradient: "from-cyan-500 to-sky-500",
      tags: ["Openers", "Social Loops"],
    },
    {
      id: 3,
      title: "Visual Effects",
      desc: "Seamless compositing, particles, and atmospheric effects.",
      gradient: "from-sky-500 to-blue-500",
      tags: ["Compositing", "Simulation"],
    },
    {
      id: 4,
      title: "Brand Identity",
      desc: "Distinctive systems that look and feel like your story.",
      gradient: "from-indigo-500 to-cyan-500",
      tags: ["Logos", "Systems"],
    },
    {
      id: 5,
      title: "Digital Experiences",
      desc: "Interactive web & installations that invite exploration.",
      gradient: "from-cyan-500 to-teal-500",
      tags: ["Web", "Interactive"],
    },
    {
      id: 6,
      title: "Creative Direction",
      desc: "Guiding the vision from first spark to final frame.",
      gradient: "from-teal-500 to-cyan-500",
      tags: ["Strategy", "Story Arcs"],
    },
  ];

  // Mouse glow
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     setMousePosition({
  //       x: (e.clientX / window.innerWidth) * 100,
  //       y: (e.clientY / window.innerHeight) * 100,
  //     });
  //   };
  //   window.addEventListener("mousemove", handleMouseMove, { passive: true });
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black py-28 px-6 overflow-hidden"
    >
      {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.35)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>
      {/* Lava lamp blobs (kept) */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-teal-600/35 blur-[120px]"
          animate={{
            x: ["-10%", "50%", "80%", "20%", "-10%"],
            y: ["20%", "60%", "30%", "70%", "20%"],
            scale: [1, 1.3, 0.9, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "10%", top: "10%" }}
        />

        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-cyan-600/30 blur-[130px]"
          animate={{
            x: ["80%", "20%", "60%", "10%", "80%"],
            y: ["60%", "10%", "70%", "40%", "60%"],
            scale: [1.2, 0.8, 1.4, 1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{ right: "10%", top: "20%" }}
        />

        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full bg-green-600/28 blur-[110px]"
          animate={{
            x: ["40%", "-20%", "70%", "30%", "40%"],
            y: ["70%", "30%", "20%", "80%", "70%"],
            scale: [0.9, 1.3, 1.1, 0.95, 0.9],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          style={{ left: "30%", bottom: "10%" }}
        />

        <motion.div
          className="absolute w-[650px] h-[650px] rounded-full bg-teal-600/22 blur-[120px]"
          animate={{
            x: ["60%", "10%", "50%", "80%", "60%"],
            y: ["10%", "50%", "80%", "20%", "10%"],
            scale: [1.1, 0.85, 1.25, 1, 1.1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 9,
          }}
          style={{ right: "20%", bottom: "15%" }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-teal-500/28 blur-[100px]"
          animate={{
            x: ["20%", "70%", "30%", "60%", "20%"],
            y: ["40%", "20%", "65%", "35%", "40%"],
            scale: [1, 1.2, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 12,
          }}
          style={{ left: "25%", top: "30%" }}
        />
      </div>

      {/* Mouse-reactive glow */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(ellipse 800px 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.28) 0%, rgba(20, 184, 166, 0.10) 50%, transparent 70%)`,
        }}
      />

      {/* Light rays (kept) */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-0 w-2 h-full origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(34, 211, 238, 0.35) 0%, rgba(20, 184, 166, 0.18) 30%, transparent 60%)",
              transform: `translateX(-50%) rotate(${-30 + i * 5}deg)`,
              filter: "blur(2px)",
            }}
            animate={{
              opacity: [0.18, 0.5, 0.18],
              scaleY: [0.85, 1.15, 0.85],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div> */}

      {/* Top reflection */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-40 opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(34, 211, 238, 0.25) 0%, transparent 100%)",
        }}
        animate={{ opacity: [0.18, 0.4, 0.18] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered Header */}
        <motion.div
          className="flex flex-col items-center justify-center gap-8 mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-cyan-300 text-xs font-heading tracking-[0.35em] uppercase px-5 py-1.5 border border-cyan-500/30 rounded-full backdrop-blur-xl bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Capabilities
              </span>
              <div className="w-8 h-[1px] bg-gradient-to-r from-cyan-400 to-blue-400" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <motion.span
                className="block text-transparent font-heading bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(59,130,246,0.6))",
                }}
              >
                From concept
              </motion.span>
              <span
                className="block text-white font-wave mt-2"
                style={{
                  textShadow: "0 0 50px rgba(59, 130, 246, 0.3)",
                }}
              >
                to frame-perfect reality.
              </span>
            </h2>

            <p className="text-slate-200 font-coolvetica text-lg md:text-xl max-w-2xl mx-auto">
              Every service is another lens we use to build worlds, guide emotion,
              and keep your story cohesive across every platform.
            </p>
          </div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Outer glow */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700`}
              />

              {/* Card */}
              <div className="relative h-full backdrop-blur-xl bg-slate-900/60 border border-slate-800/70 rounded-2xl p-7 transition-all duration-500 group-hover:bg-slate-900/80 group-hover:border-teal-500/60 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                {/* Badge / index */}
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700/80 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(6,182,212,0.8)",
                          "0 0 20px rgba(6,182,212,1)",
                          "0 0 10px rgba(6,182,212,0.8)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Service {service.id}
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-xs font-heading text-white shadow-[0_0_24px_rgba(6,182,212,0.7)]`}
                  >
                    CGM
                  </div>
                </div>

                {/* Animated background wash */}
                <motion.div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                  animate={
                    hoveredCard === service.id
                      ? { opacity: [0.05, 0.15, 0.1] }
                      : {}
                  }
                  transition={{
                    duration: 2.4,
                    repeat: hoveredCard === service.id ? Infinity : 0,
                  }}
                />

                <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-500">
                  {service.title}
                </h3>

                <p className="text-slate-300 font-coolvetica text-sm md:text-base leading-relaxed mb-4 group-hover:text-slate-100 transition-colors duration-500">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] uppercase tracking-[0.2em] text-slate-400 group-hover:border-cyan-500/50 group-hover:text-cyan-200 transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 translate-x-[-140%] group-hover:translate-x-[160%] transition-transform duration-[1600ms] bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div style={{ y: ctaY }} className="text-center mt-20">
          <Link to="/contact" className="inline-block">
            <motion.button
              type="button"
              className="group relative px-11 py-4 bg-gradient-to-r from-green-500 via-cyan-900 to-sky-500 rounded-full font-bold text-lg md:text-xl text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(59,130,246,0.8)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-cyan-900 to-teal-500 rounded-full blur-xl opacity-40 group-hover:opacity-90 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3 justify-center font-heading">
                <span>Design a pipeline for your launch</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
              <div className="absolute inset-0 translate-x-[-120%] group-hover:translate-x-[140%] transition-transform duration-[1100ms] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SecondSection;
