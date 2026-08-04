"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  text: string;
  className?: string;
  onComplete?: () => void;
};

export default function CodeWriter({
  text,
  className = "",
  onComplete,
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);

  const characters = text.split("");

  useLayoutEffect(() => {
    if (!container.current) return;

    const chars =
      container.current.querySelectorAll<HTMLSpanElement>(".code-char");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });


      gsap.set(chars, {
        opacity: 0,
        y: 10,
      });


      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.04,
        stagger: {
          each: 0.035,
        },
        ease: "power2.out",
      });


      tl.to(
        cursor.current,
        {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.45,
        },
        0
      );

    }, container);


    return () => ctx.revert();

  }, [onComplete]);


  return (
    <div
      ref={container}
      className={`font-mono text-xl leading-relaxed ${className}`}
    >

      {characters.map((char, index) => (
        <span
          key={index}
          className="code-char inline-block whitespace-pre"
        >
          {char}
        </span>
      ))}


      <span
        ref={cursor}
        className="
        ml-1
        inline-block
        h-6
        w-[3px]
        translate-y-1
        bg-[#FFFF8C]
        "
      />

    </div>
  );
}