"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/queries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", "featured"],
    queryFn: () => getProjects(true),
  });

  if (error) {
    return (
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-text-secondary text-center">
            Unable to load projects. Please check your Supabase configuration.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-text-secondary mb-2 uppercase tracking-wider text-sm">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-primary">Featured</span> Projects
          </h2>
          <div className="w-20 h-1 bg-primary mt-2"></div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-bg-light rounded-lg h-96 animate-pulse"
              ></div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              No projects yet. Add some featured projects to your Supabase
              database!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
