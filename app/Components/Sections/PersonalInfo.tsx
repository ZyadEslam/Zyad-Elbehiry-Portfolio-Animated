import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PersonalInfo = () => {
  const sectionBRef = useRef<HTMLDivElement>(null);
  const headingLine1 = useRef<HTMLSpanElement>(null);
  const headingLine2 = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionBRef.current,
            start: "top 75%",
          },
          defaults: { ease: "power3.out" },
        })
        .to(headingLine1.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(headingLine2.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    },
    { scope: sectionBRef }
  );

  return (
    <section
      ref={sectionBRef}
      className="flex min-h-screen flex-col justify-center gap-6 px-6 py-24 text-center md:px-12"
    >
      <h1 className="font-serif text-6xl leading-[0.95] text-text-primary tracking-tight md:text-8xl">
        <span
          ref={headingLine1}
          className="block -translate-y-6 font-light italic opacity-0"
        >
          Frontend
        </span>
        <span
          ref={headingLine2}
          className="block -translate-y-6 font-semibold opacity-0"
        >
          Developer.
        </span>
      </h1>

      <p
        ref={paraRef}
        className="mx-auto max-w-md -translate-y-4 text-sm text-[#222222]/70 opacity-0 md:text-base"
      >
        I build fast, accessible interfaces with React, Next.js and TypeScript —
        backed by a solid foundation in Java and API design.
      </p>

      <div ref={ctaRef} className="-translate-y-4 opacity-0">
        <Link
          href="#work"
          className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest text-text-primary"
        >
          View my work
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default PersonalInfo;
