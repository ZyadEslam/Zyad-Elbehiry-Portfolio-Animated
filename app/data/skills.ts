export interface Skill {
    name: string;
    tag: string;
  }
  
  // Order here also sets the enter-direction cycle in SkillsShowcase.tsx
  // (top -> right -> bottom -> left, repeating).
  export const skills: Skill[] = [
    { name: "React.js", tag: "Library" },
    { name: "Next.js", tag: "Framework" },
    { name: "TypeScript", tag: "Language" },
    { name: "Tailwind CSS", tag: "Styling" },
    { name: "GSAP", tag: "Motion" },
    { name: "JavaScript", tag: "Language" },
    { name: "HTML5", tag: "Markup" },
    { name: "Git & GitHub", tag: "Workflow" },
  ];