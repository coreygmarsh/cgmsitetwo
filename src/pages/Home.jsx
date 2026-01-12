import React, { Suspense, lazy, useEffect, useRef, useState } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/Home/HeroSection";
import Footer from "../components/Home/Footer";
import Preloader from "../components/Home/Preloader";

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

  const [preloadDone, setPreloadDone] = useState(false);

  // End preloader after Hero has had a moment to paint (fast perceived load)
  useEffect(() => {
    // Safety: never block longer than ~2.5s
    const hardTimeout = setTimeout(() => {
      window.__CGM_FINISH_PRELOADER__?.();
    }, 2500);

    // Soft finish: after first paint + tiny delay
    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => {
        window.__CGM_FINISH_PRELOADER__?.();
      }, 450);
      return () => clearTimeout(t);
    });

    return () => {
      clearTimeout(hardTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Optional: warm up below-the-fold chunks shortly after load so scrolling feels instant
  useEffect(() => {
    if (preloadDone) {
      // fire-and-forget: start fetching these bundles
      import("../components/Home/UseCaseBanner");
      import("../components/Home/SecondSection");
      import("../components/Home/SectionBridgeOne");
      import("../components/Home/SectionThree");
      import("../components/Home/ValuesBanner");
      import("../components/Home/SectionFour");
      import("../components/Home/TechBanner");
      import("../components/Home/SectionFive");
    }
  }, [preloadDone]);

  return (
    <>
      {!preloadDone && (
        <Preloader
          minDurationMs={750}
          title="CGM Creative"
          subtitle="Loading experience…"
          onDone={() => setPreloadDone(true)}
        />
      )}

      {/* Render behind preloader so assets actually load */}
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
            <div className="flex-grow">
              <UseCaseBanner />

              <div className="bg-gradient-to-b from-slate-800 via-teal-700 to-cyan-800">
                <SecondSection />
              </div>

              <SectionBridge />

              <div className="bg-gradient-to-b to-slate-800 via-teal-700 from-cyan-800 pb-1">
                <SectionThree />
              </div>

              <ValuesBanner />

              <div className="bg-gradient-to-t to-slate-800 via-teal-700 pb-1 md:pb-1 from-cyan-800">
                <SectionFour />
              </div>

              <TechBanner />

              <div className="bg-gradient-to-b to-slate-800 via-teal-700 pb-1 from-cyan-800">
                <SectionFive />
              </div>
            </div>
          </Suspense>
        ) : (
          <div className="flex-grow" />
        )}

        <Footer />
      </div>
    </>
  );
}
