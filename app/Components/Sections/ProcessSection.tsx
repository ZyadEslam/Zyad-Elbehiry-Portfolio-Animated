"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    id: "01",
    title: "Discover",
    description:
      "Understanding goals, users, and constraints before a single pixel or line of code.",
  },
  {
    id: "02",
    title: "Design",
    description:
      "Wireframes and high-fidelity direction, refined until it feels inevitable.",
  },
  {
    id: "03",
    title: "Develop",
    description:
      "Clean, performant code — built to scale, not just to ship.",
  },
  {
    id: "04",
    title: "Deploy",
    description:
      "Launched, monitored, and refined based on how people actually use it.",
  },
] as const;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      gsap.set(contentRefs.current, { opacity: 0.35 });

      // The connecting line fills top -> bottom in lockstep with how far
      // the viewer has scrolled through the whole steps list.
      gsap.to(lineFillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 65%",
          scrub: 0.6,
        },
      });

      // Each step "lights up" independently as the line reaches it.
      STEPS.forEach((_, i) => {
        const activate = () => {
          gsap.to(circleRefs.current[i], {
            backgroundColor: "#ffffff",
            color: "#000000",
            borderColor: "#ffffff",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(contentRefs.current[i], { opacity: 1, duration: 0.4, ease: "power2.out" });
        };
        const deactivate = () => {
          gsap.to(circleRefs.current[i], {
            backgroundColor: "transparent",
            color: "rgba(255,255,255,0.4)",
            borderColor: "rgba(255,255,255,0.25)",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(contentRefs.current[i], { opacity: 0.35, duration: 0.4, ease: "power2.out" });
        };

        ScrollTrigger.create({
          trigger: stepRefs.current[i],
          start: "top 55%",
          end: "bottom 45%",
          onEnter: activate,
          onEnterBack: activate,
          onLeave: deactivate,
          onLeaveBack: deactivate,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-dark-bg px-6 py-28 text-white md:px-12 lg:px-20 lg:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Process
        </p>
        <h2 className="mb-20 max-w-xl text-4xl font-black uppercase leading-[1.05] tracking-tight md:mb-28 md:text-5xl">
          How I work
        </h2>

        <div className="relative">
          {/* static track */}
          <div className="absolute inset-y-0 left-6 w-px bg-white/10 md:left-8" />
          {/* animated fill */}
          <div
            ref={lineFillRef}
            className="absolute inset-y-0 left-6 w-px origin-top scale-y-0 bg-white md:left-8"
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                className="relative flex gap-8 md:gap-12"
              >
                <div
                  ref={(el) => {
                    if (el) circleRefs.current[i] = el;
                  }}
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 font-mono text-sm text-white/40 md:h-16 md:w-16 md:text-base"
                >
                  {step.id}
                </div>

                <div
                  ref={(el) => {
                    if (el) contentRefs.current[i] = el;
                  }}
                  className="pt-1 md:pt-3"
                >
                  <h3 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-white/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}