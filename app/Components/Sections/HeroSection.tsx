"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export type HeroHandle = { play: () => void };
type HeroProps = { autoPlay?: boolean };

const navLinks = ["Work", "About", "Contact"];
const marqueeItems = [
  "Frontend Developer",
  "React",
  "Next.js",
  "TypeScript",
  "Based in Egypt",
];

const Hero = forwardRef<HeroHandle, HeroProps>(({ autoPlay = true }, ref) => {
  const container = useRef<HTMLDivElement>(null);

  // Section A — visual (image + marquee)
  const navRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Section B — content, revealed on scroll
  const sectionBRef = useRef<HTMLDivElement>(null);
  const headingLine1 = useRef<HTMLSpanElement>(null);
  const headingLine2 = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [time, setTime] = useState("--:--");

  // Live local time, Cairo — placeholder until mount avoids any SSR mismatch
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Cairo",
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      // Section A entrance — nav + image fade/scale in. Paused, exposed via
      // play() so a parent intro can trigger it once its own reveal ends.
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

      tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.6 }).to(
        imageRef.current,
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.3"
      );

      timelineRef.current = tl;
      if (autoPlay) tl.play();

      // Seamless infinite marquee behind the image
      gsap.to(marqueeTrackRef.current, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      // Section B — reveals itself as the user scrolls to it
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionBRef.current,
            start: "top 75%",
          },
          defaults: { ease: "power3.out" },
        })
        .to(headingLine1.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(headingLine2.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(footerRef.current, { opacity: 1, duration: 0.6 }, "-=0.3");
    },
    { scope: container }
  );

  // Lets a parent (e.g. the intro) call heroRef.current.play() once its own
  // reveal finishes, instead of Section A animating in on its own.
  useImperativeHandle(ref, () => ({
    play: () => timelineRef.current?.play(),
  }));

  return (
    <div ref={container} className="relative w-full bg-[#f8f8f8] text-[#222222]">
      {/* Nav — fixed, always visible */}
      <div
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 flex -translate-y-2 items-center justify-between px-6 py-6 opacity-0 md:px-12"
      >
        <span className="text-sm uppercase tracking-widest">Zyad Elbehriy</span>

        <nav className="hidden gap-8 text-sm uppercase tracking-widest md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="transition-opacity hover:opacity-60"
            >
              {link}
            </a>
          ))}
        </nav>

        <span className="rounded-full border border-[#222222]/30 px-3 py-1 text-xs uppercase tracking-widest">
          Available for work
        </span>
      </div>

      {/* Section A — image + huge marquee behind it, only thing visible on load */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          ref={marqueeTrackRef}
          className="absolute top-1/2 left-0 z-0 flex w-max -translate-y-1/2 items-center gap-16 whitespace-nowrap font-black-ops text-[32vw] leading-none tracking-tight text-[#222222] md:text-[10vw]"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-16">
              {item}
            </span>
          ))}
        </div>

        <div
          ref={imageRef}
          className="relative z-10 h-screen w-auto scale-95 opacity-0"
        >
          <Image
            src="/Protfolio-cartoone-Photoroom.png"
            alt="Portrait illustration"
            width={700}
            height={900}
            priority
            className="h-full w-full object-contain"
          />
        </div>
      </section>

      {/* Section B — remaining content, reveals on scroll */}
      <section
        ref={sectionBRef}
        className="flex min-h-screen flex-col justify-center gap-6 px-6 py-24 text-center md:px-12"
      >
        <h1 className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
          <span
            ref={headingLine1}
            className="block -translate-y-6 font-light italic opacity-0"
          >
            Frontend
          </span>
          <span
            ref={headingLine2}
            className="block -translate-y-6 font-semibold opacity-0"
          >
            Developer.
          </span>
        </h1>

        <p
          ref={paraRef}
          className="mx-auto max-w-md -translate-y-4 text-sm text-[#222222]/70 opacity-0 md:text-base"
        >
          I build fast, accessible interfaces with React, Next.js and TypeScript
          — backed by a solid foundation in Java and API design.
        </p>

        <div ref={ctaRef} className="-translate-y-4 opacity-0">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest"
          >
            View my work
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div
          ref={footerRef}
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#222222]/15 pt-4 text-xs uppercase tracking-widest text-[#222222]/60 opacity-0"
        >
          <span>Based in Egypt</span>
          <span>{time} · Cairo</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#222222]"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#222222]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
});

Hero.displayName = "Hero";
export default Hero;