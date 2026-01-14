import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  { title: "Video Editing", desc: "Story-first cuts with clean pacing and polish.", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
  { title: "Social Content", desc: "Systems + content that stay consistent and scalable.", icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
  { title: "Design", desc: "Clean graphics and branding that hold the vibe.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
];

const values = [
  { title: "Story-First", desc: "Narrative at the center — always.", color: "from-cyan-400 to-blue-400" },
  { title: "Precision", desc: "Intentional choices, frame-by-frame.", color: "from-blue-400 to-indigo-400" },
  { title: "Consistency", desc: "Systems and standards, not one-offs.", color: "from-indigo-400 to-cyan-400" },
];

export default function HomeMobile() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white text-center selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px]"
          animate={{
            x: ['-20%', '40%', '60%', '10%', '-20%'],
            y: ['10%', '50%', '20%', '60%', '10%'],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-cyan-600/15 blur-[90px]"
          animate={{
            x: ['80%', '20%', '70%', '30%', '80%'],
            y: ['60%', '20%', '70%', '40%', '60%'],
            scale: [1.1, 0.8, 1.2, 1, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ right: 0 }}
        />
      </div>

      {/* Cursor glow */}
      <div
        className="fixed w-[300px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* HERO */}
      <section className="relative px-5 pt-16 pb-12 overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-[420px] relative z-10"
        >
          <motion.p 
            className="text-[11px] tracking-[0.28em] uppercase text-cyan-300/70 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            CGM Creative
          </motion.p>

          <motion.h1 
            className="mt-3 font-heading text-[40px] leading-[1.05] font-semibold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              textShadow: '0 0 40px rgba(59, 130, 246, 0.4)'
            }}
          >
            Corey G. Marsh
          </motion.h1>

          <motion.p 
            className="mt-3 font-wave text-sm tracking-[0.16em] text-cyan-100/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Crafting Worlds • Building Stories
          </motion.p>

          <motion.p 
            className="mt-4 text-sm leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Story-first video, design, and social media — built with precision and clean visuals.
          </motion.p>

          <motion.div 
            className="mt-6 flex justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="#services"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold
                         bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 text-white
                         shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Services
            </motion.a>

            <motion.a
              href="#elevate"
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold
                         border border-cyan-500/50 text-cyan-200
                         bg-cyan-500/10 backdrop-blur-xl"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              Elevate
            </motion.a>
          </motion.div>

          <motion.div 
            className="mt-9 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative px-5 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
            Services
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Focused offerings — clean execution, strong story.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-5 border border-cyan-500/20 bg-slate-900/40 backdrop-blur-xl
                         shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]
                         transition-all duration-500"
            >
              {/* Icon */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                </div>

                <div className="flex-1 text-left">
                  <div className="text-[11px] tracking-[0.18em] uppercase text-cyan-300/60 font-heading mb-1">
                    Service
                  </div>
                  <div className="font-heading text-lg font-semibold text-white/95 mb-2">
                    {s.title}
                  </div>
                  <p className="text-sm leading-relaxed text-white/70 group-hover:text-white/90 transition-colors">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1500 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* WHAT DRIVES US */}
      <section id="drives" className="relative px-5 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
            What Drives Us
          </h2>
          <p className="mt-2 text-sm text-white/60">
            A simple set of principles that keeps every deliverable sharp.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="rounded-2xl p-6 border border-blue-500/20 bg-slate-900/30 backdrop-blur-xl
                         shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            >
              <motion.div 
                className={`mx-auto h-3 w-3 rounded-full bg-gradient-to-r ${v.color}`}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.6)',
                    '0 0 30px rgba(59, 130, 246, 1)',
                    '0 0 20px rgba(59, 130, 246, 0.6)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="mt-4 font-heading text-lg font-semibold text-white/95">
                {v.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* CGM LOGO SECTION */}
      <section id="logo" className="relative px-5 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-[420px] flex flex-col items-center gap-6"
        >
          <div className="relative flex items-center justify-center rounded-3xl border border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl px-8 py-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            {/* Pulsing glow behind logo */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <img
              src="/images/CGMlogo.png"
              alt="CGM Creative"
              className="h-64 w-auto relative z-10"
            />
          </div>

          <motion.p 
            className="text-xs tracking-[0.28em] uppercase text-cyan-200/70 font-heading"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Creative Solutions
          </motion.p>

          <motion.div 
            className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </section>

      {/* READY TO ELEVATE */}
      <section id="elevate" className="relative px-5 pt-12 pb-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
            Ready to Elevate?
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Let's build something clean, bold, and story-forward.
          </p>

          <div className="mt-8 grid gap-4">
            <motion.a
              className="rounded-2xl px-6 py-4 text-base font-semibold text-center
                         bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 text-white
                         shadow-[0_0_40px_rgba(59,130,246,0.4)]"
              href="mailto:hello@yourdomain.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Email Me
            </motion.a>

            <motion.a
              className="rounded-2xl border border-cyan-500/50 bg-cyan-500/10 backdrop-blur-xl px-6 py-4 text-base font-semibold text-center text-cyan-200"
              href="#"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(6, 182, 212, 0.15)' }}
              whileTap={{ scale: 0.98 }}
            >
              LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-5 pb-12 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[420px]"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          <p className="mt-6 text-xs text-white/40 font-heading tracking-[0.18em] uppercase">
            © {new Date().getFullYear()} Corey G. Marsh
          </p>
        </motion.div>
      </footer>
    </main>
  );
}