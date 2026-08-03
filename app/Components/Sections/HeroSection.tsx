"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export type HeroHandle = { play: () => void };
type HeroProps = { autoPlay?: boolean };

const marqueeItems = [
  "Frontend Developer",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP"
];

const Hero = forwardRef<HeroHandle, HeroProps>(({ autoPlay = true }, ref) => {
  const container = useRef<HTMLDivElement>(null);

  // Section A — visual (image + marquee)
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      // Section A entrance — nav + image fade/scale in. Paused, exposed via
      // play() so a parent intro can trigger it once its own reveal ends.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timelineRef.current = tl;
      if (autoPlay) tl.play();

      // tl.to(
      //   imageRef.current,
      //   { opacity: 1, scale: 1, duration: 1, ease: "power4.in" },
      //   "-=0.3"
      // );

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

  // Lets a parent (e.g. the intro) call heroRef.current.play() once its own
  // reveal finishes, instead of Section A animating in on its own.
  useImperativeHandle(ref, () => ({
    play: () => timelineRef.current?.play(),
  }));

  return (
    <section
      ref={container}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden hero-grid"
    >
      {/* Section A — image + huge marquee behind it, only thing visible on load */}
      <div
        ref={marqueeTrackRef}
        className="absolute top-1/2 left-0 z-0 flex w-max -translate-y-1/2 items-center gap-16 whitespace-nowrap font-black-ops text-[18vw] md:text-[14vw] leading-none tracking-tight text-[#222222] "
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-16">
            {item}
          </span>
        ))}
      </div>

      <div ref={imageRef} className="relative z-10 h-screen w-full ">
        <Image
          src="/Protfolio-cartoone-Photoroom.png"
          alt="Portrait illustration"
          width={700}
          height={900}
          priority
          className="h-full w-full object-cover md:object-contain "
        />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
