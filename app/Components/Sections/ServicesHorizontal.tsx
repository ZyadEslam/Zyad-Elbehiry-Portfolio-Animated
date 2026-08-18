"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "../../data/servicesData";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_PX_PER_SECOND = 70;

export default function ServicesHorizontalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;

      if (!track || !section) return;

      ScrollTrigger.normalizeScroll(true);

      let marqueeTween: gsap.core.Tween | null = null;

      // -------------------------------------------------------
      // PANEL ANIMATION
      // -------------------------------------------------------

      const updatePanels = () => {
        const viewportCenter = window.innerWidth / 2;

        panelRefs.current.forEach((panel) => {
          if (!panel) return;

          const rect = panel.getBoundingClientRect();

          const panelCenter = rect.left + rect.width / 2;

          // Distance from the center of the viewport.
          const distance = Math.abs(panelCenter - viewportCenter);

          // Normalize distance.
          // 0 = exactly in the center
          // 1 = completely away from center
          const maxDistance = window.innerWidth * 0.65;

          const progress = gsap.utils.clamp(0, 1, distance / maxDistance);

          // Center panel:
          // scale = 1
          // rotation = 0
          //
          // Panels further away:
          // scale = 0.75
          // rotation = +/- 2
          const scale = gsap.utils.interpolate(1, 0.75, progress);

          const direction = panelCenter < viewportCenter ? -1 : 1;

          const rotation = gsap.utils.interpolate(0, 2, progress) * direction;

          gsap.set(panel, {
            scale,
            rotate: rotation,
            transformOrigin: "50% 50%",
          });
        });
      };

      // -------------------------------------------------------
      // MARQUEE
      // -------------------------------------------------------

      // function startMarquee() {
      // if (marqueeTween || !track) return;

      const oneSetWidth = track.scrollWidth / 2;

      marqueeTween = gsap.to(track, {
        x: -oneSetWidth,
        duration: 10,
        ease: "none",
        repeat: -1,

        onUpdate: updatePanels,
      });

      // Initial panel state.
      updatePanels();
      // }

      // -------------------------------------------------------
      // SECTION ENTRANCE
      // -------------------------------------------------------

      // gsap.set(section, {
      //   scale: 0.5,
      //   rotate: 0,
      // });

      // const trackAnimation = gsap.to(section, {
      //   scale: 1,
      //   rotate: 0,
      //   duration: 1.1,
      //   ease: "power3.out",

      //   scrollTrigger: {
      //     trigger: section,
      //     start: "top bottom",
      //     toggleActions: "play none none reverse",
      //   },

      //   onComplete: startMarquee,
      // });

      // -------------------------------------------------------
      // IMAGE LOADING
      // -------------------------------------------------------

      const imgs = track.querySelectorAll("img");

      let pending = imgs.length;

      const onOneLoaded = () => {
        pending -= 1;

        if (pending <= 0) {
          ScrollTrigger.refresh();
          updatePanels();
        }
      };

      imgs.forEach((img) => {
        if (img.complete) {
          onOneLoaded();
        } else {
          img.addEventListener("load", onOneLoaded, {
            once: true,
          });
        }
      });

      // -------------------------------------------------------
      // RESIZE
      // -------------------------------------------------------

      const handleResize = () => {
        updatePanels();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      ScrollTrigger.refresh();

      return () => {
        marqueeTween?.kill();
        // trackAnimation.kill();

        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: sectionRef }
  );

  // Two copies back-to-back so the marquee wrap is seamless.
  const loopedServices = [...SERVICES, ...SERVICES];

  return (
    <section className="bg-dark-bg relative">
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-linear-to-b from-transparent to-dark-bg" /> */}
      <div
        ref={sectionRef}
        className="relative py-8 lg:h-screen w-full bg-background overflow-hidden text-white"
      >
        {/* the auto-scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-10 h-full w-max items-center will-change-transform"
        >
          {loopedServices.map((service, i) => (
            <div
              key={`${service.id}-${i}`}
              ref={(el) => {
                if (el) panelRefs.current[i] = el;
              }}
              className="panel flex h-full w-[90vw] shrink-0 scale-75 flex-col justify-center md:w-[70vw] lg:w-[60vw]"
            >
              <div
                className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl "
                style={{ transformOrigin: "50% 50%" }}
              >
                <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
                  <p className="font-black max-w-[50%] text-background text-center text-shadow-xl text-shadow-[rgba(0,0,0,.2)] text-2xl md:text-4xl lg:text-6xl uppercase tracking-tight text-wrap">
                    {service.title}
                  </p>
                </div>

                <Image
                  src={service.image}
                  width={700}
                  height={400}
                  alt={service.title}
                  className="h-full w-full object-cover "
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
