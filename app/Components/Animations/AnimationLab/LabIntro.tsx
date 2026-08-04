"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function LabIntro() {
  const section = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".lab-word");
      const line = document.querySelector(".progress-line");

      gsap.set(words, {
        y: 120,
        opacity: 0,
        rotateX: -90,
      });

      gsap.set(line, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "bottom center",
          scrub: 1,
        },
      });

      tl.to(line, {
        scaleX: 1,
        ease: "none",
      });

      tl.to(
        words,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          ease: "power3.out",
        },
        0
      );

      tl.from(
        ".subtitle",
        {
          y: 30,
          opacity: 0,
        },
        0.4
      );
    },
    { scope: section }
  );

  return (
    <div
      ref={section}
      className="relative flex min-h-screen items-center justify-center px-8 text-text-primary"
    >


      <div className="max-w-6xl">
        <p className="subtitle mb-12 text-sm uppercase tracking-[0.4em] text-text-primary">
          Animation Lab
        </p>

        <div className="space-y-2">
          <div className="overflow-hidden">
            <h2 className="lab-word text-6xl font-black uppercase md:text-8xl lg:text-[8rem]">
              Interaction
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2 className="lab-word text-6xl font-black uppercase md:text-8xl lg:text-[8rem]">
              is my
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2 className="lab-word text-6xl font-black uppercase md:text-8xl lg:text-[8rem]">
              language.
            </h2>
          </div>
        </div>

        <p className="subtitle mt-16 max-w-xl text-lg text-text-primary">
          Scroll through a collection of handcrafted interactions built with
          GSAP, React, and creative motion design.
        </p>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <div className="subtitle flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-text-primary">
            Scroll
          </span>

          <div className="h-14 w-px bg-neutral-400" />
        </div>
      </div>
    </div>
  );
}
