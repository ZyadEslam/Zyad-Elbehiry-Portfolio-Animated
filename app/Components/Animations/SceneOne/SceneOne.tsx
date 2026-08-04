"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import CodeWriter from "./CodeWriter";

export default function SceneOne() {
  const section = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(title.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power4.out",
      });
    },
    {
      scope: section,
    }
  );

  const code = `const developer = createDeveloper({

  name: "Zyad Elbehiry",

  role: "Frontend Engineer",

  stack: [

    "React",

    "Next.js",

    "GSAP",

    "TypeScript",

    "Tailwind CSS"

  ]

});`;

  return (
    <section
      ref={section}
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-[#f8f8f8]
      px-6
      "
    >
      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,#FFFF8C33,transparent_45%)]
        "
      />

      <div
        ref={title}
        className="
        relative
        z-10
        w-full
        max-w-4xl
        "
      >
        <div
          className="
          mb-12
          text-xs
          uppercase
          tracking-[0.5em]
          text-neutral-400
          "
        >
          Building Developer...
        </div>

        <div
          className="
          rounded-3xl
          border
          border-black/10
          bg-white/70
          p-10
          shadow-xl
          backdrop-blur-xl
          "
        >
          <CodeWriter text={code} />
        </div>
      </div>
    </section>
  );
}
