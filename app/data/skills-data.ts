import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiGraphql,
    SiFigma,
    SiGit,
    SiGreensock,
  } from "react-icons/si";
  import type { IconType } from "react-icons";
  
  export interface Skill {
    name: string;
    Icon: IconType;
    /** Brand color, used for the active glow / icon fill / node ring */
    color: string;
    /** Position within the pinned section, in percent (matches the SVG viewBox 0 0 100 100) */
    x: number;
    y: number;
  }
  
  // Zigzag layout — deliberately not a straight vertical line, so the
  // connector has real curvature to work with. Tweak x/y to restyle the
  // whole "circuit" without touching any animation code.
  export const SKILLS: Skill[] = [
    { name: "React", Icon: SiReact, color: "#61DAFB", x: 20, y: 8 },
    { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", x: 68, y: 17 },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", x: 26, y: 30 },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8", x: 74, y: 41 },
    { name: "Node.js", Icon: SiNodedotjs, color: "#3C873A", x: 22, y: 53 },
    { name: "GraphQL", Icon: SiGraphql, color: "#E10098", x: 70, y: 63 },
    { name: "Figma", Icon: SiFigma, color: "#F24E1E", x: 28, y: 75 },
    { name: "Git", Icon: SiGit, color: "#F05032", x: 72, y: 85 },
    { name: "GSAP", Icon: SiGreensock, color: "#88CE02", x: 50, y: 94 },
  ];