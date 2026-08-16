"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const keywords = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "JavaScript",
  "API Design",
  "Freelance E-commerce",
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutWordRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom bottom",
            scrub: true,
          },
          defaults: { ease: "power3.in" },
        })
        .to(aboutWordRef.current, { opacity: 1, x: 0, duration: 1.2 })
        .to(paraRef.current, { opacity: 1, y: 0, duration: 1.5 }, "+=2")
        .to(keywordsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "+=1")
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.5 }, "+=.5");

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className="relative z-10 min-h-screen bg-dark-bg px-6 py-24 text-white   md:px-16 md:py-32"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:gap-20">
          {/* Big ABOUT label */}
          <div className="flex md:w-1/4">
            <span
              ref={aboutWordRef}
              className="-translate-x-8 p-0 md:p-4 font-serif text-7xl leading-none tracking-tight opacity-0  rotate-0 md:-rotate-90 md:text-8xl md:whitespace-nowrap"
            >
              About
            </span>
          </div>

          {/* Description column */}
          <div className="flex flex-col gap-10 md:w-3/4">
            <p
              ref={paraRef}
              className="max-w-2xl -translate-y-4 text-lg leading-relaxed text-white/80 opacity-0 md:text-2xl"
            >
              I&apos;m a Frontend Developer with a strong backend foundations,
              focused on building fast, accessible interfaces with React,
              Next.js and TypeScript. Alongside client-facing work — including
              freelance e-commerce projects with real payment integrations — I
              have backend foundations in Node.js, Express.js and API Design. I
              care about the details that make an interface feel considered
              rather than just functional.
            </p>

            <div
              ref={keywordsRef}
              className="flex -translate-y-4 flex-wrap gap-3 opacity-0"
            >
              {keywords.map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70"
                >
                  {word}
                </span>
              ))}
            </div>

            <div
              ref={roleRef}
              className="flex -translate-y-4 items-center gap-3 opacity-0"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-xs font-semibold">
                ZE
              </span>
              <span className="text-sm uppercase tracking-[0.3em] text-white/70">
                Frontend Developer
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
