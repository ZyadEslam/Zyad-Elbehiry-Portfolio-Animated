"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const marqueeItems = [
  "Frontend Developer",
  "Designing",
  "Building",
  "Digital",
  "Experience",
];

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);

  // Section A — visual (image + marquee)
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Seamless infinite marquee behind the image
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: container }
  );

  return (
    <section
      id="hero"
      ref={container}
      className="relative flex h-screen w-full  items-center justify-center overflow-hidden hero-grid"
    >
      {/* Section A — image + huge marquee behind it, only thing visible on load */}
      <div
        ref={marqueeTrackRef}
        className="absolute top-1/2 left-0 z-0 flex w-max -translate-y-1/2 items-center gap-16 whitespace-nowrap font-black-ops text-[35vw] md:text-[14vw] leading-none tracking-tight text-[#222222] "
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-16">
            {item}
          </span>
        ))}
      </div>

      <div ref={imageRef} className="relative z-10 h-screen w-full ">
        <Image
          src="https://res.cloudinary.com/darxwbvff/image/upload/v1785930932/Protfolio-cartoone-Photoroom_ty3slg.png"
          alt="Portrait illustration"
          width={700}
          height={900}
          priority
          className="h-[85%] md:h-full w-full object-cover md:object-contain absolute bottom-0 "
        />
      </div>
    </section>
  );
};

Hero.displayName = "Hero";
export default Hero;
