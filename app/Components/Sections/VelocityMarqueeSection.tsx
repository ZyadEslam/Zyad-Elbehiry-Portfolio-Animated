"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ROW_ONE = ["Design", "Develop", "Animate", "Ship"];
const ROW_TWO = ["Precision", "Performance", "Detail", "Craft"];

export default function VelocityMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const t1 = gsap.to(track1Ref.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
      const t2 = gsap.to(track2Ref.current, {
        xPercent: 50,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
      tweensRef.current = [t1, t2];

      // Track how fast the page itself is scrolling, then push that
      // speed into both marquee tweens' timeScale — the faster you
      // scroll, the faster the rows fly by. Settles back to normal
      // once scrolling stops.
      let lastY = window.scrollY;
      let lastTime = performance.now();
      let settleTimeout: ReturnType<typeof setTimeout>;

      const onScroll = () => {
        const now = performance.now();
        const dy = window.scrollY - lastY;
        const dt = Math.max(now - lastTime, 1);
        const pxPerMs = Math.min(Math.abs(dy / dt), 3);
        lastY = window.scrollY;
        lastTime = now;

        const targetTimeScale = gsap.utils.clamp(1, 7, 1 + pxPerMs * 6);
        gsap.to(tweensRef.current, {
          timeScale: targetTimeScale,
          duration: 0.25,
          overwrite: true,
        });

        clearTimeout(settleTimeout);
        settleTimeout = setTimeout(() => {
          gsap.to(tweensRef.current, {
            timeScale: 1,
            duration: 1.4,
            ease: "power2.out",
          });
        }, 140);
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(settleTimeout);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-dark-bg py-8 md:py-10"
    >
      <div className="-rotate-2 border-y flex flex-col gap-4 border-white/10">
        <MarqueeRow
          innerRef={track1Ref as React.RefObject<HTMLDivElement>}
          items={ROW_ONE}
          variant="filled"
        />
        <div className="border-t border-white/10" />
        <MarqueeRow
          innerRef={track2Ref as React.RefObject<HTMLDivElement>}
          items={ROW_TWO}
          variant="outline"
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  innerRef,
  items,
  variant,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
  items: string[];
  variant: "filled" | "outline";
}) {
  const doubled = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden bg-background py-4 md:py-6">
      <div
        ref={innerRef}
        className={`flex w-max shrink-0 items-center ${
          variant === "outline" && "-translate-x-[90%]"
        }`}
      >
        {doubled.map((word, i) => (
          <span key={i} className=" flex shrink-0 items-center">
            <span
              className={`px-6 text-[9vw] font-black uppercase leading-none tracking-tight md:text-[6vw] ${
                variant === "filled" ? "text-text-primary" : "text-transparent"
              }`}
              style={
                variant === "outline"
                  ? { WebkitTextStroke: "1.5px var(--text-primary)" }
                  : undefined
              }
            >
              {word}
            </span>
            <span
              aria-hidden="true"
              className="text-[4vw] text-text-primary/80 md:text-[2vw]"
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
