// src/pages/Home/Home.jsx
import HomeDesktop from "../Home/HomeDesktop";
import HomeMobile from "../Home/HomeMobile";

export default function Home() {
  return (
    <>
      {/* Mobile Lite */}
      <div className="block xl:hidden">
        <HomeMobile />
      </div>

      {/* Desktop Full */}
      <div className="hidden xl:block">
        <HomeDesktop />
      </div>
    </>
  );
}
