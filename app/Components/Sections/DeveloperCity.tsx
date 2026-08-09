"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skills } from "../../data/skills";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Direction = "top" | "right" | "bottom" | "left";
const DIRECTIONS: Direction[] = ["top", "right", "bottom", "left"];

// Enter/exit offsets per direction. Each card enters from its assigned
// edge and exits out the opposite edge, so the swap always reads as
// motion passing through the box rather than a plain cut.
const OFFSET: Record<
  Direction,
  { enter: gsap.TweenVars; exit: gsap.TweenVars }
> = {
  top: {
    enter: { yPercent: -120, xPercent: 0 },
    exit: { yPercent: 120, xPercent: 0 },
  },
  bottom: {
    enter: { yPercent: 120, xPercent: 0 },
    exit: { yPercent: -120, xPercent: 0 },
  },
  left: {
    enter: { xPercent: -120, yPercent: 0 },
    exit: { xPercent: 120, yPercent: 0 },
  },
  right: {
    enter: { xPercent: 120, yPercent: 0 },
    exit: { xPercent: -120, yPercent: 0 },
  },
};

export default function SkillsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const whiteLayerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // --- Infinite skill-swap loop (built first, played once revealed) ---
      gsap.set(cardRefs.current, { opacity: 0 });

      const enterDuration = 0.28;
      const holdDuration = 0.45;
      const exitDuration = 0.26;
      const slot = enterDuration + holdDuration + exitDuration;

      const loopTl = gsap.timeline({ repeat: -1, paused: true });

      skills.forEach((_, i) => {
        const direction = DIRECTIONS[i % DIRECTIONS.length];
        const { enter, exit } = OFFSET[direction];
        const t = i * slot;
        const card = cardRefs.current[i];

        loopTl
          .fromTo(
            card,
            { ...enter, opacity: 0 },
            {
              xPercent: 0,
              yPercent: 0,
              opacity: 1,
              duration: enterDuration,
              ease: "power3.out",
            },
            t
          )
          .to(
            card,
            { ...exit, opacity: 0, duration: exitDuration, ease: "power3.in" },
            t + enterDuration + holdDuration
          );
      });

      // --- Scroll-triggered reveal: white cover -> scaled/rotated stage -> bg image ---
      gsap.set(stageRef.current, {
        scale: 0.22,
        rotate: -14,
        borderRadius: 40,
      });
      gsap.set(imageLayerRef.current, { autoAlpha: 0 });
      gsap.set(whiteLayerRef.current, { autoAlpha: 1 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          const revealTl = gsap.timeline({
            defaults: { ease: "power4.out" },
            onComplete: () => loopTl.play(),
          });
          revealTl
            .to(stageRef.current, {
              scale: 1,
              rotate: 0,
              borderRadius: 0,
              duration: 1.2,
            })
            .to(
              imageLayerRef.current,
              { autoAlpha: 1, duration: 0.7, ease: "power2.out" },
              "-=0.55"
            )
            .to(
              whiteLayerRef.current,
              { autoAlpha: 0, duration: 0.7, ease: "power2.out" },
              "<"
            );
        },
        onEnterBack: () => loopTl.play(),
        onLeave: () => loopTl.pause(),
        onLeaveBack: () => loopTl.pause(),
      });
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      <div
        ref={stageRef}
        className="absolute inset-0 origin-center overflow-hidden will-change-transform"
      >
        {/* Background image layer, fades in as the stage finishes growing */}
        <div ref={imageLayerRef} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2400&auto=format&fit=crop"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Solid white cover the stage "grows out of" */}
        <div ref={whiteLayerRef} className="absolute inset-0 bg-white" />

        {/* Centered box holding the swapping skill plates */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="relative h-[380px] w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl md:h-[460px] md:w-[380px]">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                className="absolute inset-0 flex flex-col justify-between p-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-lime-400">
                  {skill.tag} — 0{i + 1}
                </span>

                <Image
                  src={"/skill2.png"}
                  alt=""
                  width={600}
                  height={600}
                  className="object contain"
                />

                <div>
                  <h3 className="text-3xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-4xl">
                    {skill.name}
                  </h3>
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: 10 }).map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className="h-1 w-4 rounded-full bg-lime-400/80 first:w-8"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
