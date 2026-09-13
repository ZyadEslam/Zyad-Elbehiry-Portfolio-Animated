"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const titles = [
  "Frontend Developer",
  "React Engineer",
  "UI Craftsman",
  "Freelancer",
];

const TitlesMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    // The track's content is duplicated in the JSX below, so looping to
    // exactly -50% resets seamlessly with no visible jump.
    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    // Each separator icon spins continuously, independent of the scroll —
    // the "creative" touch that keeps the strip from feeling static.
    gsap.to(iconRefs.current, {
      rotate: 360,
      duration: 6,
      ease: "none",
      repeat: -1,
    });
  }, {});

  return (
    <div className="overflow-hidden bg-background my-5 py-5 border-2 border-black">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-16 whitespace-nowrap"
      >
        {[...titles, ...titles].map((title, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-serif text-6xl uppercase tracking-tight text-text-primary md:text-8xl">
              {title}
            </span>
            <span
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              className="inline-block text-4xl text-white/60 md:text-6xl"
              aria-hidden
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitlesMarquee;
