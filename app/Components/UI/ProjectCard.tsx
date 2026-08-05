import { Project } from "@/app/data/projects";
import Image from "next/image";

export default function ProjectCard({
  project,
  onEnter,
  onLeave,
}: {
  project: Project;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <a
      href={project.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group block cursor-none"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-200">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="text-xl font-semibold text-black">{project.title}</h3>
      </div>
      <p className="mt-1 text-sm text-neutral-500">
        {project.category} - {project.year}
      </p>
    </a>
  );
}
