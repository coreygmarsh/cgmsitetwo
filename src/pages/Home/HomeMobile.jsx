// src/pages/Home/HomeMobile.jsx
import { motion } from "framer-motion";
import Reveal from "../../components/motion/Reveal";
import { fadeIn, transition } from "../../components/motion/presets";

const work = [
  { title: "Featured Edit 01", tag: "Video Editing" },
  { title: "Featured Design 02", tag: "Graphic Design" },
  { title: "Featured Social 03", tag: "Social + Strategy" },
];

export default function HomeMobile() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      {/* Hero */}
      <section className="relative px-5 pt-10 pb-8 overflow-hidden">
        {/* simple glow (cheap) */}
        <motion.div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/20 blur-[70px]"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={transition}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/15 blur-[80px]"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ ...transition, delay: 0.15 }}
        />

        <Reveal>
          <p className="text-xs tracking-[0.25em] uppercase text-slate-400">
            CGM Creative
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight">
            Corey G. Marsh
          </h1>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Story-first video, design, and social media—built with precision and
            clean visuals.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm bg-white text-black"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm border border-white/20 text-slate-100"
            >
              Contact
            </a>
          </div>
        </Reveal>
      </section>

      {/* Work */}
      <section id="work" className="px-5 py-8">
        <Reveal>
          <h2 className="text-lg font-semibold">Featured</h2>
          <p className="mt-1 text-sm text-slate-400">
            A quick snapshot—tap to explore on desktop for the full experience.
          </p>
        </Reveal>

        <div className="mt-5 grid gap-3">
          {work.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <button
                className="w-full text-left rounded-2xl border border-white/10 bg-white/5 p-4 active:scale-[0.99] transition"
                onClick={() => {}}
              >
                <div className="text-sm text-slate-400">{item.tag}</div>
                <div className="mt-1 text-base font-medium">{item.title}</div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-5 py-8 border-t border-white/10">
        <Reveal>
          <h2 className="text-lg font-semibold">What I do</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Video editing + motion polish</li>
            <li>• Social content systems</li>
            <li>• Clean graphics + branding</li>
          </ul>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="px-5 py-10 border-t border-white/10">
        <Reveal>
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-slate-400">
            Want the full interactive experience? Check on desktop — but you can
            reach me anytime:
          </p>

          <div className="mt-5 grid gap-3">
            <a
              className="rounded-2xl bg-white text-black px-4 py-3 text-sm text-center"
              href="mailto:hello@yourdomain.com"
            >
              Email me
            </a>

            <a
              className="rounded-2xl border border-white/15 px-4 py-3 text-sm text-center"
              href="#"
            >
              LinkedIn
            </a>
          </div>

          <p className="mt-8 text-xs text-slate-500">
            © {new Date().getFullYear()} Corey G. Marsh
          </p>
        </Reveal>
      </section>
    </main>
  );
}
