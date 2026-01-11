import React, { useMemo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SectionThree = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: "INSPIRE",
      description: "Push the boundaries of traditional design.",
      gradient: "from-green-500/60 via-green-400/50 to-emerald-600/60",
    },
    {
      id: 2,
      title: "TRANSFORM",
      description: "Transcend the ordinary and introduce innovation.",
      gradient: "from-cyan-500/60 via-teal-400/50 to-cyan-600/60",
    },
    {
      id: 3,
      title: "AMPLIFY",
      description: "Challenge conventions and redefine boundaries.",
      gradient: "from-cyan-600/60 via-blue-700/50 to-blue-800/60",
    },
    {
      id: 4,
      title: "ILLUMINATE",
      description: "Engage with spaces designed to captivate and envelop.",
      gradient: "from-green-200/60 via-emerald-700/50 to-teal-900/60",
    },
  ];

  // Seed bubbles once (no rerender reshuffle)
  const bubbles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 100 + Math.random() * 20,
      size: 4 + Math.random() * 7,
      dur: 9 + Math.random() * 5,
      delay: Math.random() * 4,
      drift: (Math.random() - 0.5) * 70,
    }));
  }, []);

  // Optimized caustics canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Perf knobs
    const DPR_CAP = 1.25; // big win on retina
    const FPS = 35; // try 30 if you want even lighter
    const frameInterval = 1000 / FPS;

    let time = 0;
    let rafId = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const w = Math.floor(window.innerWidth);
      const h = Math.floor(window.innerHeight);

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // draw in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const draw = (now) => {
      // FPS cap
      if (now - last < frameInterval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // fewer layers + fewer points
      const layers = 2;
      const numPoints = 60;

      for (let layer = 0; layer < layers; layer++) {
        ctx.beginPath();

        const amplitude = 30 + layer * 12;
        const frequency = 0.0045 - layer * 0.0008;
        const speed = 0.018 + layer * 0.01;

        for (let i = 0; i <= numPoints; i++) {
          const x = (w / numPoints) * i;
          const y =
            h * 0.3 +
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.sin(x * frequency * 2 + time * speed * 1.3) *
              (amplitude * 0.45);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.065 - layer * 0.02;
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha * 0.7})`);
        gradient.addColorStop(1, `rgba(14, 165, 233, ${alpha * 0.3})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time += 0.015;
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    // Pause on hidden tab
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black py-32 px-6 overflow-hidden">
      {/* Caustics canvas (optimized) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.35)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

      {/* Underwater blobs (slightly reduced blur + willChange) */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full bg-blue-600/28 blur-[140px]"
          style={{ willChange: "transform" }}
          animate={{
            x: ["0%", "60%", "30%", "70%", "0%"],
            y: ["0%", "50%", "70%", "20%", "0%"],
            scale: [1, 1.35, 0.95, 1.2, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-cyan-600/22 blur-[130px]"
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
          className="absolute w-[600px] h-[600px] rounded-full bg-sky-600/18 blur-[120px]"
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

      {/* Floating bubbles (seeded) */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.55) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 100%)",
              boxShadow:
                "0 0 16px rgba(59, 130, 246, 0.35), inset 0 0 8px rgba(255,255,255,0.22)",
              willChange: "transform",
            }}
            animate={{
              y: [0, -1200],
              x: [0, b.drift, 0],
              opacity: [0, 0.75, 0.75, 0],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated grid (optional: keep full only if you want) */}
      <div className="absolute inset-0 opacity-8">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.12)_1px,transparent_1px)] bg-[size:100px_100px]"
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-emerald-300 text-xs font-heading tracking-[0.4em] uppercase px-8 py-3 border border-cyan-500/40 rounded-full backdrop-blur-xl bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              Our Philosophy
            </span>
          </div>

          <h2 className="text-7xl md:text-8xl font-black mb-6 leading-none">
            <span className="bg-clip-text font-heading text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-emerald-300 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">
              What Drives Us
            </span>
          </h2>

          <p className="text-slate-200 text-xl font-coolvetica max-w-3xl mx-auto">
            Four pillars that define our approach to creating exceptional digital
            experiences.
          </p>
        </div>

        {/* Four Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative aspect-[3/4] cursor-pointer"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Outer glow */}
              <div
                className={`absolute -inset-1 bg-gradient-to-b ${card.gradient} rounded-3xl opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-700`}
              />

              {/* Card container */}
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-slate-900/20 group-hover:border-white/20 transition-all duration-700 group-hover:scale-[1.02]">
                {/* Blurred bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-70 group-hover:opacity-90 transition-opacity duration-700`}
                  style={{ filter: "blur(56px)" }}
                />

                {/* Shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none">
                  <div className="absolute inset-0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1500 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-20">
                  {/* Circle decoration */}
                  <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-700 group-hover:scale-125 group-hover:rotate-90">
                    <div className="absolute inset-2 rounded-full border border-white/10 group-hover:border-white/30 transition-all duration-700" />
                  </div>

                  {/* Card number */}
                  <div className="absolute top-2 left-8 text-8xl font-black font-fancy text-white/10 group-hover:text-white/20 transition-colors duration-700">
                    0{card.id}
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-7xl font-wave font-bold text-white tracking-wide leading-tight group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
                      {card.title}
                    </h3>

                    <p className="text-white/90 text-lg font-coolvetica leading-relaxed max-w-xs mx-auto group-hover:text-white transition-colors duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                      {card.description}
                    </p>

                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="inline-flex items-center gap-2 text-white">
                        <span className="text-sm font-mono font-heading tracking-wider uppercase">
                          Learn More
                        </span>
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom dots */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors duration-500" />
                    <div
                      className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors duration-500"
                      style={{ transitionDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors duration-500"
                      style={{ transitionDelay: "0.2s" }}
                    />
                  </div>
                </div>

                {/* Ripple effect */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    hoveredCard === card.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 animate-ripple">
                    <div className="absolute inset-0 rounded-3xl border-2 border-white/20 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-cyan-400/50" />
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1)] animate-pulse" />
            <div
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,1)] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1)] animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-emerald-400/50" />
        </div>
      </div>

      {/* Ripple keyframes */}
      <style>{`
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-ripple { animation: ripple 2s ease-out infinite; }
      `}</style>
    </section>
  );
};

export default SectionThree;
