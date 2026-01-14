import React, { useMemo, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Lightweight media query hook (client-only)
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

const HeroSection = () => {
  const containerRef = useRef(null);

  // Defer heavy FX until after first paint
  const [fxOn, setFxOn] = useState(false);

  // Canvas + glow refs
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  const prefersReduced = useReducedMotion();
  const isMobileLike = useMediaQuery("(max-width: 768px), (pointer: coarse)");

  // Quality tier
  const quality = prefersReduced ? "off" : isMobileLike ? "lite" : "full";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => setFxOn(true), 150);
      return () => clearTimeout(t);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Seed bubbles once (prevents reshuffle on rerender)
  const bubbleSeeds = useRef(null);
  if (!bubbleSeeds.current) {
    bubbleSeeds.current = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 100 + Math.random() * 20,
      size: 4 + Math.random() * 8,
      dur: 8 + Math.random() * 6,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 80,
    }));
  }

  // (1) Mouse glow: keep it, but disable on mobile-like
  useEffect(() => {
    if (quality !== "full") return; // only full
    let raf = 0;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!glowRef.current) return;
        glowRef.current.style.setProperty("--mx", `${x}%`);
        glowRef.current.style.setProperty("--my", `${y}%`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [quality]);

  // Underwater caustics effect
  useEffect(() => {
    if (!fxOn) return;
    if (quality !== "full") return; // canvas is full only

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    // Quality controls
    const DPR_CAP = 1.25; // huge win on retina screens
    const FPS = 45; // cap FPS (try 30 if still heavy)
    const frameInterval = 1000 / FPS;

    let time = 0;
    let animationId = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const w = Math.floor(window.innerWidth);
      const h = Math.floor(window.innerHeight);

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const draw = (now) => {
      // FPS cap
      if (now - last < frameInterval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      last = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Fewer layers + fewer points = major CPU win
      const layers = 2;
      const numPoints = 55;

      for (let layer = 0; layer < layers; layer++) {
        ctx.beginPath();
        const amplitude = 30 + layer * 12;
        const frequency = 0.0045 - layer * 0.0009;
        const speed = 0.018 + layer * 0.01;

        for (let i = 0; i <= numPoints; i++) {
          const x = (w / numPoints) * i;
          const y =
            h * 0.32 +
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.sin(x * frequency * 2 + time * speed * 1.3) * (amplitude * 0.45) +
            Math.cos(x * frequency * 0.8 + time * speed * 0.7) * (amplitude * 0.25);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.07 - layer * 0.02;
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, `rgba(34, 211, 238, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(20, 184, 166, ${alpha * 0.7})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.25})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Fewer particles
      const particles = 5;
      for (let i = 0; i < particles; i++) {
        const x = (i * w) / particles + ((time * 18) % w);
        const y = h * 0.4 + Math.sin(time * 0.75 + i) * 90;
        const size = 2 + Math.sin(time * 1.6 + i) * 1.2;

        ctx.beginPath();
        ctx.arc(x % w, y, size, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(x % w, y, 0, x % w, y, size * 4);
        glow.addColorStop(0, "rgba(34, 211, 238, 0.25)");
        glow.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = glow;
        ctx.fill();
      }

      time += 0.015;
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    // Pause when tab hidden (big win)
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(animationId);
      else animationId = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fxOn, quality]);

  // Derived counts per quality
  const bubbleCount = quality === "full" ? 30 : quality === "lite" ? 10 : 0;
  const rayCount = quality === "full" ? 12 : quality === "lite" ? 5 : 0;

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Canvas caustics (FULL only) */}
      {fxOn && quality === "full" && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {/* Lava lamp blobs (reduce blur slightly; add willChange) */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/30 blur-[110px]"
          style={{ left: "10%", top: "10%", willChange: "transform" }}
          animate={{ x: ["-10%", "50%", "80%", "20%", "-10%"], y: ["20%", "60%", "30%", "70%", "20%"], scale: [1, 1.25, 0.95, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* <motion.div
          className="absolute w-[700px] h-[700px] rounded-full bg-cyan-600/26 blur-[120px]"
          style={{ right: "10%", top: "20%", willChange: "transform" }}
          animate={{ x: ["80%", "20%", "60%", "10%", "80%"], y: ["60%", "10%", "70%", "40%", "60%"], scale: [1.15, 0.85, 1.3, 1, 1.15] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        /> */}
        {/* <motion.div
          className="absolute w-[550px] h-[550px] rounded-full bg-indigo-600/24 blur-[105px]"
          style={{ left: "30%", bottom: "10%", willChange: "transform" }}
          animate={{ x: ["40%", "-20%", "70%", "30%", "40%"], y: ["70%", "30%", "20%", "80%", "70%"], scale: [0.95, 1.2, 1.05, 0.98, 0.95] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        /> */}
      </div>

      {/* Mouse glow: full only (lite/off use fixed center) */}
      <div
  ref={glowRef}
  className="absolute inset-0 opacity-50 pointer-events-none"
  style={{
    background:
      "radial-gradient(ellipse 800px 600px at var(--mx, 50%) var(--my, 50%), rgba(34, 211, 238, 0.3) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)",
  }}
/>


      {/* Floating bubbles (seeded, reduced on lite) */}
      {/* {fxOn && bubbleCount > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {bubbleSeeds.current.slice(0, bubbleCount).map((b) => (
            <motion.div
              key={b.id}
              className="absolute rounded-full"
              style={{
                left: `${b.left}%`,
                top: `${b.top}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                background:
                  "radial-gradient(circle, rgba(34, 211, 238, 0.55) 0%, rgba(34, 211, 238, 0.1) 70%, transparent 100%)",
                boxShadow: "0 0 16px rgba(34, 211, 238, 0.35), inset 0 0 8px rgba(255, 255, 255, 0.22)",
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
      )} */}

      {/* Light rays (reduced on lite) */}
      {fxOn && rayCount > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {Array.from({ length: rayCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-0 w-2 h-full origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(34, 211, 238, 0.35) 0%, rgba(20, 184, 166, 0.18) 30%, transparent 60%)",
                transform: `translateX(-50%) rotate(${-25 + i * (50 / Math.max(1, rayCount - 1))}deg)`,
                filter: "blur(2px)",
                willChange: "transform",
              }}
              animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.85, 1.15, 0.85] }}
              transition={{ duration: 5 + i * 0.25, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* Animated grid (disable on reduced/lite if needed) */}
      {quality === "full" && (
        <div className="absolute inset-0 opacity-8">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)] bg-[size:100px_100px]"
            animate={{ backgroundPosition: ["0px 0px", "100px 100px"], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Reflection strip (cheap enough) */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-40 opacity-30 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(34, 211, 238, 0.28) 0%, transparent 100%)" }}
        animate={{ opacity: [0.18, 0.35, 0.18] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center" style={{ y: y1, opacity, scale }}>
        <motion.div
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Disable pulsing blur on lite to reduce paint */}
          {quality === "full" && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/28 via-teal-500/28 to-green-500/28 blur-3xl -z-10"
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <motion.span
            className="block font-heading text-white mb-2"
            style={{
              textShadow: "0 0 50px rgba(34, 211, 238, 0.55), 0 0 90px rgba(34, 211, 238, 0.25), 0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <motion.span className="inline-block" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              CGM
            </motion.span>{" "}
            <motion.span className="inline-block" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              Creative
            </motion.span>
          </motion.span>

          <motion.span
            className="block text-transparent font-heading bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300"
            style={{ filter: "drop-shadow(0 0 50px rgba(59,130,246,0.75)) drop-shadow(0 0 26px rgba(6,182,212,0.55))" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Remove infinite textShadow loop on lite */}
            {quality === "full" ? (
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 60px rgba(59,130,246,0.75)",
                    "0 0 80px rgba(59,130,246,0.95)",
                    "0 0 60px rgba(59,130,246,0.75)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Solutions
              </motion.span>
            ) : (
              "Solutions"
            )}
          </motion.span>
        </motion.h1>

        {/* Subtitle: remove per-letter infinite bounce on lite/off */}
        <motion.div className="space-y-4 px-8 text-3xl font-wave tracking-widest md:text-5xl relative" style={{ y: y2 }}>
          {[
            { text: "Crafting Worlds", color: "text-green-200", shadow: "rgba(34,197,94,0.75)", delay: 0.4 },
            { text: "Building Stories", color: "text-cyan-100", shadow: "rgba(34,211,238,0.75)", delay: 0.6 },
            { text: "Empowering Vision", color: "text-teal-200", shadow: "rgba(20,184,166,0.75)", delay: 0.8 },
          ].map((item, i) => (
            <motion.p
              key={i}
              className={`${item.color} relative block`}
              style={{ textShadow: `0 0 34px ${item.shadow}, 0 0 16px ${item.shadow}` }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: item.delay }}
            >
              {quality === "full"
                ? item.text.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      className="inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: [0, -3, 0] }}
                      transition={{
                        opacity: { duration: 0.3, delay: item.delay + j * 0.03 },
                        y: { duration: 2, delay: item.delay + j * 0.1, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))
                : item.text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
      </motion.div>

      {/* Grain texture: keep (cheap), but consider swapping to CSS noise later */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;