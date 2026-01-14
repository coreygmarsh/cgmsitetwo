// Preloader.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader (no backend)
 * - Shows an overlay while the page is loading
 * - Guarantees a minimum visible time (prevents quick flash)
 * - Smooth progress animation (simulated, then snaps to 100% when ready)
 *
 * Props:
 * - minDurationMs: minimum time to show the loader
 * - onDone: callback fired once loader fully exits
 * - title: big text
 * - subtitle: small text
 */
export default function Preloader({
  minDurationMs = 9000,
  onDone,
  title = "CGM CREATIVE",
  subtitle = "Loading experience…",
}) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const startedAtRef = useRef(performance.now());
  const doneRef = useRef(false);

  // Smooth simulated progress up to ~92%
  useEffect(() => {
    if (!visible) return;

    let raf = 0;
    const tick = () => {
      setProgress((p) => {
        if (doneRef.current) return p;
        // ease towards 92%
        const target = 92;
        const next = p + (target - p) * 0.03 + 0.08; // slow drift
        return Math.min(next, target);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  // Finish when window load fires (images/css/fonts complete)
  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;

      const elapsed = performance.now() - startedAtRef.current;
      const remaining = Math.max(0, minDurationMs - elapsed);

      // Snap to 100%, then fade out shortly after
      setProgress(100);

      window.setTimeout(() => {
        setVisible(false);
      }, remaining + 250);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => window.removeEventListener("load", finish);
  }, [minDurationMs]);

  // Notify parent after exit
  useEffect(() => {
    if (!visible && typeof onDone === "function") onDone();
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* Ambient background (cheap, no mouse follow) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-cyan-500/15 blur-[140px]" />
            <div className="absolute -bottom-56 left-1/3 w-[900px] h-[900px] rounded-full bg-emerald-500/10 blur-[160px]" />
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.35)_1px,transparent_1px)] bg-[size:120px_120px]" />
            </div>
          </div>

          <div className="relative w-full max-w-md px-8 text-center">
            <motion.div
              className="mx-auto mb-8 w-14 h-14 rounded-2xl border border-cyan-400/30 bg-white/5 backdrop-blur-md grid place-items-center shadow-[0_0_40px_rgba(34,211,238,0.25)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="w-6 h-6 rounded-full border-2 border-cyan-300/60 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl font-bold font-cinzel text-white mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-slate-300 mb-8 font-coolvetica"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              {subtitle}
            </motion.p>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400"
                style={{ width: `${progress}%` }}
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              />
            </div>

            <div className="mt-3 text-xs tracking-[0.3em] text-cyan-200/70">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
