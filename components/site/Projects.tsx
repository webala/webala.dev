"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/queries";
import { fallbackProjects } from "@/lib/content/fallback-projects";
import { caseStudies, findCaseStudy } from "@/lib/content/case-studies";
import { site } from "@/lib/content/site";
import type { Project } from "@/types";
import CaseStudyCard from "./CaseStudyCard";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

const github = site.socials.find((s) => s.id === "github");

function split(projects: Project[]) {
  const studies: { project: Project; index: number }[] = [];
  const rest: Project[] = [];
  for (const project of projects) {
    const study = findCaseStudy(project.title);
    if (study && !studies.some((s) => findCaseStudy(s.project.title) === study)) {
      studies.push({ project, index: caseStudies.indexOf(study) });
    } else {
      rest.push(project);
    }
  }
  studies.sort((a, b) => a.index - b.index);
  return { studies: studies.map((s) => s.project), rest };
}

export default function Projects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", "all"],
    queryFn: () => getProjects(false),
    retry: 1,
  });

  const projects = !error && data && data.length > 0 ? data : fallbackProjects;
  const usingFallback = !isLoading && projects === fallbackProjects;
  const { studies, rest } = split(projects);

  return (
    <section
      id="work"
      className="container-site scroll-mt-24 py-20 md:py-28"
      aria-labelledby="work-heading"
    >
      <SectionHeader
        id="work-heading"
        eyebrow="Work"
        title="Systems I've designed and shipped."
        description="A point-of-sale SaaS, a real-time gaming platform and a group-finance app, each owned from data model to deployment. Smaller tools and experiments follow."
      />

      {isLoading ? (
        <div className="flex flex-col gap-5" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="surface-card h-96 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {studies.map((project) => {
              const study = findCaseStudy(project.title);
              return study ? (
                <CaseStudyCard key={project.id} project={project} study={study} />
              ) : null;
            })}
          </div>

          {(rest.length > 0 || usingFallback) && (
            <div className="mt-16 md:mt-20">
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">More projects</p>
                  <p className="mt-3 max-w-[52ch] text-base text-silver-mist">
                    Tools, client sites and experiments.
                  </p>
                </div>
                {github && (
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link inline-flex items-center gap-2"
                  >
                    GitHub
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                )}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {usingFallback && github && (
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[220px] flex-col justify-between rounded-card border border-white/10 p-9 transition-colors duration-300 hover:border-white/25"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <p className="eyebrow">Open source · Experiments</p>
                      <span className="arrow-btn" aria-hidden="true">
                        <ArrowUpRight size={16} strokeWidth={1.75} />
                      </span>
                    </div>
                    <div>
                      <p className="subheading">More on GitHub</p>
                      <p className="mt-3 text-sm leading-[1.5] text-silver-mist">
                        Server monitoring, client sites and experiments live at
                        github.com/{github.handle}.
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
