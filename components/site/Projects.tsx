"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/queries";
import { fallbackProjects } from "@/lib/content/fallback-projects";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content/site";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

const github = site.socials.find((s) => s.id === "github");

export default function Projects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: () => getProjects(true),
    retry: 1,
  });

  const projects = !error && data && data.length > 0 ? data : fallbackProjects;
  const usingFallback = !isLoading && projects === fallbackProjects;

  return (
    <section
      id="work"
      className="container-site scroll-mt-24 py-20 md:py-28"
      aria-labelledby="work-heading"
    >
      <SectionHeader
        id="work-heading"
        eyebrow="Work"
        title="Selected projects"
        description="Products shipped for clients, employers and myself — payments, point of sale, platforms that have to stay up."
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2" aria-busy="true">
          {[0, 1].map((i) => (
            <div key={i} className="surface-card h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {usingFallback && github && (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[280px] flex-col justify-between rounded-card border border-white/10 p-7 transition-colors duration-300 hover:border-white/25 md:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="eyebrow text-[11px]">Open source · Experiments</p>
                  <span className="arrow-btn" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={1.75} />
                  </span>
                </div>
                <div>
                  <p className="subheading">More on GitHub</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-silver-mist">
                    Case studies for recent client and employer work are being
                    written up. In the meantime, the code and experiments live at
                    github.com/{github.handle}.
                  </p>
                </div>
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
}
