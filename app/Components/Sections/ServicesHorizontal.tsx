"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "../../data/servicesData";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * ServicesHorizontalSection
 * -----------------------------------------------------------------------
 * "Fake" horizontal scroll: the section pins for the vertical scroll
 * distance needed to translate an oversized flex row (`trackRef`) all the
 * way to its end, so normal mouse-wheel / touch scroll reads as
 * horizontal motion. Each card is ~75% of the viewport wide, so the next
 * card always peeks in ~25% at the right edge.
 *
 * Per-card entrance (image rotating in from a steeper tilt to its resting
 * -30° / 30° alternation, title/description sliding up) is driven by
 * individual ScrollTriggers that use `containerAnimation: scrollTween` —
 * the documented GSAP pattern for scrubbing child animations against a
 * horizontally-scrolling parent instead of the page's vertical scroll.
 * -----------------------------------------------------------------------
 */
export default function ServicesHorizontalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      ScrollTrigger.normalizeScroll(true);

      const scrollTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // markers: true,
          end: () => `+=${getScrollDistance()}`,
          // end: () => `+=3000`,
          // Works around ancestors with overflow-hidden/transform/filter
          // breaking the default position:fixed pin (see note in README).
          pinType: "transform",
          pin: sectionRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          // onUpdate: (self) => {
          //   if (progressFillRef.current) {
          //     gsap.set(progressFillRef.current, { scaleX: self.progress });
          //   }
          //   const idx = Math.min(
          //     SERVICES.length - 1,
          //     Math.floor(self.progress * SERVICES.length)
          //   );
          //   if (counterRef.current) {
          //     counterRef.current.textContent = `${pad(idx + 1)} / ${pad(
          //       SERVICES.length
          //     )}`;
          //   }
          //   if (hintRef.current) {
          //     gsap.to(hintRef.current, {
          //       opacity: self.progress > 0.03 ? 0 : 1,
          //       duration: 0.3,
          //       overwrite: "auto",
          //     });
          //   }
          // },
        },
      });

      // Per-card reveal, scrubbed against horizontal position rather than
      // vertical page scroll (containerAnimation is the key bit here).
      panelRefs.current.forEach((panel, i) => {
        const restRotation = i % 2 === 0 ? 5 : -5;
        const startRotation = i % 2 === 0 ? -38 : 38;
        const image = imageRefs.current[i];
        const title = panel.querySelector<HTMLElement>("[data-title]");
        const desc = panel.querySelector<HTMLElement>("[data-desc]");

        if (image) {
          gsap.fromTo(
            image,
            { rotate: startRotation, scale: 0.82, opacity: 0.35 },
            {
              rotate: restRotation,
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 88%",
                end: "left 35%",
                scrub: true,
              },
            }
          );

          //       // Hover flourish: straighten + lift while the pointer is over it.
          // image.addEventListener("mouseenter", () => {
          //   gsap.to(image, {
          //     rotate: 0,
          //     scale: 1.05,
          //     duration: 0.5,
          //     ease: "power3.out",
          //   });
          // });
          // image.addEventListener("mouseleave", () => {
          //   gsap.to(image, {
          //     rotate: restRotation,
          //     scale: 1,
          //     duration: 0.5,
          //     ease: "power3.out",
          //   });
          // });
        }

        // if (title) {
        //   gsap.fromTo(
        //     title,
        //     { y: 40, opacity: 0 },
        //     {
        //       y: 0,
        //       opacity: 1,
        //       ease: "none",
        //       scrollTrigger: {
        //         trigger: panel,
        //         containerAnimation: scrollTween,
        //         start: "left 82%",
        //         end: "left 48%",
        //         scrub: true,
        //       },
        //     }
        //   );
        // }

        // if (desc) {
        //   gsap.fromTo(
        //     desc,
        //     { y: 24, opacity: 0 },
        //     {
        //       y: 0,
        //       opacity: 1,
        //       ease: "none",
        //       scrollTrigger: {
        //         trigger: panel,
        //         containerAnimation: scrollTween,
        //         start: "left 78%",
        //         end: "left 42%",
        //         scrub: true,
        //       },
        //     }
        //   );
        // }
      });

      //   // Remote images can shift layout slightly once they load — refresh
      //   // ScrollTrigger's cached measurements once they're all in.
      // const imgs = track.querySelectorAll("img");
      // let pending = imgs.length;
      // const onOneLoaded = () => {
      //   pending -= 1;
      //   if (pending <= 0) ScrollTrigger.refresh();
      // };
      // imgs.forEach((img) => {
      //   if (img.complete) onOneLoaded();
      //   else img.addEventListener("load", onOneLoaded, { once: true });
      // });

      ScrollTrigger.refresh();
      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section className="bg-dark-bg py-8">
      <div
        ref={sectionRef}
        className="h-screen w-full overflow-hidden text-white"
      >
        {/* header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-baseline justify-between px-6 pt-10 md:px-12 md:pt-14 lg:px-20">
          {/* <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-white/40">What I do</p>
          <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl">Services</h2>
        </div> */}
          <span
            ref={counterRef}
            className="hidden font-mono text-sm tabular-nums text-white/40 md:block"
          >
            01 / {pad(SERVICES.length)}
          </span>
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-8 left-6 z-20 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40 md:left-12 lg:left-20"
        >
          <span>Scroll</span>
          <span
            className="inline-block animate-bounce"
            style={{ transform: "rotate(90deg)" }}
          >
            →
          </span>
        </div>

        {/* progress bar */}
        {/* <div className="absolute inset-x-0 bottom-0 z-20 h-[3px] w-full bg-white/10">
        <div
          ref={progressFillRef}
          className="h-full w-full origin-left scale-x-0 bg-white"
        />
      </div> */}

        {/* the horizontally-translated track */}
        <div
          ref={trackRef}
          className="flex h-full w-full items-center "
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) panelRefs.current[i] = el;
              }}
              className="flex h-full w-[80%] shrink-0 flex-col justify-center px-6 md:w-[80%] md:px-10 lg:w-[60%] lg:px-14"
            >
              <span className="font-mono text-xs text-white/30">
                {service.index}
              </span>
              <h3
                data-title
                className="mt-2 max-w-md text-3xl font-black uppercase leading-[1.05] tracking-tight md:text-5xl"
              >
                {service.title}
              </h3>
              <p
                data-desc
                className="mt-4 max-w-sm text-sm text-white/60 md:text-base"
              >
                {service.description}
              </p>

              <div
                ref={(el) => {
                  if (el) imageRefs.current[i] = el;
                }}
                className="relative mt-10 aspect-video w-[80%] cursor-pointer overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
                  style={{ transformOrigin: "50% 50%" }}
              >
                <Image
                  src={service.image}
                  width={700}
                  height={400}
                  alt={service.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
