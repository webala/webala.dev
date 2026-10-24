import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/types";
import type { CaseStudy } from "@/lib/content/case-studies";
import ArrowLink from "./ArrowLink";

interface CaseStudyCardProps {
  project: Project;
  study: CaseStudy;
}

export default function CaseStudyCard({ project, study }: CaseStudyCardProps) {
  const primaryHref = project.demo_url || project.github_url;

  return (
    <article className="surface-card p-9 md:p-12">
      {project.image_url && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-[6px] bg-liquid-abyss">
          <Image
            src={project.image_url}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1440px) 1300px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-6">
            <p className="eyebrow">{study.domain}</p>
            {primaryHref && (
              <ArrowLink href={primaryHref} label={`Open ${project.title}`} />
            )}
          </div>
          <h3 className="heading mt-5">{project.title}</h3>
          <p className="mt-5 max-w-[56ch] text-base leading-[1.5] text-silver-mist">
            {study.problem}
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-5 border-t border-white/10 pt-6">
            {study.proof.map((p) => (
              <div key={p.label}>
                <dd className="text-2xl font-medium leading-none tracking-[-0.02em] text-lavender-phosphor">
                  {p.value}
                </dd>
                <dt className="caption mt-2 text-silver-mist">{p.label}</dt>
              </div>
            ))}
          </dl>

          <p className="caption mt-8 text-slate-deep">{study.stack.join(" · ")}</p>

          {(project.demo_url || project.github_url) && (
            <div className="mt-6 flex flex-wrap gap-6">
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
        </div>

        <div className="flex flex-col gap-9 lg:border-l lg:border-white/10 lg:pl-12">
          <section aria-label={`${project.title} system design`}>
            <p className="eyebrow">System design</p>
            <ul className="mt-5 flex flex-col gap-4">
              {study.architecture.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-[1.5] text-silver-mist">
                  <span
                    className="mt-[0.55em] inline-block h-1.5 w-1.5 flex-none rounded-full bg-aqua"
                    aria-hidden="true"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label={`${project.title} key decisions`}>
            <p className="eyebrow">Decisions</p>
            <ul className="mt-5 flex flex-col divide-y divide-white/10">
              {study.decisions.map((d) => (
                <li key={d.title} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-base font-medium text-liquid-mist">{d.title}</p>
                  <p className="mt-1.5 text-sm leading-[1.5] text-silver-mist">{d.why}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
