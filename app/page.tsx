"use client";
import { useEffect, useState } from "react";
import Hero from "./Components/Sections/HeroSection";
import Intro from "./Components/Sections/Intro";
import About from "./Components/Sections/AboutSection";
import TitlesMarquee from "./Components/Sections/TitlesMarquee";
// import PhoneShowcase from "./Components/Sections/PhoneShowcase";
import ProjectsSection from "./Components/Sections/ProjectsSection";
import ServicesSection from "./Components/Sections/ServicesSection";
import DeveloperCity from "./Components/Sections/DeveloperCity";
import ContactSection from "./Components/Sections/ContactSection";

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
      {/* <PhoneShowcase /> */}
      <DeveloperCity/>
      <ProjectsSection />
      <ServicesSection/>
      <ContactSection/>
    </>
  );
}
