import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "HOME", to: "/" },
    { label: "ABOUT", to: "/about" },
    { label: "SERVICES", to: "/services" },
    { label: "CONTACT", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-teal-950/90 via-black/90 to-black/80 border-b border-teal-900/60 backdrop-blur-xl">
      {/* subtle glow line under nav */}
      <div className="absolute inset-x-0 -bottom-px h-[1px] bg-gradient-to-r from-transparent via-teal-400/60 to-transparent opacity-70 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="relative">
            <img
              src="/images/CGMlogo.png"
              alt="CGM Logo"
              className="h-16 sm:h-24 drop-shadow-[0_0_18px_rgba(20,184,166,0.75)]"
            />
            {/* soft glow behind logo */}
            <div className="absolute inset-0 blur-xl bg-teal-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-fancy text-2xl sm:text-3xl text-white group-hover:text-teal-200 transition-colors">
              Cinematic Global Minds
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 font-wave tracking-widest text-xl">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `group relative text-slate-200 hover:text-teal-300 transition-colors duration-200 ${
                    isActive ? "text-teal-300" : ""
                  }`
                }
              >
                <span>{link.label}</span>

                {/* underline hover + active */}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 transition-all duration-300 group-hover:w-full"
                />
              </NavLink>
            </li>
          ))}

          {/* optional CTA - if this is internal route, use Link. If it's a section on the page, keep <a> */}
          <li>
  <Link
    to="https://www.coreygmarsh.com"
    target="_blank"
    rel="noopener noreferrer"
    className="ml-2 px-4 py-2 font-heading rounded-full text-xs font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-[0_0_24px_rgba(20,184,166,0.8)] hover:shadow-[0_0_40px_rgba(20,184,166,1)] transition-all duration-300"
  >
    Visit Portfolio
  </Link>
</li>

        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden relative z-20 flex items-center justify-center w-10 h-10 rounded-full border border-teal-500/40 bg-black/40 backdrop-blur-xl text-teal-100 hover:border-teal-300 hover:text-teal-200 transition-all"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? (
            <span className="text-xl leading-none">✕</span>
          ) : (
            <span className="text-2xl leading-none">☰</span>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`xl:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 pb-4 pt-2 space-y-2 border-t border-teal-900/60 bg-black/80 backdrop-blur-xl font-heading text-sm">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block py-2 transition-colors ${
                    isActive ? "text-teal-300" : "text-slate-200 hover:text-teal-300"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li>
            <a
              href="#contact"
              className="mt-2 inline-flex w-full justify-center px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-[0_0_24px_rgba(20,184,166,0.8)]"
              onClick={() => setOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
