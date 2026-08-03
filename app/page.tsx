"use client";
import { useEffect, useState } from "react";
import Hero from "./Components/Sections/HeroSection";
import Intro from "./Components/Sections/Intro";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
  }, [introDone]);
  return (
    <>
    {
      !introDone && <Intro onComplete={() => setIntroDone(true)} />}
      {/* Hero underneath — replace with real hero later */}
      <Hero />
    </>
  );
}
