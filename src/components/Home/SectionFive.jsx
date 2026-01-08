import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CGMShaderBackground from '../CGMShaderBackground.jsx';
const SectionFive = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Add your form submission logic here
  };

  return (
    <section className="relative min-h-screen bg-black py-32 px-6 overflow-hidden flex items-center justify-center">
        <CGMShaderBackground className="opacity-30" />
      {/* Lava lamp background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full bg-cyan-600/30 blur-[150px]"
          animate={{
            x: ['0%', '60%', '30%', '70%', '0%'],
            y: ['0%', '50%', '70%', '20%', '0%'],
            scale: [1, 1.4, 0.9, 1.2, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full bg-teal-600/25 blur-[140px]"
          animate={{
            x: ['70%', '10%', '80%', '20%', '70%'],
            y: ['20%', '70%', '30%', '60%', '20%'],
            scale: [1.2, 0.8, 1.3, 1, 1.2],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{ right: 0 }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-green-600/20 blur-[130px]"
          animate={{
            x: ['50%', '20%', '60%', '40%', '50%'],
            y: ['60%', '20%', '80%', '30%', '60%'],
            scale: [0.9, 1.3, 1, 1.2, 0.9],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          style={{ left: '20%', bottom: 0 }}
        />
      </div>

      {/* Cursor follower */}
      <div 
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full blur-3xl opacity-20 transition-all duration-500 ease-out z-0"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.6) 0%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.3)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Top decoration */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-400 to-teal-400" />
          <div className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,1)] animate-pulse" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent via-teal-400 to-teal-400" />
        </motion.div>

        {/* Main heading */}
        <motion.h2 
          className="text-6xl sm:text-7xl font-heading md:text-8xl lg:text-9xl font-bold mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 drop-shadow-[0_0_60px_rgba(20,184,166,0.6)]">
            Ready to
          </span>
          <span className="block text-white font-fancy drop-shadow-[0_0_80px_rgba(255,255,255,0.2)] mt-4">
            elevate your
          </span>
          <span className="block relative inline-block mt-4">
            <span className="text-emerald-300 drop-shadow-[0_0_80px_rgba(16,185,129,1)]">
              brand?
            </span>
            <div className="absolute -inset-4 bg-emerald-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
          </span>
        </motion.h2>

        {/* Subheading */}
        <motion.p 
          className="text-slate-300 text-xl font-coolvetica sm:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Let's create something extraordinary together. 
          <span className="text-teal-300"> Get started with a free consultation.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center shadow-sparkle justify-center gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Primary CTA */}
          <motion.button
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 rounded-full font-bold text-2xl text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(20,184,166,1)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow layers */}
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <span className="relative z-10 text-2xl font-heading tracking-wide flex items-center gap-3">
              <span>Let's Talk</span>
              {/* <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg> */}
            </span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* Pulse ring */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ scale: [1, 1.2, 1.2], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            className="group relative px-12 py-6 backdrop-blur-xl bg-white/5 border-2 border-teal-500/50 rounded-full font-bold text-2xl text-white overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-teal-400 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 font-heading flex items-center gap-3">
              <span className="text-teal-300 group-hover:text-teal-200 transition-colors">View Portfolio</span>
              <svg className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Email signup form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 rounded-2xl p-8 shadow-[0_0_60px_rgba(20,184,166,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-2xl" />
            
            <p className="text-slate-300 font-coolvetica mb-6 text-lg">
              Or get updates on our latest projects
            </p>
            
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 font-coolvetica relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-slate-900/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-all duration-300 group-hover:border-slate-600"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/0 to-emerald-500/0 group-focus-within:from-teal-500/10 group-focus-within:to-emerald-500/10 blur-xl -z-10 transition-all duration-500" />
                </div>
                
                <motion.button
                  type="submit"
                  className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.6)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative font-heading z-10">Subscribe</span>
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.button>
              </div>
            </form>

            <p className="text-slate-500 font-coolvetica text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div 
          className="flex items-center justify-center gap-2 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,1)] animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,1)] animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse" style={{ animationDelay: '0.6s' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default SectionFive;