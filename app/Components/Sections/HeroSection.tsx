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
    { scope: container },
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

<div
  ref={imageRef}
  className="relative z-20 h-screen w-full overflow-hidden flex justify-center"
>
  <Image
    src="/pbg5.png"
    alt="Portrait illustration"
    width={1664}
    height={1024}
    priority
    sizes="100vw"
    className="
      absolute
      bottom-0
      left-1/2
      -translate-x-1/2
      max-w-none

      /* Mobile */
      w-[175vw]
      h-[90%]

      /* Desktop */
      md:w-auto
      md:h-[90vh]
    "
  />
</div>
    </section>
  );
};

Hero.displayName = "Hero";
export default Hero;
