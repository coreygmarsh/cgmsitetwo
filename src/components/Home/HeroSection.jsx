import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const canvasRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Underwater caustics effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    let animationId;

    const drawCaustics = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw multiple caustic layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const numPoints = 100;
        const amplitude = 40 + layer * 15;
        const frequency = 0.005 - layer * 0.001;
        const speed = 0.02 + layer * 0.01;

        for (let i = 0; i <= numPoints; i++) {
          const x = (canvas.width / numPoints) * i;
          const y = canvas.height * 0.3 + 
                   Math.sin(x * frequency + time * speed) * amplitude +
                   Math.sin(x * frequency * 2 + time * speed * 1.3) * (amplitude * 0.5) +
                   Math.cos(x * frequency * 0.8 + time * speed * 0.7) * (amplitude * 0.3);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const alpha = 0.08 - layer * 0.02;
        gradient.addColorStop(0, `rgba(34, 211, 238, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(20, 184, 166, ${alpha * 0.7})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.3})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Floating light particles (bubbles)
      for (let i = 0; i < 15; i++) {
        const x = (i * canvas.width / 15 + time * 20) % canvas.width;
        const y = canvas.height * 0.4 + Math.sin(time * 0.8 + i) * 100;
        const size = 2 + Math.sin(time * 2 + i) * 1.5;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
        glow.addColorStop(0, 'rgba(34, 211, 238, 0.3)');
        glow.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = glow;
        ctx.fill();
      }

      time += 0.015;
      animationId = requestAnimationFrame(drawCaustics);
    };

    drawCaustics();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Caustics canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Lava lamp blobs - underwater themed */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/35 blur-[120px]"
          animate={{
            x: ['-10%', '50%', '80%', '20%', '-10%'],
            y: ['20%', '60%', '30%', '70%', '20%'],
            scale: [1, 1.3, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: '10%',
            top: '10%'
          }}
        />

        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full bg-cyan-600/30 blur-[130px]"
          animate={{
            x: ['80%', '20%', '60%', '10%', '80%'],
            y: ['60%', '10%', '70%', '40%', '60%'],
            scale: [1.2, 0.8, 1.4, 1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{
            right: '10%',
            top: '20%'
          }}
        />

        <motion.div 
          className="absolute w-[550px] h-[550px] rounded-full bg-indigo-600/28 blur-[110px]"
          animate={{
            x: ['40%', '-20%', '70%', '30%', '40%'],
            y: ['70%', '30%', '20%', '80%', '70%'],
            scale: [0.9, 1.3, 1.1, 0.95, 0.9],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
          style={{
            left: '30%',
            bottom: '10%'
          }}
        />

        <motion.div 
          className="absolute w-[650px] h-[650px] rounded-full bg-teal-600/22 blur-[120px]"
          animate={{
            x: ['60%', '10%', '50%', '80%', '60%'],
            y: ['10%', '50%', '80%', '20%', '10%'],
            scale: [1.1, 0.85, 1.25, 1, 1.1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 9
          }}
          style={{
            right: '20%',
            bottom: '15%'
          }}
        />

        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-sky-500/28 blur-[100px]"
          animate={{
            x: ['20%', '70%', '30%', '60%', '20%'],
            y: ['40%', '20%', '65%', '35%', '40%'],
            scale: [1, 1.2, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 12
          }}
          style={{
            left: '25%',
            top: '30%'
          }}
        />
      </div>

      {/* Mouse-reactive caustic glow */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(ellipse 800px 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.3) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)`
        }}
      />

      {/* Floating bubbles/particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(34, 211, 238, 0.1) 70%, transparent 100%)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)'
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 50, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0, 0.8, 0.8, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Animated underwater light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-0 w-2 h-full origin-top"
            style={{
              background: 'linear-gradient(to bottom, rgba(34, 211, 238, 0.4) 0%, rgba(20, 184, 166, 0.2) 30%, transparent 60%)',
              transform: `translateX(-50%) rotate(${-30 + i * 5}deg)`,
              filter: 'blur(2px)'
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleY: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Animated grid with wave distortion */}
      <div className="absolute inset-0 opacity-8">
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)] bg-[size:100px_100px]"
          animate={{ 
            backgroundPosition: ['0px 0px', '100px 100px'],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      {/* Glowing reflection on surface */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-40 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(34, 211, 238, 0.3) 0%, transparent 100%)'
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ y: y1, opacity, scale }}
      >
        {/* Orbiting bubbles around center */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{ 
                width: '12px',
                height: '12px',
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0.2) 70%)',
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.5)'
              }}
              animate={{
                x: [0, 250 * Math.cos(i * 90 * Math.PI / 180), 0],
                y: [0, 250 * Math.sin(i * 90 * Math.PI / 180), 0],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div 
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Main heading with underwater glow */}
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Underwater glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-teal-500/30 to-green-500/30 blur-3xl -z-10"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.span 
            className="block font-heading vision text-white mb-2"
            style={{ 
              textShadow: '0 0 50px rgba(34, 211, 238, 0.6), 0 0 100px rgba(34, 211, 238, 0.3), 0 4px 20px rgba(0,0,0,0.5)',
              filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
            }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              CGM
            </motion.span>
            {' '}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Creative
            </motion.span>
          </motion.span>
          
          <motion.span 
            className="block text-transparent font-heading vision bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-sky-300"
            style={{
              filter: 'drop-shadow(0 0 60px rgba(59,130,246,0.8)) drop-shadow(0 0 30px rgba(6,182,212,0.6))'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  '0 0 60px rgba(59,130,246,0.8)',
                  '0 0 80px rgba(59,130,246,1)',
                  '0 0 60px rgba(59,130,246,0.8)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Solutions
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Animated subtitle with underwater shimmer */}
        <motion.div 
          className="space-y-4 px-8 text-3xl font-wave tracking-widest md:text-5xl relative"
          style={{ y: y2 }}
        >
          {[
            { text: 'Crafting Worlds', color: 'text-green-200', shadow: 'rgba(34,197,94,0.8)', delay: 0.4 },
            { text: 'Building Stories', color: 'text-cyan-100', shadow: 'rgba(34,211,238,0.8)', delay: 0.6 },
            { text: 'Empowering Vision', color: 'text-teal-200', shadow: 'rgba(20,184,166,0.8)', delay: 0.8 }
          ].map((item, i) => (
            <motion.p
              key={i}
              className={`${item.color} relative block`}
              style={{ 
                textShadow: `0 0 40px ${item.shadow}, 0 0 20px ${item.shadow}`,
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))'
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: item.delay }}
            >
              {item.text.split('').map((char, j) => (
                <motion.span
                  key={j}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -3, 0],
                  }}
                  transition={{ 
                    opacity: { duration: 0.3, delay: item.delay + j * 0.03 },
                    y: { 
                      duration: 2, 
                      delay: item.delay + j * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.p>
          ))}
        </motion.div>

        <motion.div 
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative w-6 h-10 border-2 border-cyan-400/60 rounded-full flex items-start justify-center p-2 shadow-[0_0_30px_rgba(34,211,238,0.6)]">
              <motion.div 
                className="w-1.5 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"
                animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
          <motion.p 
            className="text-cyan-300/80 text-xs mt-2 tracking-widest"
            style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.6)' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DIVE IN
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
    </section>
  );
};

export default HeroSection;