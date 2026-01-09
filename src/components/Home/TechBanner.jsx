import React from "react";

const tech = [
  "React",
  "Vite",
  "Three.js",
  "Canva",
  "Render",
  "Photoshop",
  "Illustrator",
  "TailwindCSS",
  "Framer Motion",
  "Blender",
  "Figma",
  "Premiere Pro",
  "Node.js",
  "Express",
  "Final Cut Pro",
  "DaVinci Resolve",
  "Lightroom",
  "Next.js",
  "Adobe After Effects",
  "and more...",
];

const TechBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black border-y border-teal-800/40 py-6">
      {/* subtle noise / glow strip */}
      <div className="absolute inset-0 opacity-[0.2] bg-black pointer-events-none" />
{/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.26]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.35)_1px,transparent_1px)] bg-[size:110px_110px]" />
      </div>

      {/* label */}
      <div className="text-center mb-4">
        <span className="text-teal-300 text-[10px] tracking-[0.4em] uppercase font-heading">
          Tools & Technologies
        </span>
      </div>

      {/* marquee wrapper */}
      <div className="relative flex items-center">
        <div className="animate-marquee whitespace-nowrap flex gap-12">
          {tech.map((item, i) => (
            <span
              key={i}
              className="text-slate-200 font-heading text-lg tracking-wide opacity-80 hover:opacity-100 transition"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="animate-marquee2 whitespace-nowrap ml-12 flex gap-12">
          {tech.map((item, i) => (
            <span
              key={i}
              className="text-slate-200 font-heading text-lg tracking-wide opacity-80 hover:opacity-100 transition"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* dashed divider accent */}
      <div className="absolute bottom-0 left-0 w-full border-b border-dashed border-teal-700/30"></div>

      <style>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee2 {
          animation: marquee2 20s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(30%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
};

export default TechBanner;
