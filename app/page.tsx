"use client";
import { useEffect, useState } from "react";
import Hero from "./Components/Sections/HeroSection";
import Intro from "./Components/Sections/Intro";
import PersonalInfo from "./Components/Sections/PersonalInfo";

export default function Home() {
  // const [introDone, setIntroDone] = useState(false);

  // useEffect(() => {
  //   document.body.style.overflow = introDone ? "" : "hidden";
  // }, [introDone]);
  return (
    <>
      {/* {!introDone && <Intro onComplete={() => setIntroDone(true)} />} */}
      <Hero autoPlay={true} />
      <PersonalInfo/>
    </>
  );
}
