import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/types";
import { formatTech } from "@/lib/format";
import ArrowLink from "./ArrowLink";

/** Compact card for tools, client sites and experiments. */
export default function ProjectCard({ project }: { project: Project }) {
  const primaryHref = project.demo_url || project.github_url;
  const tech = (project.technologies ?? []).slice(0, 4).map(formatTech);

  return (
    <article className="surface-card flex h-full flex-col p-9 transition-colors duration-300 hover:bg-kelp-hover/60">
      <div className="flex items-start justify-between gap-6">
        <p className="meta min-h-[1.4em] text-silver-mist">{tech.join(" · ")}</p>
        {primaryHref && (
          <ArrowLink href={primaryHref} label={`Open ${project.title}`} />
        )}
      </div>

      {project.image_url && (
        <div className="relative mt-7 aspect-[16/10] w-full overflow-hidden rounded-[6px] bg-liquid-abyss">
          <Image
            src={project.image_url}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <h3 className="subheading mt-7">{project.title}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.5] text-silver-mist">
        {project.description}
      </p>

      {(project.demo_url || project.github_url) && (
        <div className="mt-7 flex flex-wrap gap-6">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link inline-flex items-center gap-1.5"
            >
              Live
              <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link inline-flex items-center gap-1.5"
            >
              <Github size={13} strokeWidth={1.75} aria-hidden="true" />
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}
