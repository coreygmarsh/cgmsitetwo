import HeroSection from "../components/Home/HeroSection";
import Navbar from "../components/Navbar";
import { TracingBeam } from "../ui/TracingBeam";
import SecondSection from "../components/Home/SecondSection";
import SectionThree from "../components/Home/SectionThree";
import SectionFour from "../components/Home/SectionFour";
import SectionFive from "../components/Home/SectionFive";
import Footer from "../components/Home/Footer";
import SectionBridge from "../components/Home/SectionBridgeOne";
import TechBanner from "../components/Home/TechBanner";
import ValuesBanner from "../components/Home/ValuesBanner";
import UseCaseBanner from "../components/Home/UseCaseBanner";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100vh] bg-gradient-to-b from-cyan-800 to-slate-800">
      <div className="w-full z-20">
        <Navbar />
      </div>

      <TracingBeam className="flex-grow">
        {/* SECTION 1 */}
        <HeroSection />
         {/* BANNER */}
        <UseCaseBanner />

        {/* SECTION 2 */}
        <div className="bg-gradient-to-b from-slate-800 via-teal-700 to-cyan-800">
          <SecondSection />
        </div>
         {/* BANNER */}
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
         {/* BANNER */}
        {/* <UseCaseBanner /> */}

      </TracingBeam>

      <Footer />
    </div>
  );
}
