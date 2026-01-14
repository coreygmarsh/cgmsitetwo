// src/components/motion/Reveal.jsx
import { motion } from "framer-motion";
import { fadeUp, transition } from "./presets";

export default function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}
