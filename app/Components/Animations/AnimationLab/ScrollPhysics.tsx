"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const labels = [
  "ScrollTrigger",
  "Timelines",
  "MotionPath",
  "SplitText",
  "Flip",
];

export default function ScrollPhysics() {
  const section = useRef<HTMLDivElement>(null);
  const sphere = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(sphere.current, {
        x: 280,
        y: -120,
        scale: 1.6,
        rotate: 360,
        duration: 1,
        ease: "none",
      });

      tl.to(
        sphere.current,
        {
          x: -250,
          y: 160,
          scale: 0.8,
          rotate: 720,
          duration: 1,
          ease: "none",
        },
        ">",
      );

      tl.to(
        sphere.current,
        {
          x: 0,
          y: 0,
          scale: 1.2,
          rotate: 1080,
          duration: 1,
          ease: "none",
        },
        ">",
      );

      labels.forEach((_, i) => {
        if (i === labels.length - 1) return;

        tl.to(
          `.label-${i}`,
          {
            opacity: 0,
            y: -40,
            duration: 0.25,
          },
          i * 0.6 + 0.3,
        );

        tl.fromTo(
          `.label-${i + 1}`,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
          },
          i * 0.6 + 0.3,
        );
      });
    }, section);

    return () => ctx.revert();
  });

  return (
    <section
      ref={section}
      className="relative h-screen overflow-hidden bg-[var(--background)]"
    >
      {/* background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFFF8C]/40 blur-[140px]" />
      </div>

      {/* sphere */}
      <div
        ref={sphere}
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-neutral-300 shadow-[0_50px_120px_rgba(0,0,0,.18)]" />

        <div className="absolute inset-6 rounded-full border border-white/70" />
        <div className="absolute inset-12 rounded-full border border-white/40" />
      </div>

      {/* labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-none text-center">
          {labels.map((label, index) => (
            <h2
              key={label}
              className={`label-${index} absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-6xl font-black tracking-tight ${
                index === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              {label}
            </h2>
          ))}
        </div>
      </div>

      {/* corner text */}
      <div className="absolute bottom-10 left-10 text-sm uppercase tracking-[0.35em] text-neutral-500">
        Scroll to explore
      </div>
    </section>
  );
}