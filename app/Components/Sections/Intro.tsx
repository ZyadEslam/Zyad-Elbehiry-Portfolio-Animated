"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type IntroProps = { onReveal?: () => void; onComplete?: () => void };

const name = "Zyad Eslam Hamdy Abdelghaffar";

const phrases = ["Fullstack Developer", "Based in Egypt"];

export default function Intro({ onComplete }: IntroProps) {
  const container = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const phraseInnerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const topPanel = useRef<HTMLDivElement>(null);
  const bottomPanel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const splittedName = new SplitText(nameRef.current, {
        type: "words",
        autoSplit: true,
        wordsClass:"name-word"
      });

      // Starting states
      gsap.set(splittedName.words, { yPercent: 120, opacity: 0 });
      gsap.set(nameRef.current, { visibility: "visible" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow label
      tl.to(eyebrowRef.current, { opacity: 1, duration: 0.2 });

      tl.to(splittedName.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.3,
        ease: "elastic.inOut",
      }).to(
        splittedName.words,
        { yPercent: -200, duration: 0.2, ease: "power3.inOut" },
        "+=0.5"
      );

      // Each info line: mask up, hold, mask out
      phrases.forEach((_, i) => {
        tl.to(phraseInnerRefs.current[i], {
          opacity: 1,
          yPercent: 0,
          duration: 0.3,
          ease: "power3.out",
        }).to(
          phraseInnerRefs.current[i],
          { yPercent: -100, duration: 0.3, ease: "power3.inOut" },
          "+=0.5"
        );
      });

      tl.to(
        eyebrowRef.current,
        { opacity: 0, yPercent: -100, duration: 0.3 },
        "<"
      );

      // Thin center line grows outward
      tl.to(lineRef.current, {
        width: "100%",
        duration: 0.7,
        ease: "power3.inOut",
      });

      // Split reveal into the hero
      tl.to(
        topPanel.current,
        { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
        "+=0.25"
      )
        .to(
          bottomPanel.current,
          { yPercent: 100, duration: 0.8, ease: "power4.inOut" },
          "<"
        )
        .to(lineRef.current, { opacity: 0, duration: 0.3 }, "<")
        .call(() => onComplete?.());

      return () => splittedName.revert();
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="fixed inset-0 z-50 h-screen w-full overflow-hidden"
    >
      {/* Top panel */}
      <div
        ref={topPanel}
        className="absolute top-0 left-0 z-20 h-1/2 w-full bg-black"
      />
      {/* Bottom panel */}
      <div
        ref={bottomPanel}
        className="absolute bottom-0 left-0 z-20 h-1/2 w-full bg-black"
      />

      {/* Thin center line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-1/2 z-30 h-px w-0 -translate-x-1/2 -translate-y-1/2 bg-white"
      />

      {/* Intro content */}
      <div
        ref={introContentRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 text-text-primary pointer-events-none"
      >
        <span
          ref={eyebrowRef}
          className="text-xs uppercase opacity-0 tracking-[0.3em] text-background/60"
        >
          Portfolio
        </span>

        <div className="relative w-full h-12 md:h-16 overflow-hidden text-background">
          {phrases.map((phrase, i) => (
            <span
              key={phrase}
              ref={(el) => {
                phraseInnerRefs.current[i] = el;
              }}
              className="absolute inset-0 flex opacity-0  items-center justify-center text-2xl md:text-4xl font-light tracking-wide"
            >
              {phrase}
            </span>
          ))}

          <p
            className="absolute inset-0 flex invisible items-center justify-center text-xl md:text-4xl font-light tracking-widest"
            ref={nameRef}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
