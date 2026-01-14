// src/components/motion/presets.js
import { cubicBezier } from "framer-motion";

export const easeOutSoft = cubicBezier(0.22, 1, 0.36, 1);

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const transition = {
  duration: 0.55,
  ease: easeOutSoft,
};
