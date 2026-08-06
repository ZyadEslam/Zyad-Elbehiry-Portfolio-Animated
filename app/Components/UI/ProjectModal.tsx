"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Project } from "@/app/data/projects";

gsap.registerPlugin(useGSAP);

const CLIP_CLOSED = "inset(0% 0% 0% 100%)"; // hidden behind the right edge
const CLIP_OPEN = "inset(0% 0% 0% 0%)";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // `current` stays populated through the exit animation even after
  // `project` goes back to null, so the modal has content to animate out.
  const [current, setCurrent] = useState<Project | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  // Entrance: reruns whenever `current` changes to a new project.
  const { contextSafe } = useGSAP(
    () => {
      if (!current) return;

      gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: "auto" });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        backdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 40, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 },
          "<0.05"
        )
        .fromTo(
          imgWrapRef.current,
          { clipPath: CLIP_CLOSED },
          { clipPath: CLIP_OPEN, duration: 0.8, ease: "power3.inOut" },
          "<0.05"
        )
        .fromTo(
          charRefs.current,
          { yPercent: 120, rotateZ: 6 },
          { yPercent: 0, rotateZ: 0, duration: 0.6, stagger: 0.02 },
          "<0.3"
        )
        .fromTo(
          [metaRef.current, descRef.current, linksRef.current],
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "<0.1"
        );
    },
    { scope: overlayRef, dependencies: [current] }
  );

  // Sync incoming project -> local content the instant one is opened.
  useEffect(() => {
    if (project) {
      charRefs.current = [];
      const setCurrentProject = async () => {
        setCurrent(project);
      };
      setCurrentProject();
    }
  }, [project]);

  const handleClose = () => {
    contextSafe(() => {
      if (!current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.in" },
        onComplete: () => {
          gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
          setCurrent(null);
          onClose();
        },
      });

      tl.to(charRefs.current, {
        yPercent: -120,
        rotateZ: -6,
        duration: 0.3,
        stagger: 0.01,
      })
        .to(
          [metaRef.current, descRef.current, linksRef.current],
          { autoAlpha: 0, y: -12, duration: 0.25 },
          "<"
        )
        .to(
          imgWrapRef.current,
          { clipPath: CLIP_CLOSED, duration: 0.5, ease: "power3.inOut" },
          "<0.05"
        )
        .to(
          panelRef.current,
          { autoAlpha: 0, y: 24, scale: 0.97, duration: 0.4 },
          "<0.05"
        )
        .to(backdropRef.current, { autoAlpha: 0, duration: 0.4 }, "<");
    })();
  };

  // Lock page scroll and wire Escape while a project is open.
  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // Imperative close: animates out, THEN clears local state and tells
  // the parent to clear its selection. contextSafe keeps this tween
  // registered with the same gsap context useGSAP is managing.

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 opacity-0 md:p-10"
      style={{ pointerEvents: "none" }}
      role="dialog"
      aria-modal="true"
      aria-label={current?.title ?? "Project details"}
    >
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {current && (
        <div
          ref={panelRef}
          className="relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-y-auto bg-[#F7F6F2] shadow-2xl md:flex-row"
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={handleClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:rotate-90"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>

          <div
            ref={imgWrapRef}
            className="relative aspect-video w-full shrink-0 overflow-hidden bg-neutral-200 md:aspect-auto md:w-1/2"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-center px-6 py-10 md:w-1/2 md:px-12 md:py-14">
            <div
              ref={metaRef}
              className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500"
            >
              {current.category} - {current.year}
            </div>

            <h2 className="mb-6 text-4xl font-black uppercase leading-[0.95] tracking-tight text-black md:text-5xl">
              {current.title.split("").map((ch, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span
                    ref={(el) => {
                      if (el) charRefs.current[i] = el;
                    }}
                    className="inline-block will-change-transform"
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                </span>
              ))}
            </h2>

            <p
              ref={descRef}
              className="mb-8 max-w-md text-base leading-relaxed text-neutral-700"
            >
              {current.description}
            </p>

            {current.tags && current.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-wide text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div ref={linksRef} className="flex flex-wrap gap-3">
              {current.demo && (
                <a
                  href={current.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                >
                  Live demo ↗
                </a>
              )}
              {current.github && (
                <a
                  href={current.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
                >
                  View code ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
