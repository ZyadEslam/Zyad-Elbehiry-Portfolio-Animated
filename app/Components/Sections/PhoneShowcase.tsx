"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showcaseSlides, type Direction } from "../../data/showcase";

gsap.registerPlugin(ScrollTrigger);

// Each direction maps to a clip-path start/end pair. Animating `top`,
// `right`, `bottom` or `left` independently makes the image wipe open
// from that edge, instead of a plain fade or a single dissolve.
const CLIP: Record<Direction, { from: string; to: string }> = {
  top: { from: "inset(0% 0% 100% 0%)", to: "inset(0% 0% 0% 0%)" },
  bottom: { from: "inset(100% 0% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
  left: { from: "inset(0% 100% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
  right: { from: "inset(0% 0% 0% 100%)", to: "inset(0% 0% 0% 0%)" },
};

export default function GsapShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const slideRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const subtitleRefs = useRef<HTMLDivElement[]>([]);
  const charRefs = useRef<HTMLSpanElement[][]>(showcaseSlides.map(() => []));

  useGSAP(
    () => {
      const total = showcaseSlides.length;
      const slot = 1; // arbitrary time unit per slide "turn"

      // Starting state for every slide/element, set once up front.
      showcaseSlides.forEach((slide, i) => {
        gsap.set(imgRefs.current[i], {
          clipPath:
            i === 0 ? CLIP[slide.direction].to : CLIP[slide.direction].from,
          scale: 1.18,
        });
        gsap.set(slideRefs.current[i], { autoAlpha: 1 });
        gsap.set(charRefs.current[i], {
          yPercent: i === 0 ? 0 : 120,
          rotateZ: i === 0 ? 0 : 8,
        });
        gsap.set(subtitleRefs.current[i], {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 16,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${total * (window.innerHeight * 1.15)}`,
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(progressFillRef.current, { scaleY: self.progress });
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            if (counterRef.current?.dataset.idx !== String(idx)) {
              if (counterRef.current)
                counterRef.current.dataset.idx = String(idx);
              gsap.fromTo(
                counterRef.current,
                { yPercent: 40, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, duration: 0.3 }
              );
              if (counterRef.current) {
                counterRef.current.textContent = `0${idx + 1} / 0${total}`;
              }
            }
          },
        },
      });

      showcaseSlides.forEach((slide, i) => {
        const t = i * slot;

        if (i > 0) {
          // Reveal: this slide's image wipes open over the previous one.
          tl.to(
            imgRefs.current[i],
            {
              clipPath: CLIP[slide.direction].to,
              duration: 0.42,
              ease: "power3.inOut",
            },
            t
          );

          // Outgoing slide's headline gets yanked away as the wipe passes.
          tl.to(
            charRefs.current[i - 1],
            {
              yPercent: -120,
              rotateZ: -8,
              stagger: 0.008,
              duration: 0.3,
              ease: "power3.in",
            },
            t
          ).to(
            subtitleRefs.current[i - 1],
            { autoAlpha: 0, y: -14, duration: 0.25 },
            t
          );
        }

        // Slow continuous Ken Burns push-in on every image.
        tl.to(
          imgRefs.current[i],
          { scale: 1, duration: slot + 0.4, ease: "none" },
          t
        );

        // Incoming headline cascades up out of its mask, char by char.
        tl.to(
          charRefs.current[i],
          { yPercent: 0, rotateZ: 0, stagger: 0.02, duration: 0.7 },
          t + 0.08
        ).to(
          subtitleRefs.current[i],
          { autoAlpha: 1, y: 0, duration: 0.5 },
          t + 0.18
        );
      });

      // Finale: chrome fades as the sequence releases the pin.
      tl.to(
        [counterRef.current, progressFillRef.current?.parentElement],
        { autoAlpha: 0, duration: 0.25 },
        total * slot - 0.25
      );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="relative bg-black"
      // style={{ height: "100vh" }}
    >
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden bg-black text-[#F5F4EF]"
      >
        {/* Slide stack */}
        {showcaseSlides.map((slide, i) => (
          <div
            key={slide.title}
            ref={(el) => {
              if (el) slideRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ zIndex: i }}
          >
            <div
              ref={(el) => {
                if (el) imgRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
            </div>

            {/* Text overlay */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-16 md:pb-24">
              <div
                ref={(el) => {
                  if (el) subtitleRefs.current[i] = el;
                }}
                className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#C9A15A]"
              >
                {slide.subtitle}
              </div>
              <h2 className="max-w-4xl text-[12vw] font-black uppercase leading-[0.88] tracking-tight md:text-[6.5vw]">
                {slide.title.split("").map((ch, j) => (
                  <span
                    key={j}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <span
                      ref={(el) => {
                        if (el) charRefs.current[i][j] = el;
                      }}
                      className="inline-block will-change-transform"
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  </span>
                ))}
              </h2>
            </div>
          </div>
        ))}

        {/* Slide counter */}
        <span
          ref={counterRef}
          data-idx="0"
          className="pointer-events-none absolute left-6 top-6 z-50 font-mono text-xs tracking-[0.2em] text-[#F5F4EF]/80 md:left-10 md:top-10"
        >
          01 / 0{showcaseSlides.length}
        </span>

        {/* Progress rail */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-50 h-32 w-px -translate-y-1/2 bg-white/15 md:right-10">
          <div
            ref={progressFillRef}
            className="h-full w-full origin-top bg-[#C9A15A]"
            style={{ transform: "scaleY(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
