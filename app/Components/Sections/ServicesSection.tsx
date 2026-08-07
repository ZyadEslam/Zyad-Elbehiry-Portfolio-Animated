"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "../UI/Services";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = SplitText.create(textRef.current, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
        autoSplit: true,
      });

      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          scrub: 1,
          start: "top bottom",
          end: "bottom +=200",
        },
      });
      ScrollTrigger.refresh();
      return () => split.revert();
    },
    { scope: container }
  );

  return (
    <>
      <section
        id="services"
        ref={container}
        className="bg-black px-[5%] text-[#f8f8f8]"
      >
        <div className="flex flex-col h-screen justify-center">
          <div className="flex justify-between text-zinc-500 mb-2">
            <span>04</span>
            <span>(Services)</span>
            <span>2026</span>
          </div>
          <div className="w-full border-y-2 border-zinc-700 py-16">
            <div className="mx-auto max-w-[1600px] ">
              <p
                ref={textRef}
                className="
                max-w-6xl
                text-left
                font-light
                leading-[0.95]
                tracking-tighter
                text-[clamp(2rem,6vw,6.5rem)]
              "
              >
                Thoughtful design and solid engineering — interfaces, systems,
                and motion, built end to end and shipped with craft.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Services />
    </>
  );
}
