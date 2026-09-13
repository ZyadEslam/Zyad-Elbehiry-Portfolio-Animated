"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { SKILLS } from "../../data/skills-data";
import {
  buildFinePoints,
  buildCumulativePaths,
  catmullRomToBezier,
  hexToRgba,
} from "../../lib/skills-path-utils";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, useGSAP);

// How many interpolated micro-steps sit between two real skill nodes.
// Higher = the connector reshapes in smaller, smoother increments as you
// scroll. Each one of these steps is a real MorphSVGPlugin tween.
const STEPS_PER_SEGMENT = 6;
// Scroll pixels the pinned section holds for each micro-step.
const PX_PER_STEP = 55;

export default function SkillsPathSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathTrackRef = useRef<SVGPathElement>(null);
  const pathActiveRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bigLabelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const iconWrapRefs = useRef<HTMLDivElement[]>([]);

  const [bigLabelText, setBigLabelText] = useState(SKILLS[0].name);

  // ---------------------------------------------------------------------
  // Precompute every path shape this component will ever need, once.
  // The scroll handler then just indexes into these arrays — no spline
  // math happens on the scroll tick itself.
  // ---------------------------------------------------------------------
  const { finePoints, fineD, fullTrackD } = useMemo(() => {
    const nodes = SKILLS.map((s) => ({ x: s.x, y: s.y }));
    const fine = buildFinePoints(nodes, STEPS_PER_SEGMENT);
    return {
      finePoints: fine,
      fineD: buildCumulativePaths(fine),
      fullTrackD: catmullRomToBezier(nodes),
    };
  }, []);

  useGSAP(
    () => {
      //   const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (process.env.NODE_ENV !== "production") {
        // If you're seeing everything fully active with no scroll animation,
        // check this log first — it's almost always one of two things:
        //  1) prefersReducedMotion is true (see the branch right below), or
        //  2) the ScrollTrigger pin below silently failed because an
        //     ancestor of this section has `overflow: hidden`, a CSS
        //     `transform`, or a `filter` — any of those break position:fixed
        //     pinning. `pinType: "transform"` on the ScrollTrigger below
        //     works around that, but it's worth removing the ancestor
        //     property if you can.
        // eslint-disable-next-line no-console
        // console.info("[SkillsPathSection] prefersReducedMotion:", prefersReducedMotion);
      }

      // Static dim "track" previewing the full path immediately.
      if (pathTrackRef.current) {
        gsap.set(pathTrackRef.current, { attr: { d: fullTrackD } });
        const len = pathTrackRef.current.getTotalLength();
        gsap.fromTo(
          pathTrackRef.current,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power2.inOut",
            delay: 0.2,
          }
        );
      }

      //   if (prefersReducedMotion) {
      //     // Reduced motion: skip the pin/scrub entirely, show everything active.
      //     if (pathActiveRef.current) gsap.set(pathActiveRef.current, { attr: { d: fullTrackD }, opacity: 1 });
      //     nodeRefs.current.forEach((el, i) => {
      //       gsap.set(el, { scale: 1, opacity: 1 });
      //       gsap.set(iconWrapRefs.current[i], { color: SKILLS[i].color });
      //     });
      //     return;
      //   }

      gsap.set(pathActiveRef.current, { attr: { d: fineD[0] }, opacity: 0 });
      gsap.set(nodeRefs.current, { scale: 0.7, opacity: 0.35 });
      gsap.set(iconWrapRefs.current, { color: "rgba(255,255,255,0.35)" });
      if (nodeRefs.current[0])
        gsap.set(nodeRefs.current[0], { scale: 1, opacity: 1 });
      if (iconWrapRefs.current[0])
        gsap.set(iconWrapRefs.current[0], { color: SKILLS[0].color });

      let lastFineIndex = 0;
      let lastSkillIndex = 0;

      function activateSkill(idx: number) {
        lastSkillIndex = idx;
        const skill = SKILLS[idx];

        nodeRefs.current.forEach((el, i) => {
          const isActive = i <= idx;
          gsap.to(el, {
            scale: isActive ? 1 : 0.7,
            opacity: isActive ? 1 : 0.35,
            duration: 0.45,
            ease: isActive ? "back.out(2.2)" : "power2.out",
            overwrite: "auto",
          });
          gsap.to(iconWrapRefs.current[i], {
            color: isActive ? SKILLS[i].color : "rgba(255,255,255,0.35)",
            duration: 0.4,
            overwrite: "auto",
          });
        });

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            duration: 0.6,
            ease: "power2.out",
            "--glow-x": `${skill.x}%`,
            "--glow-y": `${skill.y}%`,
            "--glow-color": hexToRgba(skill.color, 0.28),
            overwrite: "auto",
          } as gsap.TweenVars);
        }

        if (bigLabelRef.current) {
          gsap
            .timeline({ overwrite: "auto" })
            .to(bigLabelRef.current, {
              opacity: 0,
              y: -16,
              duration: 0.25,
              ease: "power2.in",
            })
            .call(() => setBigLabelText(skill.name))
            .to(bigLabelRef.current, {
              opacity: 0.07,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
        }

        if (counterRef.current) {
          counterRef.current.textContent = `${String(idx + 1).padStart(
            2,
            "0"
          )} / ${String(SKILLS.length).padStart(2, "0")}`;
        }
      }

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(finePoints.length - 1) * PX_PER_STEP}`,
        pin: sectionRef.current,
        markers: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const k = Math.round(self.progress * (finePoints.length - 1));
          if (k === lastFineIndex) return;
          lastFineIndex = k;

          gsap.to(pathActiveRef.current, {
            duration: 0.32,
            ease: "power2.out",
            morphSVG: fineD[k],
            opacity: 1,
            overwrite: "auto",
          });

          const activeIdx = Math.min(
            SKILLS.length - 1,
            Math.floor(k / STEPS_PER_SEGMENT)
          );
          if (activeIdx !== lastSkillIndex) activateSkill(activeIdx);
        },
      });

      return () => st.kill();
    },
    { scope: sectionRef, dependencies: [fineD, fullTrackD, finePoints] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen z-40 w-full overflow-hidden bg-black text-white"
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-color": "rgba(255,255,255,0.28)",
        } as React.CSSProperties
      }
    >
      {/* ambient color glow that follows the active skill */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--glow-x) var(--glow-y), var(--glow-color) 0%, transparent 55%)",
        }}
      />

      {/* huge crossfading watermark of the active skill name */}
      <div
        ref={bigLabelRef}
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden opacity-[0.07]"
      >
        <span className="whitespace-nowrap text-[16vw] font-black uppercase leading-none tracking-tighter">
          {bigLabelText}
        </span>
      </div>

      {/* header */}
      <div className="relative z-10 px-6 pt-16 md:px-12 md:pt-20 lg:px-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Stack
        </p>
        <div className="flex items-baseline justify-between">
          <h2 className="max-w-xl text-4xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl">
            Tech I build with
          </h2>
          <span
            ref={counterRef}
            className="hidden font-mono text-sm tabular-nums text-white/40 md:block"
          >
            01 / {String(SKILLS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* the connector + nodes, positioned in percentage-space matching the SVG viewBox */}
      <div className="absolute inset-0 z-[5]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            ref={pathTrackRef}
            fill="none"
            stroke="white"
            strokeOpacity={0.12}
            strokeWidth={0.35}
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={pathActiveRef}
            fill="none"
            stroke="white"
            strokeWidth={0.45}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))" }}
          />
        </svg>

        {SKILLS.map((skill, i) => {
          const Icon = skill.Icon;
          return (
            <div
              key={skill.name}
              ref={(el) => {
                if (el) nodeRefs.current[i] = el;
              }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3"
              style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/70 backdrop-blur-sm md:h-20 md:w-20">
                <div
                  ref={(el) => {
                    if (el) iconWrapRefs.current[i] = el;
                  }}
                  className="text-2xl md:text-4xl"
                >
                  <Icon color="currentColor" />
                </div>
              </div>
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 md:text-xs">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
