import React, { Suspense, lazy, useEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/Home/HeroSection";
import Footer from "../components/Home/Footer";

// If TracingBeam is heavy, lazy it too
const TracingBeam = lazy(() =>
  import("../ui/TracingBeam").then((m) => ({ default: m.TracingBeam }))
);

// Lazy-load everything below hero
const UseCaseBanner = lazy(() => import("../components/Home/UseCaseBanner"));
const SecondSection = lazy(() => import("../components/Home/SecondSection"));
const SectionBridge = lazy(() => import("../components/Home/SectionBridgeOne"));
const SectionThree = lazy(() => import("../components/Home/SectionThree"));
const ValuesBanner = lazy(() => import("../components/Home/ValuesBanner"));
const SectionFour = lazy(() => import("../components/Home/SectionFour"));
const TechBanner = lazy(() => import("../components/Home/TechBanner"));
const SectionFive = lazy(() => import("../components/Home/SectionFive"));

function InlineLoader({ label = "Loading…" }) {
  return (
    <div className="w-full py-10 grid place-items-center">
      <div className="text-emerald-100/80 font-semibold animate-pulse">{label}</div>
    </div>
  );
}

// Simple "load when near viewport" trigger
function useNearViewport(options = { rootMargin: "600px 0px" }) {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNear(true);
        io.disconnect();
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, isNear };
}

export default function Home() {
  const { ref: belowFoldRef, isNear: loadBelowFold } = useNearViewport();

  return (
    <div className="flex flex-col min-h-[100vh] bg-gradient-to-b from-cyan-800 to-slate-800">
      <div className="w-full z-20">
        <Navbar />
      </div>

      {/* Hero renders immediately */}
      <HeroSection />

      {/* Sentinel: once user scrolls near, we begin loading the rest */}
      <div ref={belowFoldRef} />

      {loadBelowFold ? (
        <Suspense fallback={<InlineLoader label="Loading sections…" />}>
          <TracingBeam className="flex-grow">
            {/* BANNER */}
            <UseCaseBanner />

            {/* SECTION 2 */}
            <div className="bg-gradient-to-b from-slate-800 via-teal-700 to-cyan-800">
              <SecondSection />
            </div>

            {/* BRIDGE */}
            <SectionBridge />

            {/* SECTION 3 */}
            <div className="bg-gradient-to-b to-slate-800 via-teal-700 from-cyan-800 pb-1">
              <SectionThree />
            </div>

            {/* BANNER */}
            <ValuesBanner />

            {/* SECTION 4 */}
            <div className="bg-gradient-to-t to-slate-800 via-teal-700 pb-1 md:pb-1 from-cyan-800">
              <SectionFour />
            </div>

            {/* BANNER */}
            <TechBanner />

            {/* SECTION 5 */}
            <div className="bg-gradient-to-b to-slate-800 via-teal-700 pb-1 from-cyan-800">
              <SectionFive />
            </div>
          </TracingBeam>
        </Suspense>
      ) : (
        // Optional: show nothing or a tiny hint
        <div className="flex-grow" />
      )}

      <Footer />
    </div>
  );
}
