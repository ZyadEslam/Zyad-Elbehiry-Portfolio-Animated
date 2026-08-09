"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const services = [
  {
    number: "01",
    title: "Design",
    description:
      "Interfaces that are intuitive, memorable, and built around real people.",
  },
  {
    number: "02",
    title: "Development",
    description:
      "Modern web experiences engineered for speed, scalability and maintainability.",
  },
  {
    number: "03",
    title: "Motion",
    description:
      "Meaningful animations that communicate, delight and guide every interaction.",
  },
  {
    number: "04",
    title: "Systems",
    description:
      "Scalable design systems and reusable components that accelerate product growth.",
  },
];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);

  const rowRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const descriptionRefs = useRef<HTMLParagraphElement[]>([]);
  const topBorderRefs = useRef<HTMLDivElement[]>([]);
  const bottomBorderRefs = useRef<HTMLDivElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  const activateRow = (activeIndex: number, split: SplitText) => {
    rowRefs.current.forEach((row, index) => {
      gsap.to(row, {
        opacity: index === activeIndex ? 1 : 0.25,
        duration: 0.5,
        overwrite: "auto",
      });

      gsap.to(titleRefs.current[index], {
        scale: index === activeIndex ? 1 : 0.92,
        transformOrigin: "left center",
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(descriptionRefs.current[index], {
        autoAlpha: index === activeIndex ? 1 : 0,
        y: index === activeIndex ? 0 : 20,
        filter: index === activeIndex ? "blur(0px)" : "blur(6px)",
        duration: 0.45,
        overwrite: "auto",
      });

      gsap.to(numberRefs.current[index], {
        autoAlpha: index === activeIndex ? 1 : 0.3,
        y: index === activeIndex ? 0 : 12,
        duration: 0.45,
        overwrite: "auto",
      });
    });

    // gsap.fromTo(
    gsap.to(
      split.lines,
      // { yPercent: 110 },
      {
        yPercent: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power4.out",
      }
    );

    gsap.to(rowRefs.current[activeIndex], {
      y: -8,
      duration: 0.45,
      ease: "power3.out",
    });

    rowRefs.current.forEach((row, index) => {
      if (index !== activeIndex) {
        gsap.to(row, {
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });
      }
    });

    const bounds = rowRefs.current[activeIndex].getBoundingClientRect();
    gsap.to(glowRef.current, {
      y: bounds.top + bounds.height / 2,
      duration: 0.7,
      ease: "power3.out",
    });

    gsap.to(topBorderRefs.current[activeIndex], {
      backgroundColor: "#f8f8f8",
      duration: 0.4,
    });

    gsap.to(bottomBorderRefs.current[activeIndex], {
      backgroundColor: "#f8f8f8",
      duration: 0.4,
    });

    topBorderRefs.current.forEach((border, index) => {
      if (index !== activeIndex) {
        gsap.to(border, {
          backgroundColor: "#3f3f46",
          duration: 0.4,
        });

        gsap.to(bottomBorderRefs.current[index], {
          backgroundColor: "#3f3f46",
          duration: 0.4,
        });
      }
    });
  };

  useGSAP(
    () => {
      const splits: SplitText[] = [];

      // Initial state
      gsap.set(rowRefs.current, {
        opacity: 0.25,
      });

      gsap.set(titleRefs.current, {
        opacity: 1,
      });

      gsap.set(numberRefs.current, {
        y: 25,
        autoAlpha: 0,
      });

      gsap.set(descriptionRefs.current, {
        y: 30,
        autoAlpha: 0,
      });

      // Create SplitText for every title
      titleRefs.current.forEach((title) => {
        const split = SplitText.create(title, {
          type: "lines",
          mask: "lines",
        });

        splits.push(split);

        gsap.set(split.lines, {
          yPercent: 110,
        });
      });

      // Master timeline
      const tl = gsap.timeline();

      rowRefs.current.forEach((row, i) => {
        const split = splits[i];

        ScrollTrigger.create({
          trigger: row,
          start: "top center+=120",
          end: "bottom center",
          onEnter: () => activateRow(i, split),
          onEnterBack: () => activateRow(i, split),
        });
      });

      services.forEach((_, i) => {
        const split = splits[i];

        tl.addLabel(`service-${i}`);

        // Previous row fades
        if (i > 0) {
          tl.to(
            rowRefs.current[i - 1],
            {
              opacity: 0.25,
              duration: 0.4,
            },
            "<"
          );

          tl.to(
            descriptionRefs.current[i - 1],
            {
              autoAlpha: 0,
              y: -20,
              duration: 0.35,
            },
            "<"
          );

          tl.to(
            numberRefs.current[i - 1],
            {
              autoAlpha: 0,
              y: -20,
              duration: 0.35,
            },
            "<"
          );
        }

        // Active row
        tl.to(
          rowRefs.current[i],
          {
            opacity: 1,
            duration: 0.4,
          },
          "<"
        );

        // Borders
        tl.to(
          topBorderRefs.current[i],
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "<"
        );

        tl.to(
          bottomBorderRefs.current[i],
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "<"
        );

        // Number
        tl.to(
          numberRefs.current[i],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "<+=0.05"
        );

        // Title
        tl.to(
          split.lines,
          {
            yPercent: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power4.out",
          },
          "<"
        );

        // Description
        tl.to(
          descriptionRefs.current[i],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "<+=0.15"
        );

        // Pause before next service
        tl.to({}, { duration: 0.5 });
      });

      return () => {
        splits.forEach((split) => split.revert());

        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative overflow-hidden bg-dark-bg text-[#f8f8f8]"
    >
      <div className="services-wrapper relative">
        <div className="mx-auto max-w-[1700px] px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
          <p className="mb-12 text-xs uppercase tracking-[0.45em] text-zinc-500 md:mb-20">
            Ready for
          </p>

          {services.map((service, index) => (
            <div
              key={service.number}
              ref={(el) => {
                if (el) rowRefs.current[index] = el;
              }}
              className="relative py-8 md:py-10 lg:py-12"
            >
              {/* Top Border */}
              <div className="absolute left-0 top-0 h-px w-full overflow-hidden">
                <div
                  ref={(el) => {
                    if (el) topBorderRefs.current[index] = el;
                  }}
                  className="h-full origin-left scale-x-0 bg-zinc-700"
                />
              </div>

              {/* Content */}
              <div
                className="
                  grid
                  gap-y-6
                  md:gap-x-8
                  lg:gap-x-12
  
                  grid-cols-1
                  md:grid-cols-[60px_1fr]
                  lg:grid-cols-[70px_1fr_320px]
                "
              >
                {/* Number */}
                <span
                  ref={(el) => {
                    if (el) numberRefs.current[index] = el;
                  }}
                  className="
                    text-sm
                    text-zinc-600
                    opacity-0
  
                    md:pt-3
                    lg:pt-4
                  "
                >
                  {service.number}
                </span>

                {/* Title */}
                <h2
                  ref={(el) => {
                    if (el) titleRefs.current[index] = el;
                  }}
                  className="
                    font-light
                    leading-[0.9]
                    tracking-[-0.05em]
  
                    text-[clamp(2.75rem,13vw,8rem)]
  
                    md:col-start-2
                  "
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p
                  ref={(el) => {
                    if (el) descriptionRefs.current[index] = el;
                  }}
                  className="
                    max-w-md
                    text-sm
                    leading-7
                    text-zinc-500
                    opacity-0
  
                    md:col-start-2
                    md:text-base
  
                    lg:col-start-3
                    lg:self-center
                  "
                >
                  {service.description}
                </p>
              </div>

              {/* Bottom Border */}
              <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
                <div
                  ref={(el) => {
                    if (el) bottomBorderRefs.current[index] = el;
                  }}
                  className="h-full origin-left scale-x-0 bg-zinc-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
