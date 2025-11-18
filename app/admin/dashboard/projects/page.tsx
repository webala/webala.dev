"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleting(id);
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);

      if (error) throw error;

      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Projects</h1>
          <p className="text-text-secondary">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/dashboard/projects/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-bg-light rounded-xl p-6 h-64 animate-pulse"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-bg-light rounded-xl">
          <p className="text-text-secondary mb-4">No projects yet</p>
          <Link
            href="/admin/dashboard/projects/new"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Plus size={20} />
            Add your first project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-bg-light rounded-xl overflow-hidden hover:bg-bg-lighter transition-all duration-200"
            >
              {project.image_url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-text mb-1">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <span className="text-text-secondary text-sm">
                    #{project.order_index}
                  </span>
                </div>

                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-bg-dark text-text-secondary text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-bg-dark text-text-secondary text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-bg-lighter">
                  <div className="flex gap-2">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-secondary hover:text-primary hover:bg-bg-dark rounded-lg transition-colors"
                        title="View Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-text-secondary hover:text-primary hover:bg-bg-dark rounded-lg transition-colors"
                        title="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/dashboard/projects/edit/${project.id}`}
                      className="p-2 text-text-secondary hover:text-primary hover:bg-bg-dark rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deleting === project.id}
                      className="p-2 text-text-secondary hover:text-red-500 hover:bg-bg-dark rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


