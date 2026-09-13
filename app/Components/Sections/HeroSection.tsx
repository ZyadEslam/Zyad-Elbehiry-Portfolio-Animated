"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { getImageProps } from "next/image";

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

  const common = {
    alt: "Portrait of [Your Name]",
    sizes: "40vw", // Matches your layout (40% of viewport width)
  };

  // 1. Generate props for the Desktop version (wider composition)
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/hero_desktop_2000px.avif", // Your wider, natural-looking desktop crop
    width: 1200, // Use your export width
    height: 1800, // Keep aspect ratio
    quality: 85, // Higher quality for large screens
  });

  // 2. Generate props for the Mobile version (tighter crop on face)
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    ...common,
    src: "/hero_mobile_1000px.avif", // Your tighter, mobile-specific crop
    width: 800, // Smaller export, closer to display size
    height: 1200,
    quality: 70, // Lower quality is fine for smaller screens
  });

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
        className="relative z-20 h-screen w-full  flex justify-center"
      >
        {/* <div className="w-full md:w-full flex justify-center h-full absolute bg-red-600 bottom-0 "> */}
          <Image
            src="https://res.cloudinary.com/darxwbvff/image/upload/v1789307287/hero_desktop_2000px_uf3jsa.avif"
            alt="Portrait illustration"
            width={1664}
            height={1024}
            priority
            sizes="100vw"
            className="
      absolute
      -bottom-8
      left-1/2
      -translate-x-1/2
      max-w-none
        w-[175vw]
      h-[100%]

      md:w-auto
      md:h-[100vh]
    "
          />
        {/* </div> */}

        {/* <picture
          className="
      absolute
      bottom-0
      left-1/2
      -translate-x-1/2"
        >
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />

          <source media="(max-width: 767px)" srcSet={mobileSrcSet} />

          <img {...rest} style={{ width: "100%", height: "auto" }} />
        </picture> */}
      </div>
    </section>
  );
};

Hero.displayName = "Hero";
export default Hero;
