"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { projects, type Project } from "@/app/data/projects";
import ProjectCard from "../UI/ProjectCard";
import ProjectModal from "../UI/ProjectModal";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const WORD_A = "Projects";
const WORD_B = "Designs";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Title morph: "Projects" -> "Designs" as the section is scrolled into
  // view, and back to "Projects" when scrolling back up above it.
  useGSAP(() => {
    const el = titleRef.current;
    if (!el) return;

    const morph = (word: string) =>
      gsap.to(el, {
        duration: 0.9,
        text: { value: word, type: "" },
        ease: "none",
      });

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 55%",
      onEnter: () => morph(WORD_B),
      onLeaveBack: () => morph(WORD_A),
    });

    // Mouse follower: a quickTo tween gives a smooth, lagging follow instead
    // of snapping the circle straight to the cursor on every frame.
    const follower = followerRef.current;
    if (!follower) return;

    const xTo = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    gsap.to(followerRef.current, {
      scale: activeId ? 1 : 0,
      opacity: activeId ? 1 : 0,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [activeId]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      {/* Section title, morphs on scroll via GSAP TextPlugin */}
      <h2
        ref={titleRef}
        className="mb-16 select-none text-[16vw] font-black uppercase leading-[0.9] tracking-tight text-text-primary sm:text-[11vw] md:mb-24 lg:text-[7vw]"
      >
        {WORD_A}
      </h2>

      {/* Project grid: 1 column on small screens, 2 columns from lg up */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-[1fr_1fr] lg:gap-x-10 lg:gap-y-24">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setSelectedProject}
            onEnter={() => setActiveId(project.id)}
            onLeave={() => setActiveId(null)}
          />
        ))}
      </div>

      {/* Mouse-follower: thick-bordered, transparent-centered circle with "View" */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 scale-0 items-center justify-center rounded-full border-[5px] border-white opacity-0 mix-blend-difference"
        aria-hidden="true"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] ">
          View
        </span>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
