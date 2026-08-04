"use client";
import { useEffect, useRef, useState } from "react";
import Hero from "./Components/Sections/HeroSection";
import Intro from "./Components/Sections/Intro";
import About from "./Components/Sections/AboutSection";
import TitlesMarquee from "./Components/Sections/TitlesMarquee";
import AnimationLab from "./Components/Animations/AnimationLab/AnimationLab";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
  }, [introDone]);
  return (
    <>
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <div className="relative">
        <div className="sticky top-0 -z-10 h-screen overflow-hidden">
          <Hero />
        </div>
        <About />
      </div>
      <TitlesMarquee />
      {/* <AnimationLab /> */}
    </>
  );
}
