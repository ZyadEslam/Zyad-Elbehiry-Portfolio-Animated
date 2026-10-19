"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getImageProps } from "next/image";
import { scrollToSection } from "../Animations/sharedAnimation";

const imageOptions = {
  alt: "Portrait illustration of Zyad Elbehiry",
  sizes: "(max-width: 767px) 34vh, (max-width: 1023px) 60vw, 46vw",
  quality: 100,
};

const {
  props: { srcSet: mobileSrcSet },
} = getImageProps({
  ...imageOptions,
  src: "/hero_mobile_1000px.avif",
  width: 1000,
  height: 1059,
});

const { props: desktopImageProps } = getImageProps({
  ...imageOptions,
  src: "/hero_desktop_2000px.avif",
  width: 1200,
  height: 1800,
});

const Hero = () => {
  const container = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) return;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from("[data-hero-eyebrow]", { y: 16, autoAlpha: 0, duration: 0.55 })
        .from("[data-hero-title]", { y: 72, autoAlpha: 0, duration: 0.85 }, "-=0.2")
        .from("[data-hero-copy]", { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.5")
        .from("[data-hero-actions]", { y: 20, autoAlpha: 0, duration: 0.55 }, "-=0.4")
        .from(
          portrait.current,
          { y: 64, scale: 0.96, autoAlpha: 0, duration: 1.1, ease: "power4.out" },
          "<0.15",
        );

      gsap.to("[data-hero-orbit]", {
        rotate: 360,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: container },
  );

  return (
    <section
      id="home"
      ref={container}
      className="relative isolate h-screen min-h-[680px] w-full overflow-hidden bg-[#e9e9e5] text-[#161616]"
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(22,22,22,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,22,22,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute -right-24 top-20 h-[32rem] w-[32rem] rounded-full bg-[#c7ff4b]/35 blur-3xl" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col-reverse px-6 pt-28 md:px-12 md:pt-32">
        <div className="relative z-20 flex w-full flex-1 flex-col justify-between">
          <div className="max-w-xl">
            <p
              data-hero-eyebrow
              className="mb-6 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#161616]/65 md:mb-8 md:text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-[#8abf14]" />
              Available for selected projects
            </p>

            <h1
              data-hero-title
              className="max-w-[9ch] text-[clamp(3.25rem,8.2vw,7.7rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]"
            >
              Digital work,
              <span className="block pl-[0.08em] text-[#4c6b08]">built to move.</span>
            </h1>

            <p
              data-hero-copy
              className="mt-7 max-w-xs text-sm leading-relaxed text-[#161616]/70 md:mt-9 md:max-w-sm md:text-base"
            >
              I&apos;m Zyad Elbehiry, a developer turning ambitious ideas into fast,
              thoughtful digital experiences.
            </p>

            <div data-hero-actions className="mt-7 flex flex-wrap gap-3 md:mt-9">
              <button
                type="button"
                onClick={() => scrollToSection("#projects")}
                className="group inline-flex items-center gap-4 rounded-full bg-[#161616] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#4c6b08]"
              >
                View selected work
                <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="rounded-full border border-[#161616]/25 bg-white/35 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white"
              >
                Let&apos;s talk
              </button>
            </div>
          </div>

        
        </div>

        <div
          ref={portrait}
          className="pointer-events-none relative z-10  mx-auto h-[40vh] min-h-[280px] max-h-[360px] w-full shrink-0 md:absolute md:bottom-0 md:left-auto md:right-0 md:mx-0 md:h-[88%] md:max-h-none md:w-[53%]"
        >
          {/* <div className="absolute bottom-[5%] left-1/2 h-[17rem] w-[17rem] -translate-x-1/2 rounded-full border border-[#161616]/15 md:h-[34rem] md:w-[34rem]" /> */}
          {/* <div
            data-hero-orbit
            className="absolute bottom-[9%] left-1/2 h-[14rem] w-[14rem] -translate-x-1/2 rounded-full border border-dashed border-[#161616]/25 md:h-[29rem] md:w-[29rem]"
          /> */}
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
            <img
              {...desktopImageProps}
              alt="Portrait illustration of Zyad Elbehiry"
              loading="eager"
              fetchPriority="high"
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
            />
          </picture>
          <div className="absolute inset-x-0 bottom-0 z-10 h-[42%] bg-gradient-to-t from-[#DEF2B5]  to-transparent md:hidden" />
          {/* <div className="absolute inset-x-0 bottom-0 z-10 h-[42%] bg-gradient-to-t from-[#E9E9E4]  to-transparent  md:absolute" /> */}
         
        </div>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";
export default Hero;
